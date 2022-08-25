import useEditPropertyInternalValue from "@common/hooks/use-edit-property-internal-value";
import type { ChangeEvent } from "react";
import { useCallback } from "react";
import { twMerge } from "tailwind-merge";

export default function TextareaGroup({
  onChange,
  value,
  title,
  id,
  className,
  rows = 4,
}: {
  value: string;
  title: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
  rows?: number;
}) {
  const { internalValue, onInternalValueChange } = useEditPropertyInternalValue(
    {
      externalValue: value,
      onChange,
    }
  );

  const onTextareaChange = useCallback(
    (e: ChangeEvent<HTMLTextAreaElement>) => {
      return onInternalValueChange(e.target.value);
    },
    [onInternalValueChange]
  );
  return (
    <div>
      <label
        htmlFor={id}
        className="block font-sans text-sm font-medium text-gray-700"
      >
        {title}
      </label>
      <div className="mt-1">
        <textarea
          rows={rows}
          value={internalValue}
          onChange={onTextareaChange}
          id={id}
          className={twMerge(
            "block w-full border-gray-300 rounded-md shadow-sm focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm",
            className
          )}
        />
      </div>
    </div>
  );
}
