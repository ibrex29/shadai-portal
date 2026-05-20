import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface PageTitleBarProps {
  title: string;
}

const PageTitleBar: FC<PageTitleBarProps> = ({ title }) => {
  return (
    <Box
      sx={{
        display: "flex",
        paddingTop: "10px",
        paddingBottom: "10px",
        alignItems: "center",
        background: "white",
        marginX: "-30px",
        paddingX: "30px",
        marginTop: "-10px",
        borderBottom: "1px solid #E7E7E7",
      }}
    >
      <Typography variant="h2" sx={{ fontSize: "18px" }}>
        {title}
      </Typography>
    </Box>
  );
};

export default PageTitleBar;
