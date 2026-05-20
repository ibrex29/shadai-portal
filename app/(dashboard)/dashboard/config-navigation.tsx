import ArticleIcon from "@mui/icons-material/Article";
import DescriptionIcon from "@mui/icons-material/Description";
import HomeIcon from "@mui/icons-material/Home";
import PeopleIcon from "@mui/icons-material/People";
import SettingsIcon from "@mui/icons-material/Settings";
import PublishIcon from "@mui/icons-material/Publish";

// ----------------------------------------------------------------------

const icon = (IconComponent: React.ElementType) => (
  <IconComponent sx={{ fontSize: 24 }} />
);

export const basePath = {
  author: "/dashboard/author",
  reviewer: "/dashboard/reviewer",
  managing_editor: "/dashboard/managing-editor",
  section_editor: "/dashboard/section-editor",
  editor_in_chief: "/dashboard/editor-in-chief",
  production_editor: "/dashboard/production-editor",
  copy_editor: "/dashboard/copy-editor",
};

export const authorNavConfig = [
  {
    title: "Home",
    path: `${basePath.author}`,
    icon: icon(HomeIcon),
  },
  {
    title: "Submit Manuscript",
    path: `${basePath.author}/submit-manuscript`,
    icon: icon(DescriptionIcon),
  },
  {
    title: "My Manuscript",
    path: `${basePath.author}/submissions`,
    icon: icon(ArticleIcon),
  },
];

export const reviewerNavConfig = [
  {
    title: "Home",
    path: `${basePath.reviewer}`,
    icon: icon(HomeIcon),
  },
  {
    title: "Manuscript",
    path: `${basePath.reviewer}/submissions`,
    icon: icon(ArticleIcon),
  },
];

export const productionEditorNavConfig = [
  {
    title: "Home",
    path: `${basePath.production_editor}`,
    icon: icon(HomeIcon),
  },
  {
    title: "Users",
    path: `${basePath.production_editor}/users`,
    icon: icon(PeopleIcon),
  },
];

export const editorInChiefNavConfig = [
  {
    title: "Home",
    path: `${basePath.editor_in_chief}`,
    icon: icon(HomeIcon),
  },
  {
    title: "Manuscript",
    path: `${basePath.editor_in_chief}/submissions`,
    icon: icon(ArticleIcon),
  },
  {
    title: "Publish Manuscript",
    path: `${basePath.editor_in_chief}/publish-manuscript`,
    icon: icon(PublishIcon),
  },
  {
    title: "Section",
    path: `${basePath.editor_in_chief}/sections`,
    icon: icon(DescriptionIcon),
  },
  {
    title: "Users",
    path: `${basePath.editor_in_chief}/users`,
    icon: icon(PeopleIcon),
  },
  {
    title: "Management",
    path: `${basePath.editor_in_chief}/editorial-management`,
    icon: icon(SettingsIcon),
  },
];

export const managingEditorNavConfig = [
  {
    title: "Home",
    path: `${basePath.managing_editor}`,
    icon: icon(HomeIcon),
  },
  {
    title: "Manuscript",
    path: `${basePath.managing_editor}/submissions`,
    icon: icon(ArticleIcon),
  },
  {
    title: "Section",
    path: `${basePath.managing_editor}/sections`,
    icon: icon(DescriptionIcon),
  },
  {
    title: "Publish Manuscript",
    path: `${basePath.managing_editor}/publish-manuscript`,
    icon: icon(PublishIcon),
  },
  {
    title: "Users",
    path: `${basePath.managing_editor}/users`,
    icon: icon(PeopleIcon),
  },
];

export const sectionEditorNavConfig = [
  {
    title: "Home",
    path: `${basePath.section_editor}`,
    icon: icon(HomeIcon),
  },
  {
    title: "Manuscript",
    path: `${basePath.section_editor}/submissions`,
    icon: icon(ArticleIcon),
  },
  {
    title: "Publish Manuscript",
    path: `${basePath.section_editor}/publish-manuscript`,
    icon: icon(PublishIcon),
  },
  {
    title: "Users",
    path: `${basePath.section_editor}/users`,
    icon: icon(PeopleIcon),
  },
];

export const copyEditorNavConfig = [
  {
    title: "Home",
    path: `${basePath.copy_editor}`,
    icon: icon(HomeIcon),
  },
  {
    title: "Manuscript",
    path: `${basePath.copy_editor}/submissions`,
    icon: icon(ArticleIcon),
  },
];
