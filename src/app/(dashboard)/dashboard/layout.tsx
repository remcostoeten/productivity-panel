import DotPattern from "@/components/effect/dots-pattern";
import Aside from "@/components/theme/layout/Aside";
import Sidebar from "@/components/theme/layout/Sidebar";
import { cn } from "@/core/helpers/cn";
import { Toaster } from "react-hot-toast";

export default function RootLayout({ children }: { children: PageProps }) {
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
      <div className="flex h-screen bg-[#0D0D0C] text-white relative">
        <Sidebar />
        <Aside />
        <main className="flex-1 overflow-auto">{children}</main>
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
