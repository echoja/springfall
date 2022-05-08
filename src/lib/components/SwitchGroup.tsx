import { Switch } from "@headlessui/react";
import type { ReactNode } from "react";
import { memo } from "react";
import { twMerge } from "tailwind-merge";

interface ISwitchGroupProps {
  checked: boolean;
  onChange: (checked: boolean) => void;
  title?: ReactNode;
  description?: ReactNode;
}

const SwitchGroup: React.FC<ISwitchGroupProps> = ({
  checked,
  onChange,
  description = "",
  title = "",
}) => {
  return (
    <Switch.Group
      as="div"
      className="flex items-center justify-between font-sans"
    >
      {(title || description) && (
        <span className="flex-grow flex flex-col">
          {title && (
            <Switch.Label
              as="span"
              className="text-sm font-medium text-gray-900"
              passive
            >
              {title}
            </Switch.Label>
          )}
          {description && (
            <Switch.Description as="span" className="text-sm text-gray-500">
              Nulla amet tempus sit accumsan. Aliquet turpis sed sit lacinia.
            </Switch.Description>
          )}
        </span>
      )}
      <Switch
        checked={checked}
        onChange={onChange}
        className={twMerge(
          checked ? "bg-brand-600" : "bg-gray-200",
          "relative inline-flex flex-shrink-0 h-6 w-11 border-2 border-transparent rounded-full cursor-pointer transition-colors ease-in-out duration-200 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-brand-500"
        )}
      >
        <span
          aria-hidden="true"
          className={twMerge(
            checked ? "translate-x-5" : "translate-x-0",
            "pointer-events-none inline-block h-5 w-5 rounded-full bg-white shadow transform ring-0 transition ease-in-out duration-200"
          )}
        />
      </Switch>
    </Switch.Group>
  );
};

export default memo(SwitchGroup);
