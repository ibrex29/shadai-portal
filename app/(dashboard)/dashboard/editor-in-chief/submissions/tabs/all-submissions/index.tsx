"use client";

import useFetchAllManuscriptsFiltered from "@/app/(dashboard)/hooks/useFetchAllManuscriptsFiltered";

import ManuscriptsDisplay from "../../components/card";

// CE -- Chief Editor
const CEManuscriptTab: React.FC = () => {
  const {
    manuscripts,
    isFetching,
    availableManuscripts,
    refetch,
    page,
    setPage,
    limit,
    setLimit,
    sortOrder,
    setSortOrder,
    search,
    setSearch,
    status,
    setStatus,
    totalItems,
    pageCount,
    hasPreviousPage,
    hasNextPage,
  } = useFetchAllManuscriptsFiltered();

  return (
    <ManuscriptsDisplay
      manuscripts={manuscripts}
      isFetching={isFetching}
      availableManuscripts={availableManuscripts}
      refetch={refetch}
      page={page}
      setPage={setPage}
      limit={limit}
      setLimit={setLimit}
      sortOrder={sortOrder}
      setSortOrder={setSortOrder}
      search={search}
      setSearch={setSearch}
      status={status}
      setStatus={setStatus}
      totalItems={totalItems}
      pageCount={pageCount}
      hasPreviousPage={hasPreviousPage}
      hasNextPage={hasNextPage}
    />
  );
};

export default CEManuscriptTab;
