/* eslint-disable @typescript-eslint/no-explicit-any */
import Box from "@mui/material/Box";
import { forwardRef, memo, Ref } from "react";

import { StyledRootScrollbar, StyledScrollbar } from "./style";

const Scrollbar = forwardRef(
  ({ children, sx, ...other }: any, ref: Ref<HTMLDivElement>) => {
    const userAgent =
      typeof navigator === "undefined" ? "SSR" : navigator.userAgent;
    const mobile =
      /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(
        userAgent,
      );

    if (mobile) {
      return (
        <Box ref={ref} sx={{ overflow: "auto", ...sx }} {...other}>
          {children}
        </Box>
      );
    }

    return (
      <StyledRootScrollbar>
        <StyledScrollbar
          scrollableNodeProps={{
            ref: ref,
          }}
          clickOnTrack={false}
          sx={sx}
          {...other}
        >
          {children}
        </StyledScrollbar>
      </StyledRootScrollbar>
    );
  },
);

Scrollbar.displayName = "Scrollbar";

export default memo(Scrollbar);
