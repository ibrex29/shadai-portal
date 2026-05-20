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

import { ManuscriptProps } from "@/types";
import { formatDate, getInitials, truncateText } from "@/utils";
import { fDate } from "@/utils/format-time";
import Iconify from "@/app/components/@dashboard/components/@dashboard/iconify";

interface Props {
  manuscript: ManuscriptProps;
  onReviewClick: () => void;
  onViewReviews: () => void;
  selected: boolean;
}

// ME -- Managing Editor
export default function SEManuscriptCard({
  manuscript,
  onReviewClick,
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
    reviewDueDate,
    Review,
    Reviewers,
  } = manuscript;

  const manuscriptLink =
    Document && Document[0]?.manuscriptLink ? Document[0].manuscriptLink : "";
  const otherDocsLink =
    Document && Document[0]?.otherDocsLink ? Document[0].otherDocsLink : "";

  return (
    <Card
      sx={{
        maxWidth: { xs: "100%", md: 700 },
        height: { xs: "fit", md: 370 },
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
        <Box sx={{ position: "absolute", top: 8, right: 12 }}>
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
              {reviewDueDate && (
                <Box mt={1}>
                  <Typography
                    sx={{ color: "grey.800", fontSize: "14px" }}
                    gutterBottom
                  >
                    Review Due Date : {formatDate(reviewDueDate)}
                  </Typography>
                </Box>
              )}
              <Box mt={1}>
                <Chip
                  label={`Reviews: ${Review?.length || 0}`}
                  size="small"
                  variant="outlined"
                  color={Review?.length ? "success" : "default"}
                />
              </Box>
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
          </Stack>
        </CardContent>
      </CardActionArea>
    </Card>
  );
}
