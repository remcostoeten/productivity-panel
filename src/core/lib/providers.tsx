"use client";

import { incrementSiteVisit } from "@/core/server/server-actions/incrementSiteVisits";
import { TooltipProvider } from "@c/ui/tooltip";
import { ClerkProvider } from "@clerk/nextjs";
import { Analytics } from "@vercel/analytics/react";
import { SpeedInsights } from "@vercel/speed-insights/next";
import { i18n } from "next-i18next";
import { useRouter } from "next/navigation";
import posthog from "posthog-js";
import { PostHogProvider } from "posthog-js/react";
import { useEffect } from "react";
import { I18nextProvider } from "react-i18next";

export default function Providers({ children }: PageProps) {
  const router = useRouter();

  useEffect(() => {
    incrementSiteVisit();
  }, []);

  if (typeof window !== "undefined") {
    if (
      !process.env.NEXT_PUBLIC_POSTHOG_KEY ||
      !process.env.NEXT_PUBLIC_POSTHOG_HOST
    ) {
      console.error(
        "Environment variables NEXT_PUBLIC_POSTHOG_KEY and NEXT_PUBLIC_POSTHOG_HOST are not defined",
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
        }}
      >
        <I18nextProvider i18n={i18n}>
          <TooltipProvider>
            {children}
            <Analytics />
            <SpeedInsights />
          </TooltipProvider>
        </I18nextProvider>
      </ClerkProvider>
    </PostHogProvider>
  );
}
