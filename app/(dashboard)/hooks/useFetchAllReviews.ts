import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getAllReviews, getPendingApprovalReviews } from "@/app/api/reviewer";
import { Review, PaginationMeta } from "@/types";

interface UseFetchReviewsParams {
  page?: number;
  limit?: number;
  status?: string;
  sortOrder?: string;
  enabled?: boolean;
}

/**
 * Custom hook to fetch all reviews with pagination support
 */
const useFetchAllReviews = (params?: UseFetchReviewsParams) => {
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [meta, setMeta] = React.useState<PaginationMeta | null>(null);
  const { page = 1, limit = 10, status, sortOrder = "desc", enabled = true } = params || {};

  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["all-reviews", page, limit, status, sortOrder],
    queryFn: () => getAllReviews({ page, limit, status, sortOrder }),
    staleTime: 120000, // 2 minutes
    enabled,
  });

  React.useEffect(() => {
    if (data && "data" in data && "meta" in data) {
      setReviews(data.data);
      setMeta(data.meta);
    } else if (data && "error" in data) {
      setReviews([]);
      setMeta(null);
    }
  }, [data]);

  const availableReviews = reviews?.length > 0;

  return {
    reviews,
    meta,
    isFetching,
    isError,
    error,
    availableReviews,
    refetch,
  };
};

/**
 * Custom hook to fetch pending approval reviews
 */
export const useFetchPendingApprovalReviews = (params?: Omit<UseFetchReviewsParams, "status">) => {
  const [reviews, setReviews] = React.useState<Review[]>([]);
  const [meta, setMeta] = React.useState<PaginationMeta | null>(null);
  const { page = 1, limit = 10, sortOrder = "desc", enabled = true } = params || {};

  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["pending-approval-reviews", page, limit, sortOrder],
    queryFn: () => getPendingApprovalReviews({ page, limit, sortOrder }),
    staleTime: 0,
    refetchOnMount: true,
    enabled,
  });

  React.useEffect(() => {
    if (data && "data" in data && "meta" in data) {
      setReviews(data.data);
      setMeta(data.meta);
    } else if (data && "error" in data) {
      setReviews([]);
      setMeta(null);
    }
  }, [data]);

  const availableReviews = reviews?.length > 0;
  const pendingCount = meta?.itemCount || 0;

  return {
    reviews,
    meta,
    isFetching,
    isError,
    error,
    availableReviews,
    pendingCount,
    refetch,
  };
};

export default useFetchAllReviews;
