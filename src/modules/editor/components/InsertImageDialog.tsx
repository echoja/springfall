/* This example requires Tailwind CSS v2.0+ */
import { useMyStoreMemo } from "@common/store";
import { Dialog } from "@headlessui/react";
import replaceImageUploadPlaceholder from "@modules/content/image/replace-image-upload-holder";
import { nanoid } from "nanoid";
import type { ChangeEvent } from "react";
import { memo, useCallback, useRef } from "react";
import type { Selection } from "slate";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";

import { uploadImage } from "../upload";

const InsertImageDialog: React.FC<{ selection: Selection | null }> = ({
  selection,
}) => {
  const uploadInputRef = useRef(null);
  const editor = useSlate();

  const { isOpen, close } = useMyStoreMemo((store) => {
    return {
      isOpen: store.isOpenImageInsertDialog,
      close: store.closeImageInsertDialog,
    };
  }, []);

  const handleFiles = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      const fileList = e.target.files;
      if (!fileList) {
        return;
      }

      const uploadImageList: { id: string; file: File }[] = [];
      for (let i = 0; i < fileList.length; i += 1) {
        const file = fileList.item(i);
        if (file) {
          uploadImageList.push({ id: nanoid(), file });
        }
      }

      if (!selection) {
        return;
      }

      const point = Editor.after(editor, selection, {
        unit: "block",
      });

      if (!point) {
        return;
      }

      uploadImage(uploadImageList).forEach(({ id, promise }) => {
        Transforms.insertNodes(
          editor,
          {
            type: "IMAGE_UPLOAD_PLACEHOLDER",
            id,
            children: [{ type: "TEXT", text: "" }],
          },
          { at: point || undefined, select: true }
        );

        promise.then((result) => {
          if (result.type === "IMAGE_UPLOAD_SUCCESS") {
            replaceImageUploadPlaceholder(editor, {
              id,
              height: result.height,
              url: result.url,
              width: result.width,
            });
          }
        });
      });

      close();
    },
    [close, editor, selection]
  );

  const onClose = useCallback(() => {
    close();
  }, [close]);

  return (
    <Dialog
      as="div"
      className="relative z-10"
      initialFocus={uploadInputRef}
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
              <div>
                <div className="mt-1 mb-5 text-center sm:mt-2">
                  <Dialog.Title
                    as="h3"
                    className="text-lg font-medium leading-6 text-gray-900"
                  >
                    이미지 업로드
                  </Dialog.Title>
                </div>
              </div>
              <div className="mt-1 font-sans sm:col-span-2 sm:mt-0">
                <div className="flex justify-center max-w-lg px-6 pt-5 pb-6 border-2 border-gray-300 border-dashed rounded-md">
                  <div className="space-y-1 text-center">
                    <svg
                      className="w-12 h-12 mx-auto text-gray-400"
                      stroke="currentColor"
                      fill="none"
                      viewBox="0 0 48 48"
                      aria-hidden="true"
                    >
                      <path
                        d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                        strokeWidth={2}
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                    <div className="flex text-sm text-gray-600">
                      <label
                        htmlFor="file-upload"
                        className="relative font-medium text-indigo-600 bg-white rounded-md cursor-pointer focus-within:outline-none focus-within:ring-2 focus-within:ring-indigo-500 focus-within:ring-offset-2 hover:text-indigo-500"
                      >
                        <span>파일을 업로드</span>
                        <input
                          id="file-upload"
                          name="file-upload"
                          type="file"
                          className="sr-only"
                          ref={uploadInputRef}
                          onChange={handleFiles}
                        />
                      </label>
                      <p className="pl-1">하거나 드래그 드롭 하세요.</p>
                    </div>
                    <p className="text-xs text-gray-500">
                      PNG, JPG, GIF 파일. 최대 10MB
                    </p>
                  </div>
                </div>
              </div>
            </>
          </Dialog.Panel>
        </div>
      </div>
    </Dialog>
  );
};
export default memo(InsertImageDialog);
