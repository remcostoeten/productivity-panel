import ThemeToggle from '@/components/theme/ThemeToggle';
import { cn } from '@/core/helpers/cn';
import { ThemeProvider } from '@/core/lib/ next-theme-provider';
import Providers from '@/core/lib/providers';
import '@styles/app.scss';
import type { Metadata } from 'next';
import { Inter as FontSans } from 'next/font/google';

const fontSans = FontSans({
  subsets: ['latin'],
  variable: '--font-sans',
});
export const metadata: Metadata = {
  title: 'Remco Stoeten',
  description: 'The startup template from Remco Stoeten',
};

export default function RootLayout({ children }: PageProps) {
return (
    <Providers>
      <html lang="en" suppressHydrationWarning>
        <body
          className={cn(
            'bg-background min-h-screen font-sans transition-colors duration-500 antialiased',
            fontSans.variable,
          )}
        >
          <ThemeProvider
            attribute="class"
            defaultTheme="dark"
            disableTransitionOnChange
          >
            {children}
            <ThemeToggle />
          </ThemeProvider>                                                            
        </body>
      </html>
    </Providers>
  );
}
