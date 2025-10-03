import Breadcrumbs from "@/app/components/Breadcrumbs";
import ScrollToTop from "../utils/ScrollToTop";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs />
      <ScrollToTop />
      {children}
    </>
  );
}