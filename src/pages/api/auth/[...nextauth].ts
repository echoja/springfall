// pages/api/auth/[...nextauth].ts

import prisma from "@lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID,
      clientSecret: process.env.GITHUB_SECRET,
    }),
  ],
  callbacks: {
    signIn: async ({ profile }) => {
      const users = await prisma.user.findMany();
      if (users.length > 1) {
        throw new Error("Multiple users found");
      }

      if (users[0]?.email && users[0]?.email !== profile.email) {
        throw new Error("user is not admin");
      }

      return true;
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: process.env.NEXTAUTH_SESSION_SECRET,
});
