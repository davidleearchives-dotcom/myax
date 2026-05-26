# MyAX 개발 히스토리 (HISTORY.md)

> 이 문서는 작업 인수인계용입니다. Claude Code(또는 다른 개발자)가 맥락을
> 빠르게 파악하고 이어서 작업할 수 있도록 작성되었습니다.

## 프로젝트 개요

- **이름**: MyAX — 나의 AI 활용 역량 진단 (My AX Index)
- **목적**: 방문자가 30개 자기진단 문항 + 3개 실기 과제로 본인의 AI 활용
  수준(Lv1~Lv5)을 측정하고, 결과 보고서 PDF를 즉시 다운로드하는 웹 진단 서비스
- **근거 문서**: PRD v1.0 (개인 AX 진단 웹사이트)
- **타깃**: 30~50대 직장인·실무자·자영업자, 회원가입 없는 빠른 체험 선호
- **현재 상태**: **Sprint 1(MVP) 완료 + 리팩토링/테스트 보강 진행 중**
  - 최근 변경은 주로 **GPT-5.4**가 리팩토링/구조 개선 중심으로 수행
  - 이후 주 개발/기능 확장은 **Claude Code**가 이어서 작업하는 전제를 고려해 이 문서를 최신화함

## 기술 스택

| 영역 | 선택 | 비고 |
|---|---|---|
| 프레임워크 | Next.js 14 (App Router) + TypeScript | 정적 생성(SSG) |
| 스타일 | Tailwind CSS + shadcn 스타일 컴포넌트 | CSS 변수 기반 테마, 다크모드 |
| 상태관리 | Zustand + `persist` | `sessionStorage`에 진행 저장 |
| 차트 | Recharts | 6축 레이더 차트 |
| PDF | jsPDF + html2canvas | 클라이언트 사이드 생성 |
| 폰트 | Noto Sans KR (`next/font/google`) | 한글 self-host |
| 아이콘 | lucide-react | |

> **백엔드 없음.** 모든 응답은 현재 브라우저 탭의 `sessionStorage`에만 임시
> 저장되며 서버 전송·저장이 없습니다. (PRD 9장 데이터·보안 정책 준수)

## 폴더 구조

```
app/
  layout.tsx               루트 레이아웃 (폰트, 테마, 메타데이터)
  page.tsx                 랜딩 (Hero/AX소개/6영역/레벨/PDF미리보기/3스텝/FAQ/CTA)
  guide/page.tsx           진단 가이드 (6축 설명/레벨표/채점방식/FAQ)
  privacy/page.tsx         개인정보처리방침
  diagnosis/
    info/page.tsx          기본정보 입력 (닉네임·연령대·직무, 모두 선택)
    part-a/page.tsx        Part A — 30문항 (1문항씩, 키보드 1~5, 자동저장·이어하기)
    part-b/page.tsx        Part B — 3개 실기 과제
  result/page.tsx          결과 화면 + 숨겨진 PDF 보고서 렌더
components/
  diagnosis/  ProgressBar, ScaleButton, QuestionCard, TaskInput
  result/     ScoreCard, RadarChartView, AreaInsight, PDFButton, ReportDocument
  shared/     Header, Footer, ThemeProvider
  ui/         button, card, progress, input, textarea, slider, badge
lib/
  constants.ts             ★ barrel export (기존 import 호환용)
  constants/
    types.ts               도메인 타입 (Area, Question, Task, Level 등)
    areas.ts               6개 영역 + AREA_MAP + AREA_COMMENTS
    questions.ts           30문항 + SCALE_LABELS
    tasks.ts               Part B 3개 실기 과제
    levels.ts              5단계 레벨 정의
    app.ts                 APP_VERSION, TOTAL_STEPS, AGE_OPTIONS, JOB_OPTIONS
  scoring.ts               ★ 채점 로직 (영역별·총점·레벨·강점/약점 + 완료 판정)
  scoring.test.ts          scoring 핵심 규칙 단위 테스트 (Vitest, 7개)
  store.ts                 Zustand 진단 상태 (sessionStorage 영속 + selector 훅)
  pdf-generator.ts         PDF 생성 (각 .pdf-page를 html2canvas→jsPDF 합성)
  utils.ts                 cn() 헬퍼
```

## 채점 로직 (lib/scoring.ts)

- **Part A** = 30문항 합산 (최대 150) / **Part B** = 3과제 자기평가 합산 (최대 30)
- **총점** = Part A + Part B (최대 180)
- **영역별 점수** = 해당 5문항 합산 (각 25점 만점)
- **레벨**: 0~72 Lv1 탐색자 / 73~108 Lv2 사용자 / 109~135 Lv3 디자이너 /
  136~162 Lv4 빌더 / 163~180 Lv5 전략가
- **영역 코멘트**: 25점을 5점 구간(band 0~4)으로 나눠 영역별 해석+다음액션 매핑
- 최고 점수 영역 → **강점**, 최저 점수 영역 → **다음 성장 포인트** 강조
- **추가 완료 규칙**:
  - `validateTask(task, values, score)`로 Part B 과제별 유효성 검사 수행
  - `isPartAComplete()` / `isPartBComplete()` / `isDiagnosisComplete()` 분리
  - 현재는 **Part B도 필수**이며, 필수 입력과 최소 글자 수, 자기평가 점수를 모두 만족해야 결과 페이지 진입 가능

## PDF 보고서 (lib/pdf-generator.ts + components/result/ReportDocument.tsx)

- 결과 페이지에서 **PDF 다운로드 시점에만** 화면 밖(`position:absolute; left:-10000px`)
  A4 6페이지 DOM을 렌더
- 각 `.pdf-page`(794×1123px)를 `html2canvas`(scale 2)로 캡처 → `jsPDF`로 A4 합성
- 한글은 **웹폰트로 렌더된 화면을 이미지화**하므로 jsPDF 폰트 임베드가 불필요
- 보고서는 다크모드와 무관하게 항상 라이트 팔레트(인라인 hex)로 고정
- 페이지 구성: ①표지 ②Executive Summary ③레이더+점수표 ④⑤영역 상세(3개씩)
  ⑥성장 로드맵+면책
- 파일명: `MyAX_Report_{닉네임}_{YYYYMMDD}.pdf`
- 결과 페이지 최적화:
  - `RadarChartView`는 `next/dynamic`으로 지연 로딩
  - `ReportDocument`도 온디맨드 렌더링으로 변경
  - 빌드 기준 `/result` 페이지 크기를 **96kB → 약 8.4kB** 수준까지 축소

## 진행 상태 관리 (lib/store.ts)

- `persist` 미들웨어로 현재 브라우저 탭의 `sessionStorage`(key:
  `myax-diagnosis`)에 임시 저장 → 새로고침 시 유지, 탭 종료 시 삭제
- `hydrated` 플래그로 SSR/하이드레이션 불일치 방지 (로딩 상태 표시 후 전환)
- Part A는 첫 미응답 문항으로 자동 이어하기
- `store.ts`는 최근 리팩토링으로 아래처럼 역할 분리됨
  - `DiagnosisData`, `DiagnosisActions`, `DiagnosisMetaState` 타입 분리
  - `createInitialDiagnosisData()`, `partializeDiagnosisState()`,
    `createDiagnosisState()`로 초기값/영속화/액션 정의를 분리
  - selector 훅 추가:
    - `useDiagnosisProfile()`
    - `useDiagnosisPartA()`
    - `useDiagnosisPartB()`
    - `useDiagnosisResult()`
- 현재 페이지들은 `useDiagnosis()` 전체 구독 대신 selector 훅을 사용하여 불필요한
  리렌더를 줄이도록 변경됨

## 디자인 토큰 (app/globals.css + tailwind.config.ts)

- shadcn 스타일 HSL CSS 변수 (light/dark 두 세트)
- Primary `#0F172A` / Accent `#6366F1` / Success `#10B981` / Warning `#F59E0B`
- 최대 폭 960px 중앙 정렬, 모바일 우선

## 검증 내역

- `npm run build` 통과 — 7개 페이지 + 11개 라우트 모두 정적 생성
- 헤드리스 Chrome E2E: 랜딩 → 기본정보 → Part A 30문항 → Part B 3과제 →
  결과(레벨/레이더 차트/점수) → **PDF 다운로드(유효한 6페이지 PDF, ~880KB)** 확인
- 보고서 표지·레이더 페이지·결과 화면 스크린샷으로 한글 렌더링/레이아웃 육안 확인
- 리팩토링 후 추가 검증:
  - `npm test` 통과 — `Vitest` 기반 `lib/scoring.test.ts` 7개 테스트 성공
  - `npm run build` 재검증 통과
  - 최근 주요 리팩토링(완료 조건 통합, 결과 페이지 lazy loading, constants 분리,
    store selector 훅 적용) 이후 diagnostics와 build 모두 정상

## 로컬 실행 / 배포

```bash
npm install
npm run dev        # http://localhost:3000
npm test
npm run build && npm run start
```

Vercel 배포: 레포 Import 시 Framework는 Next.js 자동 감지, 환경변수 불필요.
(저장소 구조에 따라 Root Directory 지정이 필요할 수 있음)

## 최근 리팩토링 요약 (2026-05-27)

### 1. 진단 완료 조건 정리

- 기존: Part A 30문항만 완료해도 결과 페이지 진입 가능
- 현재: Part A + Part B 모두 완료해야 결과 페이지 진입 가능
- Part B 각 과제는 아래를 모두 만족해야 함
  - 필수 입력 존재
  - `minLength` 충족
  - 자기평가 점수 존재 및 유효 범위 충족
- 관련 파일:
  - `lib/scoring.ts`
  - `app/diagnosis/part-b/page.tsx`
  - `components/diagnosis/TaskInput.tsx`
  - `app/result/page.tsx`

### 2. 결과 페이지 성능 최적화

- 결과 페이지 초기 렌더에서 무거운 PDF DOM과 차트를 모두 로드하지 않도록 수정
- `PDFButton`에서 컨테이너를 비동기로 확보할 수 있게 변경
- 결과 페이지가 미완료 상태일 때 Part A/Part B 상황에 따라 적절한 복귀 링크 제공
- 관련 파일:
  - `app/result/page.tsx`
  - `components/result/PDFButton.tsx`
  - `components/result/ReportDocument.tsx`
  - `components/result/RadarChartView.tsx`

### 3. 저장 정책 문구와 실제 구현 정합성 맞춤

- 예전에는 일부 화면에 "저장되지 않습니다"라고 적혀 있었지만 실제로는
  `sessionStorage`에 임시 저장되고 있었음
- 현재는 전 화면/문서에서 아래 의미로 통일
  - 현재 브라우저 탭의 세션에만 임시 저장
  - 새로고침 시 유지
  - 탭 종료 시 삭제
  - 서버 저장 없음
- 관련 파일:
  - `app/page.tsx`
  - `app/guide/page.tsx`
  - `app/privacy/page.tsx`
  - `app/diagnosis/info/page.tsx`
  - `components/shared/Footer.tsx`
  - `README.md`

### 4. constants 구조 분리

- 기존 단일 파일 `lib/constants.ts`를 아래처럼 분리
  - `lib/constants/types.ts`
  - `lib/constants/areas.ts`
  - `lib/constants/questions.ts`
  - `lib/constants/tasks.ts`
  - `lib/constants/levels.ts`
  - `lib/constants/app.ts`
- 기존 import를 깨지 않기 위해 `lib/constants.ts`는 barrel export 역할만 수행
- 따라서 Claude Code가 급하게 수정할 때는
  - 기존처럼 `@/lib/constants`에서 가져와도 되고
  - 더 명확하게는 세부 파일을 직접 import해도 됨

### 5. 테스트 도입

- `Vitest` 추가
- `package.json`에 `"test": "vitest run"` 추가
- `lib/scoring.test.ts`에 아래 규칙 테스트 추가
  - `getAreaBand()` 경계값
  - `getLevel()` 구간 판정
  - `computeResult()` 총점/강점/약점
  - `answeredCount()` / `isPartAComplete()`
  - `validateTask()`
  - `isPartBComplete()` / `isDiagnosisComplete()`

### 6. Zustand store 리팩토링

- 내부 구조만 정리했고 외부 액션 이름은 유지
- 이후 Claude Code가 store를 손볼 때는 selector 훅을 우선 사용하는 것이 좋음
- 아직 남아 있는 다음 후보 작업:
  - `useDiagnosisComputedResult()` 같은 **derived selector 훅**으로 결과 계산까지
    추상화
  - 결과 페이지의 계산 로직을 store 바깥 전용 훅으로 이동
  - 필요 시 selector 훅에 대한 테스트 추가

## Claude Code 인수인계 포인트

- **기능 수정 시 먼저 볼 파일**
  - 진단 규칙/레벨/과제/문항 텍스트: `lib/constants/*`
  - 완료 조건/채점 로직: `lib/scoring.ts`
  - 상태 관리/selector 훅: `lib/store.ts`
  - 결과 PDF 레이아웃: `components/result/ReportDocument.tsx`
  - 결과 화면 흐름: `app/result/page.tsx`

- **현재 구현상 중요한 전제**
  - Part B는 선택이 아니라 필수
  - 저장은 현재 브라우저 탭의 `sessionStorage`에만 임시 보관
  - 결과 페이지 성능 때문에 PDF용 DOM은 다운로드 시점에만 렌더
  - `lib/constants.ts`는 더 이상 실데이터 본체가 아니라 재수출용 진입점

- **Claude Code가 바로 이어서 하기 좋은 작업**
  - 결과 계산을 `useDiagnosisComputedResult()` 같은 derived hook으로 이동
  - 결과 페이지에서 `answeredCount`, `isDiagnosisComplete`, `computeResult`
    계산 책임을 분리
  - `HISTORY.md`의 폴더 구조/설명을 세부 파일 기준으로 계속 최신화

## 남은 작업 (다음 스프린트)

### Sprint 2 — 개선
- [ ] 결과 공유용 OG 이미지 자동 생성 (현재는 Web Share / 클립보드 복사만)
- [ ] GA4 또는 Plausible 분석 연동 (이벤트: start_diagnosis, complete_part_a,
      complete_part_b, download_pdf, share_result)
- [ ] 다크모드 결과 화면 미세 대비 점검
- [ ] 랜딩 예시 보고서 미리보기를 실제 이미지로 교체 (`/public/samples`)

### Sprint 3 — 확장
- [ ] **Claude API 기반 Part B 자동 채점** (현재는 자기평가 슬라이더)
      → `lib/constants.ts`의 각 Task `guide`(채점 기준)를 프롬프트로 활용
- [ ] 진단 결과 익명 통계 누적 + 연령대·직무별 평균 비교 (Supabase/Firebase)
- [ ] 재진단 시 이전 결과 비교 그래프
- [ ] 영문(i18n) 버전
- [ ] 이메일로 결과 발송

## 작업 시 참고

- 문항/레벨/과제 텍스트 수정은 이제 **`lib/constants/*`** 에서 관리됩니다.
  - 문항: `lib/constants/questions.ts`
  - 과제: `lib/constants/tasks.ts`
  - 레벨: `lib/constants/levels.ts`
  - 영역/코멘트: `lib/constants/areas.ts`
- 기존 import 호환성 때문에 **`lib/constants.ts`는 barrel export** 입니다.
- 채점 기준 변경은 **`lib/scoring.ts`**, 레벨 경계는 `LEVELS` 배열의 `min/max`.
- PDF 레이아웃 수정은 **`components/result/ReportDocument.tsx`** (인라인 스타일).
- 새 UI 컴포넌트는 `components/ui/`에 shadcn 스타일로 추가.
- 상태 접근은 가능하면 `useDiagnosis()` 전체 구독보다 selector 훅을 우선 사용.
