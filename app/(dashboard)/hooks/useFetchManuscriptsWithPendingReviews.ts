import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getAllReviews } from "@/app/api/reviewer";
import { Review, ManuscriptProps } from "@/types";

/**
 * Custom hook to fetch manuscripts that have pending review approvals
 * Groups reviews by manuscript to show which manuscripts need editor approval
 */
const useFetchManuscriptsWithPendingReviews = () => {
  const [manuscripts, setManuscripts] = React.useState<ManuscriptProps[]>([]);
  const [pendingReviewsCount, setPendingReviewsCount] = React.useState(0);

  const { data, isFetching, isError, error, refetch } = useQuery({
    queryKey: ["manuscripts-with-pending-reviews"],
    queryFn: () => getAllReviews({ status: "PENDING_APPROVAL" }),
    staleTime: 60000, // 1 minute - shorter for pending items
  });

  React.useEffect(() => {
    if (data && "data" in data && "meta" in data) {
      // Extract unique manuscripts from reviews
      const manuscriptMap = new Map<string, ManuscriptProps>();
      
      data.data.forEach((review: Review) => {
        if (review.Manuscript && review.status === "PENDING_APPROVAL") {
          const manuscriptId = review.Manuscript.id;
          if (!manuscriptMap.has(manuscriptId)) {
            // Add review count to manuscript
            const manuscript = {
              ...review.Manuscript,
              pendingReviewsCount: 1,
            };
            manuscriptMap.set(manuscriptId, manuscript as any);
          } else {
            // Increment review count
            const existing = manuscriptMap.get(manuscriptId)!;
            manuscriptMap.set(manuscriptId, {
              ...existing,
              pendingReviewsCount: ((existing as any).pendingReviewsCount || 0) + 1,
            } as any);
          }
        }
      });

      const uniqueManuscripts = Array.from(manuscriptMap.values());
      setManuscripts(uniqueManuscripts);
      setPendingReviewsCount(data.data.length);
    } else if (data && "error" in data) {
      console.error("Error fetching manuscripts with pending reviews:", data.error);
      setManuscripts([]);
      setPendingReviewsCount(0);
    }
  }, [data]);

  const availableManuscripts = manuscripts?.length > 0;

  return {
    manuscripts,
    isFetching,
    isError,
    error,
    availableManuscripts,
    pendingReviewsCount, // Total number of pending reviews
    manuscriptsCount: manuscripts.length, // Number of unique manuscripts
    refetch,
  };
};

export default useFetchManuscriptsWithPendingReviews;
