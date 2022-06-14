import React from "react";

// https://bugs.chromium.org/p/chromium/issues/detail?id=1249405
// Put this at the start and end of an inline component to work around this Chromium bug:
const InlineChromiumBugfix = () => (
  <span contentEditable={false} className="text-0">
    ${String.fromCodePoint(160) /* Non-breaking space */}
  </span>
);

export default React.memo(InlineChromiumBugfix);
