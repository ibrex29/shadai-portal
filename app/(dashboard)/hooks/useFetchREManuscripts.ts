import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getREManuscript } from "@/app/api/manuscript";
import { FetchManuscriptsParams, FetchManuscriptsResponse } from "@/app/api/manuscript/types";
import { ManuscriptProps } from "@/types";

const useFetchManuscripts = (params: FetchManuscriptsParams = {}) => {
  const { page = 1, limit = 10, search = "", status = "", sortOrder = "desc" } = params;
  const [manuscripts, setManuscripts] = React.useState<ManuscriptProps[]>([]);
  const [meta, setMeta] = React.useState({
    page: 1,
    limit: 10,
    itemCount: 0,
    pageCount: 0,
    hasPreviousPage: false,
    hasNextPage: false,
  });

  const { data, isFetching, refetch } = useQuery<FetchManuscriptsResponse>({
    queryKey: ["reviewer-manuscripts", page, limit, search, status, sortOrder],
    queryFn: () => getREManuscript({ page, limit, search, status, sortOrder }),
    staleTime: 120000,
  });

  React.useEffect(() => {
    if (!data) return;
    setManuscripts(data.data ?? []);
    setMeta(
      data.meta ?? {
        page,
        limit,
        itemCount: 0,
        pageCount: 0,
        hasPreviousPage: false,
        hasNextPage: false,
      },
    );
  }, [data, page, limit]);

  const availableManuscripts = manuscripts?.length > 0;

  return {
    manuscripts,
    meta,
    isFetching,
    availableManuscripts,
    refetch,
  };
};

export default useFetchManuscripts;
