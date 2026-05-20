"use client";

import UsersTable from "@/app/components/@dashboard/components/@dashboard/common/users/users-table";
import { Stack } from "@mui/material";

const ManageUsersTab = () => {
  return (
    <Stack sx={{ mt: 2 }}>
      <UsersTable />
    </Stack>
  );
};

export default ManageUsersTab;
