/* eslint-disable @typescript-eslint/no-explicit-any */
import { api, Role, SectionEditor, User } from "@/constants/config";
import {
  DashboardAnalytics,
  ManuscriptProps,
  ReviewerDashboardAnalytics,
  SectionEditorDashboardAnalytics,
} from "@/types";
import { request } from "@/utils/request";

import { getBearerHeader } from "../call-methods";
import { FetchManuscriptsParams, FetchManuscriptsResponse, FetchSEReviewersResponse } from "./types";
import { logout } from "@/app/components/log-out";

const REVIEWER_ROLE_ID_FALLBACK = "6ac67a7d-cd20-4c2b-bc47-1a97861728dc";
let reviewerRoleIdCache: string | null = null;

type PaginatedUserItem = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
  Reviewer?: {
    id: string;
    userId: string;
    expertiseArea?: string;
    sectionId?: string;
  } | null;
};

type RoleItem = {
  id: string;
  roleName: string;
};

const resolveReviewerRoleId = async (): Promise<string> => {
  if (reviewerRoleIdCache) return reviewerRoleIdCache;

  try {
    const bearerHeader = await getBearerHeader();
    const rolesResponse = await request("GET", Role.getAllRoles, {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
    });

    if (Array.isArray(rolesResponse)) {
      const reviewerRole = (rolesResponse as RoleItem[]).find(
        (role) => role?.roleName?.toLowerCase() === "reviewer",
      );
      if (reviewerRole?.id) {
        reviewerRoleIdCache = reviewerRole.id;
        return reviewerRole.id;
      }
    }
  } catch (error) {
    console.error("Failed to resolve reviewer role id:", error);
  }

  return REVIEWER_ROLE_ID_FALLBACK;
};

export const getAuthorMetrics = async () => {
  const bearerHeader = await getBearerHeader();

  const response = await request("GET", api.authorMetrics, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });

  if (response && response.statusCode === 401) {
    logout();
  }

  return response;
};

export const getReviewerMetrics = async () => {
  const bearerHeader = await getBearerHeader();

  const response = await request("GET", api.reviewerMetrics, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });
  if (response && response.statusCode === 401) {
    logout();
  }

  return response;
};

export const getReviewerDashboardAnalytics = async (): Promise<ReviewerDashboardAnalytics | null> => {
  const bearerHeader = await getBearerHeader();

  const response = await request("GET", api.reviewerDashboardAnalytics, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });

  if (response && response.statusCode === 401) {
    logout();
    return null;
  }

  return response as ReviewerDashboardAnalytics;
};

export const getDashboardAnalytics = async (): Promise<DashboardAnalytics | null> => {
  const bearerHeader = await getBearerHeader();

  const response = await request("GET", api.dashboardAnalytics, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });

  if (response && response.statusCode === 401) {
    logout();
    return null;
  }

  return response as DashboardAnalytics;
};

export const getSectionEditorDashboardAnalytics = async (): Promise<SectionEditorDashboardAnalytics | null> => {
  const bearerHeader = await getBearerHeader();

  const response = await request("GET", api.sectionEditorDashboardAnalytics, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });

  if (response && response.statusCode === 401) {
    logout();
    return null;
  }

  return response as SectionEditorDashboardAnalytics;
};

export const submitManuscript = async (payload: any) => {
  const bearerHeader = await getBearerHeader();

  const response = await request("POST", `${api.submitManuscript}`, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    data: payload,
  });
  if (response && response.statusCode === 401) {
    logout();
  }
  return response;
};

export const getAuthorManuscripts = async (
  params: FetchManuscriptsParams = {},
): Promise<FetchManuscriptsResponse> => {
  const {
    sortOrder = "desc",
    page = 1,
    limit = 10,
    search = "",
    status = "",
  } = params;
  const bearerHeader = await getBearerHeader();

  const queryParams = new URLSearchParams({
    sortOrder,
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(status && { status }),
  });

  const response = await request(
    "GET",
    `${api.AuthorManuscripts}?${queryParams.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
    },
  );

  if (response && response.statusCode === 401) {
    logout();
  }
  return response as FetchManuscriptsResponse;
};

export const getAllManuscripts = async (): Promise<ManuscriptProps[]> => {
  const bearerHeader = await getBearerHeader();

  const response = await request("GET", api.AllManuscripts, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });

  if (response && response.statusCode === 401) {
    logout();
  }
  return response as Promise<ManuscriptProps[]>;
};

export const getAllManuscriptsFiltered = async (
  params: FetchManuscriptsParams = {},
): Promise<FetchManuscriptsResponse> => {
  const {
    sortOrder = "desc",
    page = 1,
    limit = 10,
    search = "",
    status = "",
  } = params;
  const bearerHeader = await getBearerHeader();

  const queryParams = new URLSearchParams({
    sortOrder,
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(status && { status }),
  });

  const response = await request(
    "GET",
    `${api.CEManuscripts}?${queryParams.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
    },
  );

  if (response && response.statusCode === 401) {
    logout();
  }
  return response as FetchManuscriptsResponse;
};

export const getSEManuscript = async (
  params: FetchManuscriptsParams = {},
): Promise<FetchManuscriptsResponse> => {
  const {
    sortOrder = "desc",
    page = 1,
    limit = 10,
    search = "",
    status = "",
  } = params;
  const bearerHeader = await getBearerHeader();

  const queryParams = new URLSearchParams({
    sortOrder,
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(status && { status }),
  });

  const response = await request(
    "GET",
    `${api.SEManuscript}?${queryParams.toString()}`,
    {
      headers: {
        "Content-Type": "application/json",
        ...bearerHeader.headers,
      },
    },
  );

  if (response && response.statusCode === 401) {
    logout();
  }

  return response as FetchManuscriptsResponse;
};

export const getSEReviewers = async (
  params: {
    page?: number;
    limit?: number;
    search?: string;
    sortOrder?: string;
    sectionId?: string;
  } = {},
): Promise<FetchSEReviewersResponse> => {
  const {
    sortOrder = "desc",
    page = 1,
    limit = 10,
    search = "",
    sectionId,
  } = params;
  const bearerHeader = await getBearerHeader();

  const queryParams = new URLSearchParams({
    sortOrder,
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(sectionId && { sectionId }),
  });

  const defaultMeta = {
    page,
    limit,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };

  try {
    const response = await request(
      "GET",
      `${SectionEditor.getAllReviewer}?${queryParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...bearerHeader.headers,
        },
      },
    );

    if (response && response.statusCode === 401) {
      logout();
      return { data: [], meta: defaultMeta };
    }

    // Handle error responses
    if (response?.error || response?.statusCode >= 400) {
      return { data: [], meta: defaultMeta };
    }

    // Handle responses with expected structure
    if (Array.isArray(response?.data)) {
      return {
        data: response.data,
        meta: response?.meta ?? {
          ...defaultMeta,
          itemCount: response.data.length,
          pageCount: Math.ceil(response.data.length / limit),
        },
      };
    }

    // Handle common alternate response shapes from backend
    const candidateData =
      response?.reviewers ?? response?.items ?? response?.results ?? response?.rows;

    if (Array.isArray(candidateData)) {
      const candidateMeta = response?.meta ?? response?.pagination ?? response?.pageInfo;
      return {
        data: candidateData,
        meta: candidateMeta ?? {
          ...defaultMeta,
          itemCount: candidateData.length,
          pageCount: Math.ceil(candidateData.length / limit),
        },
      };
    }

    // Handle array responses (fallback for backend compatibility)
    if (Array.isArray(response)) {
      return {
        data: response,
        meta: {
          page,
          limit,
          itemCount: response.length,
          pageCount: Math.ceil(response.length / limit),
          hasPreviousPage: page > 1,
          hasNextPage: response.length === limit,
        },
      };
    }

    return { data: [], meta: defaultMeta };
  } catch (error) {
    console.error("Error fetching SE reviewers:", error);
    return { data: [], meta: defaultMeta };
  }
};

export const getChiefEditorReviewers = async (
  params: {
    page?: number;
    limit?: number;
    search?: string;
    sortOrder?: string;
  } = {},
): Promise<FetchSEReviewersResponse> => {
  const { sortOrder = "desc", page = 1, limit = 10, search = "" } = params;
  const bearerHeader = await getBearerHeader();
  const reviewerRoleId = await resolveReviewerRoleId();

  const queryParams = new URLSearchParams({
    sortOrder,
    page: page.toString(),
    limit: limit.toString(),
    roleId: reviewerRoleId,
    ...(search && { search }),
  });

  const defaultMeta = {
    page,
    limit,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  };

  try {
    const response = await request(
      "GET",
      `${User.paginatedUsers}?${queryParams.toString()}`,
      {
        headers: {
          "Content-Type": "application/json",
          ...bearerHeader.headers,
        },
      },
    );

    if (response && response.statusCode === 401) {
      logout();
      return { data: [], meta: defaultMeta };
    }

    if (response?.error || response?.statusCode >= 400) {
      return { data: [], meta: defaultMeta };
    }

    const users: PaginatedUserItem[] = Array.isArray(response?.data)
      ? response.data
      : Array.isArray(response)
        ? response
        : [];

    const mapped = users
      .filter((u) => u?.Reviewer?.id)
      .map((u) => ({
        id: u.Reviewer!.id,
        userId: u.Reviewer!.userId,
        expertiseArea: u.Reviewer?.expertiseArea ?? "",
        sectionId: u.Reviewer?.sectionId ?? "",
        user: {
          id: u.id,
          firstName: u.firstName,
          lastName: u.lastName,
          email: u.email,
        },
        section: null,
        assignedManuscripts: [],
        reviews: [],
        stats: {
          totalAssignedManuscripts: 0,
          totalReviews: 0,
        },
      }));

    const meta = response?.meta ?? {
      ...defaultMeta,
      itemCount: mapped.length,
      pageCount: Math.ceil(mapped.length / limit),
    };

    return {
      data: mapped,
      meta,
    };
  } catch (error) {
    console.error("Error fetching Chief Editor reviewers:", error);
    return { data: [], meta: defaultMeta };
  }
};

export const getREManuscript = async (
  params: FetchManuscriptsParams = {},
): Promise<FetchManuscriptsResponse> => {
  const {
    sortOrder = "desc",
    page = 1,
    limit = 10,
    search = "",
    status = "",
  } = params;
  const bearerHeader = await getBearerHeader();

  const queryParams = new URLSearchParams({
    sortOrder,
    page: page.toString(),
    limit: limit.toString(),
    ...(search && { search }),
    ...(status && { status }),
  });

  const response = await request("GET", `${api.REManuscript}?${queryParams.toString()}`, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
  });

  if (response && response.statusCode === 401) {
    logout();
  }
  return response as FetchManuscriptsResponse;
};

export const publishManuscript = async (payload: any) => {
  const bearerHeader = await getBearerHeader();
  // eslint-disable-next-line no-console
  console.debug("publishManuscript called", { timestamp: Date.now(), payloadSummary: { title: payload?.title, doi: payload?.doi } });
  const response = await request("POST", `${api.publishManuscript}`, {
    headers: {
      "Content-Type": "application/json",
      ...bearerHeader.headers,
    },
    data: payload,
  });
  // eslint-disable-next-line no-console
  console.debug("publishManuscript response", { timestamp: Date.now(), status: response?.statusCode ?? "unknown" });
  if (response && response.statusCode === 401) {
    logout();
  }
  return response;
};
