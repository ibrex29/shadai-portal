import Badge from "@mui/material/Badge";
import Box from "@mui/material/Box";
import Drawer from "@mui/material/Drawer";
import ListItemButton from "@mui/material/ListItemButton";
import Stack from "@mui/material/Stack";
import Typography from "@mui/material/Typography";
import Link from "next/link";
import { usePathname } from "next/navigation";
import Image from "next/image";

import theme from "@/config/theme";

import { useResponsive } from "../hooks/use-responsive";
import { NAV } from "./config-layout";
import {
  authorNavConfig,
  basePath,
  copyEditorNavConfig,
  editorInChiefNavConfig,
  managingEditorNavConfig,
  productionEditorNavConfig,
  reviewerNavConfig,
  sectionEditorNavConfig,
} from "./config-navigation";
import Scrollbar from "@/app/components/@dashboard/components/@dashboard/scrollbar";

interface NavItemProps {
  item: {
    path: string;
    icon: React.ReactNode;
    title: string;
    number?: number;
  };
}

interface NavProps {
  openNav: boolean;
  onCloseNav: () => void;
}

export default function Nav({ openNav, onCloseNav }: NavProps) {
  const pathname = usePathname();
  const upLg = useResponsive("up", "lg", null);

  let navConfig;
  switch (true) {
    case pathname?.includes(basePath.managing_editor):
      navConfig = managingEditorNavConfig;
      break;
    case pathname?.includes(basePath.production_editor):
      navConfig = productionEditorNavConfig;
      break;
    case pathname?.includes(basePath.copy_editor):
      navConfig = copyEditorNavConfig;
      break;
    case pathname?.includes(basePath.reviewer):
      navConfig = reviewerNavConfig;
      break;
    case pathname?.includes(basePath.author):
      navConfig = authorNavConfig;
      break;
    case pathname?.includes(basePath.editor_in_chief):
      navConfig = editorInChiefNavConfig;
      break;
    default:
      navConfig = sectionEditorNavConfig;
  }

  const updatedNavConfig = navConfig;

  const renderMenu = (
    <Stack component="nav" spacing={3} sx={{ px: 2 }}>
      {updatedNavConfig.map((item) => (
        <NavItem key={item.title} item={item} />
      ))}
    </Stack>
  );

  const renderContent = (
    <Scrollbar
      sx={{
        height: 1,
        "& .simplebar-content": {
          height: 1,
          display: "flex",
          flexDirection: "column",
          borderRight: "1px solid",
          borderColor: "grey.300",
        },
      }}
    >
      <Box sx={{ px: 3, pt: 3, display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%" }}>
        <Image
          src="/logo/shadai_logo.png"
          alt="Logo"
          width={120}
          height={60}
          style={{ display: "block" }}
        />
        <Typography
          variant="body2"
          sx={{
            mt: 1.5,
            textAlign: "center",
            fontWeight: 700,
            letterSpacing: 0.5,
            color: theme.palette.primary.main,
          }}
        >
          SHADAI JOURNAL OF RESEARCH IN HUMANITIES
        </Typography>
      </Box>
      <Box sx={{ mb: 5 }} />

      {renderMenu}

      <Box sx={{ flexGrow: 1 }} />
    </Scrollbar>
  );

  return (
    <Box
      sx={{
        flexShrink: { lg: 0 },
        width: { lg: NAV.WIDTH },
      }}
    >
      {upLg ? (
        <Box
          sx={{
            height: 1,
            position: "fixed",
            width: NAV.WIDTH,
            backgroundColor: "theme.palette.common.white",
          }}
        >
          {renderContent}
        </Box>
      ) : (
        <Drawer
          open={openNav}
          onClose={onCloseNav}
          PaperProps={{
            sx: {
              width: NAV.WIDTH,
            },
          }}
        >
          {renderContent}
        </Drawer>
      )}
    </Box>
  );
}

function NavItem({ item }: NavItemProps) {
  const pathname = usePathname();
  const active = pathname === item.path;

  return (
    <ListItemButton
      component={Link}
      href={item.path}
      sx={{
        minHeight: 44,
        borderRadius: 1.5,
        typography: "body2",
        color: theme.palette.text.secondary,
        textTransform: "capitalize",
        fontWeight: theme.typography.fontWeightMedium,
        transition: "background 0.15s, color 0.15s",
        "&:hover": {
          bgcolor: `${theme.palette.primary.main}14`,
          color: theme.palette.primary.main,
        },
        ...(active && {
          color: theme.palette.primary.main,
          fontWeight: theme.typography.fontWeightBold,
          bgcolor: `${theme.palette.primary.main}14`,
          borderLeft: `3px solid ${theme.palette.primary.main}`,
          pl: "13px", // compensate for border so text doesn't shift
          "&:hover": {
            bgcolor: `${theme.palette.primary.main}1F`,
          },
        }),
      }}
    >
      <Box component="span" sx={{ width: 24, height: 24, mr: 2, display: "flex", alignItems: "center" }}>
        {item.icon}
      </Box>

      <Box component="span">
        {item.title}
        {item.number && (
          <Badge badgeContent={item.number} color="success" sx={{ ml: 4 }}>
            {" "}
          </Badge>
        )}
      </Box>
    </ListItemButton>
  );
}
