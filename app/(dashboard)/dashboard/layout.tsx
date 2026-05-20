"use client";

import { Box } from "@mui/material";
import { useEffect, useState } from "react";

import Header from "./header";
import Main from "./main";
import Nav from "./nav";

const DashboardLayout = ({ children }: { children: React.ReactNode }) => {
  const [openNav, setOpenNav] = useState(false);

  useEffect(() => {
    // Placeholder for profile data setup
    const profileData = {
      name: "John Doe",
      role: "Admin",
    };
  }, []);

  return (
    <>
      <Header onOpenNav={() => setOpenNav(true)} />
      <Box
        sx={{
          minHeight: 1,
          display: "flex",
          flexDirection: { xs: "column", lg: "row" },
        }}
      >
        <Nav openNav={openNav} onCloseNav={() => setOpenNav(false)} />
        <Main>{children}</Main>
      </Box>
    </>
  );
};

export default DashboardLayout;
