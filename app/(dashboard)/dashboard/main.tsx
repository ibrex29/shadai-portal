import Box, { BoxProps } from "@mui/material/Box";
import React, { ReactNode } from "react";

import { useResponsive } from "../hooks/use-responsive";
import { HEADER, NAV } from "./config-layout";

// ----------------------------------------------------------------------

const SPACING = 8;

interface MainProps extends BoxProps {
  children: ReactNode;
}

const Main: React.FC<MainProps> = ({ children, sx, ...other }) => {
  const lgUp = useResponsive("up", "lg", null);

  return (
    <>
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          minHeight: "100vh",
          display: "flex",
          flexDirection: "column",
          backgroundColor: "background.default",
          height: "100%",
          width: "100%",
          py: `${HEADER.H_MOBILE + SPACING}px`,
          ...(lgUp && {
            px: 4,
            py: `${HEADER.H_DESKTOP + SPACING}px`,
            width: `calc(100% - ${NAV.WIDTH}px)`,
          }),
          ...sx,
        }}
        {...other}
      >
        {children}
      </Box>
    </>
  );
};

export default Main;
