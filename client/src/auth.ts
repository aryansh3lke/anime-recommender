import NextAuth from "next-auth";
import Google from "next-auth/providers/google";
import GitHub from "next-auth/providers/github";
import type { JWT } from "next-auth/jwt";

import { PrismaAdapter } from "@auth/prisma-adapter";
import { prisma } from "@/lib/prisma";

// Define provider types
interface Provider {
  id: string;
  name: string;
}

// Create and export the provider map
export const providerMap: Record<string, Provider> = {
  google: {
    id: "google",
    name: "Google",
  },
  github: {
    id: "github",
    name: "GitHub",
  },
};

export const { handlers, signIn, signOut, auth } = NextAuth({
  adapter: PrismaAdapter(prisma),
  providers: [Google, GitHub],
  session: { strategy: "jwt" },
  secret: process.env.NEXTAUTH_SECRET,
  pages: {
    signIn: "/signin",
    error: "/signin-error",
  },
  callbacks: {
    async session({ session, token }) {
      if (session.user) {
        session.user.id = token.id as string;
      }
      return session;
    },
    async jwt({ token, user }) {
      // If this is the initial sign in
      if (user) {
        token.id = user.id as string;
      }
      return token;
    },
  },
});
