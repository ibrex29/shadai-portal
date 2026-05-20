import { Button, Typography } from "@mui/material";
import Image from "next/image";

const ChangeRoleButton: React.FC = () => {
  return (
    <Button
      variant="contained"
      disableElevation
      sx={{ borderRadius: "4px", fontSize: "10px", py: 1.15 }}
    >
      <Image
        style={{ marginRight: 10 }}
        width={20}
        height={20}
        alt="Import Icon"
        src="/assets/images/icons/users.svg"
      />
      <Typography sx={{ color: "white", fontSize: "14px" }}>
        Change Role
      </Typography>
    </Button>
  );
};

export default ChangeRoleButton;
