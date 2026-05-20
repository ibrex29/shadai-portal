import {
  Box,
  Card,
  CardActionArea,
  CardContent,
  Grid,
  Skeleton,
  Stack,
  Typography,
} from "@mui/material";
import React from "react";

export default function ManuscriptCardSkeleton() {
  return (
    <>
      <Grid container spacing={2}>
        {Array.from({ length: 12 }).map((_, index) => (
          <Grid item xs={6} sm={6} md={6} key={index}>
            <Card
              sx={{
                maxWidth: { xs: "100%", md: 345 },
                borderRadius: "10px",
                position: "relative",
                boxShadow: "none",
              }}
            >
              <CardActionArea>
                <Box sx={{ position: "absolute", right: 0 }}>
                  <Skeleton variant="rectangular" width={120} height={50} />
                </Box>
                <CardContent>
                  <Box
                    display="flex"
                    flexDirection="row"
                    gap={2}
                    borderBottom="1px solid"
                    borderColor="grey.300"
                    mt={1.5}
                  >
                    <Skeleton variant="circular" width={45} height={45} />

                    <Stack direction="column" width="50%" mb={1.5}>
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "1.5rem" }}
                        width="70%"
                      />

                      <Skeleton variant="text" sx={{ fontSize: "0.8rem" }} />
                      <Skeleton variant="text" sx={{ fontSize: "0.8rem" }} />
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "1.5rem", borderRadius: "12px" }}
                        width="50%"
                      />
                      <Skeleton
                        variant="text"
                        sx={{ fontSize: "0.8rem" }}
                        width="100%"
                      />
                    </Stack>
                  </Box>
                  <Stack
                    spacing={2}
                    direction="row"
                    mt={1.5}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Box sx={{ display: "flex", alignContent: "center" }}>
                      <Box sx={{ marginRight: "8px" }}>
                        <Typography
                          display="flex"
                          alignItems="center"
                          gap={0.5}
                        >
                          <Skeleton variant="rounded" width={22} height={22} />
                          <Skeleton height={15} width={50} />
                        </Typography>
                      </Box>
                      <Box>
                        <Typography
                          display="flex"
                          alignItems="center"
                          gap={0.5}
                        >
                          <Skeleton variant="rounded" width={22} height={22} />
                          <Skeleton height={15} width={50} />
                        </Typography>
                      </Box>
                    </Box>
                    <Skeleton
                      variant="rounded"
                      width={80}
                      height={30}
                      sx={{ borderRadius: "16px" }}
                    />
                  </Stack>
                </CardContent>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </>
  );
}
