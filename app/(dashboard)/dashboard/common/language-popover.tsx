import Box from "@mui/material/Box";
import IconButton from "@mui/material/IconButton";
import MenuItem from "@mui/material/MenuItem";
import Popover from "@mui/material/Popover";
import { MouseEvent, useState } from "react";

// ----------------------------------------------------------------------

interface Language {
  value: string;
  label: string;
  icon: string;
}

const LANGS: Language[] = [
  {
    value: "ng",
    label: "English",
    icon: "/images/icons/ic_flag_ng.svg",
  },
];

// ----------------------------------------------------------------------

interface LanguageMenuItemProps {
  option: Language;
  onSelect: (value: string) => void;
  isSelected: boolean;
}

const LanguageMenuItem: React.FC<LanguageMenuItemProps> = ({
  option,
  onSelect,
  isSelected,
}) => (
  <MenuItem
    key={option.value}
    selected={isSelected}
    onClick={() => {
      onSelect(option.value);
    }}
    sx={{ typography: "body2", py: 1 }}
  >
    <Box
      component="img"
      alt={option.label}
      src={option.icon}
      sx={{ width: 28, mr: 2 }}
    />
    {option.label}
  </MenuItem>
);

const LanguagePopover: React.FC = () => {
  const [open, setOpen] = useState<null | HTMLElement>(null);

  const handleOpen = (event: MouseEvent<HTMLButtonElement>) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleSelectLanguage = () => {
    // Handle language selection logic here
    handleClose();
  };

  return (
    <>
      <IconButton
        onClick={handleOpen}
        sx={{
          width: 40,
          height: 40,
          ...(open && {
            bgcolor: "action.selected",
          }),
        }}
      >
        <img src={LANGS[0].icon} alt={LANGS[0].label} />
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
        transformOrigin={{ vertical: "top", horizontal: "right" }}
        PaperProps={{
          sx: {
            p: 0,
            mt: 1,
            ml: 0.75,
            width: 180,
          },
        }}
      >
        {LANGS.map((option) => (
          <LanguageMenuItem
            key={option.value}
            option={option}
            onSelect={handleSelectLanguage}
            isSelected={option.value === LANGS[0].value}
          />
        ))}
      </Popover>
    </>
  );
};

export default LanguagePopover;
