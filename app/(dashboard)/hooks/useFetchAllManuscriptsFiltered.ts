import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getAllManuscriptsFiltered } from "@/app/api/manuscript";
import { FetchManuscriptsResponse } from "@/app/api/manuscript/types";
import { ManuscriptProps } from "@/types";

const useFetchAllManuscriptsFiltered = () => {
  const [manuscripts, setManuscripts] = React.useState<ManuscriptProps[]>([]);
  const [meta, setMeta] = React.useState({
    page: 1,
    limit: 10,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [sortOrder, setSortOrder] = React.useState<string>("desc");
  const [search, setSearch] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");

  const { data, isFetching, refetch } = useQuery<FetchManuscriptsResponse>({
    queryKey: [
      "all-manuscripts-filtered",
      { sortOrder, page: meta.page, limit: meta.limit, search, status },
    ],
    queryFn: () =>
      getAllManuscriptsFiltered({
        sortOrder,
        page: meta.page,
        limit: meta.limit,
        search,
        status,
      }),
    staleTime: 120000,
  });

  React.useEffect(() => {
    if (data) {
      // Support both paginated response { data, meta } and plain array fallback
      if (Array.isArray(data)) {
        setManuscripts(data as ManuscriptProps[]);
      } else {
        setManuscripts((data as FetchManuscriptsResponse).data ?? []);
        setMeta((data as FetchManuscriptsResponse).meta ?? meta);
      }
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [data, isFetching]);

  const availableManuscripts = manuscripts.length > 0;

  return {
    manuscripts,
    isFetching,
    availableManuscripts,
    refetch,
    page: meta.page,
    setPage: (page: number) => setMeta((prev) => ({ ...prev, page })),
    limit: meta.limit,
    setLimit: (limit: number) => setMeta((prev) => ({ ...prev, limit, page: 1 })),
    sortOrder,
    setSortOrder,
    search,
    setSearch,
    status,
    setStatus,
    totalItems: meta.itemCount,
    pageCount: meta.pageCount,
    hasPreviousPage: meta.hasPreviousPage,
    hasNextPage: meta.hasNextPage,
  };
};

export default useFetchAllManuscriptsFiltered;
