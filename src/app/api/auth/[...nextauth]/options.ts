import { Account, Profile } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { userService } from "@/services/api";

/* eslint-disable @typescript-eslint/no-explicit-any */
export const authOptions = {
  providers: [
    Credentials({
      credentials: { email: {}, password: {} },
      async authorize(credentials) {
        if (!credentials) {
          throw new Error("Credentials are required");
        }

        try {
          const { data = [] } = await checkUserIsExistFromApi(credentials);
          const user = data[0];

          if (!user) {
            throw new Error("Invalid email or password");
          }

          return user;
        } catch (error: unknown) {
          if (error instanceof Error) {
            throw new Error(
              error.message || "An error occurred while fetching user data"
            );
          } else {
            throw new Error("An unknown error occurred");
          }
        }
      },
    }),
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID.toString(),
      clientSecret: process.env.GOOGLE_CLIENT_SECRET.toString(),
    }),
  ],
  pages: {
    signIn: "/login",
  },
  callbacks: {
    async jwt({
      token,
      account,
      profile,
    }: {
      token: JWT;
      account?: Account | null;
      profile?: Profile | null;
    }) {
      if (account) {
        token.accessToken = account.access_token;
        token.id = profile?.sub;
      }
      return token;
    },
    async session({ session, token }: { session: any; token: JWT }) {
      session.user.id = token.id;
      session.accessToken = token.accessToken;
      return session;
    },
  },
  secret: process.env.NEXTAUTH_SECRET,
};

const checkUserIsExistFromApi = async (credentials) => {
  return await userService.index({
    email: credentials.email,
    password: credentials.password,
  });
};
