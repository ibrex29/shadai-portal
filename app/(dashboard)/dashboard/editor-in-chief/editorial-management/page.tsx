import { EditorInChiefEditorialManagementPageTab } from "@/app/components/@dashboard/components/@dashboard/common/config/tabs";
import PageLayout from "@/app/components/@dashboard/components/@dashboard/common/page/layout";
import PageTabs from "@/app/components/@dashboard/components/@dashboard/common/page/tabs";
import PageTitleBar from "@/app/components/@dashboard/components/@dashboard/common/page/title-bar/page";

export const metadata = {
  title: "Editorial Management",
};

export default function UsersPage() {
  return (
    <PageLayout>
      <PageTitleBar title="Editorial Management" />
      <PageTabs
        pageName="Editorial Management"
        tabs={EditorInChiefEditorialManagementPageTab}
      />
    </PageLayout>
  );
}
