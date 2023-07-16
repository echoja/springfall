import { twMerge } from "tailwind-merge";
import style from "./style.module.css";

export default function IFrame(
  props: React.IframeHTMLAttributes<HTMLIFrameElement>,
) {
  return (
    <div className={style["iframe-wrapper"]}>
      <iframe
        {...props}
        className={twMerge("mx-auto shadow-xl", props.className)}
      />
    </div>
  );
}
