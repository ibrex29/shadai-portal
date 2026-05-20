import UsersTable from "@/app/components/@dashboard/components/@dashboard/common/users/users-table";
import PageLayout from "@/app/components/@dashboard/components/@dashboard/common/page/layout";
import PageTitleBar from "@/app/components/@dashboard/components/@dashboard/common/page/title-bar/page";

export const metadata = {
  title: "Users",
};

const ManagingEditorUsersPage = () => {
  return (
    <PageLayout>
      <PageTitleBar title="Users" />
      <UsersTable />
    </PageLayout>
  );
};

export default ManagingEditorUsersPage;
