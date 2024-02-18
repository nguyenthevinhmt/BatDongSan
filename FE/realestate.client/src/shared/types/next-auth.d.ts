import NextAuth from "next-auth";

declare module "next-auth" {
  interface Session {
    user: {
      access_token: string;
      refresh_token: string;
      token_type: string;
      expires_in: number;
    };
  }
}

import { JWT } from "next-auth/jwt";

declare module "next-auth/jwt" {
  interface JWT {
    access_token: string;
    refresh_token: string;
    token_type: string;
    expires_in: number;
  }
}
