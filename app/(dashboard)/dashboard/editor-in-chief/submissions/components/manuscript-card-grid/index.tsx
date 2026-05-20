import { Box, Grid } from "@mui/material";
import { useState } from "react";

import SectionModal from "@/app/(dashboard)/dashboard/managing-editor/sections/components/section-dialog";
import { assignManuscriptReviewer, assignManuscriptSection, assignSuggestedReviewer, unassignReviewer } from "@/app/api/manuscript/assign-manuscript";
import { ManuscriptProps } from "@/types";

import CEManuscriptCard from "../manuscript-card";
import useNotification from "@/hooks/useNotification";
import ReviewerModal from "@/app/(dashboard)/dashboard/section-editor/submissions/components/reviewer-dialog";
import ChiefEditorReviewViewerModal from "../ChiefEditorReviewViewerModal";

interface Props {
  manuscripts: ManuscriptProps[];
  refetch: () => void;
}

export default function ManuscriptCardGrid({ manuscripts, refetch }: Props) {
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

  // Updated handleAssignSection using the new function
  const handleAssignSection = async (sectionId: string) => {
    if (!selectedManuscript) return;

    const payload = {
      manuscriptId: selectedManuscript.id,
      sectionId,
    };

    try {
      await assignManuscriptSection(payload);
      notify("Section assigned successfully", { mode: "success" });
      refetch();
    } catch (error) {
      notify("Failed to assign section", { mode: "error" });
    } finally {
      setOpenSectionModal(false);
    }
  };

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
        await assignManuscriptReviewer({
          manuscriptId,
          reviewerIds: [reviewerId],
          reviewDueDate,
        });
  
        notify("Reviewer assigned successfully", { mode: "success" });
        refetch();
        setOpenReviewModal(false);
      } catch (error) {
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
      notify("Failed to unassign reviewer", { mode: "error" });
    }
  };

  return (
    <Box sx={{ display: "block" }}>
      <Grid container spacing={2} direction="row">
        {manuscripts.map((manuscript) => (
          <Grid item xs={12} md={6} lg={6} key={manuscript.id}>
            <CEManuscriptCard
              manuscript={manuscript}
              onReviewClick={() => handleReviewClick(manuscript)}
              onSectionClick={() => handleSectionClick(manuscript)}
              onViewReviews={() => handleViewReviews(manuscript)}
              selected={selectedManuscript?.id === manuscript.id}
            />
          </Grid>
        ))}
      </Grid>

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
