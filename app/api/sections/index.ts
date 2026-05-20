/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getServerSession } from "next-auth";

import { api, SectionEditor } from "@/constants/config";
import { request } from "@/utils/request";

import { authOptions } from "../auth/[...nextauth]/options";
import { fetchData } from "../call-methods";

export type GetReviewerType = {
  id: string;
  userId: string;
  expertiseArea: string;
  sectionId: string;
  user: {
    id: string;
    email: string;
    firstName: string;
    lastName: string;
  };
};

export const getSection = async () => fetchData(api.getSection);

export const getReviewer = async (): Promise<GetReviewerType[]> => {
  const session = await getServerSession(authOptions);

  const response = request("GET", `${SectionEditor.getAllReviewer}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
  });

  return response as Promise<GetReviewerType[]>;
};

export const createSection = async (name: string) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${api.createSection}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: { name },
  });

  return response;
};

export const editSection = async (id: string, name: any) => {
  const session = await getServerSession(authOptions);

  return request("PATCH", `${api.editSection}/${id}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: { name },
  });
};
