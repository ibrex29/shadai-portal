import { useQuery } from "@tanstack/react-query";

import { getSEManuscript } from "@/app/api/manuscript";
import { FetchManuscriptsParams, FetchManuscriptsResponse } from "@/app/api/manuscript/types";

const useFetchSEManuscripts = (params: FetchManuscriptsParams = {}) => {
  const { page = 1, limit = 10, search = "", status = "", sortOrder = "desc" } = params;

  const { data, isFetching, refetch } = useQuery<FetchManuscriptsResponse>({
    queryKey: ["se-manuscripts", page, limit, search, status, sortOrder],
    queryFn: () => getSEManuscript({ page, limit, search, status, sortOrder }),
    staleTime: 120000,
  });

  const manuscripts = data?.data ?? [];
  const meta = data?.meta;
  const availableManuscripts = manuscripts.length > 0;

  return {
    manuscripts,
    meta,
    isFetching,
    availableManuscripts,
    refetch,
  };
};

export default useFetchSEManuscripts;
