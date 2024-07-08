import { NextAuthOptions } from "next-auth";
import GitHubProvider from "next-auth/providers/github";
import CredentialProvider from "next-auth/providers/credentials";
import { PrismaAdapter } from "@next-auth/prisma-adapter";
import prisma from "./db";

export const authOptionsCredential: NextAuthOptions = {
  adapter: PrismaAdapter(prisma as any),
  providers: [
    GitHubProvider({
      clientId: process.env.GITHUB_ID ?? "",
      clientSecret: process.env.GITHUB_SECRET ?? "",
    }),

    CredentialProvider({
      name: "credentials",
      credentials: {
        email: { label: "email", type: "text", placeholder: "jp" },
        senha: { label: "password", type: "text", placeholder: "jp" },
      },

      async authorize(credentials, req): Promise<any> {
        const user = { email: "teste@145.com", senha: "123456" };
        return user;
      },
    }),
  ],
  session:{
    strategy:"jwt"
  },
  secret:process.env.SECRET,
  debug: process.env.NODE_ENV === "development",
};
