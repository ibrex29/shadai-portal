import { ManuscriptProps } from "@/types";

export interface FetchManuscriptsParams {
  sortOrder?: string;
  page?: number;
  limit?: number;
  search?: string;
  status?: string;
}

export interface PaginatedMeta {
  page: number;
  limit: number;
  itemCount: number;
  pageCount: number;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
}

export interface FetchManuscriptsResponse {
  data: ManuscriptProps[];
  meta: PaginatedMeta;
}

export interface SEReviewer {
  id: string;
  userId: string;
  expertiseArea: string;
  sectionId: string;
  user: {
    id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
  section: {
    id: string;
    name: string;
  } | null;
  assignedManuscripts: ManuscriptProps[];
  reviews: unknown[];
  stats: {
    totalAssignedManuscripts: number;
    totalReviews: number;
  };
}

export interface FetchSEReviewersResponse {
  data: SEReviewer[];
  meta: PaginatedMeta;
}
