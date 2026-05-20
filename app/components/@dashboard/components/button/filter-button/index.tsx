import { FilterList } from "@mui/icons-material";
import { Button } from "@mui/material";

interface FilterButtonProps {
  initialFilter: string;
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void;
}

export const FilterButton: React.FC<FilterButtonProps> = ({
  initialFilter,
  onClick,
}) => {
  return (
    <Button
      onClick={onClick}
      variant="outlined"
      style={{
        display: "block",
        borderRadius: "8px",
        background: "white",
        textTransform: "none",
        color: "#344054",
        border: "1px solid #E7E7E7",
        fontWeight: 500,
      }}
    >
      <FilterList sx={{ verticalAlign: "middle", mr: "4px" }} />
      {initialFilter}
    </Button>
  );
};
