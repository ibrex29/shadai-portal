"use client";

import WavingHandIcon from "@mui/icons-material/WavingHand";
import { Box, Paper, Stack, Typography } from "@mui/material";
import { useSession } from "next-auth/react";

const getTimeGreeting = (): string => {
  const hour = new Date().getHours();
  if (hour < 12) return "Good morning";
  if (hour < 17) return "Good afternoon";
  return "Good evening";
};

const roleLabel: Record<string, string> = {
  author: "Author",
  reviewer: "Reviewer",
  "managing-editor": "Managing Editor",
  "section-editor": "Section Editor",
  "editor-in-chief": "Editor in Chief",
  "production-editor": "Production Editor",
  "copy-editor": "Copy Editor",
};

export const WelcomeBanner: React.FC = () => {
  const { data: session } = useSession();
  const email = (session?.user?.email as string) ?? "";
  const role = (session?.user?.role as string) ?? "";
  const name = email.split("@")[0] ?? "User";
  const greeting = getTimeGreeting();
  const today = new Date().toLocaleDateString("en-US", {
    weekday: "long",
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <Paper
      sx={{
        p: 3,
        mb: 3,
        background:
          "linear-gradient(135deg, #1a237e 0%, #283593 50%, #3949ab 100%)",
        color: "white",
        borderRadius: 3,
        border: "none",
        position: "relative",
        overflow: "hidden",
      }}
    >
      {/* Decorative circles */}
      <Box
        sx={{
          position: "absolute",
          top: -20,
          right: -20,
          width: 140,
          height: 140,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.05)",
          pointerEvents: "none",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          bottom: -30,
          right: 80,
          width: 90,
          height: 90,
          borderRadius: "50%",
          backgroundColor: "rgba(255,255,255,0.04)",
          pointerEvents: "none",
        }}
      />

      <Stack
        direction={{ xs: "column", sm: "row" }}
        justifyContent="space-between"
        alignItems={{ xs: "flex-start", sm: "center" }}
        spacing={1}
      >
        <Box>
          <Stack direction="row" spacing={1} alignItems="center" mb={0.5}>
            <WavingHandIcon
              sx={{ fontSize: "1.25rem", color: "#FFD700" }}
            />
            <Typography
              variant="h6"
              fontWeight={700}
              sx={{ color: "white", lineHeight: 1.3 }}
            >
              {greeting}, {name}!
            </Typography>
          </Stack>
          <Typography
            variant="body2"
            sx={{ color: "rgba(255,255,255,0.72)", mt: 0.25 }}
          >
            {roleLabel[role] ?? "User"} Dashboard — manage your workflow
            from here.
          </Typography>
        </Box>
        <Typography
          variant="caption"
          sx={{ color: "rgba(255,255,255,0.55)", whiteSpace: "nowrap" }}
        >
          {today}
        </Typography>
      </Stack>
    </Paper>
  );
};
