"use client";

import PublicationsTable from "@/app/components/@dashboard/components/@dashboard/common/publications/publications-table";
import { Stack } from "@mui/material";

const ManagePublicationsTab = () => {
  return (
    <Stack sx={{ mt: 2 }}>
      <PublicationsTable />
    </Stack>
  );
};

export default ManagePublicationsTab;
