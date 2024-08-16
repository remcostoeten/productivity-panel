"use client";

import { motion } from "framer-motion";
import { ParentSkeleton, SVGSkeleton } from "./parent-skeleton";

export default function WishlistSkeleton() {
  return (
    <>
      <motion.div
        initial={{ opacity: 0, y: 50, scale: 0.9 }}
        animate={{ opacity: 1, y: 0, scale: 1 }}
        className="w-full max-w-4xl mx-auto"
      >
        <div className="border shadow-sm hover:shadow-lg hover:shadow-[#ff6c00]/10">
          <div className="flex flex-col space-y-1.5 p-6 px-6 py-4">
            <div className="flex items-center justify-between gap-2">
              <h2>
                <ParentSkeleton className="w-[120px] max-w-full" />
              </h2>
              <div className="flex items-center gap-2">
                <div className="inline-flex items-center justify-center transition-col border border-input h-10 w-10">
                  <SVGSkeleton className="w-[24px] h-[24px]" />
                </div>
                <div className="inline-flex items-center justify-center transition-col border border-input h-10 w-10">
                  <SVGSkeleton className="w-[16px] h-[16px]" />
                </div>
              </div>
            </div>
            <p>
              <ParentSkeleton className="w-[144px] max-w-full" />
            </p>
          </div>
          <div className="p-6 px-6 py-4">
            <ul className="grid gap-4">
              <li className="grid grid-cols-[1fr_auto] pb-4 border-b items-center gap-4">
                <div className="grid gap-1">
                  <h3>
                    <ParentSkeleton className="w-[88px] max-w-full" />
                  </h3>
                  <p>
                    <ParentSkeleton className="w-[368px] max-w-full" />
                  </p>
                </div>
                <div className="flex items-center gap-2">
                  <div className="flex items-center justify-between flex-wrap">
                    <ParentSkeleton className="w-[56px] max-w-full" />
                  </div>
                  <div className="inline-flex items-center justify-center transition-col border border-input h-10 w-10">
                    <SVGSkeleton className="w-[16px] h-[16px]" />
                  </div>
                </div>
              </li>
            </ul>
            <div className="flex justify-between items-center mt-4">
              <div className="justify-between items-center p-2 shadow-lg">
                <div className="h-full">
                  <div className="flex flex-col justify-between gap-2 h-full transform-gpu">
                    <div className="flex items-center justify-between gap-2 transform-gpu">
                      <div className="flex gap-2 p-2 group-hover:text-neutral-50 transform-gpu">
                        <ParentSkeleton className="w-[64px] max-w-full" />
                      </div>
                      <div className="size-8 transition-colors transform-gpu">
                        <SVGSkeleton className="transform-gpu w-[24px] h-[24px]" />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
              <p className="flex flex-col sm:block">
                <ParentSkeleton className="w-[160px] max-w-full" />
                <span>
                  <ParentSkeleton className="w-[80px] max-w-full" />
                </span>
              </p>
            </div>
          </div>
        </div>
      </motion.div>
    </>
  );
}
