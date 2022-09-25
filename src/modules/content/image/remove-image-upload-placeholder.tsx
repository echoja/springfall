import type { Editor } from "slate";
import { Transforms } from "slate";

const removeImageUploadPlaceholder = (editor: Editor, id: string) => {
  Transforms.removeNodes(editor, {
    at: [],
    match: (n) => n.type === "IMAGE_UPLOAD_PLACEHOLDER" && n.id === id,
  });
};

export default removeImageUploadPlaceholder;
