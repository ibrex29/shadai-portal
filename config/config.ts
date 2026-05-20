import { Metadata } from "next";

export const metadata: Metadata = {
  title: "SHADAI Journal — Peer-Reviewed Research",
  description:
    "SHADAI Journal is an open-access, peer-reviewed journal publishing multidisciplinary research.",
  keywords: [
    "shadai journal",
    "peer review",
    "open access",
    "research",
    "academic journal",
  ],
  authors: [{ name: "SHADAI Journal", url: "https://shadaijournal.com" }],
  openGraph: {
    title: "SHADAI Journal — Peer-Reviewed Research",
    description:
      "SHADAI Journal is an open-access, peer-reviewed journal publishing multidisciplinary research.",
    url: "https://shadaijournal.com",
    siteName: "SHADAI Journal",
    type: "website",
    images: [
      {
        url: "https://shadaijournal.com/images/og-image.jpg",
        width: 1200,
        height: 630,
        alt: "SHADAI Journal",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@shadaijournal",
    title: "SHADAI Journal — Peer-Reviewed Research",
    description:
      "SHADAI Journal is an open-access, peer-reviewed journal publishing multidisciplinary research.",
    images: ["https://shadaijournal.com/images/twitter-card.jpg"],
  },
};
