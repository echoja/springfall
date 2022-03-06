// lib/prisma.ts
import { PrismaClient } from "@prisma/client";

import { isDevelopment } from "./config";

const prisma: PrismaClient = new PrismaClient({
  log: isDevelopment() ? ["query", "info", "warn", "error"] : undefined,
});

export default prisma;
