import { Add } from "@mui/icons-material";
import { Button, Typography } from "@mui/material";

export const AddButtonOne: React.FC<{ text: string }> = ({ text }) => {
  return (
    <Button
      variant="contained"
      disableElevation
      sx={{
        textTransform: "none",
        borderRadius: "8px",
        fontSize: "10px",
        py: 1.15,
      }}
    >
      <Add sx={{ mr: 0.5, fontSize: "20px" }} />
      <Typography sx={{ color: "white", fontSize: "14px" }}>{text}</Typography>
    </Button>
  );
};
