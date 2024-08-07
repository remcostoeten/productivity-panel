import { SiteHeader } from './_components/marketing-header';

interface MarketingLayoutProps {
  children: React.ReactNode;
}

export default async function MarketingLayout({
  children,
}: MarketingLayoutProps) {
  return (
    <>
      <SiteHeader />
      <main className="mt-marketing-header mx-auto flex-1 overflow-hidden">
        {children}
      </main>
    </>
  );
}
