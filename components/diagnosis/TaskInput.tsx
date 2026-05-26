"use client";

import { Task } from "@/lib/constants";
import { TaskValidationResult } from "@/lib/scoring";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Slider } from "@/components/ui/slider";
import { Clock, Target } from "lucide-react";
import { cn } from "@/lib/utils";

interface TaskInputProps {
  task: Task;
  index: number;
  total: number;
  values: Record<string, string>;
  score: number;
  validation: TaskValidationResult;
  showValidation: boolean;
  onFieldChange: (fieldId: string, value: string) => void;
  onScoreChange: (value: number) => void;
}

export function TaskInput({
  task,
  index,
  total,
  values,
  score,
  validation,
  showValidation,
  onFieldChange,
  onScoreChange,
}: TaskInputProps) {
  return (
    <div className="animate-fade-in">
      <div className="mb-4 flex flex-wrap items-center gap-2">
        <Badge variant="accent">실기 과제 {index + 1} / {total}</Badge>
        <span className="inline-flex items-center gap-1 text-sm text-muted-foreground">
          <Clock className="h-3.5 w-3.5" /> {task.minutes}분
        </span>
        <span className="text-sm text-muted-foreground">· 만점 {task.maxScore}점</span>
      </div>

      <h2 className="text-xl font-bold sm:text-2xl">{task.title}</h2>

      <div className="mt-4 flex gap-3 rounded-lg border border-border bg-secondary/50 p-4">
        <Target className="mt-0.5 h-5 w-5 shrink-0 text-accent" />
        <p className="text-sm leading-relaxed">{task.mission}</p>
      </div>

      <div className="mt-6 space-y-5">
        {showValidation && !validation.isValid && (
          <div className="rounded-lg border border-warning/40 bg-warning/10 p-4 text-sm text-foreground">
            <p className="font-medium">아직 완료되지 않은 항목이 있습니다.</p>
            <p className="mt-1 text-muted-foreground">
              현재 과제를 완료하려면 {validation.missingCount}개 항목을 더 입력해주세요.
            </p>
          </div>
        )}
        {task.fields.map((field) => {
          const val = values[field.id] ?? "";
          const fieldError = validation.fieldErrors[field.id];
          const shouldShowFieldError = showValidation && Boolean(fieldError);
          const tooShort =
            field.minLength != null && val.length > 0 && val.length < field.minLength;
          return (
            <div key={field.id}>
              <label
                htmlFor={`task-${task.id}-${field.id}`}
                className="mb-1.5 block text-sm font-medium"
              >
                {field.label}
              </label>
              {field.type === "textarea" ? (
                <Textarea
                  id={`task-${task.id}-${field.id}`}
                  value={val}
                  maxLength={field.maxLength}
                  onChange={(e) => onFieldChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  aria-invalid={shouldShowFieldError}
                  className={cn(
                    "min-h-[140px]",
                    shouldShowFieldError && "border-warning focus-visible:ring-warning",
                  )}
                />
              ) : (
                <Input
                  id={`task-${task.id}-${field.id}`}
                  value={val}
                  maxLength={field.maxLength}
                  onChange={(e) => onFieldChange(field.id, e.target.value)}
                  placeholder={field.placeholder}
                  aria-invalid={shouldShowFieldError}
                  className={cn(
                    shouldShowFieldError && "border-warning focus-visible:ring-warning",
                  )}
                />
              )}
              {shouldShowFieldError && (
                <p className="mt-1 text-xs text-warning">{fieldError}</p>
              )}
              {(field.minLength != null || field.maxLength != null) && (
                <div className="mt-1 flex justify-end text-xs">
                  <span
                    className={cn(
                      "tabular-nums",
                      tooShort ? "text-warning" : "text-muted-foreground",
                    )}
                  >
                    {val.length}
                    {field.minLength != null && ` / 최소 ${field.minLength}자`}
                    {field.maxLength != null && ` (최대 ${field.maxLength})`}
                  </span>
                </div>
              )}
            </div>
          );
        })}
      </div>

      <div className="mt-8 rounded-lg border border-border bg-card p-5">
        <div className="flex items-baseline justify-between">
          <label
            htmlFor={`task-${task.id}-score`}
            className="text-sm font-bold"
          >
            자기평가 점수
          </label>
          <span className="text-2xl font-extrabold tabular-nums text-accent">
            {score}
            <span className="text-base font-medium text-muted-foreground">
              {" "}
              / {task.maxScore}
            </span>
          </span>
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          채점 기준: {task.guide}
        </p>
        {showValidation && validation.scoreError && (
          <p className="mt-2 text-xs text-warning">{validation.scoreError}</p>
        )}
        <div className="mt-4">
          <Slider
            id={`task-${task.id}-score`}
            value={score}
            min={0}
            max={task.maxScore}
            onChange={onScoreChange}
          />
          <div className="mt-1 flex justify-between text-xs text-muted-foreground">
            <span>0</span>
            <span>{task.maxScore}</span>
          </div>
        </div>
      </div>
    </div>
  );
}
