import { Account, Profile } from "next-auth";
import { JWT } from "next-auth/jwt";
import Credentials from "next-auth/providers/credentials";
import GoogleProvider from "next-auth/providers/google";

import { userService } from "@/services/api";
import { UserModel } from "@/types/user.model";

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
          const { data: users } = (await fetchUserFromApi()) as any;

          const user = users.find(
            (u: UserModel) =>
              u.email === credentials.email &&
              u.password === credentials.password
          );

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
      clientId:
        process.env.GOOGLE_CLIENT_ID ??
        "701083779640-23mhl9883d5r2ltq9jo3jhq497jir49d.apps.googleusercontent.com",
      clientSecret:
        process.env.GOOGLE_CLIENT_SECRET ??
        "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",
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
};

const fetchUserFromApi = async () => {
  return userService.index();
};
