import { Flex } from "@/components/atoms/Flex";
import { Button } from "@/components/ui/button";
import { footerLinks } from "@/core/data/menu-items";
import { siteConfig } from "@/core/data/site-config";
import { getLatestDeploymentInfo } from "@/core/server/server-actions/latest-deployment";
import { GitHubLogoIcon, LinkedInLogoIcon } from "@radix-ui/react-icons";
import Link from "next/link";
import React from "react";

export default async function Footer() {
  const { commitDate } = await getLatestDeploymentInfo();

  return (
    <footer className="mt-16 py-4 border-t bg-dark-bg border-seperator text-sm text-muted [--animation-delay:600ms] animate-fade-up opacity-0">
      <Flex
        dir="col-reverse"
        gap="4"
        items="center"
        className="container sm:flex-row sm:justify-between"
      >
        <DeploymentInfo commitDate={commitDate} />
        <nav className="hidden sm:flex flex-wrap justify-center gap-4">
          {footerLinks.map(({ href, label }, index) => (
            <React.Fragment key={label}>
              <Link
                href={href}
                className="trans-all-300-in-out-quad hover:text-white"
              >
                {label}
              </Link>
              {index < footerLinks.length - 1 && (
                <span className="flex items-center text-white/30">|</span>
              )}
            </React.Fragment>
          ))}
        </nav>
        <Flex className="gap-[13rem] sm:gap-0 justify-center">
          <Button
            variant="ghost"
            className="hover:bg-transparent text-[#303030] hover:text-muted transition-colors duration-300"
            size="icon"
          >
            <Link href={siteConfig.linkedin} target="_blank">
              <LinkedInLogoIcon className="size-6" />
            </Link>
          </Button>
          <Button
            variant="ghost"
            size="icon"
            className="hover:bg-transparent text-[#303030] hover:text-muted transition-colors duration-300"
          >
            <Link href={siteConfig.github} target="_blank">
              <GitHubLogoIcon className="size-6" />
            </Link>
          </Button>
        </Flex>
      </Flex>
    </footer>
  );
}

function DeploymentInfo({ commitDate }: { commitDate: string }) {
  const formattedDate = new Date(commitDate)
    .toLocaleString("en-US", {
      year: "2-digit",
      month: "numeric",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      hour12: false,
    })
    .replace(",", " at");

  return (
    <Flex items="center" variant="space-x-s">
      <div className="w-2 h-2 bg-success translate-y-[-1px] animate-pulse rounded-full" />
      <span className="font-medium">
        Latest deployment: <time dateTime={commitDate}>{formattedDate}</time>
      </span>
    </Flex>
  );
}
