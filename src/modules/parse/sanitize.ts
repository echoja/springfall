import htmlTags from "html-tags";

export function sanitizeCode(html: string) {
  return html.replace(
    /(<code.*?>)((.|\n)+?)(<\/code>)/g,
    (_match, p1, p2, _p3, p4) => {
      return p1 + p2.replace(/</g, "&lt;").replace(/>/g, "&gt;") + p4;
    }
  );
}

// const tagNames = TAG_NAMES;

const tagsSet = new Set<string>();

htmlTags.forEach((tag) => tagsSet.add(tag));

// sanitize html unsupported tags
export function sanitizeUnsupported(html: string): string {
  return html.replace(/(<)\/?([^\s"]+?)(>)/g, (match, _p1, p2, _p3) => {
    if (tagsSet.has(p2)) {
      return match;
    }
    return `&lt;${p2}&gt;`;
  });
}

export default function sanitize(html: string) {
  let result = html;
  [sanitizeCode, sanitizeUnsupported].forEach((fn) => {
    result = fn(result);
  });
  return result;
}
