import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";

import { ManuscriptProps } from "@/types";
import { getInitials, truncateText } from "@/utils";
import { fDate } from "@/utils/format-time";
import Iconify from "@/app/components/@dashboard/components/@dashboard/iconify";

interface Props {
  manuscript: ManuscriptProps;
  onReviewClick: () => void;
  onSectionClick: () => void;
  onViewReviews: () => void;
  selected: boolean;
}

// ME -- Managing Editor
export default function CEManuscriptCard({
  manuscript,
  onReviewClick,
  onSectionClick,
  onViewReviews,
  selected,
}: Props) {
  const {
    title,
    keywords,
    authorName,
    coAuthor,
    status,
    createdAt,
    Document,
    sectionId,
    Section,
    Reviewers,
  } = manuscript;

  const reviewCompleted = manuscript.ActionLog?.some(
    (log) => log?.action === "REVIEW_COMPLETED",
  );

  const manuscriptLink =
    Document && Document[0]?.manuscriptLink ? Document[0].manuscriptLink : "";
  const otherDocsLink =
    Document && Document[0]?.otherDocsLink ? Document[0].otherDocsLink : "";

  return (
    <Card
      sx={{
        maxWidth: { xs: "100%", md: 700 },
        height: { xs: "fit", md: 390 },
        borderRadius: "16px",
        position: "relative",
        boxShadow: selected
          ? "0 6px 20px rgba(0, 0, 0, 0.15)"
          : "0 4px 12px rgba(0, 0, 0, 0.08)",
        border: "1px solid",
        borderColor: selected ? "primary.main" : "grey.200",
        transition: "0.3s",
        "&:hover": {
          boxShadow: "0 8px 24px rgba(0, 0, 0, 0.12)",
          borderColor: "primary.main",
        },
        m: 2,
      }}
    >
      <CardActionArea>
        <Box sx={{ position: "absolute", top: 8, right: 12 , display: "flex", flexDirection: "row", alignItems: "flex-end", gap: 0.5}}>
          <Chip
            label={status}
            color="primary"
            size="small"
            sx={{
              borderRadius: "12px",
              fontWeight: 600,
              fontSize: "10px",
              padding: "2px 4px",
            }}
          />
          {reviewCompleted && (
            <Chip
              label="Review Completed"
              icon={<CheckCircleOutlineIcon sx={{ fontSize: 14 }} />}
              color="success"
              size="small"
              sx={{
                mt: 0.8,
                borderRadius: "12px",
                fontWeight: 600,
                fontSize: "10px",
                padding: "2px 4px",
              }}
            />
          )}
        </Box>
        <CardContent>
          <Box display="flex" flexDirection="row" height={250} gap={2} mt={2}>
            <Avatar sx={{ width: 60, height: 60, bgcolor: "primary.main" }}>
              {getInitials((authorName ?? "").toUpperCase())}
            </Avatar>
            <Stack direction="column" mt={1} width="100%">
              {/* Title */}
              <Tooltip title={title} placement="top">
                <Typography
                  variant="h6"
                  sx={{
                    fontWeight: 700,
                    fontSize: { xs: "15px", md: "17px" },
                    color: "grey.900",
                    lineHeight: 1.4,
                  }}
                >
                  {truncateText(title, 120)}
                </Typography>
              </Tooltip>
              <Tooltip title={keywords} placement="top">
                <Typography
                  sx={{
                    color: "grey.600",
                    fontSize: "14px",
                  }}
                  gutterBottom
                >
                  Keywords: {truncateText(keywords, 80)}
                </Typography>
              </Tooltip>
              <Typography
                sx={{
                  color: "grey.800",
                  fontSize: "14px",
                  textTransform: "capitalize",
                }}
                gutterBottom
              >
                Author: {authorName}
              </Typography>
              <Tooltip title={coAuthor} placement="top">
                <Typography
                  sx={{
                    color: "grey.600",
                    fontSize: "14px",
                    textTransform: "capitalize",
                  }}
                  gutterBottom
                >
                  Co-Authors: {truncateText(coAuthor, 50)}
                </Typography>
              </Tooltip>
              <Typography
                sx={{
                  display: "flex",
                  alignItems: "center",
                  color: "grey.800",
                  fontSize: "14px",
                }}
                gutterBottom
              >
                <Iconify
                  icon="radix-icons:dot-filled"
                  sx={{ color: "text.primary", mr: 1 }}
                />
                Submitted: {fDate(new Date(createdAt))}
              </Typography>
              {sectionId && (
                <Box mt={1}>
                  <Typography
                    sx={{ color: "grey.800", fontSize: "14px" }}
                    gutterBottom
                  >
                    Section : {Section?.name}
                  </Typography>
                </Box>
              )}
            </Stack>
          </Box>
          <Divider sx={{ my: 1 }} />
          <Stack direction="column" width="100%" spacing={1}>
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
              gap={2}
              mt={2}
            >
              {manuscriptLink && (
                <Typography
                  component="a"
                  href={manuscriptLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.main",
                    fontSize: "12px",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Manuscript
                </Typography>
              )}
              {otherDocsLink && (
                <Typography
                  component="a"
                  href={otherDocsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  sx={{
                    color: "primary.main",
                    fontSize: "12px",
                    "&:hover": { textDecoration: "underline" },
                  }}
                >
                  Other Documents
                </Typography>
              )}
              <Box display="flex" justifyContent="flex-end" gap={1}>
                <Button
                  variant="text"
                  color="secondary"
                  sx={{
                    borderRadius: "50px",
                    textTransform: "none",
                    fontSize: "12px",
                    "&:hover": { boxShadow: "none" },
                  }}
                  onClick={onViewReviews}
                >
                  View Reviews
                </Button>
                <Button
                  variant="outlined"
                  sx={{
                    borderRadius: "50px",
                    textTransform: "none",
                    fontSize: "12px",
                    "&:hover": { boxShadow: "none" },
                  }}
                  onClick={onReviewClick}
                >
                  {Reviewers?.length > 0 ? "Re-Assign to a Reviewer" : "Assign to a Reviewer"}
                </Button>
              </Box>
            </Box>

            {/* Section Assignment Area */}
            <Box display="flex" flexDirection="row" alignItems="center" mt={2}>
              <Button
                variant={sectionId ? "outlined" : "contained"}
                color={sectionId ? "secondary" : "primary"}
                sx={{
                  width: "100%",
                  borderRadius: "50px",
                  textTransform: "none",
                  fontSize: "12px",
                  "&:hover": { boxShadow: "none" },
                }}
                onClick={onSectionClick}
              >
                {sectionId ? "Reassign Section" : "Assign to a Section"}
              </Button>
            </Box>
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
