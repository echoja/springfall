import type { Placement } from "@floating-ui/react-dom-interactions";
import {
  useFloating,
  autoUpdate,
  offset,
  flip,
  shift,
  useHover,
  useFocus,
  useDismiss,
  useRole,
  useInteractions,
  FloatingPortal,
  arrow,
} from "@floating-ui/react-dom-interactions";
import { AnimatePresence, motion } from "framer-motion";
import type { HTMLProps, ReactNode } from "react";
import {
  useRef,
  cloneElement,
  forwardRef,
  isValidElement,
  useMemo,
  useState,
} from "react";
import { mergeRefs } from "react-merge-refs";

interface ITooltipProps {
  children: ReactNode;
  content: ReactNode;
  className?: string;
  placement?: "top" | "bottom" | "left" | "right";
}

const getOppositePlacement = (placement: Placement) => {
  switch (placement) {
    case "bottom":
    case "bottom-end":
    case "bottom-start":
      return "top";
    case "top":
    case "top-end":
    case "top-start":
      return "bottom";
    case "left":
    case "left-end":
    case "left-start":
      return "right";
    case "right":
    case "right-end":
    case "right-start":
      return "left";
    default:
      return "bottom";
  }
};

const Tooltip = forwardRef<HTMLElement, HTMLProps<HTMLElement> & ITooltipProps>(
  function Tooltip({ children, ...props }, propRef) {
    const [open, setOpen] = useState(false);

    const arrowRef = useRef<HTMLDivElement | null>(null);

    const {
      x,
      y,
      reference,
      floating,
      strategy,
      context,
      middlewareData,
      placement,
    } = useFloating({
      open,
      onOpenChange: setOpen,
      placement: "top",
      // Make sure the tooltip stays on the screen
      whileElementsMounted: autoUpdate,
      middleware: [
        offset(5),
        flip(),
        shift(),
        arrow({
          element: arrowRef,
        }),
      ],
    });

    // Event listeners to change the open state
    const hover = useHover(context, { restMs: 50 });
    const focus = useFocus(context);
    const dismiss = useDismiss(context);
    // Role props for screen readers
    const role = useRole(context, { role: "tooltip" });

    // Merge all the interactions into prop getters
    const { getReferenceProps, getFloatingProps } = useInteractions([
      hover,
      focus,
      dismiss,
      role,
    ]);

    const anchorRef = useMemo(
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      () => mergeRefs([reference, (children as any).ref]),
      [reference, children]
    );

    const floatingRef = useMemo(
      () => mergeRefs([floating, propRef]),
      [floating, propRef]
    );

    // useEffect(() => {
    //   console.log("middlewareData", middlewareData);
    // }, [middlewareData]);

    return (
      <>
        {isValidElement(children)
          ? cloneElement(
              children,
              getReferenceProps({ ref: anchorRef, ...children.props })
            )
          : null}
        <FloatingPortal>
          <AnimatePresence>
            {open && (
              <motion.div
                className="px-2 py-1 font-sans text-xs text-white bg-gray-800 rounded"
                initial={{ opacity: 0, scale: 0.85 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={
                  // When in "grouped phase", make the transition faster
                  // The open delay becomes 1ms during this phase.
                  open === true
                    ? { duration: 0.08 }
                    : { type: "spring", damping: 20, stiffness: 300 }
                }
                ref={floatingRef}
                style={{
                  position: strategy,
                  zIndex: 10,
                  top: y ?? 0,
                  left: x ?? 0,
                  ...props.style,
                }}
                {...getFloatingProps(props)}
              >
                {props.content}
                <div
                  className="absolute w-2 h-2 rotate-45 bg-gray-800"
                  ref={arrowRef}
                  style={{
                    position: strategy,
                    top: middlewareData.arrow?.y ? middlewareData.arrow.y : "",
                    left: middlewareData.arrow?.x ? middlewareData.arrow.x : "",
                    bottom: "",
                    right: "",
                    [getOppositePlacement(placement)]: -4,
                  }}
                />
              </motion.div>
            )}
          </AnimatePresence>
        </FloatingPortal>
      </>
    );
  }
);

export default Tooltip;
