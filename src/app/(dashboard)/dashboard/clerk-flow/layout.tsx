import { Metadata } from "next";

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
