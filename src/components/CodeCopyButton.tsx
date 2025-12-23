"use client";

import { Check, Copy } from "lucide-react";
import { useState } from "react";

export function CodeCopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  return (
    <button
      className="absolute top-1 right-1 block cursor-pointer rounded-sm bg-[rgba(46,52,64,0.5)] p-1 text-zinc-200 hover:bg-gray-400/20"
      aria-label="Copy to clipboard"
      onClick={() => {
        navigator.clipboard.writeText(text);
        setCopied(true);
        setTimeout(() => setCopied(false), 1200);
      }}
    >
      {copied ? <Check size={16} /> : <Copy size={16} />}
    </button>
  );
}
