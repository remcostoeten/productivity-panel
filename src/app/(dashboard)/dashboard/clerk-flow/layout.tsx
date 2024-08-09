import { Metadata } from "next";

export const metadata: Metadata = {
  metadataBase: new URL("https://clerk-next-app.vercel.app/"),
  title: "Next.js Clerk Template",
  description:
    "A simple and powerful Next.js template featuring authentication and user management powered by Clerk.",
  openGraph: { images: ["/og.png"] },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <>
      {children}
      {/* <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/components/prism-core.min.js" /> */}
      {/* <Script src="https://cdn.jsdelivr.net/npm/prismjs@1/plugins/autoloader/prism-autoloader.min.js" /> */}
    </>
  );
}
