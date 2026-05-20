import { Box as BaseBox, Typography } from "@mui/material";

import { ComponentProps } from "@/types";

export function MainBox({ children }: ComponentProps) {
  return (
    <BaseBox
      sx={{
        paddingX: "12px",
        xs: { paddingX: "30px" },
        md: { paddingX: "0px" },
      }}
    >
      {children}
    </BaseBox>
  );
}

export function MainHeading({ children }: ComponentProps) {
  return (
    <div style={{ marginBottom: "30px", marginTop: "5px" }}>
      <Typography sx={{ display: "inline-block", verticalAlign: "middle" }}>
        {children}
      </Typography>
    </div>
  );
}

export function ItemBox({ children }: ComponentProps) {
  return (
    <BaseBox
      sx={{
        display: "flex",
        flexWrap: "wrap",
        flexDirection: "row",
        md: { flexDirection: "column", fontSize: "30px" },
        position: { xs: "relative" },
      }}
    >
      {children}
    </BaseBox>
  );
}
