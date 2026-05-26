import type { Area, AreaComment, AreaId } from "./types";

export const AREAS: Area[] = [
  {
    id: "awareness",
    no: 1,
    label: "인지",
    english: "Awareness",
    short: "인지",
    description: "AI의 작동 원리와 모델·개념을 이해하는 수준",
  },
  {
    id: "usage",
    no: 2,
    label: "활용 빈도",
    english: "Usage",
    short: "활용",
    description: "AI 도구를 일상·업무에 사용하는 빈도와 폭",
  },
  {
    id: "craft",
    no: 3,
    label: "프롬프트 역량",
    english: "Craft",
    short: "프롬프트",
    description: "원하는 결과를 끌어내는 지시·설계 능력",
  },
  {
    id: "integration",
    no: 4,
    label: "워크플로 통합",
    english: "Integration",
    short: "워크플로",
    description: "업무 프로세스에 AI를 연결·자동화하는 능력",
  },
  {
    id: "critical",
    no: 5,
    label: "비판·윤리",
    english: "Critical",
    short: "비판·윤리",
    description: "AI 결과를 검증하고 위험·윤리를 관리하는 태도",
  },
  {
    id: "impact",
    no: 6,
    label: "산출 임팩트",
    english: "Impact",
    short: "임팩트",
    description: "AI로 실제 성과와 가치를 만들어낸 정도",
  },
];

export const AREA_MAP: Record<AreaId, Area> = AREAS.reduce(
  (acc, area) => ({ ...acc, [area.id]: area }),
  {} as Record<AreaId, Area>,
);

export const AREA_COMMENTS: Record<AreaId, AreaComment[]> = {
  awareness: [
    { interpretation: "AI 작동 원리에 대한 이해가 아직 입문 단계입니다.", nextAction: "환각·토큰·컨텍스트 윈도우 등 기본 개념부터 익혀보세요." },
    { interpretation: "핵심 용어는 들어봤지만 설명에는 자신이 없는 수준입니다.", nextAction: "RAG·파인튜닝 차이를 한 문단으로 정리해보세요." },
    { interpretation: "주요 개념을 이해하고 대화에 활용할 수 있는 수준입니다.", nextAction: "모델별 강·약점을 직접 비교 정리해 선택 기준을 세우세요." },
    { interpretation: "원리 수준의 이해를 의사결정에 반영하는 편입니다.", nextAction: "비용·레이턴시 트레이드오프를 실제 선택에 더 적극 적용해보세요." },
    { interpretation: "AI 작동 원리를 깊이 이해하고 남에게 설명할 수 있습니다.", nextAction: "최신 모델·에이전트 동향을 주기적으로 학습해 우위를 유지하세요." },
  ],
  usage: [
    { interpretation: "AI 사용이 아직 간헐적입니다.", nextAction: "주력 도구 1개를 정해 매일 사용하는 습관을 만드세요." },
    { interpretation: "특정 작업에 한해 AI를 사용하는 단계입니다.", nextAction: "이미지·코드 등 다른 유형의 AI도 시도해보세요." },
    { interpretation: "AI를 업무에 꾸준히 사용하고 있습니다.", nextAction: "유료 구독·멀티 채널 접근으로 활용 폭을 넓히세요." },
    { interpretation: "여러 도구를 여러 채널에서 능숙하게 사용합니다.", nextAction: "새 도구를 빠르게 검증·도입하는 루틴을 체계화하세요." },
    { interpretation: "다양한 AI를 폭넓고 적극적으로 활용하는 헤비 유저입니다.", nextAction: "도구 선택 기준을 정리해 팀의 표준으로 공유하세요." },
  ],
  craft: [
    { interpretation: "프롬프트가 단순 요청 수준에 머물러 있습니다.", nextAction: "역할·맥락·출력형식을 명시하는 연습부터 시작하세요." },
    { interpretation: "기본 구조는 쓰지만 결과 편차가 큰 편입니다.", nextAction: "멀티턴으로 결과를 단계적으로 다듬는 법을 익히세요." },
    { interpretation: "구조화된 프롬프트로 원하는 결과를 끌어냅니다.", nextAction: "Few-shot 예시로 정확도를 한 단계 더 높여보세요." },
    { interpretation: "프롬프트를 자산화하고 품질을 의식적으로 관리합니다.", nextAction: "템플릿 라이브러리를 만들어 재사용성을 극대화하세요." },
    { interpretation: "프롬프트 설계에 능숙하며 결과를 안정적으로 통제합니다.", nextAction: "프롬프트 패턴을 문서화해 팀에 전수하세요." },
  ],
  integration: [
    { interpretation: "AI가 아직 개별 작업에만 머물러 있습니다.", nextAction: "반복 업무 1개를 AI로 대체하는 것부터 시작하세요." },
    { interpretation: "AI 활용을 업무에 부분적으로 연결하고 있습니다.", nextAction: "자동화 도구로 단계 간 연결을 시도해보세요." },
    { interpretation: "업무 프로세스에 AI를 능동적으로 통합하는 중입니다.", nextAction: "API·코드 호출로 직접 만드는 영역을 넓히세요." },
    { interpretation: "자동화와 검토 체계를 갖추고 통합을 주도합니다.", nextAction: "여러 단계를 잇는 에이전트형 워크플로에 도전하세요." },
    { interpretation: "AI를 업무 전반에 깊이 통합하고 남을 가르치는 수준입니다.", nextAction: "재사용 가능한 자동화 라이브러리를 구축하세요." },
  ],
  critical: [
    { interpretation: "AI 결과를 비판적으로 점검하는 습관이 약합니다.", nextAction: "답변 근거를 한 번 더 확인하는 습관부터 들이세요." },
    { interpretation: "위험을 인지하지만 점검이 일관되지 않습니다.", nextAction: "기밀·개인정보 입력 전 위험 평가를 루틴화하세요." },
    { interpretation: "근거 검증과 위험 관리를 어느 정도 실천합니다.", nextAction: "편향·저작권 점검을 체크리스트로 표준화하세요." },
    { interpretation: "검증·윤리 점검을 체계적으로 수행합니다.", nextAction: "검증 프로세스를 팀 가이드로 문서화하세요." },
    { interpretation: "비판적 검증과 윤리 관리가 몸에 밴 수준입니다.", nextAction: "조직의 AI 윤리·보안 정책 수립을 이끄세요." },
  ],
  impact: [
    { interpretation: "AI로 만든 실질 성과가 아직 적습니다.", nextAction: "작은 산출물이라도 꾸준히 만들어 기록을 쌓으세요." },
    { interpretation: "성과가 나기 시작했지만 정량화가 약합니다.", nextAction: "절감 시간·건수 등 지표로 성과를 측정해보세요." },
    { interpretation: "AI로 꾸준한 산출 성과를 내고 있습니다.", nextAction: "성과를 매출·고객 평가와 연결해 가치를 입증하세요." },
    { interpretation: "성과를 정량화하고 포트폴리오로 축적합니다.", nextAction: "결과물을 외부에 공개해 영향력을 넓히세요." },
    { interpretation: "AI로 새로운 가치와 수익원을 창출하는 수준입니다.", nextAction: "AI 기반 신규 직무·사업 모델을 설계·실험하세요." },
  ],
};
