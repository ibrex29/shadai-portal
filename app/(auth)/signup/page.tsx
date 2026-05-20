import dynamic from "next/dynamic";
export const metadata = {
  title: "Sign Up",
};

const SignupMain = dynamic(
  () => import("@/app/components/@dashboard/components/signup"),
);

export default function Signin() {
  return (
    <main>
      <SignupMain />
    </main>
  );
}
