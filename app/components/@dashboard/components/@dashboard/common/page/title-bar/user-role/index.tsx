import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface PageTitleBarProps {
  title: string;
}

const UserRoleTitleBar: FC<PageTitleBarProps> = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        paddingTop: "18px",
        paddingBottom: "15px",
        alignItems: "center",
        background: "white",
        marginX: "-30px",
        paddingX: "30px",
        marginTop: "-10px",
        marginBottom: "10px",
        borderBottom: "1px solid #E7E7E7",
      }}
    >
      <Typography variant="h2">{title}</Typography>
    </Box>
  );
};

export default UserRoleTitleBar;
