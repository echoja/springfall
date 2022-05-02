// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

import { isDevelopment } from "./config";

declare global {
  // allow global `var` declarations
  // eslint-disable-next-line vars-on-top, no-var
  var prisma: PrismaClient | undefined;
}

const prisma =
  global.prisma ||
  new PrismaClient({
    log: isDevelopment() ? ["query", "info", "warn", "error"] : undefined,
  });

if (process.env.NODE_ENV !== "production") {
  global.prisma = prisma;
}

export default prisma;
