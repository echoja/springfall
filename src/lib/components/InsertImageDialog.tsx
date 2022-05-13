/* This example requires Tailwind CSS v2.0+ */
import { Dialog } from "@headlessui/react";
import { useHotkeys } from "@lib/hooks/use-hotkeys";
import type { IUploadRequestInfo } from "@lib/types";
import axiosGlobal from "axios";
import type { ChangeEvent } from "react";
import { memo, useCallback, useMemo, useRef, useState } from "react";
import type { Selection } from "slate";
import { Editor, Transforms } from "slate";
import { useSlate } from "slate-react";

const axios = axiosGlobal.create();

const InsertImageDialog: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
  selection: Selection | null;
}> = ({ open, setOpen, selection }) => {
  const uploadButtonRef = useRef(null);
  const [stage, setStage] = useState<"INITIAL" | "LINK" | "UPLOAD">("INITIAL");
  const editor = useSlate();

  const imageUploaded = useCallback(
    (urls: string[]) => {
      setOpen(false);
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
              // type: "PARAGRAPH",
              // children: [
              //   {
              //     type: "TEXT",
              //     text: "hoho",
              //   },
              // ],
            },
          ],

          { at: point || undefined, select: true }
        );
      });
    },
    [editor, selection, setOpen]
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
        const promises = files.map(async (file) => {
          const { data: requestInfo } = await axios.request<IUploadRequestInfo>(
            {
              method: "POST",
              url: `/api/file/presigned-url/${file.name}`,
              params: {
                filetype: file.type,
              },
            }
          );

          const formData = new FormData();
          formData.append("Content-Type", file.type);
          Object.entries(requestInfo.headers).forEach(([k, v]) => {
            formData.append(k, v);
          });
          formData.append("file", file);

          await axios.post(requestInfo.url, formData, {
            headers: { "Content-Type": "multipart/form-data" },
          });

          return `${requestInfo.url}/${requestInfo.headers.key ?? ""}`;
        });

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
            className="form-label inline-block mb-2 text-gray-700"
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
  });

  useHotkeys({
    callback: onKeyDownKeyU,
    keys: "u",
  });

  const onClose = useCallback(
    (o: boolean) => {
      setOpen(o);
      setStage("INITIAL");
    },
    [setOpen]
  );

  return (
    <Dialog
      as="div"
      className="relative z-10"
      initialFocus={uploadButtonRef}
      onClose={onClose}
      open={open}
    >
      <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity" />

      <div className="fixed z-10 inset-0 overflow-y-auto">
        <div className="flex items-end justify-center min-h-screen pt-4 px-4 pb-20 text-center sm:block sm:p-0">
          {/* This element is to trick the browser into centering the modal contents. */}
          <span
            className="hidden sm:inline-block sm:align-middle sm:h-screen"
            aria-hidden="true"
          >
            &#8203;
          </span>
          <Dialog.Panel className="relative inline-block align-bottom bg-white rounded-lg px-4 pt-5 pb-4 text-left overflow-hidden shadow-xl transform transition-all sm:my-8 sm:align-middle sm:max-w-lg sm:w-full sm:p-6">
            <>
              {/* eslint-disable-next-line no-nested-ternary */}
              {stage === "INITIAL" && (
                <>
                  <div>
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        이미지 삽입 유형을 고르세요.
                      </Dialog.Title>
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-1 sm:text-sm"
                      onClick={setStageUpload}
                      ref={uploadButtonRef}
                    >
                      업로드 (u)
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-2 sm:text-sm"
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
