"use client";

import { useCallback, useEffect, useRef, useState } from "react";
import { useRouter } from "next/navigation";
import { ArrowLeft, ArrowRight, Check } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { ProgressBar } from "@/components/diagnosis/ProgressBar";
import { QuestionCard } from "@/components/diagnosis/QuestionCard";
import { Button } from "@/components/ui/button";
import { useDiagnosisPartA } from "@/lib/store";
import { QUESTIONS, TOTAL_STEPS } from "@/lib/constants";
import { answeredCount } from "@/lib/scoring";

export default function PartAPage() {
  const router = useRouter();
  const { answers, setAnswer, hydrated } = useDiagnosisPartA();
  const [current, setCurrent] = useState(0);
  const [saved, setSaved] = useState(false);
  const initialized = useRef(false);
  const savedTimer = useRef<ReturnType<typeof setTimeout>>();

  // Resume at first unanswered question after hydration
  useEffect(() => {
    if (hydrated && !initialized.current) {
      initialized.current = true;
      const firstUnanswered = QUESTIONS.findIndex(
        (q) => typeof answers[q.id] !== "number",
      );
      setCurrent(firstUnanswered === -1 ? 0 : firstUnanswered);
    }
  }, [hydrated, answers]);

  const total = QUESTIONS.length;
  const question = QUESTIONS[current];
  const value = question ? answers[question.id] : undefined;
  const isLast = current === total - 1;

  const flashSaved = useCallback(() => {
    setSaved(true);
    clearTimeout(savedTimer.current);
    savedTimer.current = setTimeout(() => setSaved(false), 1200);
  }, []);

  const handleSelect = useCallback(
    (v: number) => {
      setAnswer(question.id, v);
      flashSaved();
      if (!isLast) {
        setTimeout(() => setCurrent((c) => Math.min(c + 1, total - 1)), 220);
      }
    },
    [question, isLast, total, setAnswer, flashSaved],
  );

  // Keyboard shortcuts 1~5
  useEffect(() => {
    function onKey(e: KeyboardEvent) {
      if (["1", "2", "3", "4", "5"].includes(e.key)) {
        handleSelect(Number(e.key));
      } else if (e.key === "ArrowRight" && value != null && !isLast) {
        setCurrent((c) => Math.min(c + 1, total - 1));
      } else if (e.key === "ArrowLeft" && current > 0) {
        setCurrent((c) => c - 1);
      }
    }
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [handleSelect, value, isLast, current, total]);

  function goPrev() {
    if (current === 0) router.push("/diagnosis/info");
    else setCurrent((c) => c - 1);
  }

  function goNext() {
    if (isLast) router.push("/diagnosis/part-b");
    else setCurrent((c) => Math.min(c + 1, total - 1));
  }

  if (!hydrated || !question) {
    return (
      <>
        <Header />
        <div className="mx-auto max-w-content px-4 py-20 text-center text-muted-foreground">
          불러오는 중…
        </div>
      </>
    );
  }

  const answered = answeredCount(answers);

  return (
    <>
      <Header />
      <ProgressBar
        current={current + 1}
        total={TOTAL_STEPS}
        label={`Part A · 자기진단 (${answered}/${total} 응답)`}
      />
      <main className="mx-auto max-w-content px-4 py-10">
        <div className="mx-auto max-w-2xl">
          <QuestionCard
            question={question}
            index={current}
            total={total}
            value={value}
            onSelect={handleSelect}
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

            <Button onClick={goNext} disabled={value == null}>
              {isLast ? "Part B로" : "다음"} <ArrowRight className="h-4 w-4" />
            </Button>
          </div>
        </div>
      </main>
    </>
  );
}
