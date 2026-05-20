"use client";

import {
  Box,
  Button,
  Chip,
  Paper,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
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
import { truncateText } from "@/utils";
import { fDate } from "@/utils/format-time";

interface Props {
  manuscripts: ManuscriptProps[];
  refetch: () => void;
}

export default function CEManuscriptTableView({ manuscripts, refetch }: Props) {
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
    <Box sx={{ overflowX: "auto" }}>
      <Paper
        elevation={2}
        sx={{
          borderRadius: 2,
          border: "1px solid",
          borderColor: "grey.300",
          overflow: "hidden",
        }}
      >
        <Table>
          <TableHead>
            <TableRow sx={{ backgroundColor: "grey.100" }}>
              <TableCell sx={{ fontWeight: "bold" }}>Title</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Author</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Keywords</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Section</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Submitted</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {manuscripts.map((m) => {
              const reviewCompleted = m.ActionLog?.some(
                (log) => log?.action === "REVIEW_COMPLETED",
              );

              return (
              <TableRow
                key={m.id}
                hover
                sx={{
                  "&:last-child td, &:last-child th": { border: 0 },
                  borderBottom: "1px solid",
                  borderColor: "grey.200",
                }}
              >
                <TableCell>
                  <Typography fontWeight="bold" fontSize="14px">
                    {truncateText(m.title, 50)}
                  </Typography>
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>{m.authorName}</TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {truncateText(m.keywords, 30)}
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {m.Section?.name ?? (
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontStyle="italic"
                    >
                      Unassigned
                    </Typography>
                  )}
                </TableCell>
                <TableCell>
                  <Box display="flex" gap={0.8} flexWrap="wrap" alignItems="center">
                    <Chip
                      label={m.status || "Submitted"}
                      size="small"
                      color="primary"
                      sx={{ fontSize: "0.75rem" }}
                    />
                    {reviewCompleted && (
                      <Chip
                        label="Review Completed"
                        icon={<CheckCircleOutlineIcon sx={{ fontSize: 14 }} />}
                        size="small"
                        color="success"
                        variant="outlined"
                        sx={{ fontSize: "0.75rem" }}
                      />
                    )}
                  </Box>
                </TableCell>
                <TableCell sx={{ fontSize: "14px" }}>
                  {fDate(new Date(m.createdAt))}
                </TableCell>
                <TableCell align="right">
                  <Box display="flex" gap={1} justifyContent="flex-end" flexWrap="wrap">
                    {m.Document?.[0]?.manuscriptLink && (
                      <Typography
                        component="a"
                        href={m.Document[0].manuscriptLink}
                        target="_blank"
                        rel="noopener noreferrer"
                        sx={{
                          color: "primary.main",
                          textDecoration: "none",
                          fontSize: "12px",
                          alignSelf: "center",
                          "&:hover": { textDecoration: "underline" },
                        }}
                      >
                        Manuscript
                      </Typography>
                    )}
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
                  </Box>
                </TableCell>
              </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </Paper>

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
