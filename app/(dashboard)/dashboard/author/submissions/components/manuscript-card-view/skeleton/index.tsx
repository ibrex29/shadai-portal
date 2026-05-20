import { Box, Grid, Paper, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function ManuscriptCardSkeleton() {
  return (
    <Grid container spacing={3}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={6} lg={6} key={index}>
          <Paper
            variant="outlined"
            sx={{
              width: "100%",
              borderRadius: 2,
              p: 2,
              position: "relative",
              borderColor: "grey.200",
            }}
          >
            {/* Status chip top-right */}
            <Box sx={{ position: "absolute", top: 12, right: 12 }}>
              <Skeleton animation="wave" variant="rounded" width={80} height={24} sx={{ borderRadius: "12px" }} />
            </Box>

            {/* Avatar + text block */}
            <Box
              display="flex"
              gap={2}
              pb={2}
              borderBottom="1px solid"
              borderColor="grey.200"
              mt={1}
            >
              <Skeleton animation="wave" variant="circular" width={50} height={50} sx={{ flexShrink: 0 }} />
              <Stack flex={1} spacing={0.8}>
                <Skeleton animation="wave" variant="text" width="60%" height={22} />
                <Skeleton animation="wave" variant="text" width="80%" height={16} />
                <Skeleton animation="wave" variant="text" width="50%" height={16} />
                <Skeleton animation="wave" variant="text" width="40%" height={16} />
              </Stack>
            </Box>

            {/* Footer */}
            <Box display="flex" justifyContent="space-between" alignItems="center" mt={2}>
              <Box display="flex" gap={2}>
                <Skeleton animation="wave" variant="text" width={60} height={18} />
                <Skeleton animation="wave" variant="text" width={60} height={18} />
              </Box>
              <Skeleton animation="wave" variant="rounded" width={90} height={32} sx={{ borderRadius: "20px" }} />
            </Box>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
