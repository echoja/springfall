"use client";

import {
  Button,
  Input,
  Select,
  SelectItem,
  Table,
  TableBody,
  TableCell,
  TableColumn,
  TableHeader,
  TableRow,
} from "@nextui-org/react";
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
    <Select
      selectedKeys={[value]}
      onChange={(e) => onChange(e.target.value as IAgeTarget["operator"])}
      className="w-24"
      size="sm"
      aria-label="나이 연산자"
    >
      {ageList.map((item) => (
        <SelectItem key={item.value} value={item.value}>
          {item.label}
        </SelectItem>
      ))}
    </Select>
  );
};

const GenderSelect: React.FC<{
  value: "male" | "female" | "";
  onChange: (value: "male" | "female" | "") => void;
}> = ({ value, onChange }) => {
  return (
    <Select
      size="sm"
      onChange={(e) => onChange(e.target.value as "male" | "female" | "")}
      className="w-24"
      selectedKeys={[value]}
      aria-label="성별"
    >
      <SelectItem key="" value="">
        선택
      </SelectItem>
      <SelectItem key="male" value="male">
        남성
      </SelectItem>
      <SelectItem key="female" value="female">
        여성
      </SelectItem>
    </Select>
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
    <div>
      <Table
        className="mb-3"
        aria-label="조건 설정"
        hideHeader
        topContent={
          <div>
            <div className="flex items-center justify-between">
              <h3 className="font-medium">조건 설정 (AND)</h3>
              <div className="flex gap-2">
                <Button
                  variant="bordered"
                  onClick={() => {
                    const newTargets = [...targets];
                    newTargets.push({ type: "age", operator: ">=", value: 20 });
                    setTargets(newTargets);
                  }}
                >
                  나이 조건 추가
                </Button>

                <Button
                  variant="bordered"
                  onClick={() => {
                    const newTargets = [...targets];
                    newTargets.push({ type: "gender", value: "female" });
                    setTargets(newTargets);
                  }}
                >
                  성별 조건 추가
                </Button>
              </div>
            </div>
            <hr className="mt-6" />
          </div>
        }
      >
        <TableHeader>
          <TableColumn>설정</TableColumn>
          <TableColumn> </TableColumn>
        </TableHeader>
        <TableBody>
          {targets.map((target, index) => {
            return (
              <TableRow key={index}>
                <TableCell>
                  {target.type === "age" ? (
                    <div className="flex items-center gap-2">
                      나이가{" "}
                      <Input
                        aria-label="나이"
                        type="number"
                        size="sm"
                        className="w-24"
                        value={String(target.value)}
                        onChange={(e) => {
                          const newTargets = [...targets];
                          newTargets[index] = {
                            ...target,
                            value: parseInt(e.target.value),
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
                    <div className="flex items-center gap-2">
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
                </TableCell>
                <TableCell>
                  <Button
                    onClick={() => {
                      const newTargets = [...targets];
                      newTargets.splice(index, 1);
                      setTargets(newTargets);
                    }}
                    isIconOnly
                    variant="light"
                    color="danger"
                    size="sm"
                  >
                    <Trash2 aria-hidden size={16} />
                    <span className="sr-only">삭제</span>
                  </Button>
                </TableCell>
              </TableRow>
            );
          })}
        </TableBody>
      </Table>
      <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
        <div className="p-4 rounded-large shadow-small">
          <h3 className="mb-3 font-medium">조건 데이터</h3>
          <pre className="text-xs">{JSON.stringify(root, null, 2)}</pre>
        </div>
        <div>
          <Table
            hideHeader
            topContent={<h3 className="font-medium">방문자</h3>}
            className="mb-4"
            aria-label="방문자"
          >
            <TableHeader>
              <TableColumn>환경 데이터</TableColumn>
              <TableColumn> </TableColumn>
            </TableHeader>
            <TableBody>
              <TableRow>
                <TableCell>나이</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <Input
                      aria-label="나이"
                      size="sm"
                      type="number"
                      className="w-24"
                      value={String(user.age)}
                      onChange={(e) =>
                        setUser({ ...user, age: parseInt(e.target.value) })
                      }
                    />
                    세
                  </div>
                </TableCell>
              </TableRow>
              <TableRow>
                <TableCell>성별</TableCell>
                <TableCell>
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
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>

          <div className="p-4 mb-4 rounded-large shadow-small">
            <h3 className="mb-2 font-medium">실행</h3>
            <pre className="text-xs whitespace-pre-wrap">{`const result = checkTarget(root, { user });`}</pre>
          </div>

          <div
            className={twMerge(
              "p-4 border rounded-large shadow-small transition",
              result.type === "success"
                ? "border-success-400"
                : result.type === "failure"
                  ? "border-danger-400"
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
