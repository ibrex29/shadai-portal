import { AuthorManuscriptPageTabs } from "@/app/components/@dashboard/components/@dashboard/common/config/tabs";
import PageLayout from "@/app/components/@dashboard/components/@dashboard/common/page/layout";
import PageTabs from "@/app/components/@dashboard/components/@dashboard/common/page/tabs";
import PageTitleBar from "@/app/components/@dashboard/components/@dashboard/common/page/title-bar/page";
import React from "react";

export const metadata = {
  title: "Dashboard",
};

const SubmitManuscriptPage: React.FC = () => {
  return (
    <PageLayout>
      <PageTitleBar title="Submit Manuscript" />
      <PageTabs pageName="Submit Manuscript" tabs={AuthorManuscriptPageTabs} />
    </PageLayout>
  );
};

export default SubmitManuscriptPage;
