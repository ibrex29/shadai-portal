// eslint-disable-next-line @typescript-eslint/no-unused-vars
import NextAuth from "next-auth/next";

declare module "next-auth" {
  interface User {
    role: string;
    token: {
      accessToken: string;
      refreshToken: string;
    };
  }

  interface Session {
    user: Partial<User>;
    token: token;
  }
}
