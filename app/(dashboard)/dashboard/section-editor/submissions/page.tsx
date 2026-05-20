import { SectionEditorManuscriptsPageTab } from "@/app/components/@dashboard/components/@dashboard/common/config/tabs";
import PageLayout from "@/app/components/@dashboard/components/@dashboard/common/page/layout";
import PageTabs from "@/app/components/@dashboard/components/@dashboard/common/page/tabs";
import PageTitleBar from "@/app/components/@dashboard/components/@dashboard/common/page/title-bar/page";

export const metadata = {
  title: "Submissions",
};

export default function SESubmissionsPage() {
  return (
    <PageLayout>
      <PageTitleBar title="Submissions" />
      <PageTabs pageName="Submissions" tabs={SectionEditorManuscriptsPageTab} />
    </PageLayout>
  );
}
