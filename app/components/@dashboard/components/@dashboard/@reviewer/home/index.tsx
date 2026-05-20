"use client";

import { Box } from "@mui/material";

import ReviewerMetrics from "@/app/(dashboard)/dashboard/reviewer/metrics";

import PageBreadcrumbs from "../../common/page/breadcrumbs";
import { MainBox } from "../../common/styled-components";
import { WelcomeBanner } from "../../common/analytics/welcome-banner";

const ReviewerHome: React.FC = () => {
  return (
    <main>
      <MainBox>
        <Box sx={{ marginBottom: "20px", marginTop: "-5px" }}>
          <PageBreadcrumbs page="Home" tab="" />
        </Box>
        <WelcomeBanner />
        <Box sx={{ marginTop: "16px" }}>
          <ReviewerMetrics />
        </Box>
      </MainBox>
    </main>
  );
};

export default ReviewerHome;
