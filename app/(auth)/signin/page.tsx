import dynamic from "next/dynamic";

export const metadata = {
  title: "Sign In",
};

const SigninMain = dynamic(
  () => import("@/app/components/@dashboard/components/signin"),
);

export default function Signin() {
  return (
    <main>
      <SigninMain />
    </main>
  );
}
