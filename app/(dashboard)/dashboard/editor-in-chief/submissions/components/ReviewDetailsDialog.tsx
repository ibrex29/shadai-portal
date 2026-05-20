"use client";

import React from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Box,
  Typography,
  Chip,
  Divider,
  CircularProgress,
  IconButton,
  Avatar,
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { Review, Reply } from "@/types";
import { getReviewById } from "@/app/api/reviewer";
import useNotification from "@/hooks/useNotification";

interface ReviewDetailsDialogProps {
  open: boolean;
  onClose: () => void;
  reviewId: string | null;
}

interface TabPanelProps {
  children?: React.ReactNode;
  index: number;
  value: number;
}

const TabPanel: React.FC<TabPanelProps> = ({ children, value, index }) => {
  return (
    <div
      role="tabpanel"
      hidden={value !== index}
      id={`review-tabpanel-${index}`}
      aria-labelledby={`review-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

const ReviewDetailsDialog: React.FC<ReviewDetailsDialogProps> = ({
  open,
  onClose,
  reviewId,
}) => {
  const [review, setReview] = React.useState<Review | null>(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState<string | null>(null);
  const [tabValue, setTabValue] = React.useState(0);
  const { notify } = useNotification();

  const fetchReviewDetails = React.useCallback(async () => {
    if (!reviewId) return;
    
    setLoading(true);
    setError(null);
    try {
      const response = await getReviewById(reviewId);
      if ("error" in response) {
        setError(response.error);
      } else {
        setReview(response);
      }
    } catch (err) {
      setError("Failed to load review details");
    } finally {
      setLoading(false);
    }
  }, [reviewId]);

  React.useEffect(() => {
    if (reviewId && open) {
      fetchReviewDetails();
      setTabValue(0); // Reset to first tab when opening
    }
  }, [reviewId, open, fetchReviewDetails]);

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  const formatDate = (dateString: string) => {
    return new Date(dateString).toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
    });
  };

  const getRecommendationColor = (recommendation: string) => {
    switch (recommendation) {
      case "ACCEPT":
        return { bg: "#D1FAE5", color: "#065F46" };
      case "REJECT":
        return { bg: "#FEE2E2", color: "#991B1B" };
      case "MINOR_REVISIONS":
        return { bg: "#DBEAFE", color: "#1E40AF" };
      case "MAJOR_REVISIONS":
        return { bg: "#FEF3C7", color: "#92400E" };
      default:
        return { bg: "#E5E7EB", color: "#374151" };
    }
  };

  const renderChecklistItem = (label: string, value: string) => {
    const getChecklistColor = (val: string) => {
      switch (val) {
        case "YES":
          return { bg: "#D1FAE5", color: "#065F46" };
        case "CAN_BE_IMPROVED":
          return { bg: "#DBEAFE", color: "#1E40AF" };
        case "MUST_BE_IMPROVED":
          return { bg: "#FEF3C7", color: "#92400E" };
        case "NOT_APPLICABLE":
          return { bg: "#F3F4F6", color: "#6B7280" };
        case "FINE":
          return { bg: "#D1FAE5", color: "#065F46" };
        case "NEEDS_IMPROVEMENT":
          return { bg: "#FEF3C7", color: "#92400E" };
        default:
          return { bg: "#E5E7EB", color: "#374151" };
      }
    };

    const colors = getChecklistColor(value);
    return (
      <Box sx={{ display: "flex", justifyContent: "space-between", py: 1.5 }}>
        <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
          {label}
        </Typography>
        <Chip
          label={value.replace(/_/g, " ")}
          size="small"
          sx={{
            backgroundColor: colors.bg,
            color: colors.color,
            fontWeight: 600,
            fontSize: "11px",
          }}
        />
      </Box>
    );
  };

  return (
    <Dialog
      open={open}
      onClose={onClose}
      maxWidth="md"
      fullWidth
      PaperProps={{
        sx: {
          borderRadius: 2,
          maxHeight: "90vh",
        },
      }}
    >
      <DialogTitle
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          pb: 2,
        }}
      >
        <Typography variant="h6" sx={{ fontWeight: 600 }}>
          Review Details
        </Typography>
        <IconButton onClick={onClose} size="small">
          <CloseIcon />
        </IconButton>
      </DialogTitle>
      
      <Divider />

      <DialogContent sx={{ p: 0 }}>
        {loading ? (
          <Box
            sx={{
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              minHeight: "200px",
            }}
          >
            <CircularProgress />
          </Box>
        ) : error ? (
          <Box
            sx={{
              textAlign: "center",
              py: 4,
              color: "error.main",
            }}
          >
            <Typography>{error}</Typography>
          </Box>
        ) : review ? (
          <Box>
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider" }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="review tabs">
                <Tab label="Review Details" id="review-tab-0" aria-controls="review-tabpanel-0" />
                <Tab 
                  label={`Conversation ${review.Reply && review.Reply.length > 0 ? `(${review.Reply.length})` : ""}`}
                  id="review-tab-1" 
                  aria-controls="review-tabpanel-1" 
                />
              </Tabs>
            </Box>

            {/* Tab Panel 1: Review Details */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ p: 3 }}>
            {/* Manuscript Information */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ fontSize: "12px", fontWeight: 600, color: "text.secondary", mb: 1 }}
              >
                MANUSCRIPT
              </Typography>
              <Typography sx={{ fontSize: "16px", fontWeight: 600, mb: 1 }}>
                {review.Manuscript?.title || "Untitled"}
              </Typography>
              <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                Author: {review.Manuscript?.authorName || "Unknown"}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Reviewer Information */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ fontSize: "12px", fontWeight: 600, color: "text.secondary", mb: 1 }}
              >
                REVIEWER
              </Typography>
              <Typography sx={{ fontSize: "14px" }}>
                {review.Reviewer?.User
                  ? `${review.Reviewer.User.firstName} ${review.Reviewer.User.lastName}`
                  : review.Reviewer?.User?.email || "Unknown"}
              </Typography>
              <Typography sx={{ fontSize: "13px", color: "text.secondary", mt: 0.5 }}>
                Reviewed on: {formatDate(review.reviewDate)}
              </Typography>
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Recommendation */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ fontSize: "12px", fontWeight: 600, color: "text.secondary", mb: 1 }}
              >
                RECOMMENDATION
              </Typography>
              <Chip
                label={review.recommendation.replace(/_/g, " ")}
                sx={{
                  backgroundColor: getRecommendationColor(review.recommendation).bg,
                  color: getRecommendationColor(review.recommendation).color,
                  fontWeight: 600,
                  fontSize: "13px",
                  px: 1,
                  py: 2,
                }}
              />
            </Box>

            <Divider sx={{ my: 3 }} />

            {/* Comments */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{ fontSize: "12px", fontWeight: 600, color: "text.secondary", mb: 1 }}
              >
                COMMENTS FOR AUTHOR
              </Typography>
              <Box
                sx={{
                  p: 2,
                  backgroundColor: "grey.50",
                  borderRadius: 1,
                  border: "1px solid",
                  borderColor: "grey.200",
                }}
              >
                <Typography sx={{ fontSize: "14px", whiteSpace: "pre-wrap" }}>
                  {review.comments || "No comments provided"}
                </Typography>
              </Box>
            </Box>

            {/* Comments for Editors */}
            {review.commentsForEditors && (
              <Box sx={{ mb: 3 }}>
                <Typography
                  sx={{ fontSize: "12px", fontWeight: 600, color: "text.secondary", mb: 1 }}
                >
                  CONFIDENTIAL COMMENTS FOR EDITORS
                </Typography>
                <Box
                  sx={{
                    p: 2,
                    backgroundColor: "#FEF3C7",
                    borderRadius: 1,
                    border: "1px solid #F59E0B",
                  }}
                >
                  <Typography sx={{ fontSize: "14px", whiteSpace: "pre-wrap" }}>
                    {review.commentsForEditors}
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Checklist */}
            {review.checklist && (
              <>
                <Divider sx={{ my: 3 }} />
                <Box sx={{ mb: 3 }}>
                  <Typography
                    sx={{ fontSize: "12px", fontWeight: 600, color: "text.secondary", mb: 2 }}
                  >
                    REVIEW CHECKLIST
                  </Typography>
                  <Box
                    sx={{
                      border: "1px solid",
                      borderColor: "grey.200",
                      borderRadius: 1,
                      px: 2,
                    }}
                  >
                    {review.checklist.introduction &&
                      renderChecklistItem("Introduction", review.checklist.introduction)}
                    {review.checklist.researchDesign &&
                      renderChecklistItem("Research Design", review.checklist.researchDesign)}
                    {review.checklist.methods &&
                      renderChecklistItem("Methods", review.checklist.methods)}
                    {review.checklist.results &&
                      renderChecklistItem("Results", review.checklist.results)}
                    {review.checklist.conclusions &&
                      renderChecklistItem("Conclusions", review.checklist.conclusions)}
                    {review.checklist.figuresAndTables &&
                      renderChecklistItem("Figures & Tables", review.checklist.figuresAndTables)}
                    {review.checklist.englishQuality &&
                      renderChecklistItem("English Quality", review.checklist.englishQuality)}
                  </Box>
                </Box>
              </>
            )}

            {/* Additional Information */}
            <Divider sx={{ my: 3 }} />
            <Box>
              <Typography
                sx={{ fontSize: "12px", fontWeight: 600, color: "text.secondary", mb: 2 }}
              >
                ADDITIONAL INFORMATION
              </Typography>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 1 }}>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                    AI Declaration Confirmed:
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                    {review.aiDeclarationConfirmed ? "Yes" : "No"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                    Notify on Final Status:
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                    {review.notifyOnFinalStatus ? "Yes" : "No"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                    Can Author View:
                  </Typography>
                  <Typography sx={{ fontSize: "14px", fontWeight: 500 }}>
                    {review.canAuthorView ? "Yes" : "No"}
                  </Typography>
                </Box>
                <Box sx={{ display: "flex", justifyContent: "space-between" }}>
                  <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                    Status:
                  </Typography>
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
                </Box>
              </Box>
            </Box>
              </Box>
            </TabPanel>

            {/* Tab Panel 2: Conversation */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ p: 3 }}>
                <Typography
                  sx={{ fontSize: "12px", fontWeight: 600, color: "text.secondary", mb: 2 }}
                >
                  CONVERSATION / REPLIES
                </Typography>

                {/* Display existing replies */}
                {review.Reply && review.Reply.length > 0 ? (
                  <Box sx={{ maxHeight: "500px", overflowY: "auto" }}>
                    {review.Reply.map((reply: Reply) => (
                      <Box
                        key={reply.id}
                        sx={{
                          mb: 2,
                          p: 2,
                          backgroundColor: reply.isAuthor ? "#E3F2FD" : "#F5F5F5",
                          borderRadius: 2,
                          border: "1px solid",
                          borderColor: reply.isAuthor ? "#90CAF9" : "grey.300",
                        }}
                      >
                        <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                          <Avatar
                            sx={{
                              width: 32,
                              height: 32,
                              bgcolor: reply.isAuthor ? "primary.main" : "grey.600",
                              mr: 1,
                              fontSize: "14px",
                            }}
                          >
                            {reply.isAuthor ? "A" : "E"}
                          </Avatar>
                          <Box sx={{ flex: 1 }}>
                            <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                              {reply.isAuthor ? "Author" : "Editor"}
                            </Typography>
                            <Typography sx={{ fontSize: "11px", color: "text.secondary" }}>
                              {new Date(reply.createdAt).toLocaleString("en-US", {
                                year: "numeric",
                                month: "short",
                                day: "numeric",
                                hour: "2-digit",
                                minute: "2-digit",
                              })}
                            </Typography>
                          </Box>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: "13px",
                            fontWeight: 600,
                            mb: 0.5,
                            color: "text.primary",
                          }}
                        >
                          {reply.subject}
                        </Typography>
                        <Typography sx={{ fontSize: "13px", whiteSpace: "pre-wrap" }}>
                          {reply.contents}
                        </Typography>
                      </Box>
                    ))}
                  </Box>
                ) : (
                  <Box
                    sx={{
                      p: 4,
                      textAlign: "center",
                      backgroundColor: "grey.50",
                      borderRadius: 2,
                    }}
                  >
                    <Typography sx={{ fontSize: "14px", color: "text.secondary" }}>
                      No conversation yet.
                    </Typography>
                  </Box>
                )}
              </Box>
            </TabPanel>
          </Box>
        ) : null}
      </DialogContent>

      <Divider />

      <DialogActions sx={{ px: 3, py: 2 }}>
        <Button onClick={onClose} variant="outlined" sx={{ textTransform: "none" }}>
          Close
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default ReviewDetailsDialog;
