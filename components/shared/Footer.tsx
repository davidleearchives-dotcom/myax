import Link from "next/link";
import { APP_VERSION } from "@/lib/constants";

export function Footer() {
  return (
    <footer className="mt-20 border-t border-border/60 bg-background">
      <div className="mx-auto max-w-content px-4 py-10 text-sm text-muted-foreground">
        <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="font-bold text-foreground">MyAX</p>
            <p className="mt-1">나의 AI 활용 역량 진단</p>
          </div>
          <nav className="flex flex-wrap gap-x-5 gap-y-2">
            <Link href="/guide" className="hover:text-foreground">
              가이드
            </Link>
            <Link href="/diagnosis/info" className="hover:text-foreground">
              진단 시작
            </Link>
            <Link href="/privacy" className="hover:text-foreground">
              개인정보처리방침
            </Link>
          </nav>
        </div>
        <p className="mt-6 text-xs leading-relaxed">
          본 진단은 자기학습 목적이며 공식 자격을 대체하지 않습니다. 입력하신 응답은
          현재 브라우저 탭의 세션에만 임시 저장되며 서버에는 저장되지 않습니다.
        </p>
        <p className="mt-2 text-xs">
          © {new Date().getFullYear()} MyAX · {APP_VERSION} · 측정 모델: Gartner ·
          Microsoft · AWS Maturity Model 종합·재구성
        </p>
      </div>
    </footer>
  );
}
