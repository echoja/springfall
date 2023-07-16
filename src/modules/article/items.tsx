import dayjs from "dayjs";

import { item as NodejsStream } from "@app/article/2021-12/node-js-stream/page.mdx";
import { item as Company } from "@app/article/2022-09/company/page.mdx";
import { item as EasyPromiseAsyncAwait } from "@app/article/2022-11/easy-promise-async-await/page.mdx";
import { item as Everything } from "@app/article/2022-11/everything/page.mdx";
import { item as IMeMomMom } from "@app/article/2022-11/i-me-mom-mom/page.mdx";
import { item as KNOUTips } from "@app/article/2023-02/knou-tips/page.mdx";
import { item as PussInBoots } from "@app/article/2023-02/puss-in-boots/page.mdx";
import { item as DrawIOAutoLayout } from "@app/article/2023-03/draw-io-auto-layout/page.mdx";
import { item as CompanyContest } from "@app/article/2023-06/company-contest/page.mdx";
import { item as WhyWriting } from "@app/article/2023-06/why-writing/page.mdx";

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
  Company,
];

items.sort((a, b) => dayjs(b.createdAt).diff(a.createdAt));

export default items;
