"use client";

import { useState } from "react";
import { Download, Loader2, Check, Share2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { generateReportPdf, todayCompact } from "@/lib/pdf-generator";

interface PDFButtonProps {
  getContainer: () => HTMLElement | null | Promise<HTMLElement | null>;
  nickname: string;
}

export function PDFButton({ getContainer, nickname }: PDFButtonProps) {
  const [state, setState] = useState<"idle" | "loading" | "error">("idle");

  async function handleDownload() {
    const container = await getContainer();
    if (!container) return;
    setState("loading");
    try {
      await generateReportPdf(container, {
        nickname,
        date: todayCompact(),
      });
      setState("idle");
    } catch (e) {
      console.error(e);
      setState("error");
    }
  }

  return (
    <Button
      onClick={handleDownload}
      disabled={state === "loading"}
      size="lg"
      className="w-full"
    >
      {state === "loading" ? (
        <>
          <Loader2 className="h-4 w-4 animate-spin" /> 보고서 생성 중…
        </>
      ) : state === "error" ? (
        <>다시 시도</>
      ) : (
        <>
          <Download className="h-4 w-4" /> PDF 보고서 다운로드
        </>
      )}
    </Button>
  );
}

export function ShareButton({ summary }: { summary: string }) {
  const [copied, setCopied] = useState(false);

  async function handleShare() {
    const url = typeof window !== "undefined" ? window.location.origin : "";
    const shareData = {
      title: "MyAX — 나의 AI 활용 역량 진단",
      text: summary,
      url,
    };
    try {
      if (navigator.share) {
        await navigator.share(shareData);
        return;
      }
    } catch {
      // user cancelled or unsupported — fall through to clipboard
    }
    try {
      await navigator.clipboard.writeText(`${summary}\n${url}`);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch {
      // ignore
    }
  }

  return (
    <Button onClick={handleShare} variant="outline" size="lg" className="w-full">
      {copied ? (
        <>
          <Check className="h-4 w-4" /> 복사됨
        </>
      ) : (
        <>
          <Share2 className="h-4 w-4" /> 결과 공유
        </>
      )}
    </Button>
  );
}
