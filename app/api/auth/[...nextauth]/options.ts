/* eslint-disable @typescript-eslint/no-unused-vars */
/* eslint-disable @typescript-eslint/no-explicit-any */
import type {
  GetServerSidePropsContext,
  NextApiRequest,
  NextApiResponse,
} from "next";
import { AuthOptions } from "next-auth";
import { User } from "next-auth";
import { getServerSession } from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

import { authUrl } from "@/constants/config";
import { rolesMap } from "@/types";
import { request } from "@/utils/request";

const credentialsProviderOptions: any = {
  name: "Login",
  credentials: {
    email: {
      label: "Email Address",
      type: "email",
      placeholder: "john2gmail.com",
    },
    password: { label: "Password", type: "password", placeholder: "Password" },
  },
  authorize: async (credentials: any) => {
    if (credentials?.email === "" || credentials?.password === "") {
      return null;
    }

    const { email, password } = credentials || { email: "example@gmail.com" };
    try {
      const json = await request("POST", `${authUrl}/login/email`, {
        data: { email, password },
      });

      if (!("error" in json)) {
        // return user
        const user: User = {
          id: email,
          email,
          token: {
            accessToken: json.accessToken,
            refreshToken: json.refreshToken,
          },
          role: json.roles.join(","),
        };
        return user;
      }
    } catch (err) {
      return null;
    }

    return null;
  },
};

export const authOptions: AuthOptions = {
  providers: [CredentialsProvider(credentialsProviderOptions)],
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.name = user.email;
        token.access = user.token.accessToken;
        token.role = user.role.toLowerCase();
      }

      return token;
    },
    async session({ session, token }) {
      session.user = {
        email: token.name as string,
        role: token.role as string,
      };
      session.token = token.access;

      return session;
    },
    async signIn({ user }) {
      if (user && user.role) {
        const route = rolesMap[user.role.toLowerCase()];
        if (route) {
          return true;
        }
      }
      return false;
    },
  },
  pages: {
    signIn: "/signin",
    error: "/signin",
  },
};

export function auth(
  ...args:
    | [GetServerSidePropsContext["req"], GetServerSidePropsContext["res"]]
    | [NextApiRequest, NextApiResponse]
    | []
) {
  return getServerSession(...args, authOptions);
}
