import Footer from "@/components/theme/layout/footer";
import SiteHeader from "./_components/marketing-header";

export default async function MarketingLayout({ children }: PageProps) {
  return (
    <>
      <SiteHeader />
      {/* <div className="w-full max-w-4xl mx-auto p-6  text-foreground"> */}
      <main className="flex flex-col justify-between my-10">{children}</main>
      {/* </div> */}
      <Footer />
    </>
  );
}
