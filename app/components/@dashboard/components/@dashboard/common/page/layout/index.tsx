import { Box } from "@mui/material";

const PageLayout = ({ children }: { children: React.ReactNode }) => {
  return <Box sx={{ paddingX: "15px" }}>{children}</Box>;
};

export default PageLayout;
