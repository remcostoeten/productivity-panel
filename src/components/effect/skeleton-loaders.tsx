import { motion } from "framer-motion";
import { Skeleton, SVGSkeleton } from "./Skeleton";

const WishlistSkeleton = () => (
  <>
    <motion.div
      initial={{ opacity: 0, y: 50, scale: 0.9 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      className="w-full max-w-4xl mx-auto"
    >
      <div className="grid gap-4">
        <div className="grid gap-6">
          <div>
            <div className="border shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2>
                    <Skeleton className="w-[80px] max-w-full" />
                  </h2>
                  <div>
                    <SVGSkeleton className="w-[20px] h-[20px]" />
                  </div>
                </div>
                <p>
                  <Skeleton className="w-[144px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[224px] max-w-full" />
                </p>
              </div>
              <div className="p-6 px-6 py-4">
                <ul className="grid gap-4">
                  <li className="grid grid-cols-[1fr_auto] items-center gap-4">
                    <div className="grid gap-1">
                      <h3>
                        <Skeleton className="w-[56px] max-w-full" />
                      </h3>
                      <p>
                        <Skeleton className="w-[48px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        <Skeleton className="w-[128px] max-w-full" />
                      </div>
                      <div>
                        <SVGSkeleton className="w-[16px] h-[16px]" />
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="justify-between items-center p-2 shadow-lg">
                  <div className="h-full">
                    <div className="flex flex-col justify-between gap-2 h-full transform-gpu">
                      <div className="flex items-center justify-between gap-2 transform-gpu">
                        <div className="flex gap-2 p-2 group-hover:text-neutral-50 transform-gpu">
                          <Skeleton className="w-[64px] max-w-full" />
                        </div>
                        <div className="size-8 transition-colors transform-gpu">
                          <SVGSkeleton className="transform-gpu w-[24px] h-[24px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div>
            <div className="border shadow-sm">
              <div className="flex flex-col space-y-1.5 p-6 px-6 py-4">
                <div className="flex items-center justify-between">
                  <h2>
                    <Skeleton className="w-[96px] max-w-full" />
                  </h2>
                  <div>
                    <SVGSkeleton className="w-[20px] h-[20px]" />
                  </div>
                </div>
                <p>
                  <Skeleton className="w-[136px] max-w-full" />
                </p>
                <p>
                  <Skeleton className="w-[176px] max-w-full" />
                </p>
              </div>
              <div className="p-6 px-6 py-4">
                <ul className="grid gap-4">
                  <li className="grid grid-cols-[1fr_auto] items-center gap-4">
                    <div className="grid gap-1">
                      <h3>
                        <Skeleton className="w-[96px] max-w-full" />
                      </h3>
                      <p>
                        <Skeleton className="w-[32px] max-w-full" />
                      </p>
                    </div>
                    <div className="flex items-center gap-2">
                      <div>
                        <Skeleton className="w-[80px] max-w-full" />
                      </div>
                      <div>
                        <SVGSkeleton className="w-[16px] h-[16px]" />
                      </div>
                    </div>
                  </li>
                </ul>
                <div className="justify-between items-center p-2 shadow-lg">
                  <div className="h-full">
                    <div className="flex flex-col justify-between gap-2 h-full transform-gpu">
                      <div className="flex items-center justify-between gap-2 transform-gpu">
                        <div className="flex gap-2 p-2 group-hover:text-neutral-50 transform-gpu">
                          <Skeleton className="w-[64px] max-w-full" />
                        </div>
                        <div className="size-8 transition-colors transform-gpu">
                          <SVGSkeleton className="transform-gpu w-[24px] h-[24px]" />
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="justify-between items-center p-2 shadow-lg">
            <div className="h-full">
              <div className="flex flex-col justify-between gap-2 h-full transform-gpu">
                <div className="flex items-center justify-between gap-2 transform-gpu">
                  <div className="flex gap-2 p-2 group-hover:text-neutral-50 transform-gpu">
                    <Skeleton className="w-[96px] max-w-full" />
                  </div>
                  <div className="size-8 transition-colors transform-gpu">
                    <SVGSkeleton className="transform-gpu w-[24px] h-[24px]" />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  </>
);

export { WishlistSkeleton };
