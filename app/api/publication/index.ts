"use server";

import { getServerSession } from "next-auth";

import { publication } from "@/constants/config";
import { PublishedManuscriptResponse } from "@/types";
import { SortOrder } from "@/types/enum";
import { request, getJournalSubdomain } from "@/utils/request";

import { authOptions } from "../auth/[...nextauth]/options";

export type FetchPublicationsParams = {
  sortOrder?: SortOrder;
  page?: number;
  limit?: number;
  search?: string;
  issueId?: string;
  volumeId?: string;
  isActive?: boolean;
};

export type UpdatePublicationPayload = Partial<{
  title: string;
  abstract: string;
  keywords: string;
  authors: string[];
  doi: string;
  pageRange: string;
  formattedManuscript: string;
  issueId: string;
  isActive: boolean;
}>;

export const getPublications = async (
  params: FetchPublicationsParams = {},
): Promise<PublishedManuscriptResponse> => {
  const session = await getServerSession(authOptions);

  const {
    sortOrder = SortOrder.Asc,
    page = 1,
    limit = 10,
    search,
    issueId,
    volumeId,
    isActive,
  } = params;

  const queryParams = new URLSearchParams({
    sortOrder,
    page: page.toString(),
    limit: limit.toString(),
    ...(search ? { search } : {}),
    ...(issueId ? { issueId } : {}),
    ...(volumeId ? { volumeId } : {}),
    ...(typeof isActive === "boolean" ? { isActive: isActive.toString() } : {}),
  });

  const response = await fetch(
    `${publication.publishedManuscripts}?${queryParams.toString()}`,
    {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Accept: "*/*",
        Authorization: `Bearer ${session?.token}`,
        "x-journal-subdomain": getJournalSubdomain(),
      },
    },
  );

  if (!response.ok) {
    throw new Error(`Failed to fetch publications: ${response.statusText}`);
  }

  return (await response.json()) as PublishedManuscriptResponse;
};

export const updatePublication = async (
  id: string,
  payload: UpdatePublicationPayload,
) => {
  const session = await getServerSession(authOptions);

  return request("PATCH", publication.update(id), {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};
