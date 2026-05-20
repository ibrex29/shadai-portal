"use server";

import { baseUrl } from "@/constants/config";
import {
  GetManuscriptByIdResponse,
  Issue,
  Manuscript,
  PublishedManuscriptResponse,
} from "@/types";
import { SortOrder } from "@/types/enum";
import { request } from "@/utils/request";

export interface GlobalSearchResponse {
  data: Manuscript[];
}

export const getPublishedManuscript = async (
  sortOrder: SortOrder = SortOrder.Asc,
  page: number = 1,
  limit: number = 10,
  search?: string,
  issueId?: string,
  volumeId?: string,
  isActive?: boolean,
  status?: string,
  jobTitle?: string,
): Promise<PublishedManuscriptResponse> => {
  const response = request(
    "GET",
    `${baseUrl}/v1/publication/published-manuscript`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        sortOrder,
        page,
        limit,
        search,
        issueId,
        volumeId,
        isActive,
        status,
        jobTitle,
      },
    },
  );
  return response as Promise<PublishedManuscriptResponse>;
};

export const getPublishedManuscriptById = async (id: string) => {
  const response = request("GET", `${baseUrl}/v1/publication/${id}`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response as Promise<GetManuscriptByIdResponse>;
};

export const updateDownloadCount = async (id: string) => {
  const response = request("POST", `${baseUrl}/v1/publication/${id}/download`, {
    headers: {
      "Content-Type": "application/json",
    },
  });
  return response;
};

export const getRecentManuscriptById = async (limit: string) => {
  const response = request(
    "GET",
    `${baseUrl}/v1/publication/latest-publication`,
    {
      headers: {
        "Content-Type": "application/json",
      },
      params: {
        limit,
      },
    },
  );
  return response;
};

export const getRecentIssues = async (take: number) => {
  const response = request(
    "GET",
    `${baseUrl}/v1/publication/latest-issues${take ? `?take=${take}` : ""}`,
    {
      headers: {
        "Content-Type": "application/json",
      },
    },
  );
  return response as Promise<Issue[]>;
};

export const globalSearch = async (
  search?: string, // Optional search term
  isActive: boolean = true, // Default value set to true
): Promise<GlobalSearchResponse> => {
  return request("GET", `${baseUrl}/v1/publication/global-search`, {
    headers: {
      "Content-Type": "application/json",
    },
    params: {
      ...(search ? { search } : {}), // Only include `search` if it's defined
      isActive,
    },
  }) as Promise<GlobalSearchResponse>;
};
