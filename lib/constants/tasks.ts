import type { Task } from "./types";

export const TASKS: Task[] = [
  {
    id: 1,
    title: "프롬프트 설계",
    minutes: 10,
    maxScore: 10,
    mission:
      '"우리 회사 신제품 마케팅 카피 좀 써줘"라는 어설픈 프롬프트를 6요소(역할·맥락·타깃·톤·출력형식·제약)가 모두 포함되도록 재설계하세요.',
    guide: "6요소 각 1점(6점) + Few-shot 예시 포함 2점 + 검증기준 2점",
    fields: [
      {
        id: "prompt",
        label: "재설계한 프롬프트",
        placeholder:
          "예) 당신은 10년 차 B2C 마케터입니다. (역할)\n맥락: ...\n타깃: ...\n톤: ...\n출력형식: ...\n제약: ...\n예시(Few-shot): ...",
        type: "textarea",
        minLength: 200,
        maxLength: 600,
      },
    ],
  },
  {
    id: 2,
    title: "워크플로 설계",
    minutes: 20,
    maxScore: 10,
    mission: "본인 반복 업무 1개를 AI 자동화 워크플로로 설계하세요.",
    guide: "구현 가능성 5점 + 검증·예외 명시 3점 + 정량 추정 2점",
    fields: [
      { id: "taskName", label: "작업명", placeholder: "예) 주간 영업 리포트 작성", type: "text" },
      { id: "asIs", label: "As-Is (현재 방식)", placeholder: "현재 어떻게 처리하나요?", type: "textarea", minLength: 30 },
      { id: "toBe", label: "To-Be (AI 적용 후)", placeholder: "AI로 어떻게 바뀌나요?", type: "textarea", minLength: 30 },
      { id: "tools", label: "사용 도구", placeholder: "예) ChatGPT API + Zapier + Google Sheets", type: "text" },
      { id: "steps", label: "단계 (3~5단계)", placeholder: "1) ...\n2) ...\n3) ...", type: "textarea", minLength: 30 },
      { id: "exceptions", label: "검증·예외 처리", placeholder: "오류·예외 상황을 어떻게 거르나요?", type: "textarea", minLength: 20 },
      { id: "saved", label: "월 절감 시간", placeholder: "예) 월 12시간", type: "text" },
    ],
  },
  {
    id: 3,
    title: "비판적 검증",
    minutes: 15,
    maxScore: 10,
    mission:
      "AI에게 시장 데이터 질문을 던지고 답변을 받은 뒤, 오류 식별·검증 보고서를 작성하세요.",
    guide: "오류 식별 4점 + 출처 검증 3점 + 최종 품질 3점",
    fields: [
      { id: "original", label: "AI 원본 답변", placeholder: "AI가 제시한 답변을 붙여넣으세요.", type: "textarea", minLength: 30 },
      { id: "errors", label: "발견한 오류 (2개 이상)", placeholder: "1) ...\n2) ...", type: "textarea", minLength: 30 },
      { id: "sources", label: "검증 출처 URL", placeholder: "https:// ...\nhttps:// ...", type: "textarea", minLength: 10 },
      { id: "final", label: "보완한 최종 답변", placeholder: "검증을 거쳐 보완한 최종 답변을 작성하세요.", type: "textarea", minLength: 50 },
    ],
  },
];
