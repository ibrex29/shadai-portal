"use client";

import {
  useMediaQuery,
  Avatar,
  Box,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { useEffect, useState } from "react";
import { getUserDetails } from "@/utils/getUserDetails";

export default function AvatarPopover() {
  const [userDetails, setUserDetails] = useState<{
    email: string;
    role: string;
  }>({
    email: "Email",
    role: "Role",
  });
  const [logo] = useState<string>("/images/avatar_bigger.png");
  const [companyName] = useState<string>("My Company");

  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getUserDetails();
      if (details) setUserDetails(details);
    };
    fetchDetails();
  }, []);

  const isLargerScreen = useMediaQuery("(min-width:600px)");

  return (
    <Box
      display="flex"
      alignItems="center"
      gap={1.5}
      sx={{
        width: {
          xs: "auto",
          sm: 200,
          md: 240,
          lg: 260,
        },
        mr: 2,
      }}
    >
      {/* Avatar */}
      <IconButton
        sx={{
          width: 44,
          height: 44,
          background: (theme) => alpha(theme.palette.grey[500], 0.08),
        }}
      >
        <Avatar
          src={logo}
          alt={companyName}
          sx={{
            width: 36,
            height: 36,
            border: (theme) => `solid 2px ${theme.palette.background.default}`,
            fontSize: 14,
          }}
        >
          {companyName.charAt(0).toUpperCase()}
        </Avatar>
      </IconButton>

      {/* User Info (only on larger screens) */}
      {isLargerScreen && (
        <Box minWidth={0}>
          <Tooltip title={userDetails.email} arrow>
            <Typography
              variant="subtitle2"
              noWrap
              sx={{
                fontWeight: 600,
                color: "text.primary",
                maxWidth: { sm: 140, md: 180, lg: 200 },
              }}
            >
              {userDetails.email}
            </Typography>
          </Tooltip>
          <Typography
            variant="caption"
            sx={{
              color: "text.secondary",
              display: "block",
              lineHeight: 1.2,
            }}
          >
            {userDetails.role}
          </Typography>
        </Box>
      )}
    </Box>
  );
}
