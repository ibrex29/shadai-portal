/* eslint-disable @typescript-eslint/no-explicit-any */
"use server";

import { getServerSession } from "next-auth";

import { User } from "@/constants/config";
import { request, getJournalSubdomain } from "@/utils/request";

import { authOptions } from "../auth/[...nextauth]/options";

export type User = {
  id: string;
  title: string | null;
  firstName: string;
  lastName: string;
  password: string;
  email: string;
  phoneNumber: string | null;
  isActive: boolean;
  createdAt: string;
  updatedAt: string;
  createdBy: string;
  updatedBy: string;
  roles: {
    id: string;
    createdAt: string;
    updatedAt: string;
    roleName: string;
    description: string;
    isActive: boolean;
    createdBy: string;
    updatedBy: string;
  }[];
  Author: {
    id: string;
    userId: string;
    affiliation: string;
    expertiseArea: string;
    higestQualification: string | null;
    reviewInterest: boolean;
  } | null;
  Editor: {
    id: string;
    userId: string;
    sectionId: string | null;
    role: string;
  } | null;
  Reviewer: {
    id: string;
    userId: string;
    expertiseArea: string;
    higestQualification: string | null;
    sectionId: string;
  } | null;
};

export type PaginatedUsersResponse = {
  data: User[];
  meta: {
    page: number;
    limit: number;
    itemCount: number;
    pageCount: number;
    hasPreviousPage: boolean;
    hasNextPage: boolean;
  };
};

interface GetUsersParams {
  roleId?: string;
  sectionId?: string;
  sortOrder?: "asc" | "desc";
  page?: number;
  limit?: number;
  search?: string;
  sortField?: string;
}

export type UpdateUserRoleOrSectionPayload = {
  roleId?: string;
  sectionId?: string | null;
  replaceRoles?: boolean;
};

export type UpdateUserProfilePayload = {
  title?: string | null;
  firstName?: string | null;
  lastName?: string | null;
  email?: string;
  password?: string;
  affiliation?: string | null;
  expertiseArea?: string | null;
  phoneNumber?: string | null;
  higestQualification?: string | null;
  reviewInterest?: boolean;
  reviewerExpertiseArea?: string | null;
  reviewerHighestQualification?: string | null;
};

export const createUser = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${User.createUser}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const createAuthor = async (payload: any) => {
  const session = await getServerSession(authOptions);

  const response = request("POST", `${User.createAuthor}`, {
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });

  return response;
};

export const getUsers = async ({
  roleId,
  sectionId,
  sortOrder = "asc",
  page = 1,
  limit = 10,
  search,
  sortField = "createdAt",
}: GetUsersParams): Promise<PaginatedUsersResponse> => {
  const session = await getServerSession(authOptions);

  // Build query string
  const queryParams = new URLSearchParams({
    sortOrder,
    page: page.toString(),
    limit: limit.toString(),
    sortField,
    ...(roleId && { roleId }),
    ...(sectionId && { sectionId }),
    ...(search && { search }),
  });

  const response = await fetch(
    `${User.paginatedUsers}?${queryParams.toString()}`,
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
    throw new Error(`Failed to fetch users: ${response.statusText}`);
  }

  const data = await response.json();
  return data as PaginatedUsersResponse;
};

export const getUserById = async (id: string): Promise<User> => {
  const session = await getServerSession(authOptions);

  const response = await fetch(`${User.getUser(id)}`, {
    method: "GET",
    headers: {
      "Content-Type": "application/json",
      Accept: "*/*",
      Authorization: `Bearer ${session?.token}`,
      "x-journal-subdomain": getJournalSubdomain(),
    },
  });

  if (!response.ok) {
    throw new Error(`Failed to fetch user: ${response.statusText}`);
  }

  return (await response.json()) as User;
};

export const updateUserRoleOrSection = async (
  id: string,
  payload: UpdateUserRoleOrSectionPayload,
) => {
  const session = await getServerSession(authOptions);

  return request("PATCH", `${User.updateRoleOrSection(id)}`, {
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};

export const updateUserProfile = async (
  id: string,
  payload: UpdateUserProfilePayload,
) => {
  const session = await getServerSession(authOptions);

  return request("PATCH", `${User.updateProfile(id)}`, {
    headers: {
      Authorization: `Bearer ${session?.token}`,
    },
    data: payload,
  });
};
