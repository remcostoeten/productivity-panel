
import PreLoader from "@/components/effect/LogoFlicker";
import { cn } from "@/core/helpers/cn";
import Providers from "@/core/lib/providers";
import "@styles/app.scss";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";
import SiteHeader from "./(marketing)/_components/marketing-header";

const fontSans = FontSans({
  subsets: ["latin"],
  variable: "--font-sans",
});
export const metadata: Metadata = {
  title: "Remco Stoeten",
  description: "The startup template from Remco Stoeten",
};

const geistSans = localFont({
  src: "./GeistVF.woff",
  variable: "--font-geist-sans",
});

const geistMono = localFont({
  src: "./GeistMonoVF.woff",
  variable: "--font-geist-mono",
});

export default function RootLayout({ children }: PageProps) {
  return (
    <Providers>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body
          className={cn(
            "bg-body-gradient min-h-screen font-sans transition-colors duration-500 antialiased",
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange={true}
          >
            <SiteHeader />
            <PreLoader duration={3000}>
              <main className="mt-marketing-header">{children}</main>
            </PreLoader>
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
