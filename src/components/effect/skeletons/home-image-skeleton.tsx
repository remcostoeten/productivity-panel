import Skeletons from "./parent-skeleton";

const { SVGSkeleton } = Skeletons;

export default function HomeImageSkeleton() {
  return (
    <div className="border border-white/10 before:absolute before:bottom-1/2 before:left-0 before:top-0 before:size-full before:[background-image:linear-gradient(to_bottom,var(--color-one),var(--color-one),transparent_40%)]">
      <div className="absolute [border:calc(var(--border-width)*1px)_solid_transparent] ![mask-clip:padding-box,border-box] after:animate-border-beam after:absolute after:aspect-square after:w-[calc(var(--size)*1px)] after:[background:linear-gradient(to_left,var(--color-from),var(--color-to),transparent)]"></div>
      <SVGSkeleton className="relative hidden size-full rounded-[inherit] border object-contain dark:block w-[1200px] h-[729px]" />
      <SVGSkeleton className="relative block size-full rounded-[inherit] border object-contain dark:hidden w-[1000px] h-[1000px]" />
    </div>
  );
}
