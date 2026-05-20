/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import React from "react";

import { DefaultProps, Mode } from "@/types";
import Snackbar from "@/app/components/@dashboard/components/snack-bar";

type Content = string | React.ReactNode | any;
type Options = { duration?: number; mode?: Mode };

export type NotifyFn = (message?: Content, options?: Options) => void;

export interface NotificationRef {
  notify: NotifyFn;
}

/**
 * Notification context
 */
export const NotificationContext = React.createContext({} as NotificationRef);

/**
 * Notification Provider component
 *
 * Displays a snackbar on top with provided message during indicated time.
 *
 * @component
 */
export const Provider = ({ children }: DefaultProps) => {
  const [visible, setVisible] = React.useState(false);

  const [content, setContent] = React.useState<Content>();
  const [duration, setDuration] = React.useState(3000);
  const [mode, setMode] = React.useState<Mode>("info");

  const notify = (message?: Content, options: Options = {}) => {
    setDuration(options.duration || 3000);
    setMode(options.mode || "info");
    setContent(message);
  };

  React.useEffect(() => {
    setVisible(!!content);
  }, [content]);

  return (
    <NotificationContext.Provider value={{ notify }}>
      <Snackbar
        visible={visible}
        duration={duration}
        handleClose={() => notify()}
        mode={mode || ("info" as Mode)}
        message={content}
      />
      {children}
    </NotificationContext.Provider>
  );
};
