"use client";

import ArticleIcon from "@mui/icons-material/Article";
import GroupIcon from "@mui/icons-material/Group";
import NoteAddIcon from "@mui/icons-material/NoteAdd";
import PublishIcon from "@mui/icons-material/Publish";
import SettingsIcon from "@mui/icons-material/Settings";
import TuneIcon from "@mui/icons-material/Tune";
import ViewListIcon from "@mui/icons-material/ViewList";
import {
  Box,
  Card,
  CardActionArea,
  Grid,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

interface Action {
  label: string;
  description: string;
  href: string;
  icon: React.ReactNode;
  color: string;
}

const roleActions: Record<string, Action[]> = {
  author: [
    {
      label: "Submit Manuscript",
      description: "Upload a new manuscript for peer review",
      href: "/dashboard/author/submit-manuscript",
      icon: <NoteAddIcon />,
      color: "#1a237e",
    },
    {
      label: "My Manuscripts",
      description: "Track the status of your submissions",
      href: "/dashboard/author/submissions",
      icon: <ArticleIcon />,
      color: "#0d47a1",
    },
  ],
  reviewer: [
    {
      label: "My Assignments",
      description: "View manuscripts assigned for review",
      href: "/dashboard/reviewer/submissions",
      icon: <ViewListIcon />,
      color: "#4a148c",
    },
  ],
  "section-editor": [
    {
      label: "View Manuscripts",
      description: "Manage your section submissions",
      href: "/dashboard/section-editor/submissions",
      icon: <ArticleIcon />,
      color: "#006064",
    },
    {
      label: "Manage Users",
      description: "View and manage users in your section",
      href: "/dashboard/section-editor/users",
      icon: <GroupIcon />,
      color: "#004d40",
    },
    {
      label: "Publish Manuscript",
      description: "Release accepted manuscripts",
      href: "/dashboard/section-editor/publish-manuscript",
      icon: <PublishIcon />,
      color: "#1b5e20",
    },
  ],
  "managing-editor": [
    {
      label: "All Manuscripts",
      description: "Browse all submitted manuscripts",
      href: "/dashboard/managing-editor/submissions",
      icon: <ArticleIcon />,
      color: "#01579b",
    },
    {
      label: "Sections",
      description: "Create and manage journal sections",
      href: "/dashboard/managing-editor/sections",
      icon: <TuneIcon />,
      color: "#006064",
    },
    {
      label: "Publish Manuscript",
      description: "Publish accepted manuscripts to the journal",
      href: "/dashboard/managing-editor/publish-manuscript",
      icon: <PublishIcon />,
      color: "#1b5e20",
    },
    {
      label: "Users",
      description: "Manage authors, reviewers, and editors",
      href: "/dashboard/managing-editor/users",
      icon: <GroupIcon />,
      color: "#311b92",
    },
  ],
  "editor-in-chief": [
    {
      label: "All Manuscripts",
      description: "Review and action all submissions",
      href: "/dashboard/editor-in-chief/submissions",
      icon: <ArticleIcon />,
      color: "#1a237e",
    },
    {
      label: "Sections",
      description: "Configure journal sections",
      href: "/dashboard/editor-in-chief/sections",
      icon: <SettingsIcon />,
      color: "#006064",
    },
    {
      label: "Publish Manuscript",
      description: "Publish approved manuscripts",
      href: "/dashboard/editor-in-chief/publish-manuscript",
      icon: <PublishIcon />,
      color: "#1b5e20",
    },
    {
      label: "Users",
      description: "Manage all system users",
      href: "/dashboard/editor-in-chief/users",
      icon: <GroupIcon />,
      color: "#4a148c",
    },
    {
      label: "Editorial Management",
      description: "Configure editorial policies",
      href: "/dashboard/editor-in-chief/editorial-management",
      icon: <TuneIcon />,
      color: "#b71c1c",
    },
  ],
  "production-editor": [
    {
      label: "Manage Users",
      description: "View and manage production team members",
      href: "/dashboard/production-editor/users",
      icon: <GroupIcon />,
      color: "#1a237e",
    },
  ],
  "copy-editor": [
    {
      label: "Overview",
      description: "Copy editing dashboard overview",
      href: "/dashboard/copy-editor",
      icon: <ArticleIcon />,
      color: "#1a237e",
    },
  ],
};

interface Props {
  role: string;
}

export const QuickActionsPanel: React.FC<Props> = ({ role }) => {
  const actions = roleActions[role] ?? [];
  if (actions.length === 0) return null;

  return (
    <Box mt={3.5}>
      <Typography
        variant="subtitle2"
        fontWeight={600}
        mb={1.5}
        color="text.secondary"
        sx={{ textTransform: "uppercase", letterSpacing: "0.05em", fontSize: "0.72rem" }}
      >
        Quick Actions
      </Typography>
      <Grid container spacing={2}>
        {actions.map((action) => (
          <Grid item xs={12} sm={6} md={4} lg={3} key={action.href}>
            <Card
              sx={{
                border: "1px solid",
                borderColor: "divider",
                borderRadius: 2,
                height: "100%",
                transition: "transform 0.15s ease, box-shadow 0.15s ease",
                "&:hover": {
                  transform: "translateY(-3px)",
                  boxShadow: "0 6px 24px rgba(0,0,0,0.09)",
                },
              }}
            >
              <CardActionArea
                component={Link}
                href={action.href}
                sx={{ p: 2.5, height: "100%", alignItems: "flex-start", display: "flex" }}
              >
                <Stack spacing={1.5} width="100%">
                  <Box
                    sx={{
                      width: 44,
                      height: 44,
                      borderRadius: 2,
                      backgroundColor: `${action.color}18`,
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      color: action.color,
                    }}
                  >
                    {action.icon}
                  </Box>
                  <Box>
                    <Typography variant="subtitle2" fontWeight={600}>
                      {action.label}
                    </Typography>
                    <Typography variant="caption" color="text.secondary">
                      {action.description}
                    </Typography>
                  </Box>
                </Stack>
              </CardActionArea>
            </Card>
          </Grid>
        ))}
      </Grid>
    </Box>
  );
};
