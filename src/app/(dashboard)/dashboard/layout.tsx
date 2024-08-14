import SiteHeader from "@/app/(marketing)/_components/marketing-header";
import ToolIntro from "@/app/(marketing)/color-tool/_components/ColorToolPageIntro";
import DotPattern from "@/components/effect/dots-pattern";
import { cn } from "@/core/helpers/cn";

export default function DashboardLayout({ children }: PageProps) {
  return (
    <>
      <SiteHeader />
      <div className="relative flex min-h-screen grid place-items-center rounded-lg  bg-background md:shadow-xl">
        <div className="w-full max-w-4xl mx-auto p-6 bg-background text-foreground">
          <div className="flex flex-col justify-between my-10">
            {" "}
            <ToolIntro
              title="Wishlists"
              description="Create and manage your wishlists."
            />{" "}
            {children}
          </div>
        </div>
        <DotPattern
          color="rgba(255,255,255,.2"
          className={cn(
            "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
          )}
        />
      </div>{" "}
    </>
  );
}
