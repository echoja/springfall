import { item as NodejsStream } from "@app/article/2021-12/node-js-stream/metadata";
import { item as Company } from "@app/article/2022-09/company/metadata";
import { item as HelloSadness } from "@app/article/2022-10/hello-sadness/metadata";
import { item as JavascriptSmoothAnimation } from "@app/article/2022-10/javascript-smooth-animation/metadata";
import { item as EasyPromiseAsyncAwait } from "@app/article/2022-11/easy-promise-async-await/metadata";
import { item as Everything } from "@app/article/2022-11/everything/metadata";
import { item as IMeMomMom } from "@app/article/2022-11/i-me-mom-mom/metadata";
import { item as KNOUTips } from "@app/article/2023-02/knou-tips/metadata";
import { item as PussInBoots } from "@app/article/2023-02/puss-in-boots/metadata";
import { item as DrawIOAutoLayout } from "@app/article/2023-03/draw-io-auto-layout/metadata";
import { item as CompanyContest } from "@app/article/2023-06/company-contest/metadata";
import { item as WhyWriting } from "@app/article/2023-06/why-writing/metadata";
import { item as HumanLife } from "@app/article/2023-07/human-life/metadata";
import { item as TSDataStructure } from "@app/article/2023-07/ts-data-structure/metadata";
import { item as WhyEslint } from "@app/article/2023-07/why-eslint/metadata";
import { item as WhyNeedNarrowing } from "@app/article/2023-07/why-need-narrowing/metadata";
import { item as FlutterAsAFrontEndDeveloper1 } from "@app/article/2023-08/adopting-flutter-as-a-front-end-developer-1/metadata";
import { item as GoLangAsAFrontEndDeveloper1 } from "@app/article/2023-08/adopting-golang-as-a-front-end-developer-1/metadata";
import { item as SelfThinkingPreface } from "@app/article/2023-08/self-thinking-preface/metadata";
import { item as Belief } from "@app/article/2023-09/belief/metadata";
import { item as GraphQLCodegen } from "@app/article/2023-09/graphql-codegen/metadata";
import { item as Moderation } from "@app/article/2023-09/moderation/metadata";
import { item as NoFuncRecord } from "@app/article/2023-09/no-func-record/metadata";
import { item as Prag } from "@app/article/2023-09/the-pragmatic-programmer/metadata";
import { item as Dogdrip } from "@app/article/2023-10/dogdrip/metadata";
import { item as Glassmorphism } from "@app/article/2023-10/glassmorphism/metadata";
import { item as Time } from "@app/article/2024-01/time/metadata";
import { item as AsyncMutex } from "@app/article/2024-02/async-mutex/metadata";
import { item as Hof } from "@app/article/2024-02/hof/metadata";
import { item as Prisma } from "@app/article/2024-02/prisma/metadata";
import { item as Tsup } from "@app/article/2024-02/tsup/metadata";
import { item as Unbearable } from "@app/article/2024-02/unbearable/metadata";
import { item as PageviewCounter } from "@app/article/2024-03/pageview-counter/metadata";
import { item as Family } from "@app/article/2024-09/family/metadata";
import { item as Letter } from "@app/article/2024-09/letter/metadata";
import { item as FarmingPaper } from "@app/article/2024-10/farming-paper/metadata";
import dayjs from "dayjs";
import type { ArticleItem } from "./types";

const items: ArticleItem[] = [
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
  Dogdrip,
  Glassmorphism,
  Time,
  Hof,
  Prisma,
  Tsup,
  AsyncMutex,
  Unbearable,
  PageviewCounter,
  Letter,
  Family,
  FarmingPaper,
];

items.sort((a, b) => dayjs(b.createdAt).diff(a.createdAt));

export default items;
