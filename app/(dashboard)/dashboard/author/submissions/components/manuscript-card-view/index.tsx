import { Box, Grid } from "@mui/material";
import { useState } from "react";

import { ManuscriptProps } from "@/types";

import AuthorManuscriptCard from "../manuscript-card";

// import TicketCardDetail from '../ticket-card/card-detail';

interface Props {
  manuscripts: ManuscriptProps[];
}

export default function ManuscriptCardGrid({ manuscripts }: Props) {
  const [selectedManuscript, setSelectedManuscript] =
    useState<ManuscriptProps | null>(null);

  const handleCardClick = (manuscript: ManuscriptProps) => {
    setSelectedManuscript(manuscript);
  };

  // const handleCloseTicket = () => {
  //   setSelectedManuscript(null);
  // };

  return (
    <Box sx={{ display: "block" }}>
      <Grid container spacing={2} direction="row">
        {/* {selectedManuscript && (
          <Grid item xs={12} md={12}>
            <TicketCardDetail {...selectedManuscript} onClose={handleCloseTicket} />
          </Grid>
        )} */}
        {manuscripts.map((manuscript) => (
          <Grid item xs={12} md={6} lg={6} key={manuscript.id}>
            <AuthorManuscriptCard
              manuscript={manuscript}
              onClick={() => handleCardClick(manuscript)}
              selected={selectedManuscript?.id === manuscript.id}
            />
          </Grid>
        ))}
      </Grid>
    </Box>
  );
}
