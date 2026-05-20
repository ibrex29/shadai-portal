import MyManuscriptTab from "@/app/(dashboard)/dashboard/author/submissions/tabs/my-submissions";
import SubmitManuscriptTab from "@/app/(dashboard)/dashboard/author/submit-manuscript/tabs/submit-manuscript";
import CEIssueManagementTab from "@/app/(dashboard)/dashboard/editor-in-chief/editorial-management/tabs/create-issue";
import CEVolumeManagementTab from "@/app/(dashboard)/dashboard/editor-in-chief/editorial-management/tabs/create-volume";
import CESectionManagementTab from "@/app/(dashboard)/dashboard/editor-in-chief/sections/tabs/sections";
import CEManuscriptTab from "@/app/(dashboard)/dashboard/editor-in-chief/submissions/tabs/all-submissions";
import PendingApprovalsTab from "@/app/(dashboard)/dashboard/editor-in-chief/submissions/tabs/review-submissions";
import CreateUsers from "@/app/(dashboard)/dashboard/editor-in-chief/users/tabs/create-user";
import ManageUsersTab from "@/app/(dashboard)/dashboard/editor-in-chief/users/tabs/manage-users";
import PublishManuscriptTab from "@/app/(dashboard)/dashboard/editor-in-chief/publish-manuscript/tabs/publish";
import ManagePublicationsTab from "@/app/(dashboard)/dashboard/editor-in-chief/publish-manuscript/tabs/manage-publications";
import SectionManagementTab from "@/app/(dashboard)/dashboard/managing-editor/sections/tabs/sections";
import AllManuscriptTab from "@/app/(dashboard)/dashboard/managing-editor/submissions/tabs/all-submissions";
import REManuscriptTab from "@/app/(dashboard)/dashboard/reviewer/submissions/tabs/my-submissions";
import SEManuscriptTab from "@/app/(dashboard)/dashboard/section-editor/submissions/tabs/all-submissions";

export const EditorInChiefManuscriptsPageTab = [
  {
    title: "All Manuscript",
    component: CEManuscriptTab,
  },
  {
    title: "Review Submission",
    component: PendingApprovalsTab,
  },
];

export const EditorInChiefSectionsPageTab = [
  {
    title: "Sections",
    component: CESectionManagementTab,
  },
];

export const EditorInChiefUsersPageTab = [
  {
    title: "Create User",
    component: CreateUsers,
  },
  {
    title: "Users",
    component: ManageUsersTab,
  },
];

export const EditorInChiefPublishPageTab = [
  {
    title: "Publish Manuscript",
    component: PublishManuscriptTab,
  },
  {
    title: "Manage Publications",
    component: ManagePublicationsTab,
  },
];

export const EditorInChiefEditorialManagementPageTab = [
  {
    title: "Volume",
    component: CEVolumeManagementTab,
  },

  {
    title: "Issue",
    component: CEIssueManagementTab,
  },
];

export const AuthorSubmissionPageTabs = [
  {
    title: "Submitted Manuscripts",
    component: MyManuscriptTab,
  },
];

export const AuthorManuscriptPageTabs = [
  {
    title: "Submit Manuscript",
    component: SubmitManuscriptTab,
  },
];

export const ManagingEditorManuscriptsPageTab = [
  {
    title: "All Manuscript",
    component: AllManuscriptTab,
  },
];

export const ManagingEditorSectionsPageTab = [
  {
    title: "Sections",
    component: SectionManagementTab,
  },
];

export const SectionEditorManuscriptsPageTab = [
  {
    title: "All Manuscript",
    component: SEManuscriptTab,
  },
];

export const ReviewerManuscriptsPageTab = [
  {
    title: "All Manuscript",
    component: REManuscriptTab,
  },
];

// export const SectionsPageTab = [
//   {
//     title: 'Create Section',
//     component: CreateSectionsTab
//   }
// ];
