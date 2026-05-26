import type { Metadata } from "next";
import { Header } from "@/components/shared/Header";
import { Footer } from "@/components/shared/Footer";

export const metadata: Metadata = {
  title: "개인정보처리방침 — MyAX",
};

export default function PrivacyPage() {
  return (
    <>
      <Header />
      <main className="mx-auto max-w-2xl px-4 py-12">
        <h1 className="text-3xl font-extrabold">개인정보처리방침</h1>
        <p className="mt-2 text-sm text-muted-foreground">
          MyAX는 이용자의 개인정보를 소중히 다루며, 최소한의 정보만 처리합니다.
        </p>

        <div className="prose mt-8 space-y-8 text-sm leading-relaxed">
          <section>
            <h2 className="text-lg font-bold">1. 수집하는 정보</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>닉네임, 연령대, 직무 (모두 선택 입력)</li>
              <li>진단 문항 응답 및 실기 과제 답변·자기평가 점수</li>
              <li>이메일·실명 등 식별 정보는 수집하지 않습니다.</li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold">2. 정보의 저장 및 보관</h2>
            <ul className="mt-2 list-disc space-y-1 pl-5 text-muted-foreground">
              <li>
                모든 응답은 이용자의 브라우저 세션 저장소(sessionStorage)에만
                임시 보관되며 서버로 전송·저장되지 않습니다.
              </li>
              <li>
                같은 탭에서 새로고침하면 유지되지만, 브라우저 탭을 닫으면 입력한
                정보는 자동으로 삭제됩니다.
              </li>
              <li>
                결과 PDF는 이용자의 기기에 직접 저장되며, 별도 서버에 보관되지
                않습니다.
              </li>
            </ul>
          </section>

          <section>
            <h2 className="text-lg font-bold">3. 정보의 제3자 제공</h2>
            <p className="mt-2 text-muted-foreground">
              MyAX는 이용자의 어떠한 정보도 제3자에게 제공하거나 판매하지
              않습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">4. 면책 고지</h2>
            <p className="mt-2 text-muted-foreground">
              본 진단은 자기학습 및 참고 목적이며, 공식 자격이나 전문 평가를
              대체하지 않습니다. 진단 결과는 자기평가에 기반하므로 응답의 정확성에
              따라 결과가 달라질 수 있습니다.
            </p>
          </section>

          <section>
            <h2 className="text-lg font-bold">5. 문의</h2>
            <p className="mt-2 text-muted-foreground">
              개인정보 처리에 관한 문의는 서비스 운영자에게 연락해 주세요.
            </p>
          </section>
        </div>
      </main>
      <Footer />
    </>
  );
}
