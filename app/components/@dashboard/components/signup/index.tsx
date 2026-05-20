"use client";

import { Box, Typography, Stack, useTheme } from "@mui/material";
import Image from "next/image";
import Link from "next/link";
import React from "react";
import SignupForm from "./form";

const SignUpMain = () => {
  const theme = useTheme();
  return (
    <Box
      sx={{
        minHeight: "100vh",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        bgcolor: "background.default",
      }}
    >
      <Box
        sx={{
          width: "100%",
          maxWidth: 520,
          bgcolor: "background.paper",
          boxShadow: `0 10px 30px ${theme.palette.primary.main}24`,
          borderRadius: 3,
          border: `1px solid ${theme.palette.primary.main}`,
          borderTop: `6px solid ${theme.palette.primary.main}`,
          p: { xs: 3, sm: 4 },
          display: "flex",
          flexDirection: "column",
          alignItems: "center",
        }}
      >
        <Stack direction="row" spacing={3} alignItems="center" width="100%" mb={2.5}>
          <Box sx={{ minWidth: 90, display: "flex", justifyContent: "center" }}>
            <Image
              src="/logo/shadai_logo.png"
              alt="Sule Lamido University Logo"
              width={90}
              height={90}
              style={{ objectFit: "contain" }}
              priority
            />
          </Box>
          <Box sx={{ flex: 1 }}>
            <Typography
              variant="h4"
              fontWeight={600}
              sx={{
                fontFamily: 'Poppins, sans-serif',
                color: theme.palette.primary.main,
                textTransform: "uppercase",
                letterSpacing: 1,
                lineHeight: 1.18,
                mb: 0.5,
                fontSize: { xs: "1.15rem", sm: "1.2rem", md: "1.5rem" },
              }}
            >
              SHADAI JOURNAL OF RESEARCH IN HUMANITIES
            </Typography>
            <Typography
              variant="h6"
              fontWeight={400}
              sx={{
                fontFamily: 'Poppins, sans-serif',
                color: theme.palette.text.secondary,
                fontSize: { xs: "0.95rem", sm: "1.1rem", md: "1.15rem" },
                mt: 0.5,
                lineHeight: 1.2,
              }}
            >
              Faculty of Humanities Sule Lamido University Kafin Hausa
            </Typography>
          </Box>
        </Stack>
        <SignupForm />
        <Typography
          component={Link}
          href="/"
          variant="body2"
          sx={{
            mt: 3,
            color: theme.palette.primary.main,
            fontWeight: 600,
            textDecoration: "none",
            "&:hover": {
              textDecoration: "underline",
            },
          }}
        >
          Back to landing page
        </Typography>
      </Box>
    </Box>
  );
};

export default SignUpMain;
