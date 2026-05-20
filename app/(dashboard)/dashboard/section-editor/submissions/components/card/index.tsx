import { Box } from "@mui/material";

import { ManuscriptProps } from "@/types";
import noResultIcon from "@/public/images/no_upcoming.svg";
import noManuscriptIcon from "@/public/images/no-tickets.svg";

import ManuscriptContent from "./card-content";
import ManuscriptSubHeader from "@/app/components/@dashboard/components/@dashboard/common/sub-header/my-manuscript";

interface ManuscriptDisplayProps {
  manuscripts: ManuscriptProps[];
  isFetching: boolean;
  availableManuscripts: boolean;
  refetch: () => void;
}

const ManuscriptsDisplay: React.FC<ManuscriptDisplayProps> = ({
  refetch,
  manuscripts,
  isFetching,
  availableManuscripts,
}) => {
  return (
    <Box>
      <ManuscriptSubHeader
        title="Manuscript List"
        subtitle="Keep track of all the manuscripts submitted."
      />

      <ManuscriptContent
        refetch={refetch}
        isFetching={isFetching}
        manuscripts={manuscripts}
        availableManuscripts={availableManuscripts}
        noManuscriptsIcon={noManuscriptIcon}
        noResultManuscriptIcon={noResultIcon}
      />
    </Box>
  );
};

export default ManuscriptsDisplay;
