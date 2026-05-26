"use client";

import { cn } from "@/lib/utils";

interface ScaleButtonProps {
  value: number;
  label: string;
  selected: boolean;
  onSelect: (value: number) => void;
}

export function ScaleButton({
  value,
  label,
  selected,
  onSelect,
}: ScaleButtonProps) {
  return (
    <button
      type="button"
      onClick={() => onSelect(value)}
      aria-pressed={selected}
      aria-label={`${value}점 ${label}`}
      className={cn(
        "flex w-full flex-col items-center justify-center gap-1 rounded-xl border-2 px-2 py-4 text-center transition-all focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 focus-visible:ring-offset-background",
        "min-h-[88px] sm:min-h-[100px]",
        selected
          ? "border-accent bg-accent text-accent-foreground shadow-md"
          : "border-border bg-card text-foreground hover:border-accent/60 hover:bg-secondary",
      )}
    >
      <span
        className={cn(
          "text-2xl font-extrabold tabular-nums sm:text-3xl",
          selected ? "text-accent-foreground" : "text-foreground",
        )}
      >
        {value}
      </span>
      <span
        className={cn(
          "text-[11px] leading-tight sm:text-xs",
          selected ? "text-accent-foreground/90" : "text-muted-foreground",
        )}
      >
        {label}
      </span>
    </button>
  );
}
