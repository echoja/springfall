// TODO: 테스터 만들기.

// import { useState } from "react";
// import type { IAgeTarget, IGenderTarget, IRootTarget, Target } from "./basic";

// // 20대 여성 조건을 나타내는 데이터
// const target20female: Target = {
//   type: "root",
//   child: {
//     type: "group",
//     operator: "and",
//     children: [
//       {
//         type: "age",
//         operator: ">=",
//         value: 20,
//       },
//       {
//         type: "age",
//         operator: "<",
//         value: 30,
//       },
//       {
//         type: "gender",
//         value: "female",
//       },
//     ],
//   },
// };

// const AgeOperatorSelect: React.FC<{ value: string, onChange: (value: string) => void }> = ({ value, onChange }) => {
//   return <select value={value} onChange={(e) => onChange(e.target.value)}>
//     <option value="<">미만</option>
//     <option value="<=">이하</option>
//     <option value=">">초과</option>
//     <option value=">=">이상</option>
//   </select>;
// }

// const Tester: React.FC = () => {
//   const [targets, setTargets] = useState<(IAgeTarget | IGenderTarget)[]>([
//     {
//       type: "age",
//       operator: ">=",
//       value: 20,
//     },
//     {
//       type: "age",
//       operator: "<",
//       value: 30,
//     },
//     {
//       type: "gender",
//       value: "female",
//     },
//   ]);

//   const root: IRootTarget = {
//     type: "root",
//     child: {
//       type: "group",
//       operator: "and",
//       children: targets,
//     },
//   };

//   return <div>
//     <h3>조건 설정</h3>
//     {targets.map((target, index) => {
//       if (target.type === "age") {
//         return <div key={index}>
//           나이가 <input type="number" value={target.value} onChange={(e) => {
//             const newTargets = [...targets];
//             newTargets[index] = { ...target, value: parseInt(e.target.value) };
//             setTargets(newTargets);
//           }} />세 <AgeOperatorSelect value={target.operator} onChange={(value) => {
//             const newTargets = [...targets];
//             newTargets[index] = { ...target, operator: value };
//             setTargets(newTargets);
//           }} /> 라면
//         </div>;
//       } else {
//         return <div key={index}>
//           성별이 <select value={target.value} onChange={(e) => {
//             const newTargets = [...targets];
//             newTargets[index] = { ...target, value: e.target.value as "female" | "male" };
//             setTargets(newTargets);
//           }
//           }>
//             <option value=""

//   </div>
// };
