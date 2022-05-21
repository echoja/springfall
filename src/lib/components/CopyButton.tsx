import { faCopy } from "@fortawesome/pro-regular-svg-icons";
import { faCheck } from "@fortawesome/pro-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { memo, useCallback, useState } from "react";

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
      <FontAwesomeIcon icon={faCheck} />
    </button>
  ) : (
    <button type="button" onClick={onCopyButtonClick} className={className}>
      <FontAwesomeIcon icon={faCopy} />
    </button>
  );
};

export default memo(CopyButton);
