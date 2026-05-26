"use client";

import { forwardRef } from "react";
import { DiagnosisResult, Answers } from "@/lib/scoring";
import { Profile } from "@/lib/store";
import {
  AREA_MAP,
  AreaId,
  QUESTIONS,
  SCALE_LABELS,
  APP_VERSION,
} from "@/lib/constants";
import { RadarChartView } from "./RadarChartView";

interface ReportDocumentProps {
  result: DiagnosisResult;
  profile: Profile;
  answers: Answers;
  displayDate: string;
}

const A4 = { width: 794, height: 1123 };
const INK = "#0F172A";
const ACCENT = "#6366F1";
const MUTED = "#64748B";
const LINE = "#E2E8F0";

function representativeQuestion(area: AreaId, answers: Answers) {
  const qs = QUESTIONS.filter((q) => q.area === area);
  let best = qs[0];
  let bestVal = answers[qs[0]?.id] ?? 0;
  for (const q of qs) {
    const v = answers[q.id] ?? 0;
    if (v > bestVal) {
      best = q;
      bestVal = v;
    }
  }
  const label = SCALE_LABELS.find((s) => s.value === bestVal)?.label ?? "-";
  return { text: best?.text ?? "", value: bestVal, label };
}

function Page({
  children,
  pageNo,
  total,
}: {
  children: React.ReactNode;
  pageNo: number;
  total: number;
}) {
  return (
    <div
      className="pdf-page"
      style={{
        width: A4.width,
        height: A4.height,
        background: "#ffffff",
        color: INK,
        position: "relative",
        overflow: "hidden",
        fontFamily: "var(--font-sans), sans-serif",
      }}
    >
      {/* left accent bar */}
      <div
        style={{
          position: "absolute",
          left: 0,
          top: 0,
          bottom: 0,
          width: 10,
          background: `linear-gradient(to bottom, ${ACCENT}, #818CF8)`,
        }}
      />
      {/* header */}
      <div
        style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "28px 48px 0 58px",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
          <div
            style={{
              width: 22,
              height: 22,
              borderRadius: 6,
              background: ACCENT,
              color: "#fff",
              fontSize: 13,
              fontWeight: 800,
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            M
          </div>
          <span style={{ fontWeight: 800, letterSpacing: -0.3 }}>MyAX</span>
        </div>
        <span style={{ fontSize: 12, color: MUTED }}>
          Personal AI Experience Report · {pageNo}/{total}
        </span>
      </div>
      {/* body */}
      <div style={{ padding: "24px 48px 40px 58px", height: "100%" }}>
        {children}
      </div>
    </div>
  );
}

export const ReportDocument = forwardRef<HTMLDivElement, ReportDocumentProps>(
  function ReportDocument({ result, profile, answers, displayDate }, ref) {
    const total = 6;
    const level = result.level;
    const firstHalf = result.areaResults.slice(0, 3);
    const secondHalf = result.areaResults.slice(3, 6);

    return (
      <div ref={ref} className="report-capture">
        {/* ---------- Page 1: Cover ---------- */}
        <Page pageNo={1} total={total}>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              height: "calc(100% - 60px)",
              justifyContent: "center",
            }}
          >
            <p style={{ color: ACCENT, fontWeight: 700, letterSpacing: 1 }}>
              PERSONAL AI EXPERIENCE REPORT
            </p>
            <h1
              style={{
                fontSize: 40,
                fontWeight: 900,
                margin: "12px 0 4px",
                lineHeight: 1.15,
              }}
            >
              나의 AI 활용
              <br />
              역량 진단 보고서
            </h1>
            <p style={{ color: MUTED, fontSize: 15, marginTop: 8 }}>
              MyAX — My AX Index
            </p>

            <div
              style={{
                marginTop: 48,
                padding: 28,
                borderRadius: 16,
                background: "#F8FAFC",
                border: `1px solid ${LINE}`,
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between" }}>
                <div>
                  <p style={{ fontSize: 12, color: MUTED }}>참여자</p>
                  <p style={{ fontSize: 20, fontWeight: 800, marginTop: 2 }}>
                    {profile.nickname || "익명"}
                  </p>
                  {(profile.age || profile.job) && (
                    <p style={{ fontSize: 13, color: MUTED, marginTop: 2 }}>
                      {[profile.age, profile.job].filter(Boolean).join(" · ")}
                    </p>
                  )}
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 12, color: MUTED }}>진단일</p>
                  <p style={{ fontSize: 16, fontWeight: 700, marginTop: 4 }}>
                    {displayDate}
                  </p>
                </div>
              </div>

              <div
                style={{
                  marginTop: 24,
                  paddingTop: 24,
                  borderTop: `1px solid ${LINE}`,
                  display: "flex",
                  alignItems: "flex-end",
                  justifyContent: "space-between",
                }}
              >
                <div>
                  <p style={{ fontSize: 12, color: MUTED }}>레벨</p>
                  <p
                    style={{
                      fontSize: 28,
                      fontWeight: 900,
                      color: ACCENT,
                      marginTop: 2,
                    }}
                  >
                    Lv{level.level} {level.name}
                  </p>
                </div>
                <div style={{ textAlign: "right" }}>
                  <p style={{ fontSize: 12, color: MUTED }}>종합 점수</p>
                  <p style={{ fontSize: 40, fontWeight: 900, lineHeight: 1 }}>
                    {result.total}
                    <span style={{ fontSize: 18, color: MUTED }}> / 180</span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </Page>

        {/* ---------- Page 2: Executive Summary ---------- */}
        <Page pageNo={2} total={total}>
          <SectionTitle>Executive Summary</SectionTitle>
          <p style={{ marginTop: 16, fontSize: 15, lineHeight: 1.8 }}>
            {profile.nickname || "참여자"} 님의 AI 활용 종합 점수는{" "}
            <b>{result.total}점(180점 만점, 상위 {result.percent}%)</b>으로,
            현재 <b>Lv{level.level} {level.name}({level.english})</b> 단계에
            해당합니다. {level.message}
          </p>
          <p style={{ marginTop: 12, fontSize: 15, lineHeight: 1.8 }}>
            자기진단(Part A) {result.partAScore}점, 실기 과제(Part B){" "}
            {result.partBScore}점을 기록했습니다. 6개 측정 영역 중 가장 강한
            영역은 <b>{result.strongest.label}</b>, 가장 보완이 필요한 영역은{" "}
            <b>{result.weakest.label}</b>입니다.
          </p>

          <div style={{ display: "flex", gap: 16, marginTop: 28 }}>
            <SummaryBox
              title="핵심 강점"
              area={result.strongest.label}
              score={result.strongest.score}
              text={result.strongest.comment.interpretation}
              color="#10B981"
            />
            <SummaryBox
              title="다음 성장 포인트"
              area={result.weakest.label}
              score={result.weakest.score}
              text={result.weakest.comment.nextAction}
              color="#F59E0B"
            />
          </div>

          <div
            style={{
              marginTop: 28,
              padding: 20,
              borderRadius: 12,
              background: "#F8FAFC",
              border: `1px solid ${LINE}`,
            }}
          >
            <p style={{ fontSize: 13, fontWeight: 700, marginBottom: 10 }}>
              영역별 점수 요약
            </p>
            {result.areaResults.map((a) => (
              <div
                key={a.id}
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: 12,
                  margin: "8px 0",
                }}
              >
                <span style={{ width: 90, fontSize: 13 }}>{a.label}</span>
                <div
                  style={{
                    flex: 1,
                    height: 8,
                    borderRadius: 99,
                    background: "#E2E8F0",
                    overflow: "hidden",
                  }}
                >
                  <div
                    style={{
                      width: `${a.percent}%`,
                      height: "100%",
                      background: ACCENT,
                    }}
                  />
                </div>
                <span
                  style={{ width: 48, textAlign: "right", fontSize: 13, fontWeight: 700 }}
                >
                  {a.score}/25
                </span>
              </div>
            ))}
          </div>
        </Page>

        {/* ---------- Page 3: Radar + Table ---------- */}
        <Page pageNo={3} total={total}>
          <SectionTitle>6축 역량 프로파일</SectionTitle>
          <div
            style={{
              display: "flex",
              justifyContent: "center",
              marginTop: 12,
            }}
          >
            <RadarChartView
              areaResults={result.areaResults}
              size={440}
              accentColor={ACCENT}
              tickColor={INK}
              gridColor={LINE}
            />
          </div>

          <table
            style={{
              width: "100%",
              borderCollapse: "collapse",
              marginTop: 16,
              fontSize: 13,
            }}
          >
            <thead>
              <tr style={{ background: "#F1F5F9" }}>
                <Th>영역</Th>
                <Th>점수</Th>
                <Th>달성률</Th>
                <Th align="left">해석</Th>
              </tr>
            </thead>
            <tbody>
              {result.areaResults.map((a) => (
                <tr key={a.id} style={{ borderBottom: `1px solid ${LINE}` }}>
                  <Td>
                    <b>{a.label}</b>
                  </Td>
                  <Td>{a.score} / 25</Td>
                  <Td>{a.percent}%</Td>
                  <Td align="left" muted>
                    {a.comment.interpretation}
                  </Td>
                </tr>
              ))}
            </tbody>
          </table>
        </Page>

        {/* ---------- Page 4 & 5: Area detail ---------- */}
        <Page pageNo={4} total={total}>
          <SectionTitle>영역별 상세 분석 (1/2)</SectionTitle>
          <div style={{ marginTop: 16 }}>
            {firstHalf.map((a) => (
              <AreaDetailBlock
                key={a.id}
                area={a}
                rep={representativeQuestion(a.id, answers)}
              />
            ))}
          </div>
        </Page>

        <Page pageNo={5} total={total}>
          <SectionTitle>영역별 상세 분석 (2/2)</SectionTitle>
          <div style={{ marginTop: 16 }}>
            {secondHalf.map((a) => (
              <AreaDetailBlock
                key={a.id}
                area={a}
                rep={representativeQuestion(a.id, answers)}
              />
            ))}
          </div>
        </Page>

        {/* ---------- Page 6: Roadmap + Footer ---------- */}
        <Page pageNo={6} total={total}>
          <SectionTitle>다음 성장 로드맵</SectionTitle>
          <p style={{ marginTop: 12, fontSize: 14, color: MUTED }}>
            현재 <b style={{ color: INK }}>Lv{level.level} {level.name}</b> 단계
            {level.level < 5
              ? ` → 다음 단계 도달을 위한 액션 플랜입니다.`
              : ` — 최고 단계입니다. 영향력 확장을 위한 액션입니다.`}
          </p>
          <div style={{ marginTop: 20 }}>
            {level.roadmap.map((step, i) => (
              <div
                key={i}
                style={{
                  display: "flex",
                  gap: 14,
                  alignItems: "flex-start",
                  padding: "14px 0",
                  borderBottom: `1px solid ${LINE}`,
                }}
              >
                <div
                  style={{
                    minWidth: 28,
                    height: 28,
                    borderRadius: 99,
                    background: ACCENT,
                    color: "#fff",
                    fontWeight: 800,
                    fontSize: 14,
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                  }}
                >
                  {i + 1}
                </div>
                <p style={{ fontSize: 15, lineHeight: 1.6, paddingTop: 3 }}>
                  {step}
                </p>
              </div>
            ))}
          </div>

          <div
            style={{
              position: "absolute",
              left: 58,
              right: 48,
              bottom: 40,
              borderTop: `1px solid ${LINE}`,
              paddingTop: 16,
              fontSize: 11,
              color: MUTED,
              lineHeight: 1.7,
            }}
          >
            <p>
              본 보고서는 MyAX 자기진단 결과를 기반으로 자동 생성되었습니다. 측정
              모델은 Gartner AI Maturity Model, Microsoft Copilot Studio Adoption
              Maturity Model, AWS GenAI Maturity Model을 종합·재구성했습니다.
            </p>
            <p style={{ marginTop: 6 }}>
              본 진단은 자기학습 목적이며 공식 자격을 대체하지 않습니다. · 진단일{" "}
              {displayDate} · MyAX {APP_VERSION}
            </p>
          </div>
        </Page>
      </div>
    );
  },
);

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <h2
      style={{
        fontSize: 24,
        fontWeight: 900,
        borderLeft: `4px solid ${ACCENT}`,
        paddingLeft: 12,
      }}
    >
      {children}
    </h2>
  );
}

function SummaryBox({
  title,
  area,
  score,
  text,
  color,
}: {
  title: string;
  area: string;
  score: number;
  text: string;
  color: string;
}) {
  return (
    <div
      style={{
        flex: 1,
        padding: 20,
        borderRadius: 12,
        border: `1px solid ${LINE}`,
        borderTop: `4px solid ${color}`,
      }}
    >
      <p style={{ fontSize: 12, fontWeight: 700, color }}>{title}</p>
      <p style={{ fontSize: 18, fontWeight: 800, marginTop: 6 }}>
        {area}{" "}
        <span style={{ fontSize: 14, color: MUTED }}>{score}/25</span>
      </p>
      <p style={{ fontSize: 13, color: MUTED, marginTop: 8, lineHeight: 1.6 }}>
        {text}
      </p>
    </div>
  );
}

function AreaDetailBlock({
  area,
  rep,
}: {
  area: DiagnosisResult["areaResults"][number];
  rep: { text: string; value: number; label: string };
}) {
  const desc = AREA_MAP[area.id].description;
  return (
    <div
      style={{
        padding: "16px 0",
        borderBottom: `1px solid ${LINE}`,
      }}
    >
      <div
        style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline" }}
      >
        <div>
          <span style={{ fontSize: 17, fontWeight: 800 }}>{area.label}</span>
          <span style={{ fontSize: 12, color: MUTED, marginLeft: 8 }}>
            {desc}
          </span>
        </div>
        <span style={{ fontSize: 18, fontWeight: 800, color: ACCENT }}>
          {area.score}
          <span style={{ fontSize: 13, color: MUTED }}> / 25</span>
        </span>
      </div>
      <div
        style={{
          marginTop: 8,
          height: 8,
          borderRadius: 99,
          background: "#E2E8F0",
          overflow: "hidden",
        }}
      >
        <div
          style={{ width: `${area.percent}%`, height: "100%", background: ACCENT }}
        />
      </div>
      <p style={{ fontSize: 13.5, marginTop: 10, lineHeight: 1.6 }}>
        {area.comment.interpretation}
      </p>
      <p style={{ fontSize: 13, color: ACCENT, marginTop: 4, lineHeight: 1.6 }}>
        다음 액션 → {area.comment.nextAction}
      </p>
      {rep.value > 0 && (
        <p
          style={{
            fontSize: 12,
            color: MUTED,
            marginTop: 8,
            background: "#F8FAFC",
            padding: "8px 10px",
            borderRadius: 8,
          }}
        >
          대표 응답 · “{rep.text}” → {rep.value}점({rep.label})
        </p>
      )}
    </div>
  );
}

function Th({
  children,
  align = "center",
}: {
  children: React.ReactNode;
  align?: "left" | "center";
}) {
  return (
    <th
      style={{
        padding: "10px 8px",
        textAlign: align,
        fontSize: 12,
        fontWeight: 700,
        borderBottom: `2px solid ${LINE}`,
      }}
    >
      {children}
    </th>
  );
}

function Td({
  children,
  align = "center",
  muted,
}: {
  children: React.ReactNode;
  align?: "left" | "center";
  muted?: boolean;
}) {
  return (
    <td
      style={{
        padding: "9px 8px",
        textAlign: align,
        fontSize: 12.5,
        color: muted ? MUTED : INK,
        verticalAlign: "top",
      }}
    >
      {children}
    </td>
  );
}
