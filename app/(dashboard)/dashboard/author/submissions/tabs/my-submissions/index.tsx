/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import useFetchAuthorManuscripts from "@/app/(dashboard)/hooks/useFetchAuthorManuscripts";
import ManuscriptsDisplay from "../../components/manuscript-display";

const MyManuscriptTab: React.FC = () => {
  const {
    manuscripts,
    isFetching,
    availableManuscripts,
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
  } = useFetchAuthorManuscripts();
  return (
    <ManuscriptsDisplay
      manuscripts={manuscripts}
      isFetching={isFetching}
      availableManuscripts={availableManuscripts}
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

export default MyManuscriptTab;
