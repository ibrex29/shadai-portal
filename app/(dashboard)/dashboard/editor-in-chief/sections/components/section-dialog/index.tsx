import CloseIcon from "@mui/icons-material/Close";
import {
  Box,
  Card,
  CardContent,
  IconButton,
  Modal,
  Skeleton,
  Typography,
} from "@mui/material";
import { useEffect, useState } from "react";

import { getSection } from "@/app/api/sections";
import { ManuscriptProps, SectionProps } from "@/types";

interface SectionModalProps {
  manuscript: ManuscriptProps;
  open: boolean;
  onClose: () => void;
  onAssign: (sectionId: string) => void;
}

export default function SectionModal({
  manuscript,
  open,
  onClose,
  onAssign,
}: SectionModalProps) {
  const [sections, setSections] = useState<SectionProps[]>([]);
  const [loading, setLoading] = useState(true);

  const fetchSections = async () => {
    setLoading(true);
    try {
      const data = await getSection();
      if (Array.isArray(data)) {
        setSections(data);
      } else {
        console.error("Expected an array but got:", data);
        setSections([]);
      }
    } catch (error) {
      console.error("Error fetching sections:", error);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    if (open) {
      fetchSections();
    }
  }, [open]);

  return (
    <Modal open={open} onClose={onClose}>
      <Box
        sx={{
          padding: 4,
          maxWidth: 500,
          margin: "auto",
          mt: "20vh",
          backgroundColor: "white",
          borderRadius: 2,
        }}
      >
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography variant="h5">
            Assign Section for <span>{manuscript.title}</span>
          </Typography>
          <IconButton onClick={onClose} aria-label="close">
            <CloseIcon />
          </IconButton>
        </Box>

        {loading ? (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {/* Skeleton loader for each section card */}
            {Array.from({ length: 5 }).map((_, index) => (
              <Skeleton key={index} variant="rectangular" height={56} />
            ))}
          </Box>
        ) : (
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, mt: 2 }}>
            {sections.map((section) => (
              <SectionCard
                key={section.id}
                name={section.name}
                onClick={() => onAssign(section.id)}
              />
            ))}
          </Box>
        )}
      </Box>
    </Modal>
  );
}

interface SectionCardProps {
  name: string;
  onClick: () => void;
}

const SectionCard: React.FC<SectionCardProps> = ({ name, onClick }) => {
  return (
    <Card
      variant="outlined"
      sx={{
        width: "100%",
        borderRadius: 2,
        boxShadow: 2,
        transition: "transform 0.3s, box-shadow 0.3s",
        "&:hover": {
          transform: "scale(1.03)", // Scale effect on hover
          boxShadow: "0 4px 20px rgba(0, 0, 0, 0.2)", // Increased shadow on hover
        },
        cursor: "pointer", // Change cursor to pointer
      }}
      onClick={onClick}
    >
      <CardContent>
        <Box sx={{ height: 15, display: "flex", alignItems: "start" }}>
          <Typography
            variant="subtitle1"
            fontWeight="bold"
            color="text.primary"
          >
            {name}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};
