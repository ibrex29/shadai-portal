import { EditorInChiefSectionsPageTab } from "@/app/components/@dashboard/components/@dashboard/common/config/tabs";
import PageLayout from "@/app/components/@dashboard/components/@dashboard/common/page/layout";
import PageTabs from "@/app/components/@dashboard/components/@dashboard/common/page/tabs";
import PageTitleBar from "@/app/components/@dashboard/components/@dashboard/common/page/title-bar/page";

export const metadata = {
  title: "Sections",
};

export default function SubmissionsPage() {
  return (
    <PageLayout>
      <PageTitleBar title="Sections" />
      <PageTabs pageName="Sections" tabs={EditorInChiefSectionsPageTab} />
    </PageLayout>
  );
}
