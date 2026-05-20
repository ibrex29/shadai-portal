"use client";

import { createTheme as createMuiTheme, Theme, alpha } from "@mui/material/styles";

import paletteBase from "./palette-base";
import paletteDark from "./palette-dark";
import paletteLight from "./palette-light";
import shadows from "./shadows";
import typography from "./typography";

const createTheme = (darkMode?: boolean): Theme => {
  const palette = darkMode
    ? { ...paletteBase, ...paletteDark }
    : { ...paletteBase, ...paletteLight };

  const base = createMuiTheme({ palette, typography, shadows });

  // Second pass — component overrides that reference the resolved palette
  return createMuiTheme(base, {
    shape: { borderRadius: 10 },
    components: {
      MuiButton: {
        styleOverrides: {
          root: {
            borderRadius: 8,
            boxShadow: "none",
            fontWeight: 600,
            "&:hover": { boxShadow: "none" },
          },
          sizeSmall: { padding: "4px 12px", fontSize: "0.8125rem" },
          sizeMedium: { padding: "7px 18px" },
          sizeLarge: { padding: "10px 24px", fontSize: "1rem" },
        },
      },
      MuiPaper: {
        defaultProps: { elevation: 0 },
        styleOverrides: {
          root: {
            backgroundImage: "none",
          },
          rounded: { borderRadius: 12 },
        },
      },
      MuiCard: {
        styleOverrides: {
          root: {
            borderRadius: 12,
            border: `1px solid ${alpha(base.palette.grey[500], 0.16)}`,
            boxShadow: "0 1px 3px rgba(0,0,0,0.06), 0 1px 2px rgba(0,0,0,0.04)",
          },
        },
      },
      MuiChip: {
        styleOverrides: {
          root: { borderRadius: 6, fontWeight: 500 },
          sizeSmall: { height: 22, fontSize: "0.7rem" },
        },
      },
      MuiTextField: {
        defaultProps: { size: "small" as const },
      },
      MuiInputBase: {
        styleOverrides: {
          root: { borderRadius: "8px !important" },
        },
      },
      MuiOutlinedInput: {
        styleOverrides: {
          root: {
            "& fieldset": {
              borderColor: alpha(base.palette.grey[500], 0.32),
            },
          },
        },
      },
      MuiTableCell: {
        styleOverrides: {
          head: {
            backgroundColor: base.palette.grey[50],
            color: base.palette.text.secondary,
            fontWeight: 600,
            fontSize: "0.8125rem",
          },
          root: { fontSize: "0.875rem", borderColor: alpha(base.palette.grey[500], 0.16) },
        },
      },
      MuiTableRow: {
        styleOverrides: {
          root: {
            "&:hover": { backgroundColor: alpha(base.palette.primary.main, 0.04) },
          },
        },
      },
      MuiDialog: {
        styleOverrides: {
          paper: { borderRadius: 16 },
        },
      },
      MuiTooltip: {
        styleOverrides: {
          tooltip: {
            backgroundColor: base.palette.grey[800],
            fontSize: "0.75rem",
            borderRadius: 6,
          },
        },
      },
      MuiAppBar: {
        styleOverrides: {
          root: { backgroundImage: "none" },
        },
      },
      MuiListItemButton: {
        styleOverrides: {
          root: { borderRadius: 8 },
        },
      },
      MuiSkeleton: {
        defaultProps: { animation: "wave" as const },
      },
      MuiDivider: {
        styleOverrides: {
          root: { borderColor: alpha(base.palette.grey[500], 0.16) },
        },
      },
    },
  });
};

const theme = createTheme(false);

export { paletteBase, paletteDark, paletteLight, shadows, typography };
export default theme;
