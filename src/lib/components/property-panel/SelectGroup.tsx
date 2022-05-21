import useConst from "@lib/hooks/use-const";
import { nanoid } from "nanoid";
import type { ChangeEvent } from "react";
import { memo, useCallback, useMemo } from "react";
import { twMerge } from "tailwind-merge";

function SelectGroup<T extends string>({
  onChange,
  options,
  value,
  title,
  className,
  id,
}: {
  value: T;
  title: string;
  options: ReadonlyArray<{ label: string; value: T }>;
  onChange: (value: T) => void;
  className?: string;
  id?: string;
}) {
  const fixedId = useConst(id ?? nanoid());

  const optionsDom = useMemo(
    () =>
      options.map(({ label: optionLabel, value: optionValue }) => (
        <option key={optionValue} value={optionValue}>
          {optionLabel}
        </option>
      )),
    [options]
  );

  const onSelectChange = useCallback(
    (e: ChangeEvent<HTMLSelectElement>) => {
      onChange(e.target.value as T);
    },
    [onChange]
  );

  return (
    <div className={twMerge("flex items-center gab-3", className)}>
      <label
        htmlFor={fixedId}
        className="block text-sm font-medium font-sans text-gray-700 w-20"
      >
        {title}
      </label>
      <select
        id={fixedId}
        name={fixedId}
        value={value}
        className="block w-full pl-3 pr-10 py-1 font-sans text-sm border-gray-300 focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm rounded-md"
        onChange={onSelectChange}
      >
        {optionsDom}
      </select>
    </div>
  );
}

// 제네릭 타이핑을 유지하기 위해 `as typeof SelectGroup` 를 추가합니다. 추가하지 않으면 string 으로 고정됩니다.
export default memo(SelectGroup) as typeof SelectGroup;
