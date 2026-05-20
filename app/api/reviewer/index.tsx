/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { author, baseUrl, reviewer } from "@/constants/config";
import { request } from "@/utils/request";
import { fetchData, getBearerHeader } from "../call-methods";
import { logout } from "@/app/components/log-out";
import { Review } from "@/types";

interface MakeRecommendationPayload {
  recommendation: "ACCEPT" | "MINOR_REVISIONS" | "MAJOR_REVISIONS" | "REJECT";
  remark?: string;
}

interface PaginationParams {
  page?: number;
  limit?: number;
  status?: string;
  sortOrder?: string;
  manuscriptId?: string;
}

const handleUnauthorized = (response: any) => {
  if (response?.statusCode === 401 || response?.status === 401) {
    logout();
    return true;
  }
  return false;
};

const isErrorResponse = (response: any) => {
  return response?.status && response.status >= 400;
};

export const getAllReviews = async (
  params?: PaginationParams
): Promise<{ data: Review[]; meta: any } | { error: string }> => {
  try {
    const bearerHeader = await getBearerHeader();
    
    const queryParams = new URLSearchParams();
    if (params?.sortOrder) queryParams.append("sortOrder", params.sortOrder);
    if (params?.page) queryParams.append("page", params.page.toString());
    if (params?.limit) queryParams.append("limit", params.limit.toString());
    if (params?.status) queryParams.append("status", params.status);
    if (params?.manuscriptId) queryParams.append("manuscriptId", params.manuscriptId);
    
    const url = `${reviewer.getAllReviews}${queryParams.toString() ? `?${queryParams.toString()}` : ""}`;

    const response = await request("GET", url, {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
    });

    if (handleUnauthorized(response)) {
      return { error: "Unauthorized" };
    }

    if (isErrorResponse(response)) {
      return { error: response.error || "Failed to fetch reviews" };
    }

    if (response?.data && response?.meta) {
      return { data: response.data, meta: response.meta };
    }

    if (Array.isArray(response)) {
      return {
        data: response,
        meta: {
          page: params?.page || 1,
          limit: params?.limit || 10,
          itemCount: response.length,
          pageCount: 1,
          hasPreviousPage: false,
          hasNextPage: false,
        },
      };
    }

    return { data: [], meta: {} };
  } catch (error: any) {
    return { error: error.message || "Failed to fetch reviews" };
  }
};

export const approveReview = async (
  reviewId: string
): Promise<{ success: boolean; message?: string; data?: any }> => {
  try {
    const bearerHeader = await getBearerHeader();

    const response = await request("PATCH", reviewer.approveReview(reviewId), {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
      responseType: "json",
    });

    if (handleUnauthorized(response)) {
      return { success: false, message: "Unauthorized" };
    }

    if (isErrorResponse(response)) {
      return { success: false, message: response.error || "Failed to approve review" };
    }

    return { success: true, data: response, message: "Review approved successfully" };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to approve review" };
  }
};

export const getReviewsByStatus = async (
  status: string,
  params?: Omit<PaginationParams, "status">
): Promise<{ data: Review[]; meta: any } | { error: string }> => {
  const result = await getAllReviews({ ...params });
  
  if ("error" in result) {
    return result;
  }
  
  const filteredReviews = result.data.filter((review) => review.status === status);
  
  return {
    data: filteredReviews,
    meta: {
      ...result.meta,
      itemCount: filteredReviews.length,
      pageCount: Math.ceil(filteredReviews.length / (params?.limit || 10)),
    },
  };
};

export const getPendingApprovalReviews = async (
  params?: Omit<PaginationParams, "status">
): Promise<{ data: Review[]; meta: any } | { error: string }> => {
  return getAllReviews({
    page: params?.page,
    limit: params?.limit,
    sortOrder: params?.sortOrder,
  });
};

export const getReviewById = async (
  reviewId: string
): Promise<Review | { error: string }> => {
  try {
    const bearerHeader = await getBearerHeader();

    const response = await request("GET", reviewer.getReviewById(reviewId), {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
    });

    if (handleUnauthorized(response)) {
      return { error: "Unauthorized" };
    }

    if (isErrorResponse(response)) {
      return { error: response.error || "Failed to fetch review details" };
    }

    return response as Review;
  } catch (error: any) {
    return { error: error.message || "Failed to fetch review details" };
  }
};

export const getReviewsByManuscriptId = async (
  manuscriptId: string
): Promise<Review[]> => {
  try {
    const bearerHeader = await getBearerHeader();

    const url = reviewer.getReviewsByManuscriptId(manuscriptId);

    const response = await request("GET", url, {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
    });

    if (handleUnauthorized(response)) {
      return [];
    }

    if (isErrorResponse(response)) {
      return [];
    }

    // Handle different response structures
    if (Array.isArray(response)) {
      return response;
    }

    if (response?.data && Array.isArray(response.data)) {
      return response.data;
    }

    return [];
  } catch (error: any) {
    return [];
  }
};

export const closeReview = async (reviewId: string) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("PATCH", `${baseUrl}/v1/review/${reviewId}/close`, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    responseType: "json",
  });

  if (handleUnauthorized(response)) {
    return { success: false, message: "Unauthorized" };
  }

  if (isErrorResponse(response)) {
    return { success: false, message: response.error || "Request failed" };
  }

  return { success: true, data: response };
};

export const openReview = async (reviewId: string) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("PATCH", `${baseUrl}/v1/review/${reviewId}/open`, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    responseType: "json",
  });

  if (handleUnauthorized(response)) {
    return { success: false, message: "Unauthorized" };
  }

  if (isErrorResponse(response)) {
    return { success: false, message: response.error || "Request failed" };
  }

  return { success: true, data: response };
};

export const getRecommendation = async () => {
  return await fetchData(reviewer.getRecommendation);
};

export const getReviewStatus = async (manuscriptId: string) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("GET", `${baseUrl}/v1/review/manuscript/${manuscriptId}/has-review`, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });

  if (handleUnauthorized(response)) {
    return null;
  }

  return response;
};

export const createReview = async (payload: any) => {
  const bearerHeader = await getBearerHeader();

  const checklist = {
    introduction: payload.introduction,
    researchDesign: payload.researchDesign,
    methods: payload.methods,
    results: payload.results,
    conclusions: payload.conclusions,
    figuresAndTables: payload.figuresAndTables,
    englishQuality: payload.englishQuality,
  };

  const requestPayload = {
    manuscriptId: payload.manuscriptId,
    comments: payload.comments,
    commentsForEditors: payload.commentsForEditors,
    recommendation: payload.recommendation,
    checklist,
    aiDeclarationConfirmed: payload.aiDeclarationConfirmed,
    notifyOnFinalStatus: payload.notifyOnFinalStatus,
  };

  const response = await request("POST", reviewer.createReview, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    data: requestPayload,
  });

  if (handleUnauthorized(response)) {
    return null;
  }

  return response;
};

export const createReviewerReply = async (payload: any) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("POST", reviewer.createReplyReviewer, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    data: payload,
  });

  if (handleUnauthorized(response)) {
    return null;
  }

  return response;
};

export const createAuthorReply = async (payload: any) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("POST", author.createReply, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    data: payload,
  });

  if (handleUnauthorized(response)) {
    return null;
  }

  return response;
};

export const createEditorReply = async (payload: any) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("POST", reviewer.createReply, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    data: payload,
  });

  if (handleUnauthorized(response)) {
    return { success: false, message: "Unauthorized" };
  }

  if (isErrorResponse(response)) {
    return { success: false, message: response.error || "Failed to submit reply" };
  }

  return { success: true, data: response };
};

export const getRepliesAuthor = async (manuscriptId: string) => {
  const bearerHeader = await getBearerHeader();

  const response = await request(
    "GET",
    `${reviewer.getRepliesAuthor}/manuscript-author/${manuscriptId}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
    }
  );

  if (handleUnauthorized(response)) {
    return null;
  }

  return response;
};

export const getReplies = async (manuscriptId: string) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("GET", `${reviewer.getReplies}/${manuscriptId}`, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });

  if (handleUnauthorized(response)) {
    return null;
  }

  return response;
};

export const acceptManuscript = async (payload: any) => {
  const bearerHeader = await getBearerHeader();

  return await request("POST", reviewer.acceptManuscriptUrl, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    data: payload,
  });
};

export interface CompleteReviewPayload {
  comments: string;
  commentsForEditors?: string;
  checklist: {
    originality: "YES" | "CAN_BE_IMPROVED" | "MUST_BE_IMPROVED";
    methodology: "YES" | "CAN_BE_IMPROVED" | "MUST_BE_IMPROVED";
    references: "YES" | "CAN_BE_IMPROVED" | "MUST_BE_IMPROVED";
    grammar: "YES" | "CAN_BE_IMPROVED" | "MUST_BE_IMPROVED";
  };
  recommendation: "ACCEPT" | "MINOR_REVISIONS" | "MAJOR_REVISIONS" | "REJECT";
  aiDeclarationConfirmed: boolean;
  notifyOnFinalStatus: boolean;
}

export const completeReview = async (
  manuscriptId: string,
  payload: CompleteReviewPayload
): Promise<{ success: boolean; message?: string; data?: any }> => {
  try {
    const bearerHeader = await getBearerHeader();

    const response = await request(
      "POST",
      reviewer.completeReview(manuscriptId),
      {
        headers: {
          "Content-Type": "application/json",
          ...bearerHeader.headers,
        },
        data: payload,
      }
    );

    if (handleUnauthorized(response)) {
      return { success: false, message: "Unauthorized" };
    }

    if (isErrorResponse(response)) {
      return { success: false, message: response.error || "Failed to complete review" };
    }

    return { success: true, data: response };
  } catch (error: any) {
    return { success: false, message: error.message || "Failed to complete review" };
  }
};

export const makeRecommendationReviewer = async (
  manuscriptId: string,
  payload: MakeRecommendationPayload
) => {
  try {
    const bearerHeader = await getBearerHeader();

    const response = await request(
      "POST",
      `${baseUrl}/v1/reviewer/manuscripts/${manuscriptId}/accept`,
      {
        headers: {
          "Content-Type": "application/json",
          ...bearerHeader.headers,
        },
        data: payload,
      }
    );

    return response;
  } catch (error: any) {
    console.error(`Failed to accept manuscript ${manuscriptId}:`, error);
    throw new Error(`Failed to accept manuscript: ${error.message}`);
  }
};
