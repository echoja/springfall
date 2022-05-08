/* This example requires Tailwind CSS v2.0+ */
import { Dialog } from "@headlessui/react";
import { useCallback, useMemo, useRef, useState } from "react";

const InsertImageDialog: React.FC<{
  open: boolean;
  setOpen: (open: boolean) => void;
}> = ({ open, setOpen }) => {
  const cancelButtonRef = useRef(null);
  const [stage, setStage] = useState<"INITIAL" | "LINK" | "UPLOAD">("INITIAL");

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
            className="form-control block w-full px-3 py-1.5 text-base font-normal text-gray-700 bg-white bg-clip-padding border border-solid border-gray-300 rounded transition ease-in-out m-0 focus:text-gray-700 focus:bg-white focus:border-blue-600 focus:outline-none"
            type="file"
            id="formFile"
          />
        </div>
      </div>
    );
  }, []);

  const setStageLink = useCallback(() => setStage("LINK"), []);
  const setStageUpload = useCallback(() => setStage("UPLOAD"), []);

  return (
    <Dialog
      as="div"
      className="relative z-10"
      initialFocus={cancelButtonRef}
      onClose={setOpen}
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
                    {/* <div className="mx-auto flex items-center justify-center h-12 w-12 rounded-full bg-green-100">
                    <CheckIcon
                      className="h-6 w-6 text-green-600"
                      aria-hidden="true"
                    />
                  </div> */}
                    <div className="mt-3 text-center sm:mt-5">
                      <Dialog.Title
                        as="h3"
                        className="text-lg leading-6 font-medium text-gray-900"
                      >
                        이미지 삽입 유형을 고르세요.
                      </Dialog.Title>
                      {/* <div className="mt-2"> */}
                      {/* <p className="text-sm text-gray-500">
                        Lorem ipsum, dolor sit amet consectetur adipisicing
                        elit. Eius aliquam laudantium explicabo pariatur iste
                        dolorem animi vitae error totam. At sapiente aliquam
                        accusamus facere veritatis.
                      </p> */}
                      {/* </div> */}
                    </div>
                  </div>

                  <div className="mt-5 sm:mt-6 sm:grid sm:grid-cols-2 sm:gap-3 sm:grid-flow-row-dense">
                    <button
                      type="button"
                      className="w-full inline-flex justify-center rounded-md border border-transparent shadow-sm px-4 py-2 bg-indigo-600 text-base font-medium text-white hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:col-start-2 sm:text-sm"
                      onClick={setStageUpload}
                    >
                      업로드
                    </button>
                    <button
                      type="button"
                      className="mt-3 w-full inline-flex justify-center rounded-md border border-gray-300 shadow-sm px-4 py-2 bg-white text-base font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 sm:mt-0 sm:col-start-1 sm:text-sm"
                      onClick={setStageLink}
                      ref={cancelButtonRef}
                    >
                      링크
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
export default InsertImageDialog;
