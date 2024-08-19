import ToolIntro from "@/app/(marketing)/(dev-tools)/color-tool/_components/ColorToolPageIntro";
import SiteHeader from "@/app/(marketing)/_components/marketing-header";
import DotPattern from "@/components/effect/dots-pattern";
import { cn } from "@/core/helpers/cn";

export default function DashboardLayout({ children }: PageProps) {
  return (
    <>
      <SiteHeader />
      <div className="relative flex min-h-screen  place-items-normal pt-8 rounded-lg  ">
        <div className="w-full max-w-4xl mx-auto text-foreground">
          <div className="flex flex-col justify-between my-10">
            <ToolIntro
              title="Wishlists"
              description="Create and manage your wishlists."
            />
            {children}
          </div>
        </div>
        <DotPattern
          color="rgba(255,255,255,.2"
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          )}
        />
      </div>
    </>
  );
}
