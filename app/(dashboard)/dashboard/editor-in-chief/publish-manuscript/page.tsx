import PageTabs from "@/app/components/@dashboard/components/@dashboard/common/page/tabs";
import PageLayout from "@/app/components/@dashboard/components/@dashboard/common/page/layout";
import PageTitleBar from "@/app/components/@dashboard/components/@dashboard/common/page/title-bar/page";
import { EditorInChiefPublishPageTab } from "@/app/components/@dashboard/components/@dashboard/common/config/tabs";
import React from "react";

export const metadata = {
  title: "Publications",
};

const PublishManuscriptPage: React.FC = () => {
  return (
    <PageLayout>
      <PageTitleBar title="Publications" />
      <PageTabs
        pageName="Publications"
        tabs={EditorInChiefPublishPageTab}
      />
    </PageLayout>
  );
};

export default PublishManuscriptPage;
