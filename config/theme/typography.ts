import { TypographyOptions } from "@mui/material/styles/createTypography";

export const fontFamily = [
  '"Poppins"',
  '-apple-system',
  'BlinkMacSystemFont',
  '"Segoe UI"',
  'Roboto',
  '"Helvetica Neue"',
  'Arial',
  'sans-serif',
].join(",");

const headingLineHeight = 1.35;

const typography: TypographyOptions = {
  fontFamily,
  fontWeightLight: 300,
  fontWeightRegular: 400,
  fontWeightMedium: 500,
  fontWeightBold: 700,
  h1: { fontSize: 32, lineHeight: headingLineHeight, fontWeight: 700, letterSpacing: "-0.5px" },
  h2: { fontSize: 26, lineHeight: headingLineHeight, fontWeight: 700, letterSpacing: "-0.3px" },
  h3: { fontSize: 22, lineHeight: headingLineHeight, fontWeight: 700 },
  h4: { fontSize: 20, lineHeight: headingLineHeight, fontWeight: 700 },
  h5: { fontSize: 16, lineHeight: headingLineHeight, fontWeight: 600 },
  h6: { fontSize: 14, lineHeight: headingLineHeight, fontWeight: 600 },
  body1: { fontSize: "0.9375rem", lineHeight: 1.6 },   // 15px — readable for article metadata
  body2: { fontSize: "0.875rem", lineHeight: 1.57 },   // 14px
  subtitle1: { fontSize: "0.9375rem", fontWeight: 500, lineHeight: 1.5 },
  subtitle2: { fontSize: "0.875rem", fontWeight: 500, lineHeight: 1.57 },
  caption: { fontSize: "0.75rem", lineHeight: 1.5 },
  overline: { fontSize: "0.6875rem", fontWeight: 700, letterSpacing: "1.1px", lineHeight: 1.5, textTransform: "uppercase" },
  button: { fontWeight: 600, fontSize: "0.875rem", textTransform: "none" },
};

export default typography;
