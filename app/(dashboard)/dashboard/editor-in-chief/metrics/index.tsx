"use client";

import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { getDashboardAnalytics } from "@/app/api/manuscript";
import { DashboardAnalytics } from "@/types";

import { Approved } from "@/app/components/@dashboard/components/@dashboard/common/metrics/cards/Approved";
import { AwaitingReview } from "@/app/components/@dashboard/components/@dashboard/common/metrics/cards/AwaitingReview";
import { Rejected } from "@/app/components/@dashboard/components/@dashboard/common/metrics/cards/Rejected";
import { TotalSubmitted } from "@/app/components/@dashboard/components/@dashboard/common/metrics/cards/TotalSubmitted";
import { QuickActionsPanel } from "@/app/components/@dashboard/components/@dashboard/common/analytics/quick-actions-panel";
import { RecentManuscriptsCard } from "@/app/components/@dashboard/components/@dashboard/common/analytics/recent-manuscripts-card";
import { StatusBreakdownCard } from "@/app/components/@dashboard/components/@dashboard/common/analytics/status-breakdown-card";

const EditorInChiefMetrics: React.FC = (): React.JSX.Element => {
  const [loading, setLoading] = useState(true);
  const [analytics, setAnalytics] = useState<DashboardAnalytics | null>(null);

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const data = await getDashboardAnalytics();
        if (data) {
          setAnalytics(data);
        }
      } catch (error) {
        console.error("Failed to fetch editor-in-chief analytics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statusCounts = analytics
    ? {
        submitted: analytics.pipeline.submittedPending.count,
        underReview: analytics.pipeline.underReview.count,
        accepted: analytics.pipeline.acceptedApproved.count,
        rejected: analytics.pipeline.rejected.count,
        total: analytics.pipeline.totalManuscripts,
      }
    : {
        submitted: 0,
        underReview: 0,
        accepted: 0,
        rejected: 0,
        total: 0,
      };

  return (
    <>
      {/* Stat cards */}
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <TotalSubmitted
            sx={{ height: "100%" }}
            value={analytics?.cards.totalSubmitted?.toString() || "0"}
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
          <Rejected
            sx={{ height: "100%" }}
            value={analytics?.cards.rejected?.toString() || "0"}
            loading={loading}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <Approved
            sx={{ height: "100%" }}
            value={analytics?.cards.approved?.toString() || "0"}
            loading={loading}
          />
        </Grid>
      </Grid>

      {/* Analytics panels */}
      <Grid container spacing={3} sx={{ mt: 0.5 }}>
        <Grid item xs={12} md={5}>
          <StatusBreakdownCard counts={statusCounts} loading={loading} />
        </Grid>
        <Grid item xs={12} md={7}>
          <RecentManuscriptsCard
            manuscripts={analytics?.recentSubmissions || []}
            loading={loading}
            title="Recent Submissions"
          />
        </Grid>
      </Grid>

      {/* Quick actions */}
      <QuickActionsPanel role="editor-in-chief" />
    </>
  );
};

export default EditorInChiefMetrics;
