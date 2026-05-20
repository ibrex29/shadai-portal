import { EditorInChiefUsersPageTab } from "@/app/components/@dashboard/components/@dashboard/common/config/tabs";
import PageLayout from "@/app/components/@dashboard/components/@dashboard/common/page/layout";
import PageTabs from "@/app/components/@dashboard/components/@dashboard/common/page/tabs";
import PageTitleBar from "@/app/components/@dashboard/components/@dashboard/common/page/title-bar/page";

export const metadata = {
  title: "Users",
};

export default function UsersPage() {
  return (
    <PageLayout>
      <PageTitleBar title="Users" />
      <PageTabs pageName="Users" tabs={EditorInChiefUsersPageTab} />
    </PageLayout>
  );
}
