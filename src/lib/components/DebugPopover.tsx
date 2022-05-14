import { Transition } from "@headlessui/react";
import type { SerializedPost } from "@lib/types";
import {
  Fragment,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useState,
} from "react";

const emptyArray: ReadonlyArray<number | string> = [];

const DebugPopover: React.FC<{ post: SerializedPost }> = ({ post }) => {
  const [open, setOpen] = useState(false);
  const [keys, setKeys] = useState<ReadonlyArray<number | string>>(emptyArray);

  const toggleOpen = useCallback(() => {
    setOpen((o) => !o);
  }, []);

  const currentItem = useMemo(() => {
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return keys.reduce<any>((acc, key) => {
      if (acc) {
        return acc[key];
      }
      return undefined;
    }, post);
  }, [keys, post]);

  useEffect(() => {
    // eslint-disable-next-line no-console
    console.log(["post", ...keys].join("."), currentItem);
    if (currentItem === undefined) {
      setKeys(emptyArray);
    }
  }, [currentItem, keys]);

  const buttons = useMemo(() => {
    if (typeof currentItem === "string") {
      return [];
    }
    return Object.keys(currentItem).map((key, index) => (
      <button
        type="button"
        className="bg-slate-700 text-white hover:bg-slate-600 transition-all px-2 py-1 text-xs"
        // eslint-disable-next-line react/no-array-index-key
        key={`${key}-${index}`}
        onClick={() => {
          setKeys((prevKeys) => [...prevKeys, key]);
        }}
      >
        {key}
      </button>
    ));
  }, [currentItem]);

  return (
    <>
      <button type="button" onClick={toggleOpen}>
        디버그용
      </button>
      <Transition
        show={open}
        as={Fragment}
        enter="transition ease-out duration-200"
        enterFrom="opacity-0 translate-y-1"
        enterTo="opacity-100 translate-y-0"
        leave="transition ease-in duration-150"
        leaveFrom="opacity-100 translate-y-0"
        leaveTo="opacity-0 translate-y-1"
      >
        <div className="absolute -translate-x-full translate-y-1/2 w-80 transform p-3 z-10 bg-white border shadow-md">
          <div className="flex flex-wrap gap-1 mb-4">
            <button
              type="button"
              className="bg-slate-700 text-white hover:bg-slate-600 transition-all px-2 py-1 text-xs"
              onClick={() => {
                setKeys(emptyArray);
              }}
            >
              초기화
            </button>
            <button
              type="button"
              className="bg-slate-700 text-white hover:bg-slate-600 transition-all px-2 py-1 text-xs"
              onClick={() => {
                setKeys(["content", "data"]);
              }}
            >
              content.data
            </button>
          </div>
          <div className="flex flex-wrap gap-1 mb-4">
            {keys.map((key, index) => (
              <span
                className="bg-slate-100 px-1 py-0.5 text-xs rounded"
                // eslint-disable-next-line react/no-array-index-key
                key={`${key}-${index}`}
              >
                {key}
              </span>
            ))}
          </div>
          <div className="flex flex-wrap gap-1">{buttons}</div>
        </div>
      </Transition>
    </>
  );
};

export default memo(DebugPopover);
