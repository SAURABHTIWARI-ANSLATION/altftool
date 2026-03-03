"use client";

import dynamic from "next/dynamic";
import { toolRuntimeMap } from "@/platform/registry/toolRuntimeMap";

export default function ToolClient({ slug }) {
  const loadTool = toolRuntimeMap[slug];

  if (!loadTool) {
    return (
      <div className="p-10 text-center text-sm text-red-500">
        Tool not registered
      </div>
    );
  }

  const Tool = dynamic(() => loadTool(), {
    ssr: false,
    loading: () => (
      <div className="p-10 text-center text-sm text-[var(--color-muted-foreground)]">
        Loading tool…
      </div>
    ),
  });

  return (
    <div className="flex justify-center py-4 md:py-8 px-4">
      <div className="flex-1 max-w-7xl">
        <div className="w-full bg-[var(--color-background)] rounded-2xl border border-[var(--color-border)] overflow-hidden shadow-sm p-4 md:p-8">
          <Tool />
        </div>
      </div>
    </div>
  );
}
