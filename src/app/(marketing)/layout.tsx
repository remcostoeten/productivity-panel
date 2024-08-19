import SiteHeader from "./_components/marketing-header";

export default async function MarketingLayout({ children }: PageProps) {
  return (
    <>
      <SiteHeader />
      <main className="flex flex-col justify-between my-10">{children}</main>
    </>
  );
}
