import SiteHeader from "@/app/(marketing)/_components/marketing-header";
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
            background: "#0D0D0C",
            color: "#646464",
            border: "1px solid #252525",
          },
          success: {
            iconTheme: {
              primary: "#2a5e2c",
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
      />
      <SiteHeader />
      <main className="mt-marketing-header">{children}</main>
      <div className="w-full max-w-4xl mx-auto p-6 text-foreground"></div>
      <DotPattern
        color="rgba(255,255,255,.2"
        className={cn(
          "[mask-image:radial-gradient(300px_circle_at_center,white,transparent)]",
        )}
      />
    </>
  );
}
