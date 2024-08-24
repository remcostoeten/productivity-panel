import DotPattern from "@/components/effect/dots-pattern";
import Aside from "@/components/theme/layout/Aside";
import Sidebar from "@/components/theme/layout/Sidebar";
import { cn } from "@/core/helpers/cn";

export default function RootLayout({ children }: { children: PageProps }) {
  return (
    <>
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
