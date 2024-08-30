import DotPattern from "@/components/effect/dots-pattern";
import { cn } from "@/core/helpers/cn";

export default function DashboardLayout({ children }: PageProps) {
  return (
    <>
      <div className="relative flex min-h-screen  place-items-normal pt-8 rounded-lg  ">
        <div className="w-full max-w-4xl mx-auto text-foreground">
          {children}
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
