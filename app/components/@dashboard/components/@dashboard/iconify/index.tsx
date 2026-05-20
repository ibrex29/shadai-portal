/* eslint-disable @typescript-eslint/no-explicit-any */
import { Icon } from "@iconify/react";
import Box from "@mui/material/Box";
import { forwardRef, ReactNode, Ref } from "react";

interface IconifyProps {
  icon: any; // You may replace 'any' with a more specific type based on the actual type of your 'icon' prop
  width?: number;
  sx?: object;
  children?: ReactNode;
}

const Iconify = forwardRef(
  ({ icon, width = 20, sx, ...other }: IconifyProps, ref: Ref<HTMLElement>) => (
    <Box
      ref={ref}
      component={Icon}
      className="component-iconify"
      icon={icon}
      sx={{ width, height: width, ...sx }}
      {...other}
    />
  ),
);

Iconify.displayName = "Iconify";

export default Iconify;
