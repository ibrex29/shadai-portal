import Avatar from "@mui/material/Avatar";
import Card from "@mui/material/Card";
import CardContent from "@mui/material/CardContent";
import Skeleton from "@mui/material/Skeleton"; // Import Skeleton
import Stack from "@mui/material/Stack";
import { SxProps } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import { Notebook as BookIcon } from "@phosphor-icons/react";
import * as React from "react";

import theme from "@/config/theme";

export interface BudgetProps {
  sx?: SxProps;
  value?: string; // Make value optional for loading state
  loading?: boolean; // Add loading prop
}

export function TotalSubmitted({
  sx,
  value,
  loading,
}: BudgetProps): React.JSX.Element {
  return (
    <Card
      sx={{
        ...sx,
        backgroundColor: theme.palette.background.paper,
        border: `1px solid ${theme.palette.divider}`,
        borderRadius: theme.shape.borderRadius,
      }}
    >
      <CardContent>
        <Stack spacing={3}>
          <Stack
            direction="row"
            sx={{ alignItems: "flex-start", justifyContent: "space-between" }}
            spacing={3}
          >
            <Stack spacing={1}>
              <Typography color="text.secondary" variant="overline">
                Total Submitted
              </Typography>
              {loading ? (
                <Skeleton variant="text" width="60%" height={40} /> // Skeleton for loading
              ) : (
                <Typography variant="h4">{value} </Typography> // Actual value
              )}
            </Stack>
            <Avatar
              sx={{
                backgroundColor: theme.palette.primary.main,
                height: "40px",
                width: "40px",
              }}
            >
              <BookIcon fontSize="24px" />
            </Avatar>
          </Stack>
        </Stack>
      </CardContent>
    </Card>
  );
}
