import SiteHeader from "./_components/marketing-header";

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <>
      <SiteHeader />
      <div className="w-full max-w-4xl mx-auto p-6 bg-background text-foreground">
        <div className="flex flex-col justify-between my-10">{children}</div>
      </div>
    </>
  );
}
