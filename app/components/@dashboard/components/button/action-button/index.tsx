import { Button, Typography } from "@mui/material";
import Image from "next/image";

export const ActionButtonOne: React.FC<{ icon: string; text: string }> = ({
  icon,
  text,
}) => {
  return (
    <Button
      variant="outlined"
      sx={{ border: "1px solid #E7E7E7", borderRadius: "8px", py: 1 }}
    >
      {icon !== "" && (
        <Image
          style={{ marginRight: 10 }}
          width={24}
          height={24}
          alt={"Button One Icon"}
          src={icon}
        />
      )}
      <Typography sx={{ color: "black", fontSize: "14px", fontWeight: "500" }}>
        {text}
      </Typography>
    </Button>
  );
};

export const ActionButtonTwo: React.FC<{ icon: string; text: string }> = ({
  icon,
  text,
}) => {
  return (
    <Button variant="contained" sx={{ borderRadius: "8px", py: 1 }}>
      {icon !== "" && (
        <Image
          style={{ marginRight: 5 }}
          width={24}
          height={24}
          alt={"Button Two Icon"}
          src={icon}
        />
      )}
      <Typography sx={{ color: "white", fontSize: "14px", fontWeight: "500" }}>
        {text}
      </Typography>
    </Button>
  );
};
