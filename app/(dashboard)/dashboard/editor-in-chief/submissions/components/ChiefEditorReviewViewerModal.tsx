"use client";

import React from "react";
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
  Tabs,
  Tab,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import HistoryIcon from "@mui/icons-material/History";
import RateReviewIcon from "@mui/icons-material/RateReview";
import { useQuery } from "@tanstack/react-query";
import { getReviewsByManuscriptId } from "@/app/api/reviewer";
import { Review, Reply } from "@/types";
import { formatDate } from "@/utils";

interface ChiefEditorReviewViewerModalProps {
  manuscriptId: string;
  manuscriptTitle: string;
  open: boolean;
  onClose: () => void;
  reviews?: Review[]; // Optional: pass reviews directly instead of fetching
  actionLogs?: ActionLogEntry[];
}

interface ActionLogEntry {
  id: string;
  action: string;
  recommendation?: string | null;
  remark?: string | null;
  comments?: string | null;
  commentsForEditors?: string | null;
  performedAt?: string;
  createdByUserId?: string | null;
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
      id={`chief-editor-review-tabpanel-${index}`}
      aria-labelledby={`chief-editor-review-tab-${index}`}
    >
      {value === index && <Box>{children}</Box>}
    </div>
  );
};

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

const formatAction = (action: string) => {
  return action?.replace(/_/g, " ") || "N/A";
};

export default function ChiefEditorReviewViewerModal({
  manuscriptId,
  manuscriptTitle,
  open,
  onClose,
  reviews: providedReviews,
  actionLogs = [],
}: ChiefEditorReviewViewerModalProps) {
  const [tabValue, setTabValue] = React.useState(0);

  const {
    data: fetchedReviews,
    isLoading,
    error,
  } = useQuery<Review[]>({
    queryKey: ["chief-editor-manuscript-reviews", manuscriptId],
    queryFn: () => getReviewsByManuscriptId(manuscriptId),
    enabled: open && !providedReviews, // Only fetch if reviews not provided
  });

  // Use provided reviews if available, otherwise use fetched reviews
  const reviews = providedReviews || fetchedReviews;

  const handleTabChange = (_event: React.SyntheticEvent, newValue: number) => {
    setTabValue(newValue);
  };

  // Reset tab when modal opens
  React.useEffect(() => {
    if (open) {
      setTabValue(0);
    }
  }, [open]);

  // Count total conversations across all reviews
  const totalConversations = React.useMemo(() => {
    if (!reviews) return 0;
    return reviews.reduce((sum, review) => sum + (review.Reply?.length || 0), 0);
  }, [reviews]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          maxWidth: 900,
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
          mb={2}
        >
          <Box>
            <Typography variant="h6" fontWeight={600}>
              Review Management
            </Typography>
            <Typography variant="body2" color="text.secondary" noWrap sx={{ maxWidth: 700 }}>
              {manuscriptTitle}
            </Typography>
          </Box>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        {(isLoading && !providedReviews) ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 3 }}>
            {Array.from({ length: 3 }).map((_, index) => (
              <Skeleton key={index} variant="rounded" height={120} />
            ))}
          </Box>
        ) : (error && !providedReviews) ? (
          <Alert severity="error">Failed to load reviews.</Alert>
        ) : !reviews || reviews.length === 0 ? (
          <Alert severity="info">
            No reviews have been submitted for this manuscript yet.
          </Alert>
        ) : (
          <>
            {/* Tabs */}
            <Box sx={{ borderBottom: 1, borderColor: "divider", mt: 2 }}>
              <Tabs value={tabValue} onChange={handleTabChange} aria-label="chief editor review tabs">
                <Tab 
                  label={`Reviews (${reviews.length})`}
                  id="chief-editor-review-tab-0" 
                  aria-controls="chief-editor-review-tabpanel-0" 
                />
                <Tab 
                  label={`Conversations ${totalConversations > 0 ? `(${totalConversations})` : ""}`}
                  id="chief-editor-review-tab-1" 
                  aria-controls="chief-editor-review-tabpanel-1" 
                />
                <Tab
                  label={`Action Log ${actionLogs.length > 0 ? `(${actionLogs.length})` : ""}`}
                  id="chief-editor-review-tab-2"
                  aria-controls="chief-editor-review-tabpanel-2"
                />
              </Tabs>
            </Box>

            {/* Tab Panel 1: Reviews */}
            <TabPanel value={tabValue} index={0}>
              <Box sx={{ display: "flex", flexDirection: "column", gap: 3, mt: 3 }}>
                {reviews.map((review, index) => (
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
                              {review.Reviewer?.User
                                ? `${review.Reviewer.User.firstName} ${review.Reviewer.User.lastName}`
                                : `Reviewer ${index + 1}`}
                            </Typography>
                            <Typography variant="caption" color="text.secondary">
                              {formatDate(review.reviewDate)}
                            </Typography>
                          </Box>
                        </Box>
                        <Box display="flex" gap={1}>
                          <Chip
                            label={formatRecommendation(review.recommendation)}
                            color={getRecommendationColor(review.recommendation)}
                            size="small"
                            sx={{ fontWeight: 600 }}
                          />
                          <Chip
                            label={review.status?.replace(/_/g, " ") || "N/A"}
                            size="small"
                            variant="outlined"
                          />
                        </Box>
                      </Box>

                      <Divider sx={{ my: 2 }} />

                      {/* Comments for Author */}
                      {review.comments && (
                        <Box mb={2}>
                          <Typography
                            variant="caption"
                            fontWeight={600}
                            color="text.secondary"
                            textTransform="uppercase"
                          >
                            Comments for Author
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              mt: 1,
                              p: 2,
                              backgroundColor: "grey.50",
                              borderRadius: 1,
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {review.comments}
                          </Typography>
                        </Box>
                      )}

                      {/* Comments for Editor */}
                      {review.commentsForEditors && (
                        <Box mb={2}>
                          <Typography
                            variant="caption"
                            fontWeight={600}
                            color="text.secondary"
                            textTransform="uppercase"
                          >
                            Confidential Comments (For Editors Only)
                          </Typography>
                          <Typography
                            variant="body2"
                            sx={{
                              mt: 1,
                              p: 2,
                              backgroundColor: "#FFF9E6",
                              borderRadius: 1,
                              border: "1px solid #FFE082",
                              whiteSpace: "pre-wrap",
                            }}
                          >
                            {review.commentsForEditors}
                          </Typography>
                        </Box>
                      )}

                      {/* Checklist */}
                      {review.checklist && (
                        <Box>
                          <Typography
                            variant="caption"
                            fontWeight={600}
                            color="text.secondary"
                            textTransform="uppercase"
                            mb={1}
                            display="block"
                          >
                            Review Checklist
                          </Typography>
                          <Box
                            sx={{
                              display: "grid",
                              gridTemplateColumns: "1fr 1fr",
                              gap: 1,
                            }}
                          >
                            {Object.entries(review.checklist).map(([key, value]) => (
                              <Box
                                key={key}
                                sx={{
                                  p: 1.5,
                                  backgroundColor: "grey.50",
                                  borderRadius: 1,
                                  fontSize: "13px",
                                }}
                              >
                                <Typography variant="caption" color="text.secondary">
                                  {key.replace(/([A-Z])/g, " $1").trim()}
                                </Typography>
                                <Typography variant="body2" fontWeight={500}>
                                  {String(value).replace(/_/g, " ")}
                                </Typography>
                              </Box>
                            ))}
                          </Box>
                        </Box>
                      )}
                    </CardContent>
                  </Card>
                ))}
              </Box>
            </TabPanel>

            {/* Tab Panel 2: Conversations */}
            <TabPanel value={tabValue} index={1}>
              <Box sx={{ mt: 3 }}>
                {totalConversations === 0 ? (
                  <Alert severity="info">
                    No conversations have been initiated for this manuscript yet.
                  </Alert>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 3 }}>
                    {reviews.map((review, reviewIndex) => {
                      if (!review.Reply || review.Reply.length === 0) return null;

                      return (
                        <Box key={review.id}>
                          <Typography
                            variant="subtitle2"
                            fontWeight={600}
                            color="text.secondary"
                            mb={2}
                            sx={{
                              display: "flex",
                              alignItems: "center",
                              gap: 1,
                            }}
                          >
                            <RateReviewIcon fontSize="small" />
                            Conversations with{" "}
                            {review.Reviewer?.User
                              ? `${review.Reviewer.User.firstName} ${review.Reviewer.User.lastName}`
                              : `Reviewer ${reviewIndex + 1}`}
                          </Typography>

                          <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                            {review.Reply.map((reply: Reply) => (
                              <Box
                                key={reply.id}
                                sx={{
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
                                    {reply.isAuthor ? "A" : "R"}
                                  </Avatar>
                                  <Box sx={{ flex: 1 }}>
                                    <Typography sx={{ fontSize: "13px", fontWeight: 600 }}>
                                      {reply.isAuthor ? "Author" : "Reviewer"}
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
                        </Box>
                      );
                    })}
                  </Box>
                )}
              </Box>
            </TabPanel>

            {/* Tab Panel 3: Action Log */}
            <TabPanel value={tabValue} index={2}>
              <Box sx={{ mt: 3 }}>
                {actionLogs.length === 0 ? (
                  <Alert severity="info">
                    No action log entries found for this manuscript yet.
                  </Alert>
                ) : (
                  <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                    {[...actionLogs]
                      .sort(
                        (a, b) =>
                          new Date(b.performedAt || 0).getTime() -
                          new Date(a.performedAt || 0).getTime(),
                      )
                      .map((log) => (
                        <Card
                          key={log.id}
                          sx={{
                            border: "1px solid",
                            borderColor: "divider",
                            borderRadius: 2,
                          }}
                        >
                          <CardContent>
                            <Box
                              display="flex"
                              justifyContent="space-between"
                              alignItems="center"
                              flexWrap="wrap"
                              gap={1}
                              mb={1.5}
                            >
                              <Box display="flex" alignItems="center" gap={1}>
                                <Avatar sx={{ width: 32, height: 32, bgcolor: "info.main" }}>
                                  <HistoryIcon fontSize="small" />
                                </Avatar>
                                <Typography variant="subtitle2" fontWeight={600}>
                                  {formatAction(log.action)}
                                </Typography>
                              </Box>
                              <Typography variant="caption" color="text.secondary">
                                {log.performedAt ? formatDate(log.performedAt) : "N/A"}
                              </Typography>
                            </Box>

                            <Box display="flex" gap={1} flexWrap="wrap" mb={1.5}>
                              <Chip
                                label={formatAction(log.action)}
                                size="small"
                                variant="outlined"
                              />
                              {log.recommendation && (
                                <Chip
                                  label={formatRecommendation(log.recommendation)}
                                  size="small"
                                  color={getRecommendationColor(log.recommendation)}
                                  sx={{ fontWeight: 600 }}
                                />
                              )}
                            </Box>

                            {log.remark && (
                              <Box mb={1.5}>
                                <Typography
                                  variant="caption"
                                  fontWeight={600}
                                  color="text.secondary"
                                  textTransform="uppercase"
                                >
                                  Remark
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mt: 0.5,
                                    p: 1.5,
                                    backgroundColor: "grey.50",
                                    borderRadius: 1,
                                  }}
                                >
                                  {log.remark}
                                </Typography>
                              </Box>
                            )}

                            {log.comments && (
                              <Box mb={1.5}>
                                <Typography
                                  variant="caption"
                                  fontWeight={600}
                                  color="text.secondary"
                                  textTransform="uppercase"
                                >
                                  Comments
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mt: 0.5,
                                    p: 1.5,
                                    backgroundColor: "grey.50",
                                    borderRadius: 1,
                                    whiteSpace: "pre-wrap",
                                  }}
                                >
                                  {log.comments}
                                </Typography>
                              </Box>
                            )}

                            {log.commentsForEditors && (
                              <Box>
                                <Typography
                                  variant="caption"
                                  fontWeight={600}
                                  color="text.secondary"
                                  textTransform="uppercase"
                                >
                                  Confidential Comments
                                </Typography>
                                <Typography
                                  variant="body2"
                                  sx={{
                                    mt: 0.5,
                                    p: 1.5,
                                    backgroundColor: "#FFF9E6",
                                    borderRadius: 1,
                                    border: "1px solid #FFE082",
                                    whiteSpace: "pre-wrap",
                                  }}
                                >
                                  {log.commentsForEditors}
                                </Typography>
                              </Box>
                            )}
                          </CardContent>
                        </Card>
                      ))}
                  </Box>
                )}
              </Box>
            </TabPanel>
          </>
        )}
      </Box>
    </Modal>
  );
}
