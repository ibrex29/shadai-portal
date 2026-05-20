import dynamic from "next/dynamic";

export const metadata = {
  title: "Forgot Password",
};

const ForgotPasswordMain = dynamic(
  () => import("@/app/components/@dashboard/components/forgot-password"),
);

export default function ForgotPasswordPage() {
  return (
    <main>
      <ForgotPasswordMain />
    </main>
  );
}
