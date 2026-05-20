import { Grid } from "@mui/material";
import { useEffect, useState } from "react";

import { getAuthorManuscripts, getAuthorMetrics } from "@/app/api/manuscript";
import { ManuscriptProps } from "@/types";

import { Approved } from "./cards/Approved";
import { AwaitingReview } from "./cards/AwaitingReview";
import { Rejected } from "./cards/Rejected";
import { TotalSubmitted } from "./cards/TotalSubmitted";
import { QuickActionsPanel } from "../analytics/quick-actions-panel";
import { RecentManuscriptsCard } from "../analytics/recent-manuscripts-card";
import { StatusBreakdownCard } from "../analytics/status-breakdown-card";
import { useSession } from "next-auth/react";

const Metrics: React.FC = (): React.JSX.Element => {
  const { data: session } = useSession();
  const role = (session?.user?.role as string) ?? "author";

  const [loading, setLoading] = useState(true);
  const [manuscripts, setManuscripts] = useState<ManuscriptProps[]>([]);
  const [data, setData] = useState({
    totalSubmitted: 0,
    awaitingReview: 0,
    rejected: 0,
    approved: 0,
  });

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      try {
        const response = await getAuthorMetrics();
        setData({
          totalSubmitted: response.submittedCount,
          awaitingReview: response.underReviewCount,
          rejected: response.rejectedCount,
          approved: response.acceptedCount,
        });
        // Also fetch the actual list for recent manuscripts
        const listRes = await getAuthorManuscripts({ page: 1, limit: 5, sortOrder: "desc" });
        if (Array.isArray(listRes?.data)) {
          setManuscripts(listRes.data);
        }
      } catch (error) {
        console.error("Failed to fetch author metrics:", error);
      } finally {
        setLoading(false);
      }
    };
    fetchData();
  }, []);

  const statusCounts = {
    submitted: data.awaitingReview,
    underReview: 0,
    accepted: data.approved,
    rejected: data.rejected,
    total: data.totalSubmitted,
  };

  return (
    <>
      <Grid container spacing={3}>
        <Grid item lg={3} sm={6} xs={12}>
          <TotalSubmitted
            sx={{ height: "100%" }}
            value={data.totalSubmitted?.toString() || "0"}
            loading={loading}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <AwaitingReview
            sx={{ height: "100%" }}
            value={data.awaitingReview?.toString() || "0"}
            loading={loading}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <Rejected
            sx={{ height: "100%" }}
            value={data.rejected?.toString() || "0"}
            loading={loading}
          />
        </Grid>
        <Grid item lg={3} sm={6} xs={12}>
          <Approved
            sx={{ height: "100%" }}
            value={data.approved?.toString() || "0"}
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
            manuscripts={manuscripts}
            loading={loading}
            title="My Recent Submissions"
            emptyLabel="You haven’t submitted any manuscripts yet."
          />
        </Grid>
      </Grid>

      <QuickActionsPanel role={role} />
    </>
  );
};

export default Metrics;
