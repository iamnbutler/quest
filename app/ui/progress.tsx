"use client";
import React from "react";
import * as RadixProgress from "@radix-ui/react-progress";

export const Progress = ({ p }: { p: number }) => {
  if (p < 0) p = 0;
  if (p > 100) p = 100;

  return (
    <RadixProgress.Root
      className="relative flex w-full items-center justify-center overflow-hidden border border-white/30 bg-black"
      style={{
        // Fix overflow clipping in Safari
        // https://gist.github.com/domske/b66047671c780a238b51c51ffde8d3a0
        transform: "translateZ(0)",
      }}
      value={p}
    >
      <RadixProgress.Indicator
        className="ease-[cubic-bezier(0.65, 0, 0.35, 1)] h-1 w-full bg-white transition-transform duration-[660ms]"
        style={{ transform: `translateX(-${100 - p}%)` }}
      />
    </RadixProgress.Root>
  );
};
