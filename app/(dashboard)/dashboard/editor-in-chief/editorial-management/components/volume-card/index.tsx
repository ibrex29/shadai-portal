import EditIcon from "@/app/components/@dashboard/components/icons/editIcon";
import DeleteIcon from "@mui/icons-material/Delete";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Tooltip,
  Typography,
} from "@mui/material";
import React from "react";

interface VolumeCardProps {
  name: string;
  description: string;
  onEdit: () => void;
  onDelete: () => void;
}

const VolumeCard: React.FC<VolumeCardProps> = ({
  name,
  description,
  onEdit,
  onDelete,
}) => {
  return (
    <Card variant="outlined" sx={{ width: 250, borderRadius: 2, boxShadow: 2 }}>
      <CardContent>
        {/* Volume Name */}
        <Box sx={{ height: 50, display: "flex", alignItems: "start" }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="text.primary"
          >
            {name}
          </Typography>
        </Box>

        {/* Volume Description */}
        <Box sx={{ mt: 1, minHeight: 40 }}>
          <Typography variant="body2" color="text.secondary">
            {description}
          </Typography>
        </Box>

        {/* Action Buttons */}
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mt={2}
        >
          <Tooltip title="Edit">
            <IconButton color="primary" onClick={onEdit}>
              <EditIcon />
            </IconButton>
          </Tooltip>
          <Tooltip title="Delete">
            <IconButton color="error" onClick={onDelete}>
              <DeleteIcon />
            </IconButton>
          </Tooltip>
        </Box>
      </CardContent>
    </Card>
  );
};

export default VolumeCard;
