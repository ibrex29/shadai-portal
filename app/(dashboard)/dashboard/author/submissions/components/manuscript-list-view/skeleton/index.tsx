import { Box, Paper, Skeleton } from "@mui/material";

const ListSkeleton = () => (
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
        <Skeleton animation="wave" variant="rounded" width={90} height={28} sx={{ borderRadius: "20px", flexShrink: 0 }} />
      </Paper>
    ))}
  </Box>
);

export default ListSkeleton;
