// 채점 로직 (PRD §5)

import {
  AREAS,
  AREA_COMMENTS,
  AreaComment,
  AreaId,
  LEVELS,
  Level,
  QUESTIONS,
  TASKS,
  Task,
} from "./constants";

export type Answers = Record<number, number>; // questionId -> 1~5
export type TaskAnswers = Record<number, Record<string, string>>;
export type TaskScores = Record<number, number>; // taskId -> 0~10

export interface TaskValidationResult {
  isValid: boolean;
  fieldErrors: Record<string, string>;
  scoreError?: string;
  missingCount: number;
}

export interface AreaResult {
  id: AreaId;
  label: string;
  short: string;
  score: number; // 0~25
  max: number; // 25
  percent: number; // 0~100
  band: number; // 0~4
  comment: AreaComment;
}

export interface DiagnosisResult {
  areaResults: AreaResult[];
  partAScore: number; // max 150
  partBScore: number; // max 30
  total: number; // max 180
  maxTotal: number; // 180
  percent: number; // 0~100
  level: Level;
  strongest: AreaResult;
  weakest: AreaResult;
}

const QUESTIONS_BY_AREA: Record<AreaId, number[]> = QUESTIONS.reduce(
  (acc, q) => {
    (acc[q.area] = acc[q.area] || []).push(q.id);
    return acc;
  },
  {} as Record<AreaId, number[]>,
);

export function getAreaBand(score: number): number {
  // 0~5 -> 0, 6~10 -> 1, 11~15 -> 2, 16~20 -> 3, 21~25 -> 4
  if (score <= 5) return 0;
  if (score <= 10) return 1;
  if (score <= 15) return 2;
  if (score <= 20) return 3;
  return 4;
}

export function getLevel(total: number): Level {
  return (
    LEVELS.find((l) => total >= l.min && total <= l.max) ??
    LEVELS[LEVELS.length - 1]
  );
}

export function computeResult(
  answers: Answers,
  taskScores: TaskScores,
): DiagnosisResult {
  const areaResults: AreaResult[] = AREAS.map((area) => {
    const ids = QUESTIONS_BY_AREA[area.id] ?? [];
    const score = ids.reduce((sum, id) => sum + (answers[id] ?? 0), 0);
    const band = getAreaBand(score);
    return {
      id: area.id,
      label: area.label,
      short: area.short,
      score,
      max: 25,
      percent: Math.round((score / 25) * 100),
      band,
      comment: AREA_COMMENTS[area.id][band],
    };
  });

  const partAScore = QUESTIONS.reduce(
    (sum, q) => sum + (answers[q.id] ?? 0),
    0,
  );
  const partBScore = TASKS.reduce(
    (sum, t) => sum + (taskScores[t.id] ?? 0),
    0,
  );
  const total = partAScore + partBScore;
  const maxTotal = 180;

  // 강점 = 점수 최고, 약점 = 점수 최저 (동점 시 영역 순서 우선)
  const sorted = [...areaResults].sort((a, b) => b.score - a.score);
  const strongest = sorted[0];
  const weakest = sorted[sorted.length - 1];

  return {
    areaResults,
    partAScore,
    partBScore,
    total,
    maxTotal,
    percent: Math.round((total / maxTotal) * 100),
    level: getLevel(total),
    strongest,
    weakest,
  };
}

function normalizeAnswer(value: string | undefined): string {
  return value?.trim() ?? "";
}

export function validateTask(
  task: Task,
  values: Record<string, string>,
  score?: number,
): TaskValidationResult {
  const fieldErrors: Record<string, string> = {};
  let missingCount = 0;

  for (const field of task.fields) {
    const normalizedValue = normalizeAnswer(values[field.id]);

    if (!normalizedValue) {
      fieldErrors[field.id] = "필수 항목입니다.";
      missingCount += 1;
      continue;
    }

    if (
      field.minLength != null &&
      normalizedValue.length < field.minLength
    ) {
      fieldErrors[field.id] = `최소 ${field.minLength}자 이상 입력해주세요.`;
      missingCount += 1;
    }
  }

  let scoreError: string | undefined;
  if (typeof score !== "number") {
    scoreError = "자기평가 점수를 선택해주세요.";
    missingCount += 1;
  } else if (score < 0 || score > task.maxScore) {
    scoreError = `점수는 0점에서 ${task.maxScore}점 사이여야 합니다.`;
    missingCount += 1;
  }

  return {
    isValid: missingCount === 0,
    fieldErrors,
    scoreError,
    missingCount,
  };
}

export function isPartAComplete(answers: Answers): boolean {
  return QUESTIONS.every((q) => typeof answers[q.id] === "number");
}

export function isPartBComplete(
  taskAnswers: TaskAnswers,
  taskScores: TaskScores,
): boolean {
  return TASKS.every((task) =>
    validateTask(task, taskAnswers[task.id] ?? {}, taskScores[task.id]).isValid,
  );
}

export function isDiagnosisComplete(
  answers: Answers,
  taskAnswers: TaskAnswers,
  taskScores: TaskScores,
): boolean {
  return isPartAComplete(answers) && isPartBComplete(taskAnswers, taskScores);
}

export function answeredCount(answers: Answers): number {
  return QUESTIONS.filter((q) => typeof answers[q.id] === "number").length;
}
