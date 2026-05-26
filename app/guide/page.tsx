import Link from "next/link";
import { ArrowRight, ListChecks, FileText, Sparkles } from "lucide-react";
import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Card } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AREAS, LEVELS } from "@/lib/constants";

export const metadata: Metadata = {
  title: "진단 가이드 — MyAX",
  description: "MyAX 진단의 6대 측정 영역, 5단계 레벨 기준, 참여 방법을 안내합니다.",
};

export default function GuidePage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-content px-4 py-12">
        <div className="text-center">
          <Badge variant="secondary" className="mb-4">
            진단 가이드
          </Badge>
          <h1 className="text-3xl font-extrabold sm:text-4xl">
            진단을 시작하기 전에
          </h1>
          <p className="mt-3 text-muted-foreground">
            무엇을 어떻게 측정하는지, 결과는 어떻게 해석하는지 안내합니다.
          </p>
        </div>

        {/* 측정 개요 */}
        <div className="mt-10 grid gap-4 sm:grid-cols-3">
          {[
            { icon: ListChecks, t: "Part A · 자기진단", d: "6영역 30문항을 1~5점 척도로 응답 (약 8~10분)" },
            { icon: Sparkles, t: "Part B · 실기 과제", d: "프롬프트·워크플로·검증 3과제 자기평가 (약 15~20분)" },
            { icon: FileText, t: "결과 · PDF 보고서", d: "종합 점수·레벨·6축 차트 + PDF 다운로드" },
          ].map((s) => (
            <Card key={s.t} className="p-6">
              <s.icon className="h-6 w-6 text-accent" />
              <h3 className="mt-3 font-bold">{s.t}</h3>
              <p className="mt-1 text-sm text-muted-foreground">{s.d}</p>
            </Card>
          ))}
        </div>

        {/* 6대 측정 축 */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold">6대 측정 축</h2>
          <div className="mt-5 space-y-3">
            {AREAS.map((a) => (
              <div
                key={a.id}
                className="flex gap-4 rounded-xl border border-border bg-card p-5"
              >
                <div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-lg bg-accent/10 font-bold text-accent">
                  {a.no}
                </div>
                <div>
                  <h3 className="font-bold">
                    {a.label}{" "}
                    <span className="text-sm font-normal text-muted-foreground">
                      {a.english}
                    </span>
                  </h3>
                  <p className="mt-1 text-sm text-muted-foreground">
                    {a.description} · 5문항(25점 만점)
                  </p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* 5단계 레벨표 */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold">5단계 레벨 기준</h2>
          <p className="mt-2 text-sm text-muted-foreground">
            총점 180점(Part A 150 + Part B 30) 기준으로 레벨이 부여됩니다.
          </p>
          <div className="mt-5 overflow-hidden rounded-xl border border-border">
            <table className="w-full text-sm">
              <thead className="bg-secondary text-secondary-foreground">
                <tr>
                  <th className="px-4 py-3 text-left">레벨</th>
                  <th className="px-4 py-3 text-left">명칭</th>
                  <th className="px-4 py-3 text-left">점수 구간</th>
                  <th className="hidden px-4 py-3 text-left sm:table-cell">
                    핵심 메시지
                  </th>
                </tr>
              </thead>
              <tbody>
                {LEVELS.map((lv) => (
                  <tr key={lv.level} className="border-t border-border">
                    <td className="px-4 py-3 font-bold text-accent">
                      Lv{lv.level}
                    </td>
                    <td className="px-4 py-3 font-medium">
                      {lv.name}
                      <span className="block text-xs text-muted-foreground">
                        {lv.english}
                      </span>
                    </td>
                    <td className="px-4 py-3 tabular-nums">
                      {lv.min}~{lv.max}
                    </td>
                    <td className="hidden px-4 py-3 text-muted-foreground sm:table-cell">
                      {lv.message}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </section>

        {/* 채점 방식 */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold">채점 방식</h2>
          <div className="mt-5 grid gap-4 sm:grid-cols-3">
            {[
              { t: "Part A", d: "30문항 합산", s: "최대 150점" },
              { t: "Part B", d: "3과제 자기평가 합산", s: "최대 30점" },
              { t: "총점", d: "Part A + Part B", s: "최대 180점" },
            ].map((c) => (
              <Card key={c.t} className="p-5 text-center">
                <p className="text-sm text-muted-foreground">{c.t}</p>
                <p className="mt-1 font-bold">{c.d}</p>
                <p className="mt-2 text-lg font-extrabold text-accent">{c.s}</p>
              </Card>
            ))}
          </div>
          <p className="mt-4 text-sm text-muted-foreground">
            영역별 점수는 해당 5문항을 합산해 25점 만점으로 계산하며, 가장 높은
            영역은 <b>강점</b>, 가장 낮은 영역은 <b>다음 성장 포인트</b>로
            강조됩니다.
          </p>
        </section>

        {/* FAQ */}
        <section className="mt-14">
          <h2 className="text-2xl font-bold">참여 안내 · FAQ</h2>
          <div className="mt-5 space-y-3">
            {[
              {
                q: "중간에 새로고침하면 응답이 사라지나요?",
                a: "아니요. 진행 중 응답은 브라우저 세션에 자동 저장되어 새로고침해도 유지됩니다. 단, 탭을 닫으면 삭제됩니다.",
              },
              {
                q: "실기 과제는 어떻게 채점되나요?",
                a: "MVP에서는 채점 기준에 따른 자기평가(0~10점) 방식입니다. 솔직하게 평가할수록 정확한 결과를 받을 수 있습니다.",
              },
              {
                q: "개인정보는 안전한가요?",
                a: "이메일·실명은 수집하지 않으며, 응답은 현재 브라우저 탭의 세션 저장소에만 임시 저장됩니다. 서버에는 전송·저장되지 않습니다.",
              },
            ].map((item) => (
              <details
                key={item.q}
                className="group rounded-xl border border-border bg-card p-5"
              >
                <summary className="cursor-pointer list-none font-medium">
                  <span className="flex items-center justify-between">
                    {item.q}
                    <span className="ml-2 text-muted-foreground transition-transform group-open:rotate-45">
                      +
                    </span>
                  </span>
                </summary>
                <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
                  {item.a}
                </p>
              </details>
            ))}
          </div>
        </section>

        <div className="mt-14 text-center">
          <Link
            href="/diagnosis/info"
            className={cn(buttonVariants({ variant: "accent", size: "lg" }))}
          >
            진단 시작하기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
