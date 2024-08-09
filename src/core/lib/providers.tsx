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
      {/* <ClerkProvider
        appearance={{
          baseTheme: [dark],
          elements: {
            userButtonPopoverMain: 'bg-gray-subtle',
            navbar: 'bg-gradient-to-r from-gray-subtle to-gray-subtle',
            pageScrollBox: 'bg-gray-subtle',
          },
        }}
      > */}
         <ClerkProvider
        appearance={{
          variables: { colorPrimary: "#000000" },
          elements: {
            formButtonPrimary:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            socialButtonsBlockButton:
              "bg-white border-gray-200 hover:bg-transparent hover:border-black text-gray-600 hover:text-black",
            socialButtonsBlockButtonText: "font-semibold",
            formButtonReset:
              "bg-white border border-solid border-gray-200 hover:bg-transparent hover:border-black text-gray-500 hover:text-black",
            membersPageInviteButton:
              "bg-black border border-black border-solid hover:bg-white hover:text-black",
            card: "bg-[#fafafa]",
          },
        }}>
        <TooltipProvider>
          {children}
          <Toaster />
        </TooltipProvider>
      </ClerkProvider>
    </PostHogProvider>
  );
}
