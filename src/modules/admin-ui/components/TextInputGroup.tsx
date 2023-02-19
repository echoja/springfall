import { nanoid } from "nanoid";
import type { ChangeEvent } from "react";
import { memo, useCallback } from "react";
import { twMerge } from "tailwind-merge";

import useConst from "@common/hooks/use-const";
import useEditPropertyInternalValue from "@common/hooks/use-edit-property-internal-value";

function TextInputGroup({
  onChange,
  value,
  title,
  id,
  className,
}: {
  value: string;
  title: string;
  onChange: (value: string) => void;
  id?: string;
  className?: string;
}) {
  const fixedId = useConst(id ?? nanoid());

  const { internalValue, onInternalValueChange } = useEditPropertyInternalValue(
    {
      externalValue: value,
      onChange,
    }
  );

  const onInputchange = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => {
      onInternalValueChange(e.target.value);
    },
    [onInternalValueChange]
  );

  return (
    <div className={twMerge("flex items-center gab-3", className)}>
      <label
        htmlFor={fixedId}
        className="block text-sm font-medium font-sans text-gray-700 w-20"
      >
        {title}
      </label>
      <input
        type="text"
        id={fixedId}
        name={fixedId}
        value={internalValue}
        className="block w-full px-3 py-1 font-sans text-sm border-gray-300 focus:outline-none focus:ring-brand-500 focus:border-brand-500 sm:text-sm rounded-md"
        onChange={onInputchange}
      />
    </div>
  );
}

export default memo(TextInputGroup);
