import ArticleOutlinedIcon from "@mui/icons-material/ArticleOutlined";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import EditNoteOutlinedIcon from "@mui/icons-material/EditNoteOutlined";
import FormatColorTextOutlinedIcon from "@mui/icons-material/FormatColorTextOutlined";
import SpellcheckOutlinedIcon from "@mui/icons-material/SpellcheckOutlined";
import WavingHandIcon from "@mui/icons-material/WavingHand";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Chip,
  Grid,
  Paper,
  Stack,
  Typography,
} from "@mui/material";
import Link from "next/link";

export const metadata = {
  title: "Copy Editor",
};

const statCards = [
  {
    label: "Assigned",
    value: "—",
    icon: <ArticleOutlinedIcon />,
    color: "#0d47a1",
  },
  {
    label: "In Review",
    value: "—",
    icon: <EditNoteOutlinedIcon />,
    color: "#e65100",
  },
  {
    label: "Proofread",
    value: "—",
    icon: <SpellcheckOutlinedIcon />,
    color: "#1b5e20",
  },
  {
    label: "Completed",
    value: "—",
    icon: <CheckCircleOutlineIcon />,
    color: "#4a148c",
  },
];

const activities = [
  {
    text: "Copyediting completed for manuscript #042",
    time: "Today",
    icon: <CheckCircleOutlineIcon fontSize="small" />,
    color: "success.main",
  },
  {
    text: "Grammar corrections submitted for #038",
    time: "Yesterday",
    icon: <EditNoteOutlinedIcon fontSize="small" />,
    color: "warning.main",
  },
  {
    text: "Style guide review for 3 manuscripts",
    time: "2 days ago",
    icon: <FormatColorTextOutlinedIcon fontSize="small" />,
    color: "primary.main",
  },
  {
    text: "New manuscript assigned for copyediting",
    time: "3 days ago",
    icon: <ArticleOutlinedIcon fontSize="small" />,
    color: "info.main",
  },
];

const quickLinks = [
  {
    href: "/dashboard/copy-editor/submissions",
    label: "My Assignments",
    desc: "View manuscripts assigned for copyediting",
    chip: "Manuscripts",
    color: "primary" as const,
  },
];

const CopyEditorHome = () => {
  return (
    <Box sx={{ p: { xs: 2, md: 3 } }}>
      {/* Welcome Banner */}
      <Paper
        sx={{
          p: 3,
          mb: 3,
          background:
            "linear-gradient(135deg, #0d47a1 0%, #1565c0 60%, #1976d2 100%)",
          color: "white",
          borderRadius: 3,
          border: "none",
          position: "relative",
          overflow: "hidden",
        }}
      >
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
        <Stack direction="row" alignItems="center" spacing={1.5} mb={0.5}>
          <WavingHandIcon sx={{ fontSize: "1.25rem", color: "#FFD700" }} />
          <Typography variant="h6" fontWeight={700} sx={{ color: "white" }}>
            Welcome, Copy Editor!
          </Typography>
        </Stack>
        <Typography variant="body2" sx={{ color: "rgba(255,255,255,0.72)" }}>
          Review, proofread, and polish manuscripts for publication-ready quality.
        </Typography>
      </Paper>

      {/* Stat Cards */}
      <Grid container spacing={2.5} mb={3}>
        {statCards.map((s) => (
          <Grid item xs={12} sm={6} md={3} key={s.label}>
            <Card
              sx={{
                border: "1px solid",
                borderColor: "divider",
                height: "100%",
              }}
            >
              <CardContent>
                <Stack
                  direction="row"
                  justifyContent="space-between"
                  alignItems="flex-start"
                >
                  <Box>
                    <Typography
                      variant="overline"
                      color="text.secondary"
                      lineHeight={1.4}
                    >
                      {s.label}
                    </Typography>
                    <Typography variant="h4" fontWeight={700} mt={0.5}>
                      {s.value}
                    </Typography>
                  </Box>
                  <Avatar
                    sx={{
                      backgroundColor: `${s.color}22`,
                      color: s.color,
                      width: 44,
                      height: 44,
                    }}
                  >
                    {s.icon}
                  </Avatar>
                </Stack>
              </CardContent>
            </Card>
          </Grid>
        ))}
      </Grid>

      <Grid container spacing={3}>
        {/* Recent Activity */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{ border: "1px solid", borderColor: "divider", height: "100%" }}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} mb={2}>
                Recent Activity
              </Typography>
              <Stack spacing={2}>
                {activities.map((a, i) => (
                  <Stack
                    key={i}
                    direction="row"
                    spacing={1.5}
                    alignItems="flex-start"
                  >
                    <Avatar
                      sx={{
                        width: 32,
                        height: 32,
                        backgroundColor: a.color,
                        color: "white",
                      }}
                    >
                      {a.icon}
                    </Avatar>
                    <Box flex={1}>
                      <Typography variant="body2" fontWeight={500}>
                        {a.text}
                      </Typography>
                      <Typography variant="caption" color="text.disabled">
                        {a.time}
                      </Typography>
                    </Box>
                  </Stack>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>

        {/* Quick Navigation */}
        <Grid item xs={12} md={6}>
          <Card
            sx={{ border: "1px solid", borderColor: "divider", height: "100%" }}
          >
            <CardContent>
              <Typography variant="subtitle1" fontWeight={700} mb={2}>
                Quick Navigation
              </Typography>
              <Stack spacing={1.5}>
                {quickLinks.map((item) => (
                  <Paper
                    key={item.href}
                    component={Link}
                    href={item.href}
                    variant="outlined"
                    sx={{
                      p: 2,
                      borderRadius: 2,
                      textDecoration: "none",
                      display: "block",
                      transition: "box-shadow 0.15s",
                      "&:hover": { boxShadow: "0 4px 16px rgba(0,0,0,0.1)" },
                    }}
                  >
                    <Stack
                      direction="row"
                      justifyContent="space-between"
                      alignItems="center"
                    >
                      <Box>
                        <Typography variant="subtitle2" fontWeight={600}>
                          {item.label}
                        </Typography>
                        <Typography variant="caption" color="text.secondary">
                          {item.desc}
                        </Typography>
                      </Box>
                      <Chip label={item.chip} size="small" color={item.color} />
                    </Stack>
                  </Paper>
                ))}
              </Stack>
            </CardContent>
          </Card>
        </Grid>
      </Grid>
    </Box>
  );
};

export default CopyEditorHome;
