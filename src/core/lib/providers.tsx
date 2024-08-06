import { TooltipProvider } from '@/components/ui';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';

export default function Providers({ children }: PageProps) {
  return (
    <ClerkProvider
      appearance={{
        baseTheme: [dark],
        elements: {
          userButtonPopoverMain: 'bg-gray-subtle',
          navbar: 'bg-gradient-to-r from-gray-subtle to-gray-subtle',
          pageScrollBox: 'bg-gray-subtle',
        },
      }}
    >
      <TooltipProvider>{children}</TooltipProvider>
    </ClerkProvider>
  );
}
