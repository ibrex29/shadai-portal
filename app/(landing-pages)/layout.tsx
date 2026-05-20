import Footer from "../components/footer";
import Navbar from "../components/navbar";
import { defaultLocale, getDirection } from "@/lib/locale";

const LandingPageLayout = async ({ children }: { children: React.ReactNode }) => {
  const locale = defaultLocale;
  const dir = getDirection(locale);

  return (
    <main>
      <Navbar locale={locale} dir={dir} />
      <main className="container mt-20 sm:mt-28 md:mt-32 flex-grow mx-auto px-4">{children}</main>
      <Footer locale={locale} dir={dir} />
    </main>
  );
};

export default LandingPageLayout;
