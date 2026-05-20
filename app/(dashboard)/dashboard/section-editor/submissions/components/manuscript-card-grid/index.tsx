import { Box, Grid } from "@mui/material";
import { useState } from "react";

import { assignManuscriptReviewer, assignSuggestedReviewer, unassignReviewer } from "@/app/api/manuscript/assign-manuscript";
import { ManuscriptProps } from "@/types";

import SEManuscriptCard from "../manuscript-card";
import ReviewerModal from "../reviewer-dialog";
import ReviewViewerModal from "@/app/(dashboard)/dashboard/common/review-viewer-modal";
import useNotification from "@/hooks/useNotification";

interface Props {
  manuscripts: ManuscriptProps[];
  refetch: () => void;
}

export default function ManuscriptCardGrid({ manuscripts, refetch }: Props) {
  const [selectedManuscript, setSelectedManuscript] =
    useState<ManuscriptProps | null>(null);
  const [openReviewModal, setOpenReviewModal] = useState(false);
  const [openReviewViewer, setOpenReviewViewer] = useState(false);

  const { notify } = useNotification();

  const handleReviewClick = (manuscript: ManuscriptProps) => {
    setSelectedManuscript(manuscript);
    setOpenReviewModal(true);
  };

  const handleViewReviews = (manuscript: ManuscriptProps) => {
    setSelectedManuscript(manuscript);
    setOpenReviewViewer(true);
  };

  const handleAssignReviewer = async (
    reviewerId: string,
    manuscriptId: string,
    reviewDueDate: string,
  ) => {
    try {
      const response = await assignManuscriptReviewer({
        manuscriptId,
        reviewerIds: [reviewerId],
        reviewDueDate,
      });

      notify("Reviewer assigned successfully", { mode: "success" });
      refetch();
      setOpenReviewModal(false);
    } catch (error) {
      console.error(`Error assigning reviewer:`, error);
      notify("Failed to assign reviewer", { mode: "error" });
    }
  };

  const handleAssignSuggestedReviewer = async (payload: {
    suggestedReviewerId: string;
    sectionId: string;
    reviewDueDate: string;
  }) => {
    try {
      await assignSuggestedReviewer(payload);
      notify("Suggested reviewer added & assigned successfully", { mode: "success" });
      refetch();
      setOpenReviewModal(false);
    } catch (error) {
      console.error("Error assigning suggested reviewer:", error);
      notify("Failed to assign suggested reviewer", { mode: "error" });
    }
  };

  const handleUnassignReviewer = async (
    reviewerId: string,
    manuscriptId: string,
  ) => {
    try {
      await unassignReviewer(manuscriptId, { reviewerIds: [reviewerId] });
      notify("Reviewer unassigned successfully", { mode: "success" });
      refetch();
      setOpenReviewModal(false);
    } catch (error) {
      console.error("Error unassigning reviewer:", error);
      notify("Failed to unassign reviewer", { mode: "error" });
    }
  };

  return (
    <Box sx={{ display: "block" }}>
      <Grid container spacing={2} direction="row">
        {manuscripts.map((manuscript) => (
          <Grid item xs={12} md={6} lg={6} key={manuscript.id}>
            <SEManuscriptCard
              manuscript={manuscript}
              onReviewClick={() => handleReviewClick(manuscript)}
              onViewReviews={() => handleViewReviews(manuscript)}
              selected={selectedManuscript?.id === manuscript.id}
            />
          </Grid>
        ))}
      </Grid>
      {selectedManuscript && (
        <ReviewerModal
          manuscript={selectedManuscript}
          open={openReviewModal}
          onClose={() => setOpenReviewModal(false)}
          onAssign={handleAssignReviewer}
          onAssignSuggested={handleAssignSuggestedReviewer}
          onUnassign={handleUnassignReviewer}
        />
      )}
      {selectedManuscript && (
        <ReviewViewerModal
          manuscriptId={selectedManuscript.id}
          manuscriptTitle={selectedManuscript.title}
          preloadedReviews={selectedManuscript.Review}
          open={openReviewViewer}
          onClose={() => setOpenReviewViewer(false)}
        />
      )}
    </Box>
  );
}
