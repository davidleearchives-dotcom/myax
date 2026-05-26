"use client";

import { useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { ProgressBar } from "@/components/diagnosis/ProgressBar";
import { TaskInput } from "@/components/diagnosis/TaskInput";
import { Button } from "@/components/ui/button";
import { useDiagnosisPartB } from "@/lib/store";
import { QUESTIONS, TASKS, TOTAL_STEPS } from "@/lib/constants";
import { validateTask } from "@/lib/scoring";

export default function PartBPage() {
  const router = useRouter();
  const {
    taskAnswers,
    taskScores,
    setTaskField,
    setTaskScore,
    markComplete,
    hydrated,
  } = useDiagnosisPartB();
  const [current, setCurrent] = useState(0);
  const [saved, setSaved] = useState(false);
  const [showValidation, setShowValidation] = useState(false);
  const savedTimer = useRef<ReturnType<typeof setTimeout>>();

  const total = TASKS.length;
  const task = TASKS[current];
  const isLast = current === total - 1;
  const taskValues = taskAnswers[task.id] ?? {};
  const taskScore = taskScores[task.id];
  const validation = validateTask(task, taskValues, taskScore);

  function flashSaved() {
    setSaved(true);
    clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setSaved(false), 1200);
  }

  function handleField(fieldId: string, value: string) {
    setTaskField(task.id, fieldId, value);
    flashSaved();
  }

  function handleScore(value: number) {
    setTaskScore(task.id, value);
    flashSaved();
  }

  useEffect(() => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setShowValidation(false);
  }, [current]);

  function goPrev() {
    if (current === 0) router.push("/diagnosis/part-a");
    else setCurrent((c) => c - 1);
  }

  function goNext() {
    if (!validation.isValid) {
      setShowValidation(true);
      return;
    }

    if (isLast) {
      markComplete();
      router.push("/result");
    } else {
      setCurrent((c) => c + 1);
    }
  }

  if (!hydrated) {
    return (
      <>
        <Header />
        <div className="mx-auto max-w-content px-4 py-20 text-center text-muted-foreground">
          불러오는 중…
        </div>
      </>
    );
  }

  return (
    <>
      <Header />
      <ProgressBar
        current={QUESTIONS.length + current + 1}
        total={TOTAL_STEPS}
        label={`Part B · 실기 과제 (${current + 1}/${total})`}
      />
      <main className="mx-auto max-w-content px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <TaskInput
            task={task}
            index={current}
            total={total}
            values={taskValues}
            score={taskScore ?? 0}
            validation={validation}
            showValidation={showValidation}
            onFieldChange={handleField}
            onScoreChange={handleScore}
          />

          <div className="mt-10 flex items-center justify-between">
            <Button variant="outline" onClick={goPrev}>
              <ArrowLeft className="h-4 w-4" /> 이전
            </Button>

            <span
              className={`flex items-center gap-1 text-sm text-success transition-opacity ${
                saved ? "opacity-100" : "opacity-0"
              }`}
            >
              <Check className="h-4 w-4" /> 임시저장됨
            </span>

            <Button onClick={goNext} variant={isLast ? "accent" : "default"}>
              {isLast ? "결과 보기" : "다음"} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
