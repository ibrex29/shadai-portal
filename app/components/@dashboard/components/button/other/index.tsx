import { Button } from "@mui/material";
import Image from "next/image";

export const TimePeriodButton: React.FC<{ period: string; number: number }> = ({
  period,
  number,
}) => {
  return (
    <Button
      sx={{
        fontSize: "11px",
        fontWeight: "900",
        textTransform: "none",
        color: "#18181B",
        borderRadius: "5px",
        border: "1px solid #A1A1AA",
        paddingX: "10px",
        paddingY: "8px",
      }}
    >
      {number} {period}
    </Button>
  );
};

export const ExportPDFButton: React.FC = () => {
  return (
    <Button
      variant="outlined"
      sx={{ borderRadius: "5px", fontWeight: "bold", textTransform: "none" }}
    >
      <Image
        style={{ marginRight: "4px" }}
        width={20}
        height={20}
        alt={"Export PDF Icon"}
        src="/assets/images/icons/download_doc.svg"
      />{" "}
      Export PDF
    </Button>
  );
};
