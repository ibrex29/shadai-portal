import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { getReviewerDashboardAnalytics } from "@/app/api/manuscript";
import { ReviewerDashboardAnalytics } from "@/types";

import { Accepted } from "./cards/Accepted";
import { Assigned } from "./cards/Assigned";
import { AwaitingReview } from "./cards/AwaitingReview";
import { Submitted } from "./cards/Submitted";
import { QuickActionsPanel } from "@/app/components/@dashboard/components/@dashboard/common/analytics/quick-actions-panel";
import { RecentManuscriptsCard } from "@/app/components/@dashboard/components/@dashboard/common/analytics/recent-manuscripts-card";
import { StatusBreakdownCard } from "@/app/components/@dashboard/components/@dashboard/common/analytics/status-breakdown-card";

const ReviewerMetrics: React.FC = (): React.JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<ReviewerDashboardAnalytics | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getReviewerDashboardAnalytics();
        if (response) {
          setAnalytics(response);
        }
      } catch (error) {
        console.error("Failed to fetch reviewer metrics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statusCounts = {
    submitted: analytics?.pipeline.submittedPending.count || 0,
    underReview: analytics?.pipeline.underReview.count || 0,
    accepted: analytics?.pipeline.acceptedApproved.count || 0,
    rejected: analytics?.pipeline.rejected.count || 0,
    total: analytics?.pipeline.totalManuscripts || 0,
  };

  const recentAssignmentManuscripts =
    analytics?.recentAssignments
      ?.map((assignment) => assignment.manuscript)
      .filter(Boolean) || [];

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <Submitted
            sx={{ height: "100%" }}
            value={analytics?.cards.submitted?.toString() || "0"}
            loading={loading}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <AwaitingReview
            sx={{ height: "100%" }}
            value={analytics?.cards.awaitingReview?.toString() || "0"}
            loading={loading}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <Assigned
            sx={{ height: "100%" }}
            value={analytics?.cards.assigned?.toString() || "0"}
            loading={loading}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <Accepted
            sx={{ height: "100%" }}
            value={analytics?.cards.accepted?.toString() || "0"}
            loading={loading}
          />
        </Grid>
      </Grid>

      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} md={5}>
          <StatusBreakdownCard counts={statusCounts} loading={loading} />
        </Grid>
        <Grid item xs={12} md={7}>
          <RecentManuscriptsCard
            manuscripts={recentAssignmentManuscripts}
            loading={loading}
            title="My Review Assignments"
            emptyLabel="You have no manuscripts assigned for review yet."
          />
        </Grid>
      </Grid>

      <QuickActionsPanel role="reviewer" />
    </>
  );
};

export default ReviewerMetrics;
