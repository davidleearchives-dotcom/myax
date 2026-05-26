"use client";

import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { AREAS, LEVELS } from "@/lib/constants";

const LEVEL_MARKS = ["01", "02", "03", "04", "05"];

export default function LandingPage() {
  return (
    <>
      <Header />

      {/* ── 1. HERO ─────────────────────────────────────────────────── */}
      <section className="snap-section relative h-screen w-full overflow-hidden">
        {/* 배경 영상 */}
        <video
          className="absolute inset-0 h-full w-full object-cover"
          src="/hero-video.mp4"
          autoPlay
          muted
          loop
          playsInline
        />
        {/* 65% 다크 오버레이 */}
        <div className="absolute inset-0 bg-black/65" />

        {/* 콘텐츠 */}
        <div className="relative z-10 flex h-full flex-col items-start justify-center px-8 sm:px-16 lg:px-24">
          <div className="max-w-3xl">
            <p className="animate-fade-in font-display text-sm font-medium tracking-widest text-teal-sky uppercase">
              &ldquo;25년 경력 팀장인데, AI는 ChatGPT만 써봤습니다.&rdquo;
            </p>
            <h1 className="animate-fade-in-delay mt-5 font-serif text-4xl font-bold leading-tight text-white sm:text-5xl lg:text-6xl">
              그게 당신이라면,<br />
              지금 어디쯤 있는지<br />
              <span className="text-teal-sky">발견</span>할 수 있습니다.
            </h1>
            <p className="animate-fade-in-delay mt-6 max-w-xl font-display text-base leading-relaxed text-white/70 sm:text-lg">
              시험이 아닙니다. 30개 질문과 3개 실습으로 당신이 이미 하고 있는
              것들을 지도로 만들어드립니다. 25분, 회원가입 없음.
            </p>
            <div className="animate-fade-in-delay mt-8 flex flex-col gap-3 sm:flex-row">
              <Link
                href="/diagnosis/info"
                className={cn(
                  buttonVariants({ variant: "accent", size: "lg" }),
                  "rounded-pill font-display",
                )}
              >
                내 지도 만들기 <ArrowRight className="h-4 w-4" />
              </Link>
              <Link
                href="/guide"
                className={cn(
                  buttonVariants({ variant: "outline", size: "lg" }),
                  "rounded-pill font-display border-white/40 text-white hover:bg-white/10",
                )}
              >
                먼저 살펴보기
              </Link>
            </div>
            <p className="animate-fade-in-delay mt-5 font-display text-xs text-white/40">
              익명 진단 · 브라우저 세션 임시 저장 · 서버 저장 없음
            </p>
          </div>
        </div>

        {/* 스크롤 힌트 */}
        <div className="absolute bottom-8 left-1/2 z-10 -translate-x-1/2 flex flex-col items-center gap-2">
          <span className="font-display text-xs uppercase tracking-widest text-white/40">Scroll</span>
          <div className="h-8 w-px bg-white/20" />
        </div>
      </section>

      {/* ── 2. AX란 무엇인가 ────────────────────────────────────────── */}
      <section className="snap-section bg-background px-8 sm:px-16 lg:px-24">
        <div className="mx-auto max-w-content w-full">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-accent">
                AX란 무엇인가
              </p>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                AI 채팅을 넘어,<br />
                실제 성과로<br />
                이어지는 역량
              </h2>
            </div>
            <div className="space-y-6">
              <p className="font-display text-base leading-relaxed text-muted-foreground sm:text-lg">
                AX(AI Experience)는 AI 도구를 쓰는 것을 넘어, 내 일과 삶에
                실질적인 변화를 만들어내는 능력입니다. 지금 당장 ChatGPT를
                열지 않더라도, 이미 당신은 AX를 하고 있을 수 있습니다.
              </p>
              <p className="font-display text-base leading-relaxed text-muted-foreground">
                이 진단은 6가지 축으로 그 지도를 그립니다.
              </p>
              <div className="flex flex-wrap gap-2 pt-2">
                {AREAS.map((a) => (
                  <span
                    key={a.id}
                    className="rounded-full border border-accent/40 px-4 py-1.5 font-display text-sm text-accent"
                  >
                    {a.label}
                  </span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. 6대 측정 영역 ─────────────────────────────────────────── */}
      <section className="snap-section bg-card px-8 sm:px-16 lg:px-24">
        <div className="mx-auto max-w-content w-full">
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-accent">
            6대 측정 영역
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl">
            무엇을 발견하게 되나요?
          </h2>
          <p className="mt-2 font-display text-muted-foreground">
            30문항 자기진단 + 3개 실기 과제로 종합 분석합니다
          </p>
          <div className="mt-10 grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {AREAS.map((area, i) => (
              <div
                key={area.id}
                className="rounded-card border border-border bg-background p-6 transition-colors hover:border-accent/50"
              >
                <p className="font-display text-2xl font-bold text-accent/30 tabular-nums">
                  0{i + 1}
                </p>
                <h3 className="mt-3 font-serif text-lg font-bold">
                  {area.label}
                </h3>
                <p className="mt-0.5 font-display text-xs text-muted-foreground">{area.english}</p>
                <p className="mt-3 font-display text-sm leading-relaxed text-muted-foreground">
                  {area.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 4. 성장 지도 (5레벨) ────────────────────────────────────── */}
      <section className="snap-section bg-background px-8 sm:px-16 lg:px-24">
        <div className="mx-auto max-w-content w-full">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-center">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-accent">
                성장 지도
              </p>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                지금 어디쯤인지,<br />
                다음은 어디인지
              </h2>
              <p className="mt-4 font-display text-base leading-relaxed text-muted-foreground">
                5단계 레벨은 결과를 판정하기 위한 것이 아닙니다. 지금
                서있는 지점에서 다음 한 걸음이 무엇인지 보여주기 위한
                지도입니다.
              </p>
            </div>
            <div className="divide-y divide-border rounded-card border border-border overflow-hidden">
              {LEVELS.map((lv, i) => (
                <div key={lv.level} className="flex items-start gap-5 bg-card px-6 py-5 transition-colors hover:bg-secondary/40">
                  <span className="font-display text-2xl font-bold text-accent/40 tabular-nums shrink-0">
                    {LEVEL_MARKS[i]}
                  </span>
                  <div className="min-w-0">
                    <p className="font-serif font-bold">
                      {lv.name}{" "}
                      <span className="font-display text-xs font-normal text-muted-foreground">
                        {lv.english} · {lv.min}–{lv.max}점
                      </span>
                    </p>
                    <p className="mt-1 font-display text-sm text-muted-foreground line-clamp-2">
                      {lv.message}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 5. PDF 보고서 ────────────────────────────────────────────── */}
      <section className="snap-section bg-card px-8 sm:px-16 lg:px-24">
        <div className="mx-auto max-w-content w-full">
          <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-24">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-accent">
                결과 보고서
              </p>
              <h2 className="mt-4 font-serif text-3xl font-bold leading-tight sm:text-4xl lg:text-5xl">
                한 장의 지도로<br />
                정리해드립니다
              </h2>
              <p className="mt-4 font-display text-base leading-relaxed text-muted-foreground">
                종합 점수·레벨, 6축 프로파일, 영역별 분석, 다음 단계 로드맵을
                담은 PDF 보고서를 즉시 다운로드할 수 있습니다.
              </p>
              <ul className="mt-6 space-y-3">
                {[
                  "표지 + Executive Summary",
                  "6축 레이더 프로파일 + 점수표",
                  "영역별 상세 분석 · 대표 응답",
                  "다음 레벨 도달 로드맵",
                ].map((t) => (
                  <li key={t} className="flex items-center gap-3 font-display text-sm text-muted-foreground">
                    <span className="h-px w-6 shrink-0 bg-accent" />
                    {t}
                  </li>
                ))}
              </ul>
            </div>
            {/* 보고서 목업 */}
            <div className="flex items-center justify-center">
              <div className="w-full max-w-xs rounded-card bg-background p-5 shadow-2xl ring-1 ring-border">
                <div className="aspect-[1/1.414] w-full rounded-lg bg-card p-6">
                  <div className="h-0.5 w-10 bg-accent" />
                  <div className="mt-4 h-4 w-3/4 rounded bg-muted" />
                  <div className="mt-2 h-3 w-1/2 rounded bg-muted/60" />
                  <div className="mt-6 grid grid-cols-3 gap-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-10 rounded bg-muted/40" />
                    ))}
                  </div>
                  <div className="mx-auto mt-6 aspect-square w-2/3 rounded-full border-4 border-accent/20" />
                  <div className="mt-4 space-y-2">
                    {[...Array(3)].map((_, i) => (
                      <div key={i} className="h-2 w-full rounded bg-muted/30" />
                    ))}
                  </div>
                </div>
                <p className="mt-3 text-center font-display text-xs text-muted-foreground">
                  예시 보고서 미리보기
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 6. 진행 방식 ─────────────────────────────────────────────── */}
      <section className="snap-section bg-background px-8 sm:px-16 lg:px-24">
        <div className="mx-auto max-w-content w-full">
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-accent">
            진행 방식
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
            25분이면 충분합니다
          </h2>
          <div className="mt-12 grid gap-6 sm:grid-cols-3">
            {[
              {
                n: "01",
                t: "30문항 응답",
                d: "일상적인 AI 사용 방식을 솔직하게 체크합니다. 맞고 틀림이 없습니다.",
              },
              {
                n: "02",
                t: "3개 실습 과제",
                d: "실제 업무 상황을 상상하며 자신의 활용도를 직접 평가합니다.",
              },
              {
                n: "03",
                t: "지도 확인 + PDF",
                d: "6축 프로파일과 다음 단계 로드맵을 즉시 확인하고 저장합니다.",
              },
            ].map((s) => (
              <div
                key={s.n}
                className="rounded-card border border-border bg-card p-8"
              >
                <p className="font-display text-5xl font-bold text-accent/20 tabular-nums">
                  {s.n}
                </p>
                <h3 className="mt-5 font-serif text-xl font-bold">{s.t}</h3>
                <p className="mt-2 font-display text-sm leading-relaxed text-muted-foreground">
                  {s.d}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. FAQ ───────────────────────────────────────────────────── */}
      <section className="snap-section bg-card px-8 sm:px-16 lg:px-24">
        <div className="mx-auto max-w-content w-full">
          <div className="grid gap-12 lg:grid-cols-2 lg:gap-24 items-start">
            <div>
              <p className="font-display text-xs font-semibold uppercase tracking-widest text-accent">
                자주 묻는 질문
              </p>
              <h2 className="mt-4 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
                궁금한 점이<br />있으신가요?
              </h2>
            </div>
            <div className="divide-y divide-border">
              {[
                {
                  q: "회원가입이나 개인정보가 필요한가요?",
                  a: "아니요. 회원가입 없이 익명으로 진단할 수 있으며, 닉네임·연령대·직무는 모두 선택 입력입니다. 이메일·실명은 수집하지 않습니다.",
                },
                {
                  q: "소요 시간은 얼마나 되나요?",
                  a: "자기진단 30문항은 약 8~10분, 실기 과제 3개는 약 15~20분이 걸립니다. 전체 약 25분 내외입니다.",
                },
                {
                  q: "입력한 응답은 저장되나요?",
                  a: "진행 중 응답은 현재 브라우저 탭의 세션에만 임시 저장됩니다. 새로고침해도 유지되지만, 탭을 닫으면 삭제되며 서버에는 저장되지 않습니다.",
                },
                {
                  q: "결과 보고서는 어떻게 받나요?",
                  a: "결과 화면에서 PDF 보고서를 즉시 다운로드할 수 있습니다. 별도 비용은 없습니다.",
                },
              ].map((item) => (
                <details key={item.q} className="group py-5">
                  <summary className="cursor-pointer list-none marker:hidden">
                    <span className="flex items-center justify-between gap-4">
                      <span className="font-display font-medium text-foreground">
                        {item.q}
                      </span>
                      <span className="shrink-0 text-accent transition-transform duration-200 group-open:rotate-45">
                        +
                      </span>
                    </span>
                  </summary>
                  <p className="mt-3 font-display text-sm leading-relaxed text-muted-foreground">
                    {item.a}
                  </p>
                </details>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ── 8. 최종 CTA ──────────────────────────────────────────────── */}
      <section className="snap-section relative overflow-hidden bg-teal-deep px-8 sm:px-16 lg:px-24">
        {/* 배경 장식 */}
        <div className="pointer-events-none absolute -right-32 -top-32 h-96 w-96 rounded-full bg-accent/10 blur-3xl" />
        <div className="pointer-events-none absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-accent/5 blur-3xl" />

        <div className="relative z-10 mx-auto max-w-content w-full">
          <p className="font-display text-xs font-semibold uppercase tracking-widest text-teal-sky">
            지금 시작하세요
          </p>
          <h2 className="mt-4 font-serif text-3xl font-bold leading-tight text-white sm:text-4xl lg:text-6xl">
            당신이 이미 하고 있는<br />
            것들을 지도로<br />
            만들어드립니다.
          </h2>
          <p className="mt-6 font-display text-base text-white/60 sm:text-lg">
            25분 · 무료 · 회원가입 없음
          </p>
          <Link
            href="/diagnosis/info"
            className={cn(
              buttonVariants({ size: "lg" }),
              "mt-8 inline-flex rounded-pill bg-accent text-accent-foreground hover:bg-accent/90 font-display",
            )}
          >
            내 지도 만들기 <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>

      <Footer />
    </>
  );
}
