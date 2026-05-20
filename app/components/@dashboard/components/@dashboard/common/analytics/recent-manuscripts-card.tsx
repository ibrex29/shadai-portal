"use client";

import {
  Box,
  Card,
  CardHeader,
  Chip,
  Divider,
  Skeleton,
  Stack,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from "@mui/material";
import { format } from "date-fns";

import { ManuscriptProps } from "@/types";

type ChipColor =
  | "default"
  | "primary"
  | "info"
  | "warning"
  | "success"
  | "error";

const statusChipColor = (status: string): ChipColor => {
  const s = status?.toLowerCase();
  if (s === "accepted" || s === "approved") return "success";
  if (s === "rejected") return "error";
  if (s === "under_review") return "warning";
  if (s === "submitted" || s === "pending") return "info";
  return "default";
};

const fmtStatus = (s: string): string =>
  s
    ?.replace(/_/g, " ")
    .replace(/\b\w/g, (c) => c.toUpperCase()) ?? "—";

interface Props {
  manuscripts: ManuscriptProps[];
  loading: boolean;
  title?: string;
  emptyLabel?: string;
}

export const RecentManuscriptsCard: React.FC<Props> = ({
  manuscripts,
  loading,
  title = "Recent Manuscripts",
  emptyLabel = "No manuscripts yet.",
}) => {
  const recent = [...manuscripts]
    .sort(
      (a, b) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    )
    .slice(0, 5);

  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <CardHeader
        title={title}
        subheader="Latest 5 entries"
        titleTypographyProps={{ variant: "subtitle1", fontWeight: 600 }}
        subheaderTypographyProps={{ variant: "caption" }}
      />
      <Divider />

      {loading ? (
        <Box p={2}>
          <Stack spacing={1.5}>
            {[1, 2, 3, 4, 5].map((i) => (
              <Skeleton
                key={i}
                variant="rounded"
                height={40}
                animation="wave"
              />
            ))}
          </Stack>
        </Box>
      ) : recent.length === 0 ? (
        <Box
          p={4}
          textAlign="center"
          sx={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center" }}
        >
          <Typography variant="body2" color="text.secondary">
            {emptyLabel}
          </Typography>
        </Box>
      ) : (
        <Box sx={{ overflowX: "auto" }}>
          <Table size="small">
            <TableHead>
              <TableRow>
                <TableCell>Title / Author</TableCell>
                <TableCell align="center">Status</TableCell>
                <TableCell align="right">Submitted</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              {recent.map((m) => (
                <TableRow key={m.id} hover>
                  <TableCell sx={{ maxWidth: 220 }}>
                    <Typography
                      variant="caption"
                      fontWeight={600}
                      noWrap
                      display="block"
                      sx={{ maxWidth: 220 }}
                    >
                      {m.title}
                    </Typography>
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      noWrap
                      display="block"
                      sx={{ maxWidth: 220 }}
                    >
                      {m.authorName ?? "—"}
                    </Typography>
                  </TableCell>
                  <TableCell align="center">
                    <Chip
                      label={fmtStatus(m.status)}
                      size="small"
                      color={statusChipColor(m.status)}
                      sx={{ fontSize: "0.6rem", height: 18 }}
                    />
                  </TableCell>
                  <TableCell align="right">
                    <Typography variant="caption" color="text.secondary">
                      {m.createdAt
                        ? format(new Date(m.createdAt), "MMM d, yyyy")
                        : "—"}
                    </Typography>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </Box>
      )}
    </Card>
  );
};
