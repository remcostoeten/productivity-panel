import SiteHeader from "../(marketing)/_components/marketing-header";

export default async function MarketingLayout({ children }: PageProps) {
  return (
    <>
      <SiteHeader />
      <main className="mt-marketing-header mx-auto flex-1 overflow-hidden">
        {children}
      </main>
    </>
  );
}
