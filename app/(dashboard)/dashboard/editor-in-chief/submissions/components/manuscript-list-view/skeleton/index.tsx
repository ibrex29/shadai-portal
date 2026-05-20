import { Box, Paper, Skeleton } from "@mui/material";

const CEListSkeleton = () => (
  <Box sx={{ display: "flex", flexDirection: "column", gap: 1.5 }}>
    {Array.from(new Array(6)).map((_, i) => (
      <Paper
        key={i}
        variant="outlined"
        sx={{
          borderRadius: 2,
          px: 2,
          py: 1.5,
          display: "flex",
          alignItems: "center",
          gap: 2,
          borderColor: "grey.200",
        }}
      >
        <Skeleton animation="wave" variant="circular" width={40} height={40} sx={{ flexShrink: 0 }} />
        <Box flex={1} minWidth={0}>
          <Skeleton animation="wave" variant="text" width="55%" height={18} sx={{ mb: 0.5 }} />
          <Skeleton animation="wave" variant="text" width="40%" height={14} />
        </Box>
        <Box display="flex" gap={1} flexShrink={0}>
          <Skeleton animation="wave" variant="rounded" width={88} height={28} sx={{ borderRadius: "16px" }} />
          <Skeleton animation="wave" variant="rounded" width={108} height={28} sx={{ borderRadius: "16px" }} />
          <Skeleton animation="wave" variant="rounded" width={112} height={28} sx={{ borderRadius: "16px" }} />
        </Box>
      </Paper>
    ))}
  </Box>
);

export default CEListSkeleton;
