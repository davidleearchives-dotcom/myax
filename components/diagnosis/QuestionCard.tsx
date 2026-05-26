"use client";

import { Question, SCALE_LABELS, AREA_MAP } from "@/lib/constants";
import { Badge } from "@/components/ui/badge";
import { ScaleButton } from "./ScaleButton";

interface QuestionCardProps {
  question: Question;
  index: number; // 0-based within Part A
  total: number;
  value?: number;
  onSelect: (value: number) => void;
}

export function QuestionCard({
  question,
  index,
  total,
  value,
  onSelect,
}: QuestionCardProps) {
  const area = AREA_MAP[question.area];
  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex items-center gap-2">
        <Badge variant="secondary">{area.label}</Badge>
        <span className="text-sm font-medium text-muted-foreground tabular-nums">
          문항 {index + 1} / {total}
        </span>
      </div>

      <h2 className="text-balance text-xl font-bold leading-snug sm:text-2xl">
        {question.text}
      </h2>

      <div className="mt-8 grid grid-cols-5 gap-2 sm:gap-3">
        {SCALE_LABELS.map((s) => (
          <ScaleButton
            key={s.value}
            value={s.value}
            label={s.label}
            selected={value === s.value}
            onSelect={onSelect}
          />
        ))}
      </div>

      <p className="mt-4 text-center text-xs text-muted-foreground">
        1(전혀 아니다) ~ 5(매우 그렇다) · 키보드 1~5 키로도 선택할 수 있어요
      </p>
    </div>
  );
}
