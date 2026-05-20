"use client";

import {
  Avatar,
  Box,
  Button,
  Card,
  CardActionArea,
  CardContent,
  Chip,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  Stack,
  Tooltip,
  Typography,
} from "@mui/material";
import { useState } from "react";

import Chat from "@/app/(dashboard)/dashboard/author/submissions/components/chats";
import { getReviewStatus } from "@/app/api/reviewer";
import useNotification from "@/hooks/useNotification";
import { ManuscriptProps } from "@/types";
import { getInitials, truncateText } from "@/utils";
import { fDate } from "@/utils/format-time";
import Iconify from "@/app/components/@dashboard/components/@dashboard/iconify";

interface Props {
  manuscript: ManuscriptProps;
  onClick: () => void;
  selected: boolean;
}

export default function AuthorManuscriptCard({
  manuscript,
  onClick,
  selected,
}: Props) {
  const { title, keywords, authorName, coAuthor, status, createdAt, Document } =
    manuscript;

  const { notify } = useNotification();
  const [open, setOpen] = useState(false);

  const manuscriptLink = Document?.[0]?.manuscriptLink || "";
  const otherDocsLink = Document?.[0]?.otherDocsLink || "";

  const handleReviewClick = async () => {
    try {
      const response = await getReviewStatus(manuscript.id);
      if (response && response.hasReview) {
        setOpen(true);
      } else if (response) {
        notify("No review available for this manuscript.");
      } else {
        notify("Failed to fetch review status");
      }
    } catch (error) {
      console.error("Error fetching review status:", error);
      notify("Failed to fetch review status");
    }
  };

  const handleClose = () => setOpen(false);

  return (
    <>
      <Card
        onClick={onClick}
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
        <CardActionArea disableRipple>
          {/* Status Chip */}
          <Box sx={{ position: "absolute", top: 12, right: 12 }}>
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
            {/* Author & Title Section */}
            <Box
              display="flex"
              flexDirection="row"
              alignItems="flex-start"
              gap={2}
              mt={4}
            >
              <Avatar
                sx={{
                  width: 56,
                  height: 56,
                  bgcolor: "primary.main",
                  fontWeight: 600,
                  fontSize: "18px",
                }}
              >
                {getInitials((authorName ?? "").toUpperCase())}
              </Avatar>

              <Stack spacing={1} flex={1}>
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

                {/* Keywords */}
                {keywords && (
                  <Typography
                    variant="body2"
                    sx={{ color: "grey.600", textTransform: "capitalize" }}
                  >
                    Keywords: {truncateText(keywords, 80)}
                  </Typography>
                )}

                {/* Author */}
                <Typography variant="body2" sx={{ color: "grey.800" }}>
                  Author: {authorName}
                </Typography>

                {/* Co-Authors */}
                {coAuthor && (
                  <Typography
                    variant="body2"
                    sx={{ color: "grey.600", textTransform: "capitalize" }}
                  >
                    Co-Authors: {truncateText(coAuthor, 60)}
                  </Typography>
                )}

                {/* Date */}
                <Typography
                  variant="body2"
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    color: "grey.700",
                    mt: 1,
                  }}
                >
                  <Iconify
                    icon="radix-icons:dot-filled"
                    sx={{ color: "text.primary", mr: 1 }}
                  />
                  Submitted: {fDate(new Date(createdAt))}
                </Typography>
              </Stack>
            </Box>

            <Divider sx={{ my: 2 }} />

            {/* Action Buttons */}
            <Box
              display="flex"
              flexDirection="row"
              alignItems="center"
              justifyContent="flex-end"
              gap={3}
              mt={1}
            >
              {manuscriptLink && (
                <Button
                  href={manuscriptLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ textTransform: "none" }}
                >
                  Manuscript
                </Button>
              )}
              {otherDocsLink && (
                <Button
                  href={otherDocsLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  size="small"
                  sx={{ textTransform: "none" }}
                >
                  Other Docs
                </Button>
              )}
              <Button
                variant="contained"
                onClick={handleReviewClick}
                sx={{
                  borderRadius: "50px",
                  textTransform: "none",
                  px: 3,
                  fontWeight: 600,
                }}
              >
                View Review
              </Button>
            </Box>
          </CardContent>
        </CardActionArea>
      </Card>

      {/* Review Dialog */}
      <Dialog open={open} onClose={handleClose} fullWidth maxWidth="md">
        <DialogTitle sx={{ fontWeight: 700 }}>Review & Chat</DialogTitle>
        <DialogContent>
          <Chat manuscriptId={manuscript.id} />
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="inherit">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
