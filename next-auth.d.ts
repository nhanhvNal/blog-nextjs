import { Session } from "next-auth";
import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    access_token?: string;
  }
}
