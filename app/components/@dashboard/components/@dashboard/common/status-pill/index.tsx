import { Typography } from "@mui/material";
import React from "react";

import { Status } from "@/types";

const statusMap: Record<Status, { color: string; backgroundColor: string }> = {
  [Status.ALL]: { color: "text.primary", backgroundColor: "background.paper" },
  [Status.APPROVED]: {
    color: "success.main",
    backgroundColor: "success.contrastText",
  },
  [Status.PENDING]: {
    color: "warning.main",
    backgroundColor: "warning.contrastText",
  },
  [Status.DECLINED]: {
    color: "error.main",
    backgroundColor: "error.contrastText",
  },
};

function StatusPill({ status }: { status: Status }) {
  const mappedStatus = statusMap[status];

  if (!mappedStatus) {
    throw new Error(`Status '${status}' not found in statusMap.`);
  }

  return (
    <Typography
      sx={{
        color: mappedStatus.color,
        backgroundColor: mappedStatus.backgroundColor,
        display: "inline-block",
        borderRadius: "10px",
        fontWeight: "400",
        fontSize: "14px",
        px: "8px",
        pb: "2px",
        textTransform: "capitalize",
      }}
    >
      {status.charAt(0).toUpperCase() + status.slice(1).toLowerCase()}
    </Typography>
  );
}

export default StatusPill;
