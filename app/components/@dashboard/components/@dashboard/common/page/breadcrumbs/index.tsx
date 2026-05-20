import { ChevronRightSharp } from "@mui/icons-material";
import { Box, Typography } from "@mui/material";
import { FC } from "react";

interface PageBreadcrumbsProps {
  page: string;
  tab: string;
}

const PageBreadcrumbs: FC<PageBreadcrumbsProps> = ({ page, tab }) => {
  return (
    <Box style={{ marginBottom: "5px", marginTop: "5px" }}>
      <Typography
        sx={{
          display: "inline-block",
          verticalAlign: "middle",
          fontSize: "14px",
        }}
      >
        {page}
      </Typography>
      <ChevronRightSharp
        style={{
          fontSize: "20px",
          display: "inline-block",
          verticalAlign: "middle",
          fillOpacity: "0.56",
        }}
      />
      <Typography
        sx={{
          display: "inline-block",
          verticalAlign: "middle",
          fontWeight: 500,
          fontSize: "14px",
        }}
      >
        {tab}
      </Typography>
    </Box>
  );
};

export default PageBreadcrumbs;
