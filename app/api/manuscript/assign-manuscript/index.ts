/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { api, SectionEditor } from "@/constants/config";
import { request } from "@/utils/request";

import { getBearerHeader } from "../../call-methods";

export interface AssignManuscriptReviewerPayload {
  manuscriptId: string;
  reviewerIds: string[];
  reviewDueDate: string;
}

export interface AssignSuggestedReviewerPayload {
  suggestedReviewerId: string;
  sectionId: string;
  reviewDueDate: string;
}

export interface UnassignReviewerPayload {
  reviewerIds: string[];
}

export const assignManuscriptSection = async (payload: any) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("PATCH", `${api.assignManuscriptSection}`, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    data: payload,
  });

  if (response?.statusCode && response.statusCode >= 400) {
    throw new Error(response.message ?? `Request failed with status ${response.statusCode}`);
  }

  return response;
};

export const assignManuscriptReviewer = async (
  payload: AssignManuscriptReviewerPayload,
) => {
  const bearerHeader = await getBearerHeader();

  const response = await request(
    "POST",
    `${SectionEditor.assignManuscriptReviewer}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
      data: payload,
    },
  );

  if (response?.statusCode && response.statusCode >= 400) {
    throw new Error(response.message ?? `Request failed with status ${response.statusCode}`);
  }

  return response;
};

export const assignSuggestedReviewer = async (
  payload: AssignSuggestedReviewerPayload,
) => {
  const bearerHeader = await getBearerHeader();

  const response = await request(
    "POST",
    `${SectionEditor.assignSuggestedReviewer}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
      data: payload,
    },
  );

  if (response?.statusCode && response.statusCode >= 400) {
    throw new Error(response.message ?? `Request failed with status ${response.statusCode}`);
  }

  return response;
};

export const unassignReviewer = async (
  manuscriptId: string,
  payload: UnassignReviewerPayload,
) => {
  const bearerHeader = await getBearerHeader();

  const response = await request(
    "POST",
    SectionEditor.unassignReviewer(manuscriptId),
    {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
      data: payload,
    },
  );

  if (response?.statusCode && response.statusCode >= 400) {
    throw new Error(response.message ?? `Request failed with status ${response.statusCode}`);
  }

  return response;
};
