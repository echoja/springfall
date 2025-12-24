"use client";
import { useState } from "react";

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

const configs = {
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

function Option({ id, name }: { id: string; name: string | undefined }) {
  return (
    <option key={id} value={id}>
      {id ? `${id} ${name}` : name}
    </option>
  );
}

function formatArgs(args: unknown[]) {
  return JSON.stringify(args, null, 2).slice(1, -1).trim();
}

type Args = {
  number: string;
  currency: string;
  language: string;
  region: string;
  script: string;
  currencyDisplay?: keyof Intl.NumberFormatOptionsCurrencyDisplayRegistry | "";
};

export function ShowAllCurrency() {
  const [formData, setFormData] = useState<Args>({
    number: "3257000",
    currency: "KRW",
    language: "ko",
    region: "KR",
    script: "",
    currencyDisplay: "",
  });

  const handleChange = (
    e: React.ChangeEvent<HTMLSelectElement | HTMLInputElement>,
  ) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const { number, currency, language, region, script } = formData;

  const locale: Intl.LocalesArgument = [language || "und", script, region]
    .filter(Boolean)
    .join("-");
  const options: Intl.NumberFormatOptions | undefined = currency
    ? {
        style: "currency",
        currency,
        currencyDisplay: formData.currencyDisplay || undefined,
      }
    : undefined;

  const n = parseFloat(number || "0");
  const codeStr = `new Intl.NumberFormat(${formatArgs([locale, options])}).format(${n})`;
  const output = new Intl.NumberFormat(locale, options).format(n);

  return (
    <main>
      <form className="flex flex-col gap-4 rounded border p-4">
        <div className="flex gap-2">
          <button
            type="button"
            className="bg-background hover:bg-background-muted rounded border px-2 py-0.5 font-medium transition"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                number: "3257000",
                currency: "KRW",
                language: "ko",
                region: "KR",
                script: "",
              }))
            }
          >
            KRW 설정
          </button>

          <button
            type="button"
            className="bg-background hover:bg-background-muted rounded border px-2 py-0.5 font-medium transition"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                number: "12345.67",
                currency: "USD",
                language: "en",
                region: "US",
                script: "",
              }))
            }
          >
            USD 설정
          </button>

          <button
            type="button"
            className="bg-background hover:bg-background-muted rounded border px-2 py-0.5 font-medium transition"
            onClick={() =>
              setFormData((prev) => ({
                ...prev,
                number: "12345.67",
                currency: "JPY",
                language: "ja",
                region: "JP",
                script: "",
              }))
            }
          >
            JPY 설정
          </button>
        </div>
        <label>
          <p className="text-foreground-muted m-0">언어 (Language)</p>
          <select
            name="language"
            value={formData.language}
            onChange={handleChange}
            className="rounded border p-1"
          >
            <Option id="" name="--" />
            {Object.entries(configs.language).map(([id, name]) => (
              <Option key={id} id={id} name={name} />
            ))}
          </select>
        </label>

        {/* <label>
          <p className="m-0 text-foreground-muted">문자 체계 (Script)</p>
          <select
            name="script"
            value={formData.script}
            onChange={handleChange}
            className="border rounded p-1"
          >
            <Option id="" name="--" />
            {Object.entries(configs.script).map(([id, name]) => (
              <Option key={id} id={id} name={name} />
            ))}
          </select>
        </label> */}

        <label>
          <p className="text-foreground-muted m-0">지역 (Region)</p>
          <select
            name="region"
            value={formData.region}
            onChange={handleChange}
            className="rounded border p-1"
          >
            <Option id="" name="--" />
            {Object.entries(configs.region).map(([id, name]) => (
              <Option key={id} id={id} name={name} />
            ))}
          </select>
        </label>

        <label>
          <p className="text-foreground-muted m-0">수를 입력하세용</p>
          <p className="not-md:first:xx"></p>
          <input
            type="number"
            name="number"
            className="rounded border border-solid p-1"
            step="0.01"
            value={formData.number}
            onChange={handleChange}
          />
        </label>

        <label>
          Currency{" "}
          <select
            name="currency"
            value={formData.currency}
            onChange={handleChange}
            className="rounded border p-1"
          >
            <Option id="" name="--" />
            {Object.entries(configs.currency).map(([id, name]) => (
              <Option key={id} id={id} name={name} />
            ))}
          </select>
        </label>

        <label>
          Currency Display{" "}
          <select
            name="currencyDisplay"
            value={formData.currencyDisplay || ""}
            onChange={handleChange}
            className="rounded border p-1"
          >
            <Option id="" name="--" />
            {["symbol", "narrowSymbol", "code", "name"].map((id) => (
              <Option key={id} id={id} name="" />
            ))}
          </select>
        </label>
      </form>

      <div className="bg-background-muted my-4 rounded p-2 leading-4">
        <pre className="text-sm leading-4">{codeStr}</pre>
      </div>
      <div className="mb-4 text-2xl font-bold">
        <output>{output}</output>
      </div>
      <div>
        <pre>{JSON.stringify(configs, null, "\t")}</pre>
      </div>
    </main>
  );
}
