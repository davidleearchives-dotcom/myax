# MyAX — 나의 AI 활용 역량 진단

30개 자기진단 문항과 3개 실기 과제로 개인의 AI 활용 수준(Lv1~Lv5)을 측정하고,
결과 보고서 PDF를 즉시 다운로드할 수 있는 웹 진단 서비스입니다.
(PRD v1.0 기반 Sprint 1 MVP 구현)

## 기술 스택

- **Next.js 14** (App Router) + **TypeScript**
- **Tailwind CSS** + shadcn 스타일 UI 컴포넌트
- **Zustand** (`persist` → `sessionStorage`) 전역 진단 상태
- **Recharts** 6축 레이더 차트
- **jsPDF + html2canvas** 클라이언트 사이드 PDF 보고서 생성
- **Noto Sans KR** (`next/font/google`) 한글 폰트

백엔드는 사용하지 않습니다. 모든 응답은 현재 브라우저 탭의 `sessionStorage`에만
임시 저장되며, 서버로 전송·저장되지 않습니다.

## 주요 기능

- 랜딩 / 진단 가이드 / 개인정보처리방침 페이지
- 기본정보 입력(닉네임·연령대·직무, 모두 선택)
- Part A: 6영역 30문항 5점 척도 (1문항씩, 키보드 1~5 단축키, 자동 저장·이어하기)
- Part B: 프롬프트·워크플로·비판적 검증 3개 실기 과제 (자기평가 0~10점)
- 자동 채점: 영역별/총점 계산, Lv1~Lv5 자동 부여, 강점·성장 포인트 도출
- 결과 시각화: 종합 점수 카드, 6축 레이더 차트, 영역별 인사이트, 성장 로드맵
- PDF 보고서(A4 6페이지) 생성·다운로드, 결과 공유(Web Share/클립보드)
- 다크 모드, 모바일 우선 반응형, 접근성(aria, 키보드 네비)

## 로컬 실행

```bash
npm install
npm run dev      # http://localhost:3000
```

프로덕션 빌드:

```bash
npm run build
npm run start
```

## 폴더 구조

```
app/
  page.tsx                 랜딩
  guide/page.tsx           진단 가이드
  privacy/page.tsx         개인정보처리방침
  diagnosis/
    info/page.tsx          기본정보 입력
    part-a/page.tsx        Part A 30문항
    part-b/page.tsx        Part B 3과제
  result/page.tsx          결과 화면
components/
  diagnosis/  (ProgressBar, ScaleButton, QuestionCard, TaskInput)
  result/     (ScoreCard, RadarChartView, AreaInsight, PDFButton, ReportDocument)
  shared/     (Header, Footer, ThemeProvider)
  ui/         (button, card, progress, input, textarea, slider, badge)
lib/
  constants.ts             문항·영역·레벨·과제 데이터
  scoring.ts               채점 로직
  store.ts                 Zustand 진단 상태 (sessionStorage)
  pdf-generator.ts         PDF 생성
  utils.ts                 cn 헬퍼
```

## Vercel 배포 가이드

1. 이 저장소를 GitHub에 푸시합니다.
2. [vercel.com/new](https://vercel.com/new) 에서 저장소를 Import 합니다.
3. **Root Directory** 를 `myax` 로 지정합니다. (저장소 루트가 아니라 이 앱 폴더)
4. Framework Preset 은 자동으로 **Next.js** 가 감지됩니다. 빌드 설정은 기본값
   그대로 두면 됩니다 (`npm run build`).
5. 환경 변수는 필요 없습니다. **Deploy** 를 누르면 배포가 완료됩니다.
6. 배포 후 발급된 URL(또는 연결한 커스텀 도메인, 예: `myax.kr`)로 접속합니다.

> CLI로 배포하려면 앱 폴더에서 `npx vercel` → `npx vercel --prod` 를 실행합니다.

## 데이터·보안

- 진행 중 응답은 현재 브라우저 탭의 `sessionStorage` 에만 임시 저장되며,
  새로고침 시 유지되고 탭을 닫으면 삭제됩니다.
- 이메일·실명은 수집하지 않으며, 서버 저장 및 제3자 제공이 없습니다.
- 본 진단은 자기학습 목적이며 공식 자격을 대체하지 않습니다.

## 향후 확장 (Sprint 2~3)

- 결과 OG 이미지, 분석 도구 연동
- Claude API 기반 Part B 자동 채점
- 익명 통계 누적·비교, 영문 버전, 이메일 발송
