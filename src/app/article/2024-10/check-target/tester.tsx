"use client";

import { Trash2 } from "lucide-react";
import { useState } from "react";
import { twMerge } from "tailwind-merge";
import {
  checkTarget,
  type IAgeTarget,
  type IGenderTarget,
  type IRootTarget,
} from "./basic";

const ageList: { value: IAgeTarget["operator"]; label: string }[] = [
  { value: "<", label: "미만" },
  { value: "<=", label: "이하" },
  { value: ">", label: "초과" },
  { value: ">=", label: "이상" },
];

const AgeOperatorSelect: React.FC<{
  value: IAgeTarget["operator"];
  onChange: (value: IAgeTarget["operator"]) => void;
}> = ({ value, onChange }) => {
  return (
    <select
      className="w-24 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
      value={value}
      onChange={(e) => onChange(e.target.value as IAgeTarget["operator"])}
      aria-label="나이 연산자"
    >
      {ageList.map((item) => (
        <option key={item.value} value={item.value}>
          {item.label}
        </option>
      ))}
    </select>
  );
};

const GenderSelect: React.FC<{
  value: "male" | "female" | "";
  onChange: (value: "male" | "female" | "") => void;
}> = ({ value, onChange }) => {
  return (
    <select
      className="w-24 rounded-md border border-gray-300 bg-white px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
      onChange={(e) => onChange(e.target.value as "male" | "female" | "")}
      value={value}
      aria-label="성별"
    >
      <option value="">선택</option>
      <option value="male">남성</option>
      <option value="female">여성</option>
    </select>
  );
};

export const Tester: React.FC = () => {
  const [targets, setTargets] = useState<(IAgeTarget | IGenderTarget)[]>([
    {
      type: "age",
      operator: ">=",
      value: 20,
    },
    {
      type: "age",
      operator: "<",
      value: 30,
    },
    {
      type: "gender",
      value: "female",
    },
  ]);
  const [user, setUser] = useState<{
    age?: number;
    gender?: "male" | "female";
  }>({
    age: 25,
    gender: "male",
  });

  const root: IRootTarget = {
    type: "root",
    child: {
      type: "group",
      operator: "and",
      children: targets,
    },
  };

  const result = checkTarget(root, { user });

  return (
    <div className="space-y-4">
      <div className="rounded-large border border-transparent shadow-small dark:border-gray-600">
        <div className="flex items-center justify-between gap-4 px-4 pt-4">
          <h3 className="font-medium">립스틱 배너 조건 설정 (AND)</h3>
          <div className="flex gap-2">
            <button
              type="button"
              className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
              onClick={() => {
                const newTargets = [...targets];
                newTargets.push({ type: "age", operator: ">=", value: 20 });
                setTargets(newTargets);
              }}
            >
              나이 조건 추가
            </button>

            <button
              type="button"
              className="rounded-md border border-gray-300 px-3 py-1 text-sm hover:bg-gray-50 dark:border-gray-600 dark:hover:bg-gray-800"
              onClick={() => {
                const newTargets = [...targets];
                newTargets.push({ type: "gender", value: "female" });
                setTargets(newTargets);
              }}
            >
              성별 조건 추가
            </button>
          </div>
        </div>
        <hr className="mt-4" />

        <div className="overflow-x-auto">
          <table className="w-full border-separate border-spacing-0">
            <thead className="sr-only">
              <tr>
                <th>설정</th>
                <th> </th>
              </tr>
            </thead>
            <tbody>
              {targets.map((target, index) => {
                return (
                  <tr
                    key={index}
                    className="border-b border-gray-200 last:border-b-0 dark:border-gray-700"
                  >
                    <td className="px-4 py-3 align-top">
                      {target.type === "age" ? (
                        <div className="flex flex-wrap items-center gap-2">
                          나이가{" "}
                          <input
                            aria-label="나이"
                            type="number"
                            className="w-24 rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
                            value={String(target.value)}
                          onChange={(e) => {
                            const newTargets = [...targets];
                            const nextValue = Number(e.target.value);
                            if (Number.isNaN(nextValue)) {
                              return;
                            }
                            newTargets[index] = {
                              ...target,
                              value: nextValue,
                            };
                            setTargets(newTargets);
                          }}
                        />
                          세{" "}
                          <AgeOperatorSelect
                            value={target.operator}
                            onChange={(value) => {
                              const newTargets = [...targets];
                              newTargets[index] = { ...target, operator: value };
                              setTargets(newTargets);
                            }}
                          />{" "}
                          라면 노출
                        </div>
                      ) : target.type === "gender" ? (
                        <div className="flex flex-wrap items-center gap-2">
                          성별이{" "}
                          <GenderSelect
                            value={target.value}
                            onChange={(value) => {
                              if (value === "") {
                                return;
                              }
                              const newTargets = [...targets];
                              newTargets[index] = { ...target, value };
                              setTargets(newTargets);
                            }}
                          />{" "}
                          라면 노출
                        </div>
                      ) : (
                        <></>
                      )}
                    </td>
                    <td className="w-12 px-4 py-3 align-top">
                      <button
                        type="button"
                        onClick={() => {
                          const newTargets = [...targets];
                          newTargets.splice(index, 1);
                          setTargets(newTargets);
                        }}
                        className="inline-flex h-8 w-8 items-center justify-center rounded-md text-red-500 hover:bg-red-50 dark:text-red-400 dark:hover:bg-gray-800"
                        aria-label="삭제"
                      >
                        <Trash2 aria-hidden size={16} />
                        <span className="sr-only">삭제</span>
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="rounded-large border border-transparent p-4 shadow-small dark:border-gray-600">
          <h3 className="mb-3 font-medium">조건 데이터</h3>
          <pre className="text-xs">{JSON.stringify(root, null, 2)}</pre>
        </div>
        <div>
          <div className="mb-4 rounded-large border border-transparent shadow-small dark:border-gray-600">
            <div className="px-4 pt-4">
              <h3 className="font-medium">방문자</h3>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full border-separate border-spacing-0">
                <thead className="sr-only">
                  <tr>
                    <th>환경 데이터</th>
                    <th> </th>
                  </tr>
                </thead>
                <tbody>
                  <tr className="border-b border-gray-200 last:border-b-0 dark:border-gray-700">
                    <td className="px-4 py-3 align-top">나이</td>
                    <td className="px-4 py-3 align-top">
                      <div className="flex items-center gap-2">
                        <input
                          aria-label="나이"
                          type="number"
                          className="w-24 rounded-md border border-gray-300 px-2 py-1 text-sm dark:border-gray-600 dark:bg-gray-800"
                          value={String(user.age)}
                          onChange={(e) =>
                            setUser((prev) => {
                              const nextValue = Number(e.target.value);
                              if (Number.isNaN(nextValue)) {
                                return prev;
                              }
                              return { ...prev, age: nextValue };
                            })
                          }
                        />
                        세
                      </div>
                    </td>
                  </tr>
                  <tr className="border-b border-gray-200 last:border-b-0 dark:border-gray-700">
                    <td className="px-4 py-3 align-top">성별</td>
                    <td className="px-4 py-3 align-top">
                      <GenderSelect
                        value={user.gender ?? ""}
                        onChange={(value) => {
                          const newUser = { ...user };
                          if (value === "") {
                            delete newUser.gender;
                          } else {
                            newUser.gender = value;
                          }
                          setUser(newUser);
                        }}
                      />
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </div>

          <div className="mb-4 rounded-large border border-transparent p-4 shadow-small dark:border-gray-600">
            <h3 className="mb-2 font-medium">실행</h3>
            <pre className="text-xs whitespace-pre-wrap">{`const result = checkTarget(root, { user });`}</pre>
          </div>

          <div
            className={twMerge(
              "rounded-large border p-4 shadow-small transition",
              result.type === "success"
                ? "border-success-400 dark:border-success-300"
                : result.type === "failure"
                  ? "border-danger-400 dark:border-danger-300"
                  : "border-transparent",
            )}
          >
            <h3 className="mb-2 font-medium">결과</h3>
            <pre className="text-xs whitespace-pre-wrap">
              {JSON.stringify(result)}
            </pre>
          </div>
        </div>
      </div>
    </div>
  );
};
