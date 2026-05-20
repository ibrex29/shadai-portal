import { Button } from "@mui/material";
import Link from "next/link";

interface Props {
  title: string;
  href: string;
}
export default function LinkButton({ title, href }: Props) {
  return (
    <Button
      variant="contained"
      sx={{ textTransform: "capitalize", p: "10px 30px" }}
      component={Link}
      href={href}
    >
      {title}
    </Button>
  );
}
