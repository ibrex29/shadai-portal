import { Theme } from "@mui/material";
import Box from "@mui/material/Box";
import { ButtonProps } from "@mui/material/Button";
import { styled } from "@mui/material/styles";
import React, { CSSProperties, FC, ReactNode } from "react";

import { fontFamily } from "@/config/theme/typography";

interface BaseButtonProps
  extends Pick<ButtonProps, "onClick" | "type" | "startIcon" | "endIcon"> {
  variant?: "contained" | "outlined" | "text";
  color?:
    | "default"
    | "primary"
    | "secondary"
    | "dark"
    | "light"
    | "transparent"
    | "white";
  size?: "small" | "medium" | "large" | "xlarge" | "xxlarge";
  disableHoverEffect?: boolean;
  disabled?: boolean;
  style?: CSSProperties;
  capitalize?: boolean;
  fullWidth?: boolean;
  extraPadding?: boolean;
}
interface StyledButtonRootProps extends BaseButtonProps {
  theme?: Theme;
}

const StyledButtonRoot = styled("button", {
  shouldForwardProp: (prop) =>
    prop !== "variant" &&
    prop !== "color" &&
    prop !== "size" &&
    prop !== "disableHoverEffect" &&
    prop !== "capitalize" &&
    prop !== "fullWidth" &&
    prop !== "extraPadding",
})<StyledButtonRootProps>(
  ({
    theme,
    color,
    variant,
    size,
    disableHoverEffect,
    capitalize,
    fullWidth,
    extraPadding,
  }) => ({
    fontFamily,
    cursor: "pointer",
    minWidth: 40,
    fontSize: 14,
    fontWeight: 600,
    lineHeight: 1.5,
    letterSpacing: 1,
    borderRadius: 4,
    // borderRadius: Number(theme.shape.borderRadius) * 3,

    display: "inline-flex",
    alignItems: "center",
    userSelect: "none",
    transform: "unset",
    position: "relative",
    overflow: "hidden",
    border: "none",
    whiteSpace: "nowrap",
    WebkitTapHighlightColor: "transparent",
    verticalAlign: "middle",
    outline: "none !important",
    transition: theme.transitions.create(["transform"]),

    // hover
    "&:hover": {
      ...(!disableHoverEffect && {
        transform: "translateY(-3px)",
      }),
    },

    // capitalize
    ...(!capitalize && {
      textTransform: "uppercase",
    }),

    // fullWidth
    ...(fullWidth && {
      width: "100%",
      display: "flex",
      justifyContent: "center",
      alignItems: "center",
    }),

    "& svg": {
      fontSize: 20,
    },

    // sizes and variants
    ...(size === "small" &&
      variant === "outlined" && {
        padding: "4px 10px",
      }),
    ...(size === "medium" &&
      variant === "outlined" && {
        padding: "6px 14px",
      }),
    ...(size === "large" &&
      variant === "outlined" && {
        padding: "10px 18px",
        fontSize: 15,
      }),

    ...(size === "small" &&
      variant !== "outlined" && {
        padding: "6px 12px",
      }),
    ...(size === "medium" &&
      variant !== "outlined" && {
        padding: "8px 16px",
      }),
    ...(size === "large" &&
      variant !== "outlined" && {
        padding: "12px 20px",
        fontSize: 15,
      }),

    ...(size === "xlarge" &&
      variant !== "outlined" && {
        padding: "12px 22px",
        fontSize: 16,
      }),

    ...(size === "xxlarge" &&
      variant !== "outlined" && {
        padding: "12px 24px",
        fontSize: 17,
      }),

    // variants
    ...(variant !== "contained" && {
      backgroundColor: "transparent",
      boxShadow: "none !important",
    }),

    // colors & variants
    ...(color === "default" &&
      variant === "contained" && {
        backgroundColor: theme.palette.text.primary,
        color: theme.palette.primary.contrastText,
      }),
    ...(color === "primary" &&
      variant === "contained" && {
        backgroundColor: theme.palette.primary.main,
        color: theme.palette.primary.contrastText,
        boxShadow: "0 6px 22px 0 rgb(18 124 113 / 12%)",
      }),
    ...(color === "secondary" &&
      variant === "contained" && {
        backgroundColor: theme.palette.text.disabled,
        color: theme.palette.primary.contrastText,
      }),
    ...(color === "dark" &&
      variant === "contained" && {
        backgroundColor: theme.palette.primary.dark,
        color: theme.palette.primary.contrastText,
      }),
    ...(color === "light" &&
      variant === "contained" && {
        backgroundColor: theme.palette.primary.light,
        color: theme.palette.primary.contrastText,
      }),
    ...(color === "white" &&
      variant === "contained" && {
        backgroundColor: theme.palette.common.white,
        color: theme.palette.text.secondary,
        border: "1px solid",
        borderColor: "text.secondary",
      }),
    ...(color === "transparent" &&
      variant === "contained" && {
        backgroundColor: "transparent !important",
        color: theme.palette.text.secondary,
      }),

    ...(color === "primary" &&
      variant === "outlined" && {
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
      }),
    ...(color === "secondary" &&
      variant === "outlined" && {
        border: `1.5px solid ${theme.palette.secondary.main}`,
        color: theme.palette.secondary.main,
      }),
    ...(color === "dark" &&
      variant === "outlined" && {
        border: `1.5px solid ${theme.palette.primary.dark}`,
        color: theme.palette.primary.dark,
      }),
    ...(color === "light" &&
      variant === "outlined" && {
        border: `1px solid ${theme.palette.primary.main}`,
        color: theme.palette.primary.main,
      }),

    ...(color === "primary" &&
      variant === "contained" && {
        border: `1.5px solid ${theme.palette.primary.main}`,
        color: theme.palette.common.white,
      }),

    ...(color === "primary" &&
      variant === "text" && {
        color: theme.palette.primary.main,
      }),
    ...(color === "secondary" &&
      variant === "text" && {
        color: theme.palette.secondary.main,
      }),
    ...(color === "dark" &&
      variant === "text" && {
        color: theme.palette.primary.main,
      }),
    ...(color === "light" &&
      variant === "text" && {
        color: "inherit",
      }),

    // extra padding
    ...(extraPadding && {
      padding: "8px 35px",
    }),
  }),
);

interface Props extends BaseButtonProps {
  children: ReactNode;
}

const StyledButton: FC<Props> = ({
  children,
  onClick,
  disableHoverEffect = false,
  capitalize,
  fullWidth,
  extraPadding,
  startIcon,
  endIcon,
  color = "primary",
  variant = "contained",
  size = "medium",
  style = { textTransform: "none", paddingLeft: "50px", paddingRight: "50px" },
  ...rest
}) => {
  return (
    <StyledButtonRoot
      onClick={onClick}
      disableHoverEffect={disableHoverEffect}
      capitalize={capitalize}
      fullWidth={fullWidth}
      extraPadding={extraPadding}
      color={color}
      variant={variant}
      size={size}
      style={style}
      {...rest}
    >
      {startIcon && (
        <Box component="span" sx={{ display: "inherit", mr: 1, ml: -0.5 }}>
          {startIcon}
        </Box>
      )}
      <Box component="span">{children}</Box>
      {endIcon && (
        <Box component="span" sx={{ display: "inherit", ml: 1, mr: -0.5 }}>
          {endIcon}
        </Box>
      )}
    </StyledButtonRoot>
  );
};

export default StyledButton;
