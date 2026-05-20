import { Suspense } from "react";
import dynamic from "next/dynamic";

export const metadata = {
  title: "Reset Password",
};

const ResetPasswordMain = dynamic(
  () => import("@/app/components/@dashboard/components/reset-password"),
);

export default function ResetPasswordPage() {
  return (
    <main>
      <Suspense>
        <ResetPasswordMain />
      </Suspense>
    </main>
  );
}
