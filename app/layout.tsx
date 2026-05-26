import type { Metadata } from "next";
import { Noto_Sans_KR, Merriweather, Montserrat } from "next/font/google";
import "./globals.css";
import { ThemeProvider } from "@/components/shared/ThemeProvider";

const notoSansKr = Noto_Sans_KR({
  subsets: ["latin"],
  weight: ["400", "500", "700", "900"],
  variable: "--font-sans",
  display: "swap",
});

const merriweather = Merriweather({
  subsets: ["latin"],
  weight: ["400", "700"],
  variable: "--font-serif",
  display: "swap",
});

const montserrat = Montserrat({
  subsets: ["latin"],
  weight: ["400", "500", "700"],
  variable: "--font-display",
  display: "swap",
});

const siteUrl = "https://myax.kr";

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: "MyAX — 나의 AI 활용 역량 진단",
  description:
    "30개 자기진단 문항과 3개 실기 과제로 당신의 AI 활용 수준(Lv1~Lv5)을 측정하고, 결과 보고서 PDF를 즉시 받아보세요.",
  keywords: ["AI 진단", "AX", "AI 활용 역량", "AI 리터러시", "MyAX"],
  openGraph: {
    title: "MyAX — 나의 AI 활용 역량 진단",
    description:
      "30문항 + 3실기 과제로 측정하는 개인 AI 활용 수준. 결과 보고서 PDF 즉시 다운로드.",
    type: "website",
    locale: "ko_KR",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="ko" className="dark" suppressHydrationWarning>
      <body
        className={`${notoSansKr.variable} ${merriweather.variable} ${montserrat.variable} font-sans antialiased`}
      >
        <ThemeProvider>{children}</ThemeProvider>
      </body>
    </html>
  );
}
