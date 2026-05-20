"use client";

import dynamic from "next/dynamic";

const ChangePasswordForm = dynamic(
  () => import("@/app/components/@dashboard/settings/change-password"),
  { ssr: false },
);

export default function SettingsClient() {
  return <ChangePasswordForm />;
}
