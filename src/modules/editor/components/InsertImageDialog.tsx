/* This example requires Tailwind CSS v2.0+ */
import { useHotkeys } from "@common/hooks/use-hotkeys";
import { useMyStoreMemo } from "@common/store";
import { Dialog } from "@headlessui/react";
import { anonClient } from "@modules/supabase/supabase";
import { nanoid } from "nanoid";
import type { ChangeEvent } from "react";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import type { Selection } from "slate";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";

const uploadFile = async (file: File) => {
  // insert id to filename
  const lastDot = file.name.lastIndexOf(".");
  const newFilename = `${file.name.substring(
    0,
    lastDot
  )}-${nanoid()}${file.name.substring(lastDot)}`;

  const { data, error } = await anonClient.storage
    .from("uploads")
    .upload(newFilename, file, {
      cacheControl: "3600",
      upsert: false,
      contentType: file.type,
    });

  if (error) {
    throw error;
  }
  if (!data) {
    throw new Error("no response data");
  }

  const { error: publicUrlError, publicURL } = anonClient.storage
    .from("uploads")
    .getPublicUrl(data.Key.substring(data.Key.indexOf("/") + 1));

  if (publicUrlError) {
    throw publicUrlError;
  }

  if (!publicURL) {
    throw new Error("no publicURL");
  }

  return publicURL;
};

const InsertImageDialog: React.FC<{
  selection: Selection | null;
}> = ({ selection }) => {
  const uploadButtonRef = useRef(null);
  const [stage, setStage] = useState<"INITIAL" | "LINK" | "UPLOAD">("INITIAL");
  const editor = useSlate();

  const { isOpen, close } = useMyStoreMemo((store) => {
    return {
      isOpen: store.isOpenImageInsertDialog,
      close: store.closeImageInsertDialog,
    };
  }, []);

  const imageUploaded = useCallback(
    (urls: string[]) => {
      close();
      urls.forEach((url) => {
        if (!selection) {
          return;
        }
        const point = Editor.after(editor, selection, {
          unit: "block",
        });
        Transforms.insertNodes(
          editor,
          [
            {
              type: "IMAGE",
              url,
              size: { type: "FIT" },
              children: [
                {
                  type: "NOOP",
                  text: "",
                },
              ],
            },
          ],

          { at: point || undefined, select: true }
        );
      });
    },
    [editor, selection, close]
  );

  const handleFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (fileList) {
        const files: File[] = [];
        for (let i = 0; i < fileList.length; i += 1) {
          const file = fileList.item(i);
          if (file) {
            files.push(file);
          }
        }
        const promises = files.map((file) => uploadFile(file));

        Promise.all(promises).then((urls) => {
          imageUploaded(urls);
        });
      }
    },
    [imageUploaded]
  );

  const imageUpload = useMemo(() => {
    return (
      <div className="flex justify-center">
        <div className="mb-3 w-96">
          <label
            htmlFor="formFile"
            className="inline-block mb-2 text-gray-700 form-label"
          >
            이미지 업로드
          </label>
          <input
            // eslint-disable-next-line jsx-a11y/no-autofocus
            autoFocus
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
            onChange={handleFiles}
          />
        </div>
      </div>
    );
  }, [handleFiles]);

  const setStageLink = useCallback(() => setStage("LINK"), []);
  const setStageUpload = useCallback(() => setStage("UPLOAD"), []);

  const onKeyDownKeyU = useCallback(() => {
    if (stage === "INITIAL") {
      setStageUpload();
    }
  }, [setStageUpload, stage]);

  const onKeyDownKeyL = useCallback(() => {
    if (stage === "INITIAL") {
      setStageLink();
    }
  }, [setStageLink, stage]);

  useHotkeys({
    callback: onKeyDownKeyL,
    keys: "l",
    enabled: isOpen,
  });

  useHotkeys({
    callback: onKeyDownKeyU,
    keys: "u",
    enabled: isOpen,
  });

  const onClose = useCallback(() => {
    close();
    setStage("INITIAL");
  }, [close]);

  return (
    <Dialog
      as="div"
      className="relative z-10"
      initialFocus={uploadButtonRef}
      onClose={onClose}
      open={isOpen}
    >
      <div className="fixed inset-0 transition-opacity bg-gray-500 bg-opacity-75" />

      <div className="fixed inset-0 z-10 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen px-4 pt-4 pb-20 text-center sm:block sm:p-0">
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Dialog.Panel className="relative inline-block px-4 pt-5 pb-4 overflow-hidden text-left align-bottom transition-all transform bg-white rounded-lg shadow-xl sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <>
              {/* eslint-disable-next-line no-nested-ternary */}
              {stage === "INITIAL" && (
                <>
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg font-medium leading-6 text-gray-900"
                      >
                        이미지 삽입 유형을 고르세요.
                      </Dialog.Title>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-4 py-2 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:text-sm"
                      onClick={setStageUpload}
                      ref={uploadButtonRef}
                    >
                      업로드 (u)
                    </button>
                    <button
                      type="button"
                      className="inline-flex justify-center w-full px-4 py-2 mt-3 text-base font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm"
                      onClick={setStageLink}
                    >
                      링크 (l)
                    </button>
                  </div>
                </>
              )}

              {stage === "LINK" && "22단계! - 링크"}

              {stage === "UPLOAD" && imageUpload}
            </>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
export default memo(InsertImageDialog);
