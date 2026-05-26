import { AreaResult } from "@/lib/scoring";
import { cn } from "@/lib/utils";

interface AreaInsightProps {
  area: AreaResult;
  isStrength?: boolean;
  isWeakness?: boolean;
}

function barColor(band: number) {
  if (band <= 1) return "bg-warning";
  if (band <= 2) return "bg-amber-400";
  if (band === 3) return "bg-accent";
  return "bg-success";
}

export function AreaInsight({ area, isStrength, isWeakness }: AreaInsightProps) {
  return (
    <div
      className={cn(
        "border border-border p-5",
        isStrength && "border-l-2 border-l-success",
        isWeakness && "border-l-2 border-l-warning",
      )}
    >
      <div className="flex items-center justify-between gap-2">
        <div className="flex items-center gap-3">
          <h3 className="font-bold">{area.label}</h3>
          {isStrength && (
            <span className="text-xs font-semibold uppercase tracking-widest text-success">
              강점
            </span>
          )}
          {isWeakness && (
            <span className="text-xs font-semibold uppercase tracking-widest text-warning">
              성장 포인트
            </span>
          )}
        </div>
        <span className="text-lg font-extrabold tabular-nums">
          {area.score}
          <span className="text-sm font-medium text-muted-foreground"> / 25</span>
        </span>
      </div>

      <div className="mt-3 h-1 w-full bg-secondary">
        <div
          className={cn("h-full", barColor(area.band))}
          style={{ width: `${area.percent}%` }}
        />
      </div>

      <p className="mt-3 text-sm leading-relaxed">{area.comment.interpretation}</p>
      <p className="mt-2 flex items-start gap-2 text-sm text-muted-foreground">
        <span className="mt-1 h-px w-4 shrink-0 bg-accent inline-block" />
        <span>{area.comment.nextAction}</span>
      </p>
    </div>
  );
}
