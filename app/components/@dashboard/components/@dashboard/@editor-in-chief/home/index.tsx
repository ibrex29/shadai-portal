"use client";

import { Box } from "@mui/material";

import EditorInChiefMetrics from "@/app/(dashboard)/dashboard/editor-in-chief/metrics";
import PageBreadcrumbs from "../../common/page/breadcrumbs";
import { MainBox } from "../../common/styled-components";
import { WelcomeBanner } from "../../common/analytics/welcome-banner";

const CEHome: React.FC = () => {
  return (
    <main>
      <MainBox>
        <Box sx={{ marginBottom: "20px", marginTop: "-5px" }}>
          <PageBreadcrumbs page="Home" tab="" />
        </Box>
        <WelcomeBanner />
        <Box sx={{ marginTop: "16px" }}>
          <EditorInChiefMetrics />
        </Box>
      </MainBox>
    </main>
  );
};

export default CEHome;
