import SiteVisitStats from "@/components/auth/SiteVisitStats";
import UserInfoButton from "@/components/auth/UserInfoButton";
import PreLoader from "@/components/effect/LogoFlicker";
import { cn } from "@/core/helpers/cn";
import Providers from "@/core/lib/providers";
import { getUserPreloaderPreference } from "@/core/server/server-actions/get-user-preloader-preference.ts";
import "@styles/app.scss";
import type { Metadata } from "next";
import { ThemeProvider } from "next-themes";
import { Inter as FontSans } from "next/font/google";
import localFont from "next/font/local";

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

export default async function RootLayout({ children }: PageProps) {
  const showPreloader = await getUserPreloaderPreference();

  return (
    <Providers>
      <html lang="en" className={`${geistSans.variable} ${geistMono.variable}`}>
        <body
          className={cn(
            " min-h-screen font-sans transition-colors duration-500 antialiased",
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange={true}
          >
            {showPreloader ? (
              <PreLoader duration={3000}>{children}</PreLoader>
            ) : (
              children
            )}
            <UserInfoButton />

            <SiteVisitStats />
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
