import { AuthorSubmissionPageTabs } from "@/app/components/@dashboard/components/@dashboard/common/config/tabs";
import PageLayout from "@/app/components/@dashboard/components/@dashboard/common/page/layout";
import PageTabs from "@/app/components/@dashboard/components/@dashboard/common/page/tabs";
import PageTitleBar from "@/app/components/@dashboard/components/@dashboard/common/page/title-bar/page";

export const metadata = {
  title: "Submissions",
};

export default function SubmissionsPage() {
  return (
    <PageLayout>
      <PageTitleBar title="My Manuscripts" />
      <PageTabs pageName="My Manuscripts" tabs={AuthorSubmissionPageTabs} />
    </PageLayout>
  );
}
