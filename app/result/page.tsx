"use client";

import dynamic from "next/dynamic";
import { useMemo, useRef, useState } from "react";
import Link from "next/link";
import { RotateCcw, Sparkles } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Card } from "@/components/ui/card";
import { Button, buttonVariants } from "@/components/ui/button";
import { ScoreCard } from "@/components/result/ScoreCard";
import { AreaInsight } from "@/components/result/AreaInsight";
import { PDFButton, ShareButton } from "@/components/result/PDFButton";
import { useDiagnosisResult } from "@/lib/store";
import {
  computeResult,
  answeredCount,
  isDiagnosisComplete,
  isPartAComplete,
} from "@/lib/scoring";
import { cn } from "@/lib/utils";

const RadarChartView = dynamic(
  () =>
    import("@/components/result/RadarChartView").then(
      (module) => module.RadarChartView,
    ),
  {
    ssr: false,
    loading: () => (
      <div className="h-[320px] w-full animate-pulse rounded-lg bg-secondary sm:h-[380px]" />
    ),
  },
);

const ReportDocument = dynamic(
  () =>
    import("@/components/result/ReportDocument").then(
      (module) => module.ReportDocument,
    ),
  {
    ssr: false,
  },
);

function formatDisplayDate(iso: string | null): string {
  const d = iso ? new Date(iso) : new Date();
  return `${d.getFullYear()}년 ${d.getMonth() + 1}월 ${d.getDate()}일`;
}

export default function ResultPage() {
  const { answers, taskAnswers, taskScores, profile, completedAt, hydrated, reset } =
    useDiagnosisResult();
  const reportRef = useRef<HTMLDivElement>(null);
  const [shouldRenderReport, setShouldRenderReport] = useState(false);

  const answered = answeredCount(answers);
  const partAComplete = isPartAComplete(answers);
  const isComplete = isDiagnosisComplete(answers, taskAnswers, taskScores);

  const result = useMemo(
    () => computeResult(answers, taskScores),
    [answers, taskScores],
  );

  const displayDate = formatDisplayDate(completedAt);

  if (!hydrated) {
    return (
      <>
        <Header />
        <div className="mx-auto max-w-content px-4 py-20 text-center text-muted-foreground">
          결과를 계산하는 중…
        </div>
      </>
    );
  }

  if (!isComplete) {
    const nextHref = !partAComplete ? "/diagnosis/part-a" : "/diagnosis/part-b";

    return (
      <>
        <Header />
        <main className="mx-auto max-w-md px-4 py-20 text-center">
          <h1 className="text-2xl font-bold">진단이 완료되지 않았어요</h1>
          <p className="mt-3 text-muted-foreground">
            {!partAComplete
              ? `30개 자기진단 문항 중 ${answered}개에 응답했습니다. 결과를 보려면 모든 문항에 응답해주세요.`
              : "실기 과제 3개가 아직 완료되지 않았습니다. 각 과제의 필수 입력과 자기평가 점수를 모두 채워주세요."}
          </p>
          <Link
            href={nextHref}
            className={cn(buttonVariants({ variant: "accent", size: "lg" }), "mt-6")}
          >
            {!partAComplete ? "Part A 이어하기" : "Part B 이어하기"}
          </Link>
        </main>
        <Footer />
      </>
    );
  }

  const shareSummary = `MyAX 진단 결과: Lv${result.level.level} ${result.level.name} — ${result.total}/180점`;

  return (
    <>
      <Header />
      <main className="mx-auto max-w-content px-4 py-10">
        <div className="grid gap-8 lg:grid-cols-[1fr_300px]">
          {/* Main */}
          <div className="space-y-8">
            <ScoreCard result={result} nickname={profile.nickname} />

            <Card className="p-6">
              <h2 className="text-lg font-bold">6축 역량 프로파일</h2>
              <RadarChartView areaResults={result.areaResults} />
            </Card>

            <div>
              <h2 className="mb-4 text-lg font-bold">영역별 상세 분석</h2>
              <div className="grid gap-4 sm:grid-cols-2">
                {result.areaResults.map((a) => (
                  <AreaInsight
                    key={a.id}
                    area={a}
                    isStrength={a.id === result.strongest.id}
                    isWeakness={a.id === result.weakest.id}
                  />
                ))}
              </div>
            </div>

            <Card className="p-6">
              <h2 className="flex items-center gap-2 text-lg font-bold">
                <Sparkles className="h-5 w-5 text-accent" /> 다음 성장 로드맵
              </h2>
              <p className="mt-1 text-sm text-muted-foreground">
                Lv{result.level.level} {result.level.name} → 다음 단계로 가기 위한
                액션 플랜
              </p>
              <ol className="mt-4 space-y-3">
                {result.level.roadmap.map((step, i) => (
                  <li key={i} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-accent text-sm font-bold text-accent-foreground">
                      {i + 1}
                    </span>
                    <span className="pt-0.5 text-sm leading-relaxed">{step}</span>
                  </li>
                ))}
              </ol>
            </Card>
          </div>

          {/* Sticky CTA */}
          <aside className="lg:sticky lg:top-24 lg:self-start">
            <Card className="space-y-3 p-5">
              <p className="text-sm font-medium">결과 저장 & 공유</p>
              <PDFButton
                getContainer={async () => {
                  if (reportRef.current) return reportRef.current;

                  setShouldRenderReport(true);

                  for (let attempt = 0; attempt < 10; attempt += 1) {
                    await new Promise((resolve) => setTimeout(resolve, 50));
                    if (reportRef.current) {
                      return reportRef.current;
                    }
                  }

                  return null;
                }}
                nickname={profile.nickname}
              />
              <ShareButton summary={shareSummary} />
              <Button
                variant="ghost"
                className="w-full"
                onClick={() => {
                  if (
                    confirm(
                      "다시 진단하시겠어요? 현재 응답이 모두 초기화됩니다.",
                    )
                  ) {
                    reset();
                    window.location.href = "/diagnosis/info";
                  }
                }}
              >
                <RotateCcw className="h-4 w-4" /> 다시 진단하기
              </Button>
              <p className="pt-1 text-center text-xs text-muted-foreground">
                PDF 생성에는 수 초가 걸릴 수 있어요.
              </p>
            </Card>
          </aside>
        </div>
      </main>
      <Footer />

      {/* Off-screen printable report for PDF capture */}
      {shouldRenderReport && (
        <ReportDocument
          ref={reportRef}
          result={result}
          profile={profile}
          answers={answers}
          displayDate={displayDate}
        />
      )}
    </>
  );
}
