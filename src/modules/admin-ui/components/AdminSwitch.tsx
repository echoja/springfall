import { Switch } from "@headlessui/react";
import React from "react";
import { useCallback, useMemo, useState } from "react";
import { twMerge } from "tailwind-merge";

interface ISwitchProps {
  checked: boolean;
  onChange: (checked: boolean) => Promise<void>;
  srOnly?: string;
  disabled?: boolean;
}

const AdminSwitch: React.FC<ISwitchProps> = ({
  checked,
  onChange,
  srOnly,
  disabled,
}) => {
  const [visualChecked, setVisualChecked] = useState(checked);

  const inactive = useMemo(() => {
    if (disabled) {
      return true;
    }
    return checked !== visualChecked;
  }, [checked, disabled, visualChecked]);

  const onSwitchChange = useCallback(
    async (checkedChanged: boolean) => {
      setVisualChecked(checkedChanged);
      await onChange(checkedChanged);
    },
    [onChange]
  );

  return (
    <Switch
      checked={visualChecked}
      disabled={inactive}
      onChange={onSwitchChange}
      className={twMerge(
        checked ? "bg-indigo-600" : "bg-gray-200",
        "disabled:opacity-50 disabled:cursor-default relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
      )}
    >
      <span className="sr-only">{srOnly}</span>
      <span
        aria-hidden="true"
        className={twMerge(
          checked ? "translate-x-5" : "translate-x-0",
          "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
        )}
      />
    </Switch>
  );
};

export default AdminSwitch;
