"use client";

import { Typography } from "@mui/material";
import { FC } from "react";

interface PageNavItemProps {
  name: string;
  isActive: boolean;
  isLastItem: boolean;
}

const PageNavItem: FC<PageNavItemProps> = ({ name, isActive, isLastItem }) => {
  return (
    <Typography
      sx={{
        cursor: "pointer",
        padding: "0px 0",
        fontSize: { xs: 12, sm: 14 },
        ...(!isLastItem && {
          mr: { xs: "30px", sm: "40px" },
        }),
        ...(isActive && {
          textDecoration: "underline",
          textUnderlineOffset: "6px",
          fontWeight: "600",
          color: "#0B4F2C",
        }),
        "&:hover": {
          textDecoration: "underline",
          textUnderlineOffset: "6px",
          fontWeight: "bold",
          color: "#0B4F2C",
          transition: "0.1s ease",
        },
      }}
    >
      {name}
    </Typography>
  );
};

export default PageNavItem;
