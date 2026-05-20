"use client";

import { LogoutTwoTone } from "@mui/icons-material";
import { Divider, ListItemIcon, ListItemText, MenuItem } from "@mui/material";
import Avatar from "@mui/material/Avatar";
import Box from "@mui/material/Box";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import DialogTitle from "@mui/material/DialogTitle";
import IconButton from "@mui/material/IconButton";
import Popover from "@mui/material/Popover";
import Typography from "@mui/material/Typography";
import { useRouter } from "next/navigation";
import { getSession, signOut } from "next-auth/react";
import { MouseEvent, useEffect, useState } from "react";
import Iconify from "@/app/components/@dashboard/components/@dashboard/iconify";
import { baseUrl } from "@/constants/config";
import { getUserDetails } from "@/utils/getUserDetails";

const MENU_PERSONAL = [
  {
    label: "Settings",
    icon: "eva:settings-outline",
    link: "/dashboard/settings",
  },
];

export default function CaretPopover() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [userDetails, setUserDetails] = useState<{
    email: string;
    role: string;
  }>({
    email: "Email",
    role: "Role",
  });
  const [logo] = useState<string>("/images/avatar_bigger.png");
  const [openDialog, setOpenDialog] = useState(false); // To control the dialog visibility
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  // Fetch user details when the component mounts
  useEffect(() => {
    const fetchDetails = async () => {
      const details = await getUserDetails();
      if (details) setUserDetails(details);
    };

    fetchDetails();
  }, []);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      // If you need to perform some custom API logout before signing out
      const session = await getSession();
      if (session?.token) {
        const response = await fetch(`${baseUrl}/v1/auth/logout`, {
          method: "POST",
          headers: {
            Accept: "*/*",
            Authorization: `Bearer ${session.token}`,
          },
        });
        if (!response.ok) {
          console.error("Custom logout API failed.");
        }
      }

      await signOut({ redirect: true });

      window.location.href = "/signin";
    } catch (error) {
      console.error("Error during logout:", error);
    } finally {
      setLoading(false);
      setOpenDialog(false); // Close the dialog after logout attempt
    }
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(Boolean(anchorEl) && {
            background: (theme) =>
              `linear-gradient(135deg, ${theme.palette.background.paper} 0%, ${theme.palette.background.paper} 100%)`,
          }),
        }}
      >
        <Iconify icon="eva:arrow-ios-downward-fill" width={24} />
      </IconButton>

      <Popover
        open={Boolean(anchorEl)}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            mt: 1,
            minWidth: 220,
            maxWidth: 360,
            borderRadius: 2,
            boxShadow: 3,
          },
        }}
      >
        {/* Profile Section */}
        <Box sx={{ px: 2, py: 2, display: "flex", alignItems: "center" }}>
          <Avatar
            src={logo}
            alt={userDetails.email}
            sx={{ width: 48, height: 48, mr: 1.5 }}
          />
          <Box>
            <Typography variant="subtitle2" sx={{ maxWidth: 220 }} noWrap>
              {userDetails.email}
            </Typography>
            <Typography variant="caption" color="text.secondary" noWrap>
              {userDetails.role}
            </Typography>
          </Box>
        </Box>

        <Divider />

        {/* Menu Actions */}
        <Box>
          {MENU_PERSONAL.map((option) => (
            <MenuItem
              key={option.label}
              onClick={() => {
                handleClose();
                router.push(option.link);
              }}
            >
              <ListItemIcon>
                <Iconify icon={option.icon} width={20} />
              </ListItemIcon>
              <ListItemText>{option.label}</ListItemText>
            </MenuItem>
          ))}

          <MenuItem
            onClick={() => setOpenDialog(true)}
            sx={{ color: "error.main" }}
          >
            <ListItemIcon>
              <LogoutTwoTone color="error" fontSize="small" />
            </ListItemIcon>
            <ListItemText>Logout</ListItemText>
          </MenuItem>
        </Box>
      </Popover>

      {/* Logout Confirmation Dialog */}
      <Dialog open={openDialog} onClose={() => setOpenDialog(false)}>
        <DialogTitle>Confirm Logout</DialogTitle>
        <DialogContent>Are you sure you want to log out?</DialogContent>
        <DialogActions>
          <Button onClick={() => setOpenDialog(false)} color="primary">
            Cancel
          </Button>
          <Button onClick={handleLogout} color="secondary" disabled={loading}>
            {loading ? "Logging out..." : "Logout"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
}
