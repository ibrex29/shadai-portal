import {
  Avatar,
  Box,
  Button,
  Divider,
  List,
  ListItem,
  ListItemAvatar,
  ListItemText,
  Typography,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Chip,
  Paper,
} from "@mui/material";
import { useState } from "react";

import { ManuscriptProps } from "@/types";
import { fDate } from "@/utils/format-time";
import { getInitials, truncateText } from "@/utils";
import { getReviewStatus } from "@/app/api/reviewer";
import useNotification from "@/hooks/useNotification";
import Chat from "@/app/(dashboard)/dashboard/author/submissions/components/chats";

interface Props {
  manuscripts: ManuscriptProps[];
}

export default function ManuscriptListView({ manuscripts }: Props) {
  const [open, setOpen] = useState(false);
  const [activeManuscript, setActiveManuscript] =
    useState<ManuscriptProps | null>(null);

  const { notify } = useNotification();

  const handleReviewClick = async (manuscript: ManuscriptProps) => {
    try {
      const response = await getReviewStatus(manuscript.id);
      if (response && response.hasReview) {
        setActiveManuscript(manuscript);
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

  return (
    <Box>
      <List sx={{ p: 0 }}>
        {manuscripts.map((m, idx) => (
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
            <ListItem
              alignItems="flex-start"
              sx={{ px: 2, py: 2 }}
              secondaryAction={
                <Button
                  variant="contained"
                  size="small"
                  onClick={() => handleReviewClick(m)}
                  sx={{
                    borderRadius: "16px",
                    textTransform: "capitalize",
                    px: 2,
                  }}
                >
                  Review
                </Button>
              }
            >
              <ListItemAvatar>
                <Avatar sx={{ bgcolor: "primary.main" }}>
                  {getInitials((m.authorName ?? "").toUpperCase())}
                </Avatar>
              </ListItemAvatar>

              <ListItemText
                primary={
                  <Box display="flex" alignItems="center" gap={1}>
                    <Typography fontWeight="bold">
                      {truncateText(m.title, 80)}
                    </Typography>
                    <Chip
                      label={m.status || "Submitted"}
                      size="small"
                      color={
                        m.status === "Accepted"
                          ? "success"
                          : m.status === "Rejected"
                            ? "error"
                            : m.status === "Under Review"
                              ? "warning"
                              : "default"
                      }
                      sx={{ fontSize: "0.75rem", height: 22 }}
                    />
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
            </ListItem>
            {idx < manuscripts.length - 1 && <Divider />}
          </Paper>
        ))}
      </List>

      {/* Review Dialog */}
      <Dialog
        open={open}
        onClose={() => setOpen(false)}
        fullWidth
        maxWidth="md"
      >
        <DialogTitle>Review and Chat</DialogTitle>
        <DialogContent>
          {activeManuscript && <Chat manuscriptId={activeManuscript.id} />}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => setOpen(false)} color="secondary">
            Close
          </Button>
        </DialogActions>
      </Dialog>
    </Box>
  );
}
