import { Editor, Transforms } from "slate";

import removeImageUploadPlaceholder from "./remove-image-upload-placeholder";

const replaceImageUploadPlaceholder = (
  editor: Editor,
  {
    id,
    height,
    url,
    width,
  }: {
    id: string;
    url: string;
    width: number;
    height: number;
  }
) => {
  const entry = [
    ...Editor.nodes(editor, {
      at: [],
      match: (n) => n.type === "IMAGE_UPLOAD_PLACEHOLDER" && n.id === id,
    }),
  ][0];

  if (!entry) {
    return;
  }

  Transforms.insertNodes(
    editor,
    {
      type: "IMAGE_CONTAINER",
      children: [
        {
          type: "IMAGE",
          url,
          height,
          width,
          children: [
            {
              type: "TEXT",
              text: "",
            },
          ],
        },
        {
          type: "IMAGE_CAPTION",
          width,
          children: [
            {
              type: "TEXT",
              text: "",
            },
          ],
        },
      ],
    },
    {
      at: entry[1],
    }
  );

  removeImageUploadPlaceholder(editor, id);
};

export default replaceImageUploadPlaceholder;
