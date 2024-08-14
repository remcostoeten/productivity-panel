import SiteHeader from "@/app/(marketing)/_components/marketing-header";
import ToolIntro from "@/app/(marketing)/color-tool/_components/ColorToolPageIntro";
import DotPattern from "@/components/effect/dots-pattern";
import { cn } from "@/core/helpers/cn";
import { Toaster } from "react-hot-toast";

export default function DashboardLayout({ children }: PageProps) {
  return (
    <>
      <Toaster
        position="top-right"
        toastOptions={{
          style: {
            background: "#000000",
            color: "#ffffff",
            border: "1px solid #333333",
          },
          success: {
            iconTheme: {
              primary: "#4caf50",
              secondary: "#ffffff",
            },
          },
          error: {
            iconTheme: {
              primary: "#f44336",
              secondary: "#ffffff",
            },
          },
        }}
      />{" "}
      <SiteHeader />
      <div className="relative flex min-h-screen grid place-items-normal pt-8 rounded-lg  ">
        <div className="w-full max-w-4xl mx-auto p-6  text-foreground">
          <div className="flex flex-col justify-between my-10">
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
