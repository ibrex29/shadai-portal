import { Box, Grid, Paper } from "@mui/material";
import React from "react";

interface Props {
  actionButton?: React.ReactNode;
  pagination: React.ReactNode;
  searchBar: React.ReactNode;
  sortAction: React.ReactNode;
  available: boolean;
}

const SubHeader: React.FC<Props> = ({
  actionButton,
  pagination,
  searchBar,
  sortAction,
  available,
}) => {
  return (
    <>
      <Paper
        sx={{
          backgroundColor: "initial",
          py: 2,
          boxShadow: "none",
        }}
      >
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          pb={2}
        >
          {/* <TextOnlyPill
            text={
              available
                ? `${itemCount ?? "No"} ${itemCountLabel}`
                : "No Programs Found!"
            }
            bgColor="#F1F7E8"
            color="#007A27"
          /> */}
          {actionButton}
        </Box>

        <Grid container alignItems="center" pb={1} spacing={2}>
          <Grid item xs={12} sm={4}>
            {searchBar}
          </Grid>
          <Grid item xs={12} sm={2}>
            {sortAction}
          </Grid>

          <Grid item xs={12} sm={6} display="flex" justifyContent="flex-end">
            {available && pagination}
          </Grid>
        </Grid>
      </Paper>
    </>
  );
};

export default SubHeader;
