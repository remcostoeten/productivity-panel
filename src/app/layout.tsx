
import PreLoader from "@/components/effect/LogoFlicker";
import { cn } from "@/core/helpers/cn";
import { ThemeProvider } from "@/core/lib/ next-theme-provider";
import Providers from "@/core/lib/providers";
import "@styles/app.scss";
import type { Metadata } from "next";
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
            <PreLoader duration={3000}>{children}</PreLoader>
          </ThemeProvider>
        </body>
      </html>
    </Providers>
  );
}
