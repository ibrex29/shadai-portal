import EditIcon from "@/app/components/@dashboard/components/icons/editIcon";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

interface SectionCardProps {
  name: string;
  onDelete: () => void;
  onEdit: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ name, onEdit }) => {
  return (
    <Card variant="outlined" sx={{ width: 200, borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        <Box sx={{ height: 50, display: "flex", alignItems: "start" }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="text.primary"
          >
            {name}
          </Typography>
        </Box>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="end"
          mt={1}
        >
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={onEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default SectionCard;
