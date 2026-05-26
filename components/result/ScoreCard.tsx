import { DiagnosisResult } from "@/lib/scoring";
import { Level } from "@/lib/constants";

interface ScoreCardProps {
  result: DiagnosisResult;
  nickname?: string;
}

const LEVEL_MARKS = ["①", "②", "③", "④", "⑤"];

export function ScoreCard({ result, nickname }: ScoreCardProps) {
  const level: Level = result.level;
  return (
    <div className="border border-border bg-card p-8">
      <p className="text-xs font-semibold uppercase tracking-widest text-accent">
        {nickname ? `${nickname} 님의 AX 지도` : "나의 AX 지도"}
      </p>

      <div className="mt-4 flex items-baseline gap-3">
        <span className="text-2xl font-extrabold text-accent">
          {LEVEL_MARKS[level.level - 1]}
        </span>
        <h1 className="text-3xl font-extrabold tracking-tight sm:text-4xl">
          {level.name}
        </h1>
        <span className="text-base font-medium text-muted-foreground">
          {level.english}
        </span>
      </div>

      <div className="mt-6 flex items-end gap-2">
        <span className="text-6xl font-extrabold leading-none tabular-nums">
          {result.total}
        </span>
        <span className="mb-1 text-lg font-medium text-muted-foreground">
          / {result.maxTotal}점
        </span>
      </div>

      <div className="mt-4 h-1 w-full bg-secondary">
        <div
          className="h-full bg-accent"
          style={{ width: `${result.percent}%` }}
        />
      </div>

      <p className="mt-5 max-w-xl text-sm leading-relaxed text-muted-foreground">
        {level.message}
      </p>

      <div className="mt-5 flex gap-8 border-t border-border pt-5 text-sm">
        <div>
          <span className="text-muted-foreground">Part A 자기진단</span>
          <p className="mt-0.5 font-bold tabular-nums">{result.partAScore} / 150</p>
        </div>
        <div>
          <span className="text-muted-foreground">Part B 실기</span>
          <p className="mt-0.5 font-bold tabular-nums">{result.partBScore} / 30</p>
        </div>
      </div>
    </div>
  );
}
