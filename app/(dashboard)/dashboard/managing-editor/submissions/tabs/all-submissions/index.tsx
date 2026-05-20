"use client";

import useFetchAllManuscripts from "@/app/(dashboard)/hooks/useFetchAllManuscripts";

import ManuscriptsDisplay from "../../components/card";

const AllManuscriptTab: React.FC = () => {
  const { manuscripts, isFetching, availableManuscripts, refetch } =
    useFetchAllManuscripts();

  return (
    <ManuscriptsDisplay
      manuscripts={manuscripts}
      isFetching={isFetching}
      availableManuscripts={availableManuscripts}
      refetch={refetch}
    />
  );
};

export default AllManuscriptTab;
