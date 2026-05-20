import { ManuscriptProps } from "@/types";

import ManuscriptCardGrid from "../../manuscript-card-grid";
import NoTicket from "../../no-manuscript";
import ManuscriptCardSkeleton from "./skeleton";

interface ManuscriptContentProps {
  isFetching: boolean;
  manuscripts: ManuscriptProps[];
  noManuscriptsIcon: string;
  noResultManuscriptIcon: string;
  availableManuscripts: boolean;
}

const ManuscriptContent: React.FC<ManuscriptContentProps> = ({
  isFetching,
  manuscripts = [],
  noManuscriptsIcon,
  availableManuscripts,
}) => {
  if (isFetching) {
    return <ManuscriptCardSkeleton />;
  }

  if (manuscripts.length === 0) {
    return (
      <NoTicket
        alt="No Manuscripts"
        description="You haven't received any Manuscripts yet"
        title="Check back later to view submitted manuscripts"
        width={222}
        height={150}
        src={noManuscriptsIcon}
      />
    );
  }

  if (availableManuscripts) {
    return <ManuscriptCardGrid manuscripts={manuscripts} />;
  }

  return null;
};

export default ManuscriptContent;
