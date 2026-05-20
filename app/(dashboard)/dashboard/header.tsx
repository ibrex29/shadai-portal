import AppBar from "@mui/material/AppBar";
import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import Stack from "@mui/material/Stack";
import { useTheme } from "@mui/material/styles";
import Toolbar from "@mui/material/Toolbar";
import React from "react";

import { useResponsive } from "../hooks/use-responsive";
import AvatarPopover from "./common/avatar-popover";
import CaretPopover from "./common/caret-popover";
import Searchbar from "./common/searchbar";
// import LanguagePopover from './common/language-popover';
import { HEADER, NAV } from "./config-layout";
import Iconify from "@/app/components/@dashboard/components/@dashboard/iconify";
import { bgBlur } from "@/config/theme/styles";

// ----------------------------------------------------------------------

interface HeaderProps {
  onOpenNav: () => void;
}

const Header: React.FC<HeaderProps> = ({ onOpenNav }) => {
  const theme = useTheme();
  const lgUp = useResponsive("up", "lg", null);

  const renderContent = (
    <>
      {!lgUp && (
        <IconButton onClick={onOpenNav} sx={{ mr: 1 }}>
          <Iconify icon="eva:menu-2-fill" />
        </IconButton>
      )}

      <Box sx={{ flexGrow: 1 }} />

      <Stack direction="row" alignItems="center" spacing={1}>
        <Searchbar />
        {/* <LanguagePopover /> */}
        {/* <MessagesPopover /> */}
        {/* <NotificationsPopover /> */}
        <AvatarPopover />
        <CaretPopover />
      </Stack>
    </>
  );

  return (
    <AppBar
      sx={{
        boxShadow: "none",
        height: HEADER.H_MOBILE,
        zIndex: theme.zIndex.appBar + 1,
        ...bgBlur({
          color: theme.palette.background.paper,
        }),
        transition: theme.transitions.create(["height"], {
          duration: theme.transitions.duration.shorter,
        }),
        ...(lgUp && {
          width: `calc(100% - ${NAV.WIDTH + 1}px)`,
          height: HEADER.H_DESKTOP,
          borderBottom: `1px solid ${theme.palette.divider}`,
        }),
      }}
    >
      <Toolbar
        sx={{
          height: 1,
          px: { lg: 5 },
        }}
      >
        {renderContent}
      </Toolbar>
    </AppBar>
  );
};

export default Header;
