import {
  Box,
  Button,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
  Paper,
  Chip,
} from "@mui/material";
import { useState } from "react";
import { ManuscriptProps } from "@/types";
import { fDate } from "@/utils/format-time";
import { truncateText } from "@/utils";
import useNotification from "@/hooks/useNotification";
import { getReviewStatus } from "@/app/api/reviewer";
import Chat from "@/app/(dashboard)/dashboard/author/submissions/components/chats";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";

interface Props {
  manuscripts: ManuscriptProps[];
}

export default function ManuscriptTableView({ manuscripts }: Props) {
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
              <TableCell sx={{ fontWeight: "bold" }}>Status</TableCell>
              <TableCell sx={{ fontWeight: "bold" }}>Submitted</TableCell>
              <TableCell align="right" sx={{ fontWeight: "bold" }}>
                Actions
              </TableCell>
            </TableRow>
          </TableHead>

          <TableBody>
            {manuscripts.map((m) => (
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
                  <Typography fontWeight="bold">
                    {truncateText(m.title, 50)}
                  </Typography>
                </TableCell>
                <TableCell>{m.authorName}</TableCell>
                <TableCell>{truncateText(m.keywords, 30)}</TableCell>
                <TableCell>
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
                    sx={{ fontSize: "0.75rem" }}
                  />
                </TableCell>
                <TableCell>{fDate(new Date(m.createdAt))}</TableCell>
                <TableCell align="right">
                  {m.Document?.[0]?.manuscriptLink && (
                    <Typography
                      component="a"
                      href={m.Document[0].manuscriptLink}
                      target="_blank"
                      rel="noopener noreferrer"
                      sx={{
                        color: "primary.main",
                        textDecoration: "none",
                        fontSize: "14px",
                        mr: 2,
                      }}
                    >
                      Manuscript
                    </Typography>
                  )}
                  <Button
                    variant="contained"
                    size="small"
                    onClick={() => handleReviewClick(m)}
                    sx={{ borderRadius: "16px", textTransform: "capitalize" }}
                  >
                    Review
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </Paper>

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
