import Footer from "@/components/theme/layout/footer";

export default async function MarketingLayout({ children }: PageProps) {
  return (
    <>
      {/* <div className="w-full max-w-4xl mx-auto p-6  text-foreground"> */}
      <main className="flex flex-col justify-between mt-marketing-header">
        {children}
      </main>
      {/* </div> */}
      <Footer />
    </>
  );
}
