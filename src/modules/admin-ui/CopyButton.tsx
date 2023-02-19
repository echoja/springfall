import { memo, useCallback, useState } from "react";

import FaRegularCopy from "@modules/icons/FaRegularCopy";
import FaSolidCheck from "@modules/icons/FaSolidCheck";

interface ICopyButtonProps {
  className?: string;
  timeout?: number;
  getString: () => string;
}

const CopyButton: React.FC<ICopyButtonProps> = ({
  getString,
  className,
  timeout = 2000,
}: ICopyButtonProps) => {
  const [isChecked, setIsChecked] = useState(false);

  const onCopyButtonClick = useCallback(() => {
    navigator.clipboard.writeText(getString());
    if (!isChecked) {
      setIsChecked(true);
      setTimeout(() => {
        setIsChecked(false);
      }, timeout);
    }
  }, [getString, isChecked, timeout]);

  return isChecked ? (
    <button type="button" className={className}>
      <FaSolidCheck className="w-4 h-4" />
    </button>
  ) : (
    <button type="button" onClick={onCopyButtonClick} className={className}>
      <FaRegularCopy className="w-4 h-4" />
    </button>
  );
};

export default memo(CopyButton);
