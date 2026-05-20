import { Locale } from "@/lib/locale";

export type TranslationShape = {
  journalName: string;
  nav: {
    home: string;
    about: string;
    issues: string;
    submit: string;
    contact: string;
    login: string;
  };
  hero: {
    badge: string;
    title: string;
    tagline: string;
    ctaPrimary: string;
    ctaSecondary: string;
  };
  about: {
    title: string;
    description: string;
    stats: string[];
  };
  scope: {
    title: string;
    areas: string[];
  };
  latest: {
    title: string;
    readMore: string;
    issues: Array<{
      volume: string;
      issue: string;
      title: string;
      abstract: string;
    }>;
  };
  authors: {
    title: string;
    steps: Array<{ title: string; detail: string }>;
    guidelines: string;
    stepPrefix: string;
  };
  cta: {
    title: string;
    button: string;
  };
  footer: {
    description: string;
    linksTitle: string;
    links: {
      home: string;
      about: string;
      issues: string;
      submit: string;
      contact: string;
      editorialBoard: string;
    };
    copy: string;
    emailLabel: string;
    websiteLabel: string;
  };
};

const enTranslation: TranslationShape = {
    journalName: "SHADAI Journal",
    nav: {
      home: "Home",
      about: "About",
      issues: "Issues",
      submit: "Submit Manuscript",
      contact: "Contact",
      login: "Login",
    },
    hero: {
      badge: "SHADAI Journal",
      title: "SHADAI Journal",
      tagline: "Advancing Knowledge Through Peer-Reviewed Research",
      ctaPrimary: "Submit Manuscript",
      ctaSecondary: "Browse Issues",
    },
    about: {
      title: "About the Journal",
      description:
        "SHADAI Journal is a multidisciplinary, open-access, peer-reviewed journal dedicated to publishing high-quality research across science, technology, humanities, and social sciences.",
      stats: ["Open Access", "Double-Blind Peer Review", "Fast Publication"],
    },
    scope: {
      title: "Scope & Focus Areas",
      areas: [
        "Science & Technology",
        "Engineering",
        "Health Sciences",
        "Social Sciences",
        "Humanities",
        "Education & Policy",
      ],
    },
    latest: {
      title: "Latest Issues & Featured Articles",
      readMore: "Read More",
      issues: [
        {
          volume: "Volume 1",
          issue: "Issue 1",
          title: "Multidisciplinary Frontiers in Contemporary Research",
          abstract:
            "A curated selection of peer-reviewed studies spanning scientific innovation, policy analysis, and social impact.",
        },
        {
          volume: "Volume 1",
          issue: "Issue 2",
          title: "Emerging Methods in Data-Driven Discovery",
          abstract:
            "Highlights methodological advances in analytics, experimentation, and evidence-based scholarship.",
        },
        {
          volume: "Volume 2",
          issue: "Issue 1",
          title: "Global Perspectives on Innovation and Society",
          abstract:
            "Explores interdisciplinary approaches to development, education, sustainability, and public health.",
        },
      ],
    },
    authors: {
      title: "For Authors",
      stepPrefix: "Step",
      steps: [
        {
          title: "Submit",
          detail: "Upload your manuscript and required documents.",
        },
        {
          title: "Peer Review",
          detail: "Double-blind review by qualified subject experts.",
        },
        {
          title: "Publish",
          detail: "Accepted work is edited, indexed, and published online.",
        },
      ],
      guidelines: "Author Guidelines",
    },
    cta: {
      title: "Ready to share your research with the world?",
      button: "Submit Your Paper",
    },
    footer: {
      description:
        "Open-access and peer-reviewed publishing platform for multidisciplinary research.",
      linksTitle: "Links",
      links: {
        home: "Home",
        about: "About",
        issues: "Issues",
        submit: "Submit",
        contact: "Contact",
        editorialBoard: "Editorial Board",
      },
      copy: "© 2025 SHADAI Journal. All rights reserved.",
      emailLabel: "Email",
      websiteLabel: "Website",
    },
  };

export const translations: Record<Locale, TranslationShape> = {
  en: enTranslation,
  // Arabic translations are temporarily disabled.
  // Restore a dedicated Arabic locale block when Arabic support is re-enabled.
  ar: enTranslation,
};
