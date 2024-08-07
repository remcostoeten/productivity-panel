'use client';

import { Toaster, TooltipProvider } from '@/components/ui';
import { ClerkProvider } from '@clerk/nextjs';
import { dark } from '@clerk/themes';
import posthog from 'posthog-js';
import { PostHogProvider } from 'posthog-js/react';

export default function Providers({ children }: PageProps) {
  if (typeof window !== 'undefined') {
    if (
      !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      !process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      console.error(
        'Environment variables NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST are not defined',
      );
    } else {
      posthog.init(process.env.NEXT_PUBLIC_POSTHOG_KEY, {
        api_host: process.env.NEXT_PUBLIC_POSTHOG_HOST,
      });
    }
  }

  return (
    <PostHogProvider client={posthog}>
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
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </ClerkProvider>
    </PostHogProvider>
  );
}
