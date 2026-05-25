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
      title: "SHADAI Journal of Contemporary Research in Humanities",
      tagline:
        "A biannual peer-reviewed journal of the Faculty of Humanities, Sule Lamido University Kafin Hausa.",
      ctaPrimary: "Submit Your Manuscript",
      ctaSecondary: "Explore Volume 2 Issue 1",
    },
    about: {
      title: "About the Journal",
      description:
        "The SHADAI Journal of Contemporary Research in Humanities is a reputable peer-reviewed academic journal published twice yearly by the Faculty of Humanities, Sule Lamido University Kafin Hausa. It publishes original scholarship in Humanities, Education, Social Sciences and Law in Arabic, English, Hausa, Fulfulde, Yoruba, Igbo, and French.",
      stats: [
        "Biannual Humanities Research",
        "Multilingual Academic Scholarship",
        "Faculty of Humanities Publication",
      ],
    },
    scope: {
      title: "Scope & Focus Areas",
      areas: [
        "Humanities",
        "Education",
        "Social Sciences",
        "Law",
        "Islamic Studies",
        "Nigerian Languages",
      ],
    },
    latest: {
      title: "Current Issue",
      readMore: "Read More",
      issues: [
        {
          volume: "Volume 2",
          issue: "Issue 1",
          title: "SHADAI Journal — 2nd Edition",
          abstract:
            "Official 2nd Edition of the SHADAI Journal of Contemporary Research in Humanities, published July 2025 / AlMuharram 1447 by the Faculty of Humanities, Sule Lamido University Kafin Hausa.",
        },
        {
          volume: "Volume 1",
          issue: "Issue 2",
          title: "Founding Issue Highlights",
          abstract:
            "A collection of peer-reviewed articles from the inaugural year of SHADAI Journal, featuring key research in the humanities and social sciences.",
        },
      ],
    },
    authors: {
      title: "For Authors",
      stepPrefix: "Step",
      steps: [
        {
          title: "Prepare Your Manuscript",
          detail:
            "Follow our author guidelines and ensure your work is original and unpublished.",
        },
        {
          title: "Complete Submission Details",
          detail:
            "Include a title page, abstract, author affiliation, and contact information.",
        },
        {
          title: "Submit & Review",
          detail:
            "Send your manuscript through the portal or by email for peer review.",
        },
      ],
      guidelines: "Author Guidelines",
    },
    cta: {
      title: "Submit your original humanities research for peer review today.",
      button: "Submit Your Paper",
    },
    footer: {
      description:
        "Biannual peer-reviewed journal of the Faculty of Humanities, Sule Lamido University Kafin Hausa.",
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
