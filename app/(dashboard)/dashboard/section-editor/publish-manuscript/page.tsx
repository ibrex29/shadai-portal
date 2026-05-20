import PageLayout from "@/app/components/@dashboard/components/@dashboard/common/page/layout";
import PageTitleBar from "@/app/components/@dashboard/components/@dashboard/common/page/title-bar/page";
import PublishManuscript from "@/app/components/publish-manuscript";
import React from "react";

export const metadata = {
  title: "Publish Manuscript",
};

const PublishManuscriptPage: React.FC = () => {
  return (
    <PageLayout>
      <PageTitleBar title="Publish Manuscript" />
      <PublishManuscript />
    </PageLayout>
  );
};

export default PublishManuscriptPage;
