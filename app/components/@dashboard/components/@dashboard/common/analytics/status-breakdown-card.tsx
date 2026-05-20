"use client";

import {
  Box,
  Card,
  CardContent,
  CardHeader,
  Divider,
  LinearProgress,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";

export interface StatusCounts {
  submitted: number;
  underReview: number;
  accepted: number;
  rejected: number;
  total: number;
}

interface Props {
  counts: StatusCounts;
  loading: boolean;
}

const STATUS_GROUPS: {
  label: string;
  key: keyof Omit<StatusCounts, "total">;
  color: string;
}[] = [
  { label: "Submitted / Pending", key: "submitted", color: "#2196f3" },
  { label: "Under Review", key: "underReview", color: "#ff9800" },
  { label: "Accepted / Approved", key: "accepted", color: "#4caf50" },
  { label: "Rejected", key: "rejected", color: "#f44336" },
];

export const StatusBreakdownCard: React.FC<Props> = ({ counts, loading }) => {
  const safeTotal = counts.total || 1;

  return (
    <Card
      sx={{
        height: "100%",
        border: "1px solid",
        borderColor: "divider",
      }}
    >
      <CardHeader
        title="Manuscript Pipeline"
        subheader={`${counts.total} total manuscript${counts.total !== 1 ? "s" : ""}`}
        titleTypographyProps={{ variant: "subtitle1", fontWeight: 600 }}
        subheaderTypographyProps={{ variant: "caption" }}
      />
      <Divider />
      <CardContent>
        {loading ? (
          <Stack spacing={2.5}>
            {[1, 2, 3, 4].map((i) => (
              <Box key={i}>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  mb={0.75}
                >
                  <Skeleton width={130} height={14} animation="wave" />
                  <Skeleton width={32} height={14} animation="wave" />
                </Stack>
                <Skeleton
                  variant="rounded"
                  height={8}
                  animation="wave"
                  sx={{ borderRadius: 4 }}
                />
              </Box>
            ))}
          </Stack>
        ) : (
          <Stack spacing={2.5}>
            {STATUS_GROUPS.map((group) => {
              const count = counts[group.key] as number;
              const pct = Math.round((count / safeTotal) * 100);
              return (
                <Box key={group.label}>
                  <Stack
                    direction="row"
                    justifyContent="space-between"
                    alignItems="center"
                    mb={0.75}
                  >
                    <Typography
                      variant="caption"
                      color="text.secondary"
                      fontWeight={500}
                    >
                      {group.label}
                    </Typography>
                    <Stack direction="row" spacing={0.5} alignItems="center">
                      <Typography variant="caption" fontWeight={700}>
                        {count}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        ({pct}%)
                      </Typography>
                    </Stack>
                  </Stack>
                  <LinearProgress
                    variant="determinate"
                    value={pct}
                    sx={{
                      height: 8,
                      borderRadius: 4,
                      backgroundColor: `${group.color}22`,
                      "& .MuiLinearProgress-bar": {
                        backgroundColor: group.color,
                        borderRadius: 4,
                      },
                    }}
                  />
                </Box>
              );
            })}
          </Stack>
        )}
      </CardContent>
    </Card>
  );
};
