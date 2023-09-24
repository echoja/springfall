import dayjs from "dayjs";

import { item as NodejsStream } from "@app/article/2021-12/node-js-stream/page.mdx";
import { item as Company } from "@app/article/2022-09/company/page.mdx";
import { item as HelloSadness } from "@app/article/2022-10/hello-sadness/page.mdx";
import { item as JavascriptSmoothAnimation } from "@app/article/2022-10/javascript-smooth-animation/page.mdx";
import { item as EasyPromiseAsyncAwait } from "@app/article/2022-11/easy-promise-async-await/page.mdx";
import { item as Everything } from "@app/article/2022-11/everything/page.mdx";
import { item as IMeMomMom } from "@app/article/2022-11/i-me-mom-mom/page.mdx";
import { item as KNOUTips } from "@app/article/2023-02/knou-tips/page.mdx";
import { item as PussInBoots } from "@app/article/2023-02/puss-in-boots/page.mdx";
import { item as DrawIOAutoLayout } from "@app/article/2023-03/draw-io-auto-layout/page.mdx";
import { item as CompanyContest } from "@app/article/2023-06/company-contest/page.mdx";
import { item as WhyWriting } from "@app/article/2023-06/why-writing/page.mdx";
import { item as HumanLife } from "@app/article/2023-07/human-life/page.mdx";
import { item as TSDataStructure } from "@app/article/2023-07/ts-data-structure/page.mdx";
import { item as WhyEslint } from "@app/article/2023-07/why-eslint/page.mdx";
import { item as WhyNeedNarrowing } from "@app/article/2023-07/why-need-narrowing/page.mdx";
import { item as FlutterAsAFrontEndDeveloper1 } from "@app/article/2023-08/adopting-flutter-as-a-front-end-developer-1/page.mdx";
import { item as GoLangAsAFrontEndDeveloper1 } from "@app/article/2023-08/adopting-golang-as-a-front-end-developer-1/page.mdx";
import { item as SelfThinkingPreface } from "@app/article/2023-08/self-thinking-preface/page.mdx";
import { item as Belief } from "@app/article/2023-09/belief/page.mdx";
import { item as GraphQLCodegen } from "@app/article/2023-09/graphql-codegen/page.mdx";
import { item as Moderation } from "@app/article/2023-09/moderation/page.mdx";
import { item as NoFuncRecord } from "@app/article/2023-09/no-func-record/page.mdx";
import { item as Prag } from "@app/article/2023-09/the-pragmatic-programmer/page.mdx";

const items = [
  PussInBoots,
  CompanyContest,
  WhyWriting,
  NodejsStream,
  DrawIOAutoLayout,
  KNOUTips,
  IMeMomMom,
  EasyPromiseAsyncAwait,
  Everything,
  JavascriptSmoothAnimation,
  HelloSadness,
  HumanLife,
  Company,
  TSDataStructure,
  WhyNeedNarrowing,
  WhyEslint,
  SelfThinkingPreface,
  FlutterAsAFrontEndDeveloper1,
  GoLangAsAFrontEndDeveloper1,
  Moderation,
  Prag,
  NoFuncRecord,
  Belief,
  GraphQLCodegen,
];

items.sort((a, b) => dayjs(b.createdAt).diff(a.createdAt));

export default items;
