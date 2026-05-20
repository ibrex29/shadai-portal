"use server";

import { baseUrl } from "@/constants/config";
import { Volume } from "@/types";
import { request } from "@/utils/request";

export const getVolume = async (): Promise<Volume[]> => {
  const response = await request("GET", `${baseUrl}/v1/volumes`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response as Volume[];
};
