import dayjs from "dayjs";

import { item as PussInBoots } from "@app/article/2023-02/puss-in-boots/doc.mdx";
import { item as CompanyContest } from "@app/article/2023-06/company-contest/doc.mdx";

const items = [PussInBoots, CompanyContest];

items.sort((a, b) => dayjs(b.createdAt).diff(a.createdAt));

export default items;
