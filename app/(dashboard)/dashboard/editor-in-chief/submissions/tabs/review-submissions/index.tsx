"use client";

import React from "react";
import {
  Box,
  Paper,
  Chip,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Button,
  Typography,
  CircularProgress,
  Pagination,
  Select,
  MenuItem,
  FormControl,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import VisibilityIcon from "@mui/icons-material/Visibility";
import { useFetchPendingApprovalReviews } from "@/app/(dashboard)/hooks/useFetchAllReviews";
import { approveReview } from "@/app/api/reviewer";
import useNotification from "@/hooks/useNotification";
import ManuscriptSubHeader from "@/app/components/@dashboard/components/@dashboard/common/sub-header/my-manuscript";
import noManuscriptIcon from "@/public/images/no-tickets.svg";
import Image from "next/image";
import { Review } from "@/types";
import ReviewDetailsDialog from "../../components/ReviewDetailsDialog";

/**
 * Review Submission Tab Component
 * Shows reviews waiting for Editor-in-Chief approval in table format with pagination
 */
const PendingApprovalsTab: React.FC = () => {
  const [approvingIds, setApprovingIds] = React.useState<Set<string>>(new Set());
  const [page, setPage] = React.useState(1);
  const [limit, setLimit] = React.useState(10);
  const [selectedReviewId, setSelectedReviewId] = React.useState<string | null>(null);
  const [dialogOpen, setDialogOpen] = React.useState(false);
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
      setApprovingIds((prev) => new Set(prev).add(reviewId));
      const result = await approveReview(reviewId);

      if (result.success) {
        notify(result.message || "Review approved successfully", {
          mode: "success",
        });
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
      setApprovingIds((prev) => {
        const newSet = new Set(prev);
        newSet.delete(reviewId);
        return newSet;
      });
    }
  };

  const handleViewDetails = (reviewId: string) => {
    setSelectedReviewId(reviewId);
    setDialogOpen(true);
  };

  const handleCloseDialog = () => {
    setDialogOpen(false);
    setSelectedReviewId(null);
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
      <Box
        sx={{
          display: "flex",
          justifyContent: "center",
          alignItems: "center",
          minHeight: "400px",
        }}
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      <ManuscriptSubHeader
        title="Pending Review Approvals"
        subtitle={`${pendingCount} review${pendingCount !== 1 ? "s" : ""} awaiting your approval`}
      />

      <Paper
        sx={{
          backgroundColor: "white",
          py: 3,
          mx: "-30px",
          px: "30px",
          my: 0,
          boxShadow: "none",
          borderColor: "grey.300",
        }}
      >
        {/* Summary Banner */}
        {availableReviews && (
          <Paper
            sx={{
              backgroundColor: "#FEF3C7",
              border: "1px solid #F59E0B",
              borderRadius: 2,
              p: 2,
              mb: 3,
              display: "flex",
              alignItems: "center",
              gap: 2,
            }}
          >
            <Box sx={{ flex: 1 }}>
              <Box
                sx={{
                  fontSize: "14px",
                  fontWeight: 600,
                  color: "#92400E",
                  mb: 0.5,
                }}
              >
                Action Required
              </Box>
              <Box sx={{ fontSize: "13px", color: "#78350F" }}>
                {pendingCount} review{pendingCount !== 1 ? "s" : ""} waiting for your approval
              </Box>
            </Box>
            <Chip
              label={`${pendingCount} Pending`}
              sx={{
                backgroundColor: "#F59E0B",
                color: "white",
                fontWeight: 600,
                fontSize: "12px",
              }}
            />
          </Paper>
        )}

        {/* Reviews Table */}
        {availableReviews ? (
          <TableContainer
            component={Paper}
            sx={{
              border: "1px solid",
              borderColor: "grey.300",
              borderRadius: 2,
              overflow: "hidden",
            }}
          >
            <Table sx={{ minWidth: 650 }}>
              <TableHead>
                <TableRow sx={{ backgroundColor: "grey.100" }}>
                  <TableCell sx={{ fontWeight: 600, fontSize: "14px" }}>
                    Manuscript Title
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: "14px" }}>
                    Author
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: "14px" }}>
                    Reviewer
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: "14px" }}>
                    Recommendation
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: "14px" }}>
                    Review Date
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: "14px" }} align="center">
                    Status
                  </TableCell>
                  <TableCell sx={{ fontWeight: 600, fontSize: "14px" }} align="center">
                    Action
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {reviews.map((review: Review) => (
                  <TableRow
                    key={review.id}
                    sx={{
                      "&:hover": { backgroundColor: "grey.50", cursor: "pointer" },
                      "&:last-child td, &:last-child th": { border: 0 },
                    }}
                  >
                    <TableCell onClick={() => handleViewDetails(review.id)}>
                      <Typography
                        sx={{
                          fontSize: "14px",
                          fontWeight: 500,
                          color: "text.primary",
                          maxWidth: "300px",
                          overflow: "hidden",
                          textOverflow: "ellipsis",
                          whiteSpace: "nowrap",
                        }}
                      >
                        {review.Manuscript?.title || "Untitled"}
                      </Typography>
                    </TableCell>
                    <TableCell onClick={() => handleViewDetails(review.id)}>
                      <Typography sx={{ fontSize: "13px" }}>
                        {review.Manuscript?.authorName || "Unknown"}
                      </Typography>
                    </TableCell>
                    <TableCell onClick={() => handleViewDetails(review.id)}>
                      <Typography sx={{ fontSize: "13px" }}>
                        {review.Reviewer?.User
                          ? `${review.Reviewer.User.firstName} ${review.Reviewer.User.lastName}`
                          : review.Reviewer?.User?.email || "Unknown"}
                      </Typography>
                    </TableCell>
                    <TableCell onClick={() => handleViewDetails(review.id)}>
                      <Chip
                        label={review.recommendation.replace(/_/g, " ")}
                        size="small"
                        sx={{
                          backgroundColor:
                            review.recommendation === "ACCEPT"
                              ? "#D1FAE5"
                              : review.recommendation === "REJECT"
                              ? "#FEE2E2"
                              : review.recommendation === "MINOR_REVISIONS"
                              ? "#DBEAFE"
                              : "#FEF3C7",
                          color:
                            review.recommendation === "ACCEPT"
                              ? "#065F46"
                              : review.recommendation === "REJECT"
                              ? "#991B1B"
                              : review.recommendation === "MINOR_REVISIONS"
                              ? "#1E40AF"
                              : "#92400E",
                          fontWeight: 600,
                          fontSize: "11px",
                        }}
                      />
                    </TableCell>
                    <TableCell onClick={() => handleViewDetails(review.id)}>
                      <Typography sx={{ fontSize: "13px", color: "text.secondary" }}>
                        {formatDate(review.reviewDate)}
                      </Typography>
                    </TableCell>
                    <TableCell align="center" onClick={() => handleViewDetails(review.id)}>
                      <Chip
                        label={review.status.replace(/_/g, " ")}
                        size="small"
                        sx={{
                          backgroundColor: "#FEF3C7",
                          color: "#92400E",
                          fontWeight: 600,
                          fontSize: "11px",
                        }}
                      />
                    </TableCell>
                    <TableCell align="center">
                      <Box sx={{ display: "flex", gap: 1, justifyContent: "center" }}>
                        <Button
                          variant="outlined"
                          size="small"
                          startIcon={<VisibilityIcon />}
                          onClick={() => handleViewDetails(review.id)}
                          sx={{
                            textTransform: "none",
                            fontSize: "12px",
                            fontWeight: 600,
                            px: 2,
                          }}
                        >
                          View
                        </Button>
                        <Button
                          variant="contained"
                          size="small"
                          startIcon={
                            approvingIds.has(review.id) ? (
                              <CircularProgress size={16} color="inherit" />
                            ) : (
                              <CheckCircleOutlineIcon />
                            )
                          }
                          onClick={() => handleApproveReview(review.id)}
                          disabled={approvingIds.has(review.id)}
                          sx={{
                            textTransform: "none",
                            backgroundColor: "#10B981",
                            "&:hover": {
                              backgroundColor: "#059669",
                            },
                            fontSize: "12px",
                            fontWeight: 600,
                            px: 2,
                          }}
                        >
                          {approvingIds.has(review.id) ? "Approving..." : "Approve"}
                        </Button>
                      </Box>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        ) : (
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              minHeight: "400px",
              textAlign: "center",
            }}
          >
            <Image
              src={noManuscriptIcon}
              alt="No review submissions"
              width={200}
              height={200}
              style={{ opacity: 0.5 }}
            />
            <Box
              sx={{
                mt: 3,
                fontSize: "18px",
                fontWeight: 600,
                color: "text.secondary",
              }}
            >
              No Review Submissions
            </Box>
            <Box
              sx={{
                mt: 1,
                fontSize: "14px",
                color: "text.secondary",
                maxWidth: "400px",
              }}
            >
              All reviews have been approved or there are no reviews waiting for
              your approval at this time.
            </Box>
          </Box>
        )}

        {/* Pagination Controls */}
        {availableReviews && meta && meta.pageCount > 1 && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: 3,
              pt: 2,
              borderTop: "1px solid",
              borderColor: "grey.300",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
              <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                Rows per page:
              </Typography>
              <FormControl size="small">
                <Select
                  value={limit}
                  onChange={(e) => {
                    setLimit(Number(e.target.value));
                    setPage(1); // Reset to first page when changing limit
                  }}
                  sx={{ fontSize: "14px" }}
                >
                  <MenuItem value={5}>5</MenuItem>
                  <MenuItem value={10}>10</MenuItem>
                  <MenuItem value={25}>25</MenuItem>
                  <MenuItem value={50}>50</MenuItem>
                </Select>
              </FormControl>
              <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                {meta.itemCount === 0
                  ? "No items"
                  : `${(page - 1) * limit + 1}-${Math.min(page * limit, meta.itemCount)} of ${meta.itemCount}`}
              </Typography>
            </Box>
            <Pagination
              count={meta.pageCount}
              page={page}
              onChange={(_, newPage) => setPage(newPage)}
              color="primary"
              shape="rounded"
              showFirstButton
              showLastButton
            />
          </Box>
        )}
      </Paper>

      {/* Review Details Dialog */}
      <ReviewDetailsDialog
        open={dialogOpen}
        onClose={handleCloseDialog}
        reviewId={selectedReviewId}
      />
    </Box>
  );
};

export default PendingApprovalsTab;
