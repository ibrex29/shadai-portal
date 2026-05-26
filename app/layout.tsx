import { Poppins } from "next/font/google";
import "./globals.css";
import QueryClientProvider from "@/context/ReactQueryProvider";
import AuthProvider from "@/context/AuthProvider";
import { Metadata } from "next";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

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
  icons: {
    icon: "/images/shadai-logo.png",
    apple: "/images/shadai-logo.png",
  },
  alternates: {
    canonical: "https://shadaijournal.com",
    languages: {
      en: "https://shadaijournal.com",
    },
  },
  openGraph: {
    title: "SHADAI Journal — Peer-Reviewed Research",
    description:
      "SHADAI Journal is an open-access, peer-reviewed journal publishing multidisciplinary research.",
    url: "https://shadaijournal.com",
    siteName: "SHADAI Journal",
    locale: "en_US",
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

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const locale = "en";
  const dir = "ltr";

  return (
    <html lang={locale} dir={dir}>
      <head>
        <meta name="robots" content="index, follow" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </head>
      <body className={`${poppins.variable} antialiased`}>
        {" "}
        <AuthProvider>
          <QueryClientProvider>
            <div data-locale={locale} data-dir={dir}>
              <main>{children}</main>
            </div>
          </QueryClientProvider>
        </AuthProvider>
      </body>
    </html>
  );
}
