"use client";

import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Divider,
  Modal,
  IconButton,
  Skeleton,
  Typography,
  Alert,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useQuery } from "@tanstack/react-query";
import { getReviewsByManuscriptId } from "@/app/api/reviewer";
import { Review, Reply } from "@/types";
import { formatDate } from "@/utils";

interface ReviewViewerModalProps {
  manuscriptId: string;
  manuscriptTitle: string;
  preloadedReviews?: Review[];
  open: boolean;
  onClose: () => void;
}

const getRecommendationColor = (recommendation: string) => {
  switch (recommendation?.toUpperCase()) {
    case "ACCEPT":
      return "success";
    case "MINOR_REVISIONS":
      return "warning";
    case "MAJOR_REVISIONS":
      return "warning";
    case "REJECT":
      return "error";
    default:
      return "default";
  }
};

const formatRecommendation = (recommendation: string) => {
  return recommendation?.replace(/_/g, " ") || "N/A";
};

export default function ReviewViewerModal({
  manuscriptId,
  manuscriptTitle,
  preloadedReviews,
  open,
  onClose,
}: ReviewViewerModalProps) {
  const shouldFetchReviews = !preloadedReviews;

  const {
    data: reviews,
    isLoading,
    error,
  } = useQuery<Review[]>({
    queryKey: ["manuscript-reviews", manuscriptId],
    queryFn: () => getReviewsByManuscriptId(manuscriptId),
    enabled: open && shouldFetchReviews,
  });

  const resolvedReviews = preloadedReviews ?? reviews;

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          maxWidth: 800,
          margin: "auto",
          mt: "5vh",
          backgroundColor: "white",
          borderRadius: 3,
          boxShadow: 6,
          maxHeight: "85vh",
          overflowY: "auto",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Review Feedback
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 600 }}>
              {manuscriptTitle}
            </Typography>
          </Box>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        {isLoading ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} variant="rounded" height={120} />
            ))}
          </Box>
        ) : error ? (
          <Alert severity="error">Failed to load reviews.</Alert>
        ) : !resolvedReviews || resolvedReviews.length === 0 ? (
          <Alert severity="info">
            No reviews have been submitted for this manuscript yet.
          </Alert>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
            {resolvedReviews.map((review, index) => (
              <Card
                key={review.id}
                sx={{
                  border: "1px solid",
                  borderColor: "divider",
                  borderRadius: 2,
                }}
              >
                <CardContent>
                  {/* Review Header */}
                  <Box
                    display="flex"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={2}
                  >
                    <Box display="flex" alignItems="center" gap={1}>
                      <Avatar
                        sx={{
                          bgcolor: "primary.main",
                          width: 36,
                          height: 36,
                        }}
                      >
                        <RateReviewIcon fontSize="small" />
                      </Avatar>
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          Reviewer {index + 1}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {formatDate(review.reviewDate)}
                        </Typography>
                      </Box>
                    </Box>
                    <Box display="flex" alignItems="center" gap={1}>
                      <Chip
                        label={formatRecommendation(review.recommendation)}
                        color={getRecommendationColor(review.recommendation) as "success" | "warning" | "error" | "default"}
                        size="small"
                        sx={{ fontWeight: 600, fontSize: "11px" }}
                      />
                      {review.isClosed && (
                        <Chip
                          label="Closed"
                          size="small"
                          variant="outlined"
                          color="default"
                        />
                      )}
                    </Box>
                  </Box>

                  {/* Review Comments */}
                  <Typography
                    variant="body2"
                    sx={{
                      bgcolor: "grey.50",
                      p: 2,
                      borderRadius: 1,
                      whiteSpace: "pre-wrap",
                    }}
                  >
                    {review.comments}
                  </Typography>

                  {/* Replies */}
                  {review.Reply && review.Reply.length > 0 && (
                    <>
                      <Divider sx={{ my: 2 }} />
                      <Typography
                        variant="subtitle2"
                        color="text.secondary"
                        mb={1}
                      >
                        Replies ({review.Reply.length})
                      </Typography>
                      <Box
                        sx={{
                          display: "flex",
                          flexDirection: "column",
                          gap: 1,
                          maxHeight: 300,
                          overflowY: "auto",
                        }}
                      >
                        {review.Reply.map((reply: Reply) => (
                          <Box
                            key={reply.id}
                            sx={{
                              p: 1.5,
                              bgcolor: reply.isAuthor
                                ? "primary.50"
                                : "grey.100",
                              borderRadius: 1,
                              borderLeft: "3px solid",
                              borderColor: reply.isAuthor
                                ? "primary.main"
                                : "grey.400",
                            }}
                          >
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              mb={0.5}
                            >
                              <Typography
                                variant="caption"
                                fontWeight={600}
                                color={
                                  reply.isAuthor
                                    ? "primary.main"
                                    : "text.secondary"
                                }
                              >
                                {reply.isAuthor ? "Author" : "Reviewer"}
                              </Typography>
                              <Typography variant="caption" color="text.secondary">
                                {formatDate(reply.createdAt)}
                              </Typography>
                            </Box>
                            {reply.subject && (
                              <Typography
                                variant="body2"
                                fontWeight={600}
                                mb={0.5}
                              >
                                {reply.subject}
                              </Typography>
                            )}
                            <Typography variant="body2">
                              {reply.contents}
                            </Typography>
                            {reply.uploadFiles && (
                              <Typography
                                component="a"
                                href={reply.uploadFiles}
                                target="_blank"
                                rel="noopener noreferrer"
                                sx={{
                                  display: "block",
                                  mt: 0.5,
                                  fontSize: "0.75rem",
                                  color: "primary.main",
                                  textDecoration: "underline",
                                }}
                              >
                                📎 View Attachment
                              </Typography>
                            )}
                          </Box>
                        ))}
                      </Box>
                    </>
                  )}
                </CardContent>
              </Card>
            ))}
          </Box>
        )}
      </Box>
    </Modal>
  );
}
