import { ManuscriptProps } from "@/types";
import ManuscriptCardGrid from "../../manuscript-card-grid";
import CEManuscriptListView from "../../manuscript-list-view";
import CEManuscriptTableView from "../../manuscript-table-view";
import NoTicket from "../../no-manuscript";
import ManuscriptCardSkeleton from "./skeleton";
import ListSkeleton from "../../manuscript-list-view/skeleton";
import TableSkeleton from "../../manuscript-table-view/skeleton";

interface ManuscriptContentProps {
  refetch: () => void;
  isFetching: boolean;
  manuscripts: ManuscriptProps[];
  noManuscriptsIcon: string;
  noResultManuscriptIcon: string;
  availableManuscripts: boolean;
  view: "card" | "table" | "list";
}

const ManuscriptContent: React.FC<ManuscriptContentProps> = ({
  refetch,
  isFetching,
  manuscripts = [],
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
    switch (view) {
      case "table":
        return <CEManuscriptTableView manuscripts={manuscripts} refetch={refetch} />;
      case "list":
        return <CEManuscriptListView manuscripts={manuscripts} refetch={refetch} />;
      default:
        return <ManuscriptCardGrid manuscripts={manuscripts} refetch={refetch} />;
    }
  }

  return null;
};

export default ManuscriptContent;
