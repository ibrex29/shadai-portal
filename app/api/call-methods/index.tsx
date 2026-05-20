/* eslint-disable @typescript-eslint/no-explicit-any */
/* eslint-disable @typescript-eslint/no-unused-vars */
"use server";

import { getServerSession } from "next-auth";

import { Method, request, getJournalSubdomain } from "@/utils/request";

import { authOptions } from "../auth/[...nextauth]/options";

export const getBearerHeader = async () => {
  const session = await getServerSession(authOptions);
  return {
    headers: {
      // 'Content-Type': 'application/json',
      Authorization: `Bearer ${session?.token}`,
      "x-journal-subdomain": getJournalSubdomain(),
    },
  };
};

export const fetchData = async (endpoint: string): Promise<any[]> => {
  try {
    const res = await fetch(endpoint, await getBearerHeader());
    return res.json();
  } catch (err) {
    return [];
  }
};

export const postData = async (
  method: Method,
  endpoint: string,
  payload: any,
) => {
  const res = await request(method, endpoint, {
    ...(await getBearerHeader()).headers,
    data: payload,
  });

  return res;
};
