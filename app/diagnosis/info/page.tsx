"use client";

import { useRouter } from "next/navigation";
import { ArrowRight, Clock, ShieldCheck } from "lucide-react";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";
import { Card } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { useDiagnosisProfile } from "@/lib/store";
import { AGE_OPTIONS, JOB_OPTIONS } from "@/lib/constants";
import { cn } from "@/lib/utils";

export default function InfoPage() {
  const router = useRouter();
  const { profile, setProfile } = useDiagnosisProfile();

  function start() {
    router.push("/diagnosis/part-a");
  }

  const selectClass = cn(
    "flex h-11 w-full rounded-lg border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-1 focus-visible:ring-offset-background",
  );

  return (
    <>
      <Header />
      <main className="mx-auto max-w-xl px-4 py-12">
        <div className="text-center">
          <h1 className="text-3xl font-extrabold">기본 정보 입력</h1>
          <p className="mt-2 text-muted-foreground">
            모두 선택 사항이에요. 결과 보고서에만 활용되며, 현재 브라우저 탭의
            세션에만 임시 저장됩니다.
          </p>
        </div>

        <Card className="mt-8 p-6 sm:p-8">
          <div className="space-y-5">
            <div>
              <label htmlFor="nickname" className="mb-1.5 block text-sm font-medium">
                닉네임{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (선택)
                </span>
              </label>
              <Input
                id="nickname"
                value={profile.nickname}
                onChange={(e) => setProfile({ nickname: e.target.value })}
                placeholder="예) AX 탐험가"
                maxLength={20}
              />
            </div>

            <div>
              <label htmlFor="age" className="mb-1.5 block text-sm font-medium">
                연령대{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (선택)
                </span>
              </label>
              <select
                id="age"
                value={profile.age}
                onChange={(e) => setProfile({ age: e.target.value })}
                className={selectClass}
              >
                <option value="">선택 안 함</option>
                {AGE_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>

            <div>
              <label htmlFor="job" className="mb-1.5 block text-sm font-medium">
                직무{" "}
                <span className="text-xs font-normal text-muted-foreground">
                  (선택)
                </span>
              </label>
              <select
                id="job"
                value={profile.job}
                onChange={(e) => setProfile({ job: e.target.value })}
                className={selectClass}
              >
                <option value="">선택 안 함</option>
                {JOB_OPTIONS.map((o) => (
                  <option key={o} value={o}>
                    {o}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-6 space-y-2 rounded-lg bg-secondary/50 p-4 text-sm text-muted-foreground">
            <p className="flex items-center gap-2">
              <Clock className="h-4 w-4 text-accent" /> 예상 소요 시간 약 25분
            </p>
            <p className="flex items-center gap-2">
              <ShieldCheck className="h-4 w-4 text-success" /> 서버 저장 없음 ·
              탭을 닫으면 자동 삭제
            </p>
          </div>

          <Button onClick={start} size="lg" className="mt-6 w-full">
            진단 시작 <ArrowRight className="h-4 w-4" />
          </Button>
        </Card>
      </main>
      <Footer />
    </>
  );
}
