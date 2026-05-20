"use client";

import React from "react";
import { useFetchPendingApprovalReviews } from "@/app/(dashboard)/hooks/useFetchAllReviews";
import { approveReview } from "@/app/api/reviewer";
import { Review } from "@/types";
import useNotification from "@/hooks/useNotification";

/**
 * Example component for Editor-in-Chief to view and approve pending reviews
 * This demonstrates how to use the new review approval system
 */
const PendingReviewsApproval = () => {
  const [page, setPage] = React.useState(1);
  const [limit] = React.useState(10);
  const [isApproving, setIsApproving] = React.useState<string | null>(null);
  const { notify } = useNotification();

  const {
    reviews,
    meta,
    isFetching,
    availableReviews,
    pendingCount,
    refetch,
  } = useFetchPendingApprovalReviews({ page, limit });

  const handleApproveReview = async (reviewId: string) => {
    try {
      setIsApproving(reviewId);
      const result = await approveReview(reviewId);

      if (result.success) {
        notify(result.message || "Review approved successfully", {
          mode: "success",
        });
        // Refetch the reviews to update the list
        refetch();
      } else {
        notify(result.message || "Failed to approve review", {
          mode: "error",
        });
      }
    } catch (error) {
      const errorMessage = error instanceof Error ? error.message : "An error occurred";
      notify(errorMessage, {
        mode: "error",
      });
    } finally {
      setIsApproving(null);
    }
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  if (isFetching) {
    return (
      <div className="flex items-center justify-center p-8">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  if (!availableReviews) {
    return (
      <div className="text-center p-8">
        <p className="text-gray-500">No pending reviews waiting for approval</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center justify-between">
        <h2 className="text-2xl font-bold">
          Pending Reviews ({pendingCount})
        </h2>
      </div>

      {/* Reviews List */}
      <div className="space-y-4">
        {reviews.map((review: Review) => (
          <div
            key={review.id}
            className="border rounded-lg p-6 bg-white shadow-sm hover:shadow-md transition-shadow"
          >
            {/* Review Header */}
            <div className="flex items-start justify-between mb-4">
              <div className="flex-1">
                <h3 className="text-lg font-semibold text-gray-900">
                  {review.Manuscript?.title || "Untitled Manuscript"}
                </h3>
                <div className="mt-2 space-y-1 text-sm text-gray-600">
                  <p>
                    <span className="font-medium">Reviewer:</span>{" "}
                    {review.Reviewer?.User
                      ? `${review.Reviewer.User.firstName} ${review.Reviewer.User.lastName}`
                      : "Unknown"}
                  </p>
                  <p>
                    <span className="font-medium">Author:</span>{" "}
                    {review.Manuscript?.authorName || "Unknown"}
                  </p>
                  <p>
                    <span className="font-medium">Submitted:</span>{" "}
                    {formatDate(review.reviewDate)}
                  </p>
                </div>
              </div>

              {/* Status Badge */}
              <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-yellow-100 text-yellow-800">
                {review.status.replace("_", " ")}
              </span>
            </div>

            {/* Recommendation */}
            <div className="mb-4">
              <span className="text-sm font-medium text-gray-700">
                Recommendation:{" "}
              </span>
              <span
                className={`inline-flex items-center px-2.5 py-0.5 rounded text-xs font-medium ${
                  review.recommendation === "ACCEPT"
                    ? "bg-green-100 text-green-800"
                    : review.recommendation === "REJECT"
                    ? "bg-red-100 text-red-800"
                    : "bg-blue-100 text-blue-800"
                }`}
              >
                {review.recommendation.replace("_", " ")}
              </span>
            </div>

            {/* Comments */}
            <div className="mb-4">
              <p className="text-sm font-medium text-gray-700 mb-2">
                Reviewer Comments:
              </p>
              <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                {review.comments || "No comments provided"}
              </p>
            </div>

            {/* Comments for Editors */}
            {review.commentsForEditors && (
              <div className="mb-4">
                <p className="text-sm font-medium text-gray-700 mb-2">
                  Comments for Editors:
                </p>
                <p className="text-sm text-gray-600 bg-blue-50 p-3 rounded">
                  {review.commentsForEditors}
                </p>
              </div>
            )}

            {/* Replies Count */}
            {review.Reply && review.Reply.length > 0 && (
              <div className="mb-4">
                <p className="text-sm text-gray-600">
                  {review.Reply.length} repl{review.Reply.length === 1 ? "y" : "ies"} in
                  conversation
                </p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex items-center gap-3 pt-4 border-t">
              <button
                onClick={() => handleApproveReview(review.id)}
                disabled={isApproving === review.id}
                className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors text-sm font-medium"
              >
                {isApproving === review.id ? "Approving..." : "Approve & Make Visible"}
              </button>
              <button
                className="px-4 py-2 bg-gray-100 text-gray-700 rounded-md hover:bg-gray-200 transition-colors text-sm font-medium"
              >
                View Details
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Pagination */}
      {meta && meta.pageCount > 1 && (
        <div className="flex items-center justify-between pt-4 border-t">
          <div className="text-sm text-gray-600">
            Showing {(page - 1) * limit + 1} to {Math.min(page * limit, meta.itemCount)} of{" "}
            {meta.itemCount} reviews
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setPage(1)}
              disabled={page === 1}
              className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              First
            </button>
            <button
              onClick={() => setPage((prev) => Math.max(1, prev - 1))}
              disabled={!meta.hasPreviousPage}
              className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Previous
            </button>
            <span className="text-sm text-gray-600">
              Page {page} of {meta.pageCount}
            </span>
            <button
              onClick={() => setPage((prev) => prev + 1)}
              disabled={!meta.hasNextPage}
              className="px-4 py-2 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Next
            </button>
            <button
              onClick={() => setPage(meta.pageCount)}
              disabled={page === meta.pageCount}
              className="px-3 py-1 border rounded-md hover:bg-gray-50 disabled:opacity-50 disabled:cursor-not-allowed text-sm"
            >
              Last
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default PendingReviewsApproval;
