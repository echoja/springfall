// pages/api/auth/[...nextauth].ts

import { getGithubCredentials, getNextauthSecret } from "@common/config";
import prisma from "@lib/prisma";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import NextAuth from "next-auth";
import GitHubProvider from "next-auth/providers/github";

export default NextAuth({
  providers: [GitHubProvider(getGithubCredentials())],

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

    async session({ session, user }) {
      return {
        ...session,
        user: { ...session.user, id: parseInt(user.id, 10) },
      };
    },
  },
  adapter: PrismaAdapter(prisma),
  secret: getNextauthSecret(),
});
