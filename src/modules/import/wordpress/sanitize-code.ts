export default function sanitizeCode(html: string) {
  return html.replace(
    /(<code>)((.|\n)+?)(<\/code>)/g,
    (_match, p1, p2, _p3, p4) => {
      return p1 + p2.replace(/</g, "&lt;").replace(/>/g, "&gt;") + p4;
    }
  );
}
