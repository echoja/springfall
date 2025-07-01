const a = "a".codePointAt(0)!;
const A = "A".codePointAt(0)!;
const Z = "0".codePointAt(0)!;

/** abc ... yz */
const lowercases = Array.from({ length: 26 }, (_, i) =>
  String.fromCodePoint(a + i),
);

/** ABC ... YZ */
const uppercases = Array.from({ length: 26 }, (_, i) =>
  String.fromCodePoint(A + i),
);

/** 012 ... 89 */
const numbers = Array.from({ length: 10 }, (_, i) =>
  String.fromCodePoint(Z + i),
);

function flattenAndCombine(...charArrs: string[][]): string[] {
  let out = [""];
  for (const arr of charArrs) {
    out = out.flatMap((x) => arr.map((y) => [x, y].join("")));
  }
  return out;
}

const tryLanguages = [
  // aa, ab, ac ... zy, zz
  ...flattenAndCombine(lowercases, lowercases),
  // aaa, aab, aac ... zzy, zzz
  ...flattenAndCombine(lowercases, lowercases, lowercases),
];

const tryRegions = [
  // AA, AB, AC ... ZY, ZZ
  ...flattenAndCombine(uppercases, uppercases),
  // 000, 001, 002 ... 998, 999
  ...flattenAndCombine(numbers, numbers, numbers),
];

const tryScripts = [
  // Aaaa, Aaab, Aaac ... Zzzy, Zzzz
  ...flattenAndCombine(uppercases, lowercases, lowercases, lowercases),
];

const languages = new Set<string>();
const languageNames = new Intl.DisplayNames("ko-KR", { type: "language" });

for (const locale of Intl.NumberFormat.supportedLocalesOf(tryLanguages)) {
  const language = locale.split("-", 1)[0];
  if (language) {
    languages.add(language);
  }
}

const regions = new Set<string>();
const regionNames = new Intl.DisplayNames("ko-KR", { type: "region" });

for (const region of tryRegions) {
  if (regionNames.of(region) !== region) {
    regions.add(region);
  }
}

const scripts = new Set<string>();
const scriptNames = new Intl.DisplayNames("ko-KR", { type: "script" });

for (const script of tryScripts) {
  if (scriptNames.of(script) !== script) {
    scripts.add(script);
  }
}

const currencies = Intl.supportedValuesOf("currency");
const currencyNames = new Intl.DisplayNames("ko-KR", { type: "currency" });

export const configs = {
  currency: Object.fromEntries(
    [...currencies].map((id) => [id, currencyNames.of(id)]),
  ),
  language: Object.fromEntries(
    [...languages].map((id) => [id, languageNames.of(id)]),
  ),
  script: Object.fromEntries(
    [...scripts].map((id) => [id, scriptNames.of(id)]),
  ),
  region: Object.fromEntries(
    [...regions].map((id) => [id, regionNames.of(id)]),
  ),
};

export const ShowAllCurrency: React.FC = () => {
  return (
    <div className="flex flex-col gap-2">
      <h2 className="text-lg font-semibold">All Currencies</h2>
      <ul className="list-disc pl-5">
        {Object.entries(configs.currency).map(([code, name]) => (
          <li key={code}>
            {code} - {name}
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-4">All Languages</h2>
      <ul className="list-disc pl-5">
        {Object.entries(configs.language).map(([code, name]) => (
          <li key={code}>
            {code} - {name}
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-4">All Scripts</h2>
      <ul className="list-disc pl-5">
        {Object.entries(configs.script).map(([code, name]) => (
          <li key={code}>
            {code} - {name}
          </li>
        ))}
      </ul>

      <h2 className="text-lg font-semibold mt-4">All Regions</h2>
      <ul className="list-disc pl-5">
        {Object.entries(configs.region).map(([code, name]) => (
          <li key={code}>
            {code} - {name}
          </li>
        ))}
      </ul>
    </div>
  );
};
