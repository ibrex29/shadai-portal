/* eslint-disable @typescript-eslint/no-unused-vars */
import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getAuthorManuscripts } from "@/app/api/manuscript";
import { ManuscriptProps } from "@/types";
import { FetchManuscriptsResponse } from "@/app/api/manuscript/types";

const useFetchAuthorManuscripts = () => {
  const [manuscripts, setManuscripts] = React.useState<ManuscriptProps[]>([]);
  const [meta, setMeta] = React.useState({
    page: 1,
    limit: 10,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });
  const [sortOrder, setSortOrder] = React.useState<string>("asc");
  const [search, setSearch] = React.useState<string>("");
  const [status, setStatus] = React.useState<string>("");

  const { data, isFetching } = useQuery<FetchManuscriptsResponse>({
    queryKey: [
      "manuscripts",
      { sortOrder, page: meta?.page, limit: meta?.limit, search, status },
    ],
    queryFn: () =>
      getAuthorManuscripts({
        sortOrder,
        page: meta?.page,
        limit: meta?.limit,
        search,
        status,
      }),
    staleTime: 120000,
  });

  React.useEffect(() => {
    if (data) {
      setManuscripts(data.data);
      setMeta(data.meta);
    }
  }, [data, isFetching]);

  const availableManuscripts = manuscripts?.length > 0;

  return {
    manuscripts,
    isFetching,
    availableManuscripts,
    page: meta?.page,
    setPage: (page: number) => setMeta((prev) => ({ ...prev, page })),
    limit: meta?.limit,
    setLimit: (limit: number) =>
      setMeta((prev) => ({ ...prev, limit, page: 1 })), // Reset to page 1 when limit changes
    sortOrder,
    setSortOrder,
    search,
    setSearch,
    status,
    setStatus,
    totalItems: meta?.itemCount,
    pageCount: meta?.pageCount,
    hasPreviousPage: meta?.hasPreviousPage,
    hasNextPage: meta?.hasNextPage,
  };
};

export default useFetchAuthorManuscripts;
