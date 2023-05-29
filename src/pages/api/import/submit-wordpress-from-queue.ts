import type { Draft } from "immer";
import { produce } from "immer";
import type { NextApiRequest, NextApiResponse } from "next";
import { NextResponse } from "next/server";
import { parse } from "parse5";
import type { Node } from "slate";
import { Element } from "slate";

import { deepclone, getJsonFromBody } from "@common/util";
import { srcToFile } from "@modules/editor/upload";
import getImageFileSize from "@modules/file/get-image-size";
import uploadFile from "@modules/file/upload-file";
import type { PendingImages } from "@modules/file/upload-image-after-parse5";
import { getPendingImages } from "@modules/file/upload-image-after-parse5";
import htmlToSlateNode from "@modules/parse/html-to-slate-node";
import { getServiceClient } from "@modules/supabase/supabase-service";
import type { Json } from "@modules/supabase/supabase-types";

async function uploadImageWithReplacement({
  nodes,
  uploadFileFunc,
  pendingImages,
}: {
  nodes: Node[];
  uploadFileFunc: typeof uploadFile;
  pendingImages: PendingImages;
}): Promise<Node[]> {
  let nodesResult = deepclone(nodes);

  const imageUploadResults = await Promise.allSettled(
    [...pendingImages.entries()].map(
      async ([_id, { path, src: originalSrc }]) => {
        const file = await srcToFile(originalSrc);
        if (!file) {
          throw new Error(`Can't load File from src ${originalSrc}`);
        }

        if (!file.type.includes("image")) {
          throw new Error(`file is not image: ${file.type}`);
        }

        const [actualSize, imageSrc] = await Promise.all([
          getImageFileSize(file),
          uploadFileFunc(file, "uploads"),
        ] as const);

        const lastIndex = path.pop();
        if (typeof lastIndex !== "number") {
          throw new Error("lastIndex is not number");
        }

        nodesResult = produce(nodesResult, (draft) => {
          const parent = path.reduce(
            (acc, cur) => {
              if (!Element.isElement(acc)) {
                throw new Error("path is not valid");
              }
              return acc.children[cur] as Draft<Node>;
            },
            { type: "EDITOR", children: draft } as Draft<Node>
          );

          if (!Element.isElement(parent)) {
            throw new Error("parent is not Element");
          }

          parent.children[lastIndex] = {
            type: "IMAGE",
            width: actualSize.width,
            height: actualSize.height,
            children: [{ type: "TEXT", text: "" }],
            url: imageSrc,
            alt: "",
          };
        });
      }
    )
  );

  // if one error, throw error
  const errors = imageUploadResults.filter(
    (result): result is PromiseRejectedResult => result.status === "rejected"
  );

  if (errors.length) {
    const errorMessage = errors.map((e, i) => `${i}: ${e.reason}`).join("\n");
    throw new Error(errorMessage);
  }

  return nodesResult;
}

export default async function SubmitWordpressFromQueue(
  req: NextApiRequest,
  _res: NextApiResponse
) {
  if (req.method !== "POST") {
    return NextResponse.json(
      { error: "Method Not Allowed" },
      { status: 405, headers: { Allow: "POST" } }
    );
  }

  const json = await getJsonFromBody<{ id: string }>(req);
  const { id } = json;

  if (!id) {
    return NextResponse.json({ error: "No id provided" }, { status: 400 });
  }

  const db = getServiceClient();
  const importing = await db
    .from("import_queue")
    .select("*")
    .eq("id", id)
    .single();

  const { error: importingError, data: importingData } = importing;
  if (importingError) {
    return NextResponse.json(
      { error: `No import queue of id ${id}` },
      { status: 404 }
    );
  }

  if (importingData.deleted_at || importingData.post_id) {
    return NextResponse.json(
      { error: `Import queue of id ${id} is already processed` },
      { status: 400 }
    );
  }

  const htmlParsed = parse(importing.data.content);
  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  const slateParsed = htmlToSlateNode(htmlParsed);

  // TODO: implementation
  if (!slateParsed || !Array.isArray(slateParsed)) {
    // eslint-disable-next-line no-console
    console.log(`No data after parsing for import queue of id ${id}`);
  } else {
    const pendingImages = getPendingImages(slateParsed);
    const replacedNodes = await uploadImageWithReplacement({
      nodes: slateParsed,
      pendingImages,
      uploadFileFunc: uploadFile,
    });
    await db.from("posts").insert({
      title: importingData.title,
      content: {
        data: replacedNodes,
      } as unknown as Json,
      published: true,
      user_id: "TODO",
    });
  }

  return NextResponse.json({
    message: "OK",
    data: "",
  });
}

export const config = {
  runtime: "edge",
};
