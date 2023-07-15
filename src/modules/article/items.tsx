import dayjs from "dayjs";

import { item as NodejsStream } from "@app/article/2021-12/node-js-stream/page.mdx";
import { item as PussInBoots } from "@app/article/2023-02/puss-in-boots/page.mdx";
import { item as CompanyContest } from "@app/article/2023-06/company-contest/page.mdx";
import { item as WhyWriting } from "@app/article/2023-06/why-writing/page.mdx";

const items = [PussInBoots, CompanyContest, WhyWriting, NodejsStream];

items.sort((a, b) => dayjs(b.createdAt).diff(a.createdAt));

export default items;
