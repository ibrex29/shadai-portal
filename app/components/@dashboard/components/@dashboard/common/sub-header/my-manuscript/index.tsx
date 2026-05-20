import { Box, Grid, Paper, Stack, Typography } from "@mui/material";
import React from "react";

interface Props {
  title: string;
  subtitle: string;
}

const ManuscriptSubHeader: React.FC<Props> = ({ title, subtitle }) => {
  return (
    <>
      <Paper
        sx={{
          backgroundColor: "white",
          py: 1,
          mx: "-30px",
          px: "30px",
          my: 0,
          boxShadow: "none",
          borderTop: "1px  solid",
          borderBottom: "1px  solid",
          borderColor: "grey.300",
        }}
      >
        <Grid container>
          <Grid item xs={12} sm={3}>
            <Box>
              <Stack direction="row" gap={1} alignItems="center">
                <Typography
                  sx={{
                    fontWeight: "bold",
                    fontSize: "16px",
                    color: "grey.900",
                  }}
                >
                  {title}
                </Typography>
              </Stack>
              <Typography sx={{ fontSize: "13px", color: "text.disabled" }}>
                {subtitle}
              </Typography>
            </Box>
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default ManuscriptSubHeader;
