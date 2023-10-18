"use client";
import { GameProvider } from "@/app/lib/engine/core";

export function Providers({ children }: { children: React.ReactNode }) {
  return <GameProvider>{children}</GameProvider>;
}
