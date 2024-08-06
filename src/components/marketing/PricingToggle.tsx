/**
 * This code was generated by Builder.io.
 */
import React from 'react';

const PricingToggle: React.FC = () => {
  return (
    <div className="flex flex-col justify-center p-px mt-11 max-w-full tracking-tight rounded-full bg-neutral-950 w-[228px] max-md:mt-10">
      <div className="flex gap-2.5 pr-3 rounded-full bg-neutral-900">
        <button className="px-2.5 py-2.5 text-sm leading-loose rounded-full bg-neutral-800 text-zinc-100">
          Pay Monthly
        </button>
        <div className="flex gap-1 my-auto font-medium">
          <span className="grow text-sm leading-loose text-neutral-400">
            Pay Yearly
          </span>
          <span className="text-xs leading-loose text-orange-500">
            Save 20%
          </span>
        </div>
      </div>
    </div>
  );
};

export default PricingToggle;
