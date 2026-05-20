import React from "react";

import { NotificationContext, NotificationRef } from "../context/notification";

export default function useNotification(): NotificationRef {
  return React.useContext(NotificationContext);
}
