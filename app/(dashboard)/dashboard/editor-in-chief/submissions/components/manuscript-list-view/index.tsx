"use client";

import {
  Avatar,
  Box,
  Button,
  Chip,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import { useState } from "react";

import SectionModal from "@/app/(dashboard)/dashboard/managing-editor/sections/components/section-dialog";
import ReviewerModal from "@/app/(dashboard)/dashboard/section-editor/submissions/components/reviewer-dialog";
import ChiefEditorReviewViewerModal from "../ChiefEditorReviewViewerModal";
import {
  assignManuscriptReviewer,
  assignManuscriptSection,
  assignSuggestedReviewer,
  unassignReviewer,
} from "@/app/api/manuscript/assign-manuscript";
import useNotification from "@/hooks/useNotification";
import { ManuscriptProps } from "@/types";
import { getInitials, truncateText } from "@/utils";
import { fDate } from "@/utils/format-time";

interface Props {
  manuscripts: ManuscriptProps[];
  refetch: () => void;
}

export default function CEManuscriptListView({ manuscripts, refetch }: Props) {
  const [selectedManuscript, setSelectedManuscript] =
    useState<ManuscriptProps | null>(null);
  const [openSectionModal, setOpenSectionModal] = useState(false);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openReviewViewer, setOpenReviewViewer] = useState(false);

  const { notify } = useNotification();

  const handleSectionClick = (manuscript: ManuscriptProps) => {
    setSelectedManuscript(manuscript);
    setOpenSectionModal(true);
  };

  const handleReviewClick = (manuscript: ManuscriptProps) => {
    setSelectedManuscript(manuscript);
    setOpenReviewModal(true);
  };

  const handleViewReviews = (manuscript: ManuscriptProps) => {
    setSelectedManuscript(manuscript);
    setOpenReviewViewer(true);
  };

  const handleAssignSection = async (sectionId: string) => {
    if (!selectedManuscript) return;
    try {
      await assignManuscriptSection({
        manuscriptId: selectedManuscript.id,
        sectionId,
      });
      refetch();
    } catch (error) {
      console.error("Failed to assign section:", error);
    } finally {
      setOpenSectionModal(false);
    }
  };

  const handleAssignReviewer = async (
    reviewerId: string,
    manuscriptId: string,
    reviewDueDate: string,
  ) => {
    try {
      await assignManuscriptReviewer({
        manuscriptId,
        reviewerIds: [reviewerId],
        reviewDueDate,
      });
      notify("Reviewer assigned successfully");
      refetch();
      setOpenReviewModal(false);
    } catch (error) {
      notify("Failed to assign reviewer");
    }
  };

  const handleAssignSuggestedReviewer = async (payload: {
    suggestedReviewerId: string;
    sectionId: string;
    reviewDueDate: string;
  }) => {
    try {
      await assignSuggestedReviewer(payload);
      notify("Suggested reviewer added & assigned successfully");
      refetch();
      setOpenReviewModal(false);
    } catch (error) {
      notify("Failed to assign suggested reviewer");
    }
  };

  const handleUnassignReviewer = async (
    reviewerId: string,
    manuscriptId: string,
  ) => {
    try {
      await unassignReviewer(manuscriptId, { reviewerIds: [reviewerId] });
      notify("Reviewer unassigned successfully");
      refetch();
      setOpenReviewModal(false);
    } catch (error) {
      notify("Failed to unassign reviewer");
    }
  };

  return (
    <Box>
      <List sx={{ p: 0 }}>
        {manuscripts.map((m, idx) => {
          const reviewCompleted = m.ActionLog?.some(
            (log) => log?.action === "REVIEW_COMPLETED",
          );

          return (
          <Paper
            key={m.id}
            elevation={1}
            sx={{
              mb: 2,
              border: "1px solid",
              borderColor: "grey.200",
              borderRadius: 2,
              overflow: "hidden",
              transition: "0.3s",
              "&:hover": {
                boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
                borderColor: "primary.main",
              },
            }}
          >
            <ListItem alignItems="flex-start" sx={{ px: 2, py: 2 }}>
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {getInitials((m.authorName ?? "").toUpperCase())}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1} flexWrap="wrap">
                    <Typography fontWeight="bold">
                      {truncateText(m.title, 80)}
                    </Typography>
                    <Chip
                      label={m.status || "Submitted"}
                      size="small"
                      color="primary"
                      sx={{ fontSize: "0.75rem", height: 22 }}
                    />
                    {m.sectionId && (
                      <Chip
                        label={m.Section?.name ?? "Sectioned"}
                        size="small"
                        color="secondary"
                        variant="outlined"
                        sx={{ fontSize: "0.75rem", height: 22 }}
                      />
                    )}
                    {reviewCompleted && (
                      <Chip
                        label="Review Completed"
                        icon={<CheckCircleOutlineIcon sx={{ fontSize: 14 }} />}
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ fontSize: "0.75rem", height: 22 }}
                      />
                    )}
                  </Box>
                }
                secondary={
                  <Box display="flex" flexDirection="column" gap={0.5} mt={0.5}>
                    <Typography variant="body2" color="text.secondary">
                      Author: <b>{m.authorName}</b>{" "}
                      {m.coAuthor && `| Co-Authors: ${m.coAuthor}`}
                    </Typography>
                    <Typography variant="body2" color="text.secondary">
                      Submitted: {fDate(new Date(m.createdAt))}
                    </Typography>
                    {m.keywords && (
                      <Typography
                        variant="caption"
                        color="text.secondary"
                        sx={{ fontStyle: "italic" }}
                      >
                        Keywords: {truncateText(m.keywords, 60)}
                      </Typography>
                    )}
                  </Box>
                }
              />

              <Stack direction="row" spacing={1} alignItems="center" flexShrink={0} ml={2}>
                <Button
                  variant="text"
                  color="secondary"
                  size="small"
                  onClick={() => handleViewReviews(m)}
                  sx={{ borderRadius: "16px", textTransform: "none", fontSize: "12px" }}
                >
                  View Reviews
                </Button>
                <Button
                  variant="outlined"
                  size="small"
                  onClick={() => handleReviewClick(m)}
                  sx={{ borderRadius: "16px", textTransform: "none", fontSize: "12px" }}
                >
                  Assign Reviewer
                </Button>
                <Button
                  variant={m.sectionId ? "outlined" : "contained"}
                  color={m.sectionId ? "secondary" : "primary"}
                  size="small"
                  onClick={() => handleSectionClick(m)}
                  sx={{ borderRadius: "16px", textTransform: "none", fontSize: "12px" }}
                >
                  {m.sectionId ? "Reassign Section" : "Assign Section"}
                </Button>
              </Stack>
            </ListItem>
            {idx < manuscripts.length - 1 && <Divider />}
          </Paper>
          );
        })}
      </List>

      {selectedManuscript && (
        <SectionModal
          manuscript={selectedManuscript}
          open={openSectionModal}
          onClose={() => setOpenSectionModal(false)}
          onAssign={handleAssignSection}
        />
      )}

      {selectedManuscript && (
        <ReviewerModal
          manuscript={selectedManuscript}
          open={openReviewModal}
          onClose={() => setOpenReviewModal(false)}
          reviewerScope="all"
          onAssign={handleAssignReviewer}
          onAssignSuggested={handleAssignSuggestedReviewer}
          onUnassign={handleUnassignReviewer}
        />
      )}

      {selectedManuscript && (
        <ChiefEditorReviewViewerModal
          manuscriptId={selectedManuscript.id}
          manuscriptTitle={selectedManuscript.title}
          open={openReviewViewer}
          onClose={() => setOpenReviewViewer(false)}
          reviews={selectedManuscript.Review}
          actionLogs={selectedManuscript.ActionLog}
        />
      )}
    </Box>
  );
}
