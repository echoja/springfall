import { useState, useCallback, useEffect } from "react";

/**
 * 속성 편집 창에서 간접적으로 값을 업데이트 하는 후크 함수.
 * Slate에서 관리하는 값에 의존성을 걸면 한글 자모가 분리되어 입려되는 버그 현상이 발생함.
 * 이를 해결하기 위해 내부 상태값을 두어 간접적으로 업데이트하도록 함.
 */
export default function useEditPropertyInternalValue<T>({
  externalValue,
  onChange,
}: {
  externalValue: T;
  onChange: (value: T) => void;
}) {
  const [internalValue, setInternalValue] = useState(externalValue);

  const onInternalValueChange = useCallback(
    (v: T) => {
      onChange(v);
      setInternalValue(v);
    },
    [onChange]
  );

  useEffect(() => {
    setInternalValue(externalValue);
  }, [externalValue]);

  return { internalValue, onInternalValueChange };
}
