import { ManuscriptProps } from "@/types";

import ManuscriptCardGrid from "../../manuscript-card-view";
import NoTicket from "../../no-manuscript";

import ManuscriptListView from "../../manuscript-list-view";
import ListSkeleton from "../../manuscript-list-view/skeleton";
import ManuscriptTableView from "../../manuscript-table-view";
import TableSkeleton from "../../manuscript-table-view/skeleton";
import ManuscriptCardSkeleton from "../../manuscript-card-view/skeleton";

interface ManuscriptContentProps {
  isFetching: boolean;
  manuscripts: ManuscriptProps[];
  noManuscriptsIcon: string;
  noResultManuscriptIcon: string;
  availableManuscripts: boolean;
  view: "card" | "table" | "list";
}

const ManuscriptContent: React.FC<ManuscriptContentProps> = ({
  isFetching,
  manuscripts,
  noManuscriptsIcon,
  availableManuscripts,
  view,
}) => {
  if (isFetching) {
    switch (view) {
      case "table":
        return <TableSkeleton />;
      case "list":
        return <ListSkeleton />;
      default:
        return <ManuscriptCardSkeleton />;
    }
  }

  if (manuscripts?.length === 0) {
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
    switch (view) {
      case "table":
        return <ManuscriptTableView manuscripts={manuscripts} />;
      case "list":
        return <ManuscriptListView manuscripts={manuscripts} />;
      default:
        return <ManuscriptCardGrid manuscripts={manuscripts} />;
    }
  }

  return null;
};

export default ManuscriptContent;
