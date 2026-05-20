import { PaletteOptions } from "@mui/material";
import { common } from "@mui/material/colors";

const palette: PaletteOptions = {
  mode: "light",
  background: {
    default: "#F7F3EA",
    paper: common.white,
  },
  text: {
    primary: "#4C3A1C",
    secondary: "#7A6640",
    disabled: "#B3A17C",
  },
  divider: "rgba(142, 106, 37, 0.2)",
};

export default palette;
