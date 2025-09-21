import Breadcrumbs from "@/app/components/Breadcrumbs";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
      <Breadcrumbs />
      {children}
    </>
  );
}