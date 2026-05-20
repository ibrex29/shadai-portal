import { useQuery } from "@tanstack/react-query";
import React from "react";

import { getAllManuscripts } from "@/app/api/manuscript";
import { ManuscriptProps } from "@/types";

const useFetchManuscripts = () => {
  const [manuscripts, setManuscripts] = React.useState<ManuscriptProps[]>([]);

  const { data, isFetching, refetch } = useQuery({
    queryKey: ["manuscripts"],
    queryFn: getAllManuscripts,
    staleTime: 120000,
  });

  React.useEffect(() => {
    if (data) {
      setManuscripts(data);
    }
  }, [isFetching, data]);

  const availableManuscripts = manuscripts?.length > 0;

  return {
    manuscripts,
    isFetching,
    availableManuscripts,
    refetch,
  };
};

export default useFetchManuscripts;
