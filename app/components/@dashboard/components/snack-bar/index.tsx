import {
  Alert as BaseAlert,
  Portal,
  Snackbar as BaseSnackbar,
} from "@mui/material";
import React from "react";

import { NotifyFn } from "@/context/notification";
import { Mode } from "@/types";

type Props = {
  message?: string;
  mode?: Mode;
  visible: boolean;
  duration: number;
  handleClose: NotifyFn;
};

/**
 *
 * @param param string message to display
 * @param visible boolean to indicate (Optional)
 * @param mode type of message. This determines the background (Optional)
 * @param handleChange a callback to show close icon and run some actions
 */
export default function Snackbar({
  message,
  visible,
  mode,
  duration,
  handleClose,
}: Props) {
  return (
    <Portal>
      <BaseSnackbar
        anchorOrigin={{ vertical: "top", horizontal: "right" }}
        open={visible}
        transitionDuration={{ appear: duration }} // animate appearing
      >
        <BaseAlert severity={mode || "info"} onClose={handleClose}>
          {message}
        </BaseAlert>
      </BaseSnackbar>
    </Portal>
  );
}
