"use client";

import "aos/dist/aos.css";

import { CssBaseline } from "@mui/material";
import AOS from "aos";
import { useEffect } from "react";

const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  useEffect(() => {
    AOS.init({
      once: true,
      disable: "phone",
      duration: 700,
      easing: "ease-out-cubic",
    });
  });
  return (
    <main>
      <CssBaseline />
      {children}
    </main>
  );
};

export default AuthLayout;
