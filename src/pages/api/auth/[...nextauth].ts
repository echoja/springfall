// pages/api/auth/[...nextauth].ts

import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

import prisma from "../../../lib/prisma";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SESSION_SECRET,
  callbacks: {
    async signIn(params) {
      // eslint-disable-next-line no-console
      console.log(params);
      return true;
    },
  },
});
