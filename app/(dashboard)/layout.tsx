import "simplebar-react/dist/simplebar.min.css";
import "slick-carousel/slick/slick.css";
import "../assets/css/react-slick.css";

import { ThemeProvider } from "@mui/material/styles";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";
import type { Metadata } from "next";
import { Poppins } from "next/font/google";

import { Provider as NotificationProvider } from "@/context/notification";
import theme from "@/config/theme";
import { AppProvider } from "@/context/state";
import QueryClientProvider from "@/context/ReactQueryProvider";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  title: "SHADAI Journal Portal",
  description: "Managing and Publishing of Journals",
};

export default function DashboardLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <AppProvider>
      <ThemeProvider theme={theme}>
        <NotificationProvider>
          <QueryClientProvider>
            <body className={poppins.className}>
              <main>{children}</main>
              <ReactQueryDevtools initialIsOpen={false} />
            </body>
          </QueryClientProvider>
        </NotificationProvider>
      </ThemeProvider>
    </AppProvider>
  );
}
