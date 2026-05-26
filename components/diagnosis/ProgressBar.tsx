import { Progress } from "@/components/ui/progress";

interface ProgressBarProps {
  current: number; // 1-based current step
  total: number;
  label?: string;
}

export function ProgressBar({ current, total, label }: ProgressBarProps) {
  const percent = (current / total) * 100;
  return (
    <div className="sticky top-16 z-30 -mx-4 border-b border-border/60 bg-background/90 px-4 py-3 backdrop-blur">
      <div className="mx-auto max-w-content">
        <div className="mb-2 flex items-center justify-between text-xs font-medium text-muted-foreground">
          <span>{label ?? "진행 상황"}</span>
          <span className="tabular-nums">
            {current} / {total}
          </span>
        </div>
        <Progress value={percent} />
      </div>
    </div>
  );
}
