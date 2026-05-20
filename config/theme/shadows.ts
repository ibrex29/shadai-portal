import { Shadows } from "@mui/material/styles/shadows";

// 4 distinct perceptual levels; rest interpolated — avoids the 24-step MUI default
const subtle   = "0 1px 2px rgba(0,0,0,0.06), 0 1px 3px rgba(0,0,0,0.04)";
const card     = "0 2px 8px rgba(0,0,0,0.08)";
const dropdown = "0 4px 16px rgba(0,0,0,0.12)";
const modal    = "0 8px 32px rgba(0,0,0,0.16)";
const float    = "0 12px 40px rgba(0,0,0,0.20)";

const shadows: Shadows = [
  "none",      // 0
  subtle,      // 1
  subtle,      // 2
  card,        // 3
  card,        // 4
  card,        // 5
  dropdown,    // 6
  dropdown,    // 7
  dropdown,    // 8
  modal,       // 9
  modal,       // 10
  modal,       // 11
  modal,       // 12
  float,       // 13
  float,       // 14
  float,       // 15
  float,       // 16
  float,       // 17
  float,       // 18
  float,       // 19
  float,       // 20
  float,       // 21
  float,       // 22
  float,       // 23
  float,       // 24
];

export default shadows;
