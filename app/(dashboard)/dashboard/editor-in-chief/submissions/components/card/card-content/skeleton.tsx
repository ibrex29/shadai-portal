import { Box, Grid, Paper, Skeleton, Stack } from "@mui/material";
import React from "react";

export default function ManuscriptCardSkeleton() {
  return (
    <Grid container spacing={2}>
      {Array.from({ length: 8 }).map((_, index) => (
        <Grid item xs={12} sm={6} md={6} key={index}>
          <Paper
            variant="outlined"
            sx={{
              borderRadius: 2,
              p: 2,
              position: "relative",
              borderColor: "grey.200",
            }}
          >
            {/* Status chip top-right */}
            <Box sx={{ position: "absolute", top: 12, right: 12 }}>
              <Skeleton animation="wave" variant="rounded" width={72} height={22} sx={{ borderRadius: "12px" }} />
            </Box>

            {/* Avatar + content */}
            <Box display="flex" gap={2} pb={2} borderBottom="1px solid" borderColor="grey.200" mt={1}>
              <Skeleton animation="wave" variant="circular" width={48} height={48} sx={{ flexShrink: 0 }} />
              <Stack flex={1} spacing={0.8}>
                <Skeleton animation="wave" variant="text" width="62%" height={20} />
                <Skeleton animation="wave" variant="text" width="85%" height={15} />
                <Skeleton animation="wave" variant="text" width="50%" height={15} />
                <Skeleton animation="wave" variant="text" width="40%" height={15} />
              </Stack>
            </Box>

            {/* Footer */}
            <Box display="flex" justifyContent="flex-end" gap={1} mt={1.5}>
              <Skeleton animation="wave" variant="rounded" width={100} height={28} sx={{ borderRadius: "20px" }} />
              <Skeleton animation="wave" variant="rounded" width={130} height={28} sx={{ borderRadius: "20px" }} />
            </Box>
            <Skeleton animation="wave" variant="rounded" width="100%" height={32} sx={{ borderRadius: "20px", mt: 1 }} />
          </Paper>
        </Grid>
      ))}
    </Grid>
  );
}
