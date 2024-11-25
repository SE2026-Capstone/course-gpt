import { NextAuthOptions, Session } from "next-auth";
import { JWT } from "next-auth/jwt";
import NextAuth from "next-auth/next";
import GoogleProvider from "next-auth/providers/google";

interface SessionWithToken extends Session {
  token: JWT
}

export const authOptions: NextAuthOptions = {
  secret: process.env.AUTH_SECRET!,
  providers: [
    GoogleProvider({
      clientId: process.env.AUTH_GOOGLE_ID!,
      clientSecret: process.env.AUTH_GOOGLE_SECRET!
    })
  ],
  callbacks: {
    async jwt({token}) {
      return token;
    },
    async session({session, token}) {
      const modifiedSession: SessionWithToken = {
        ...session,
        token: token
      }
      return modifiedSession
    },
  },
}

export default NextAuth(authOptions)