import { describe, expect, it } from "vitest";
import { LEVELS, QUESTIONS, TASKS } from "./constants";
import {
  answeredCount,
  computeResult,
  getAreaBand,
  getLevel,
  isDiagnosisComplete,
  isPartAComplete,
  isPartBComplete,
  validateTask,
  type Answers,
  type TaskAnswers,
  type TaskScores,
} from "./scoring";

function createCompleteAnswers(value: number): Answers {
  return Object.fromEntries(QUESTIONS.map((question) => [question.id, value]));
}

function createCompleteTaskAnswers(): TaskAnswers {
  return {
    1: {
      // 최소 글자 수를 안정적으로 넘기기 위해 충분히 긴 답변을 사용합니다.
      prompt: "프롬프트 설계 ".repeat(40),
    },
    2: {
      taskName: "주간 영업 리포트 작성",
      asIs: "현재는 여러 문서를 수작업으로 모아 정리합니다. ".repeat(2),
      toBe: "AI가 초안을 만들고 사람이 검토하는 흐름으로 바꿉니다. ".repeat(2),
      tools: "ChatGPT API + Zapier + Google Sheets",
      steps: "1) 데이터 수집\n2) 초안 생성\n3) 검토 및 발송\n4) 예외 확인",
      exceptions: "수치 이상치와 누락 행은 사람이 최종 확인합니다. ".repeat(2),
      saved: "월 12시간",
    },
    3: {
      original: "AI가 제시한 시장 데이터 초안입니다. ".repeat(3),
      errors: "1) 최신 수치가 아님\n2) 출처가 불명확함\n3) 단위를 혼동함",
      sources: "https://example.com/source-1\nhttps://example.com/source-2",
      final: "검증된 수치와 출처를 반영해 다시 정리한 최종 답변입니다. ".repeat(3),
    },
  };
}

function createCompleteTaskScores(value = 8): TaskScores {
  return Object.fromEntries(TASKS.map((task) => [task.id, value]));
}

describe("scoring", () => {
  it("영역 점수 구간을 올바른 band로 변환한다", () => {
    expect(getAreaBand(0)).toBe(0);
    expect(getAreaBand(5)).toBe(0);
    expect(getAreaBand(6)).toBe(1);
    expect(getAreaBand(10)).toBe(1);
    expect(getAreaBand(15)).toBe(2);
    expect(getAreaBand(20)).toBe(3);
    expect(getAreaBand(25)).toBe(4);
  });

  it("총점 경계값에 맞는 레벨을 반환한다", () => {
    expect(getLevel(72)).toEqual(LEVELS[0]);
    expect(getLevel(73)).toEqual(LEVELS[1]);
    expect(getLevel(180)).toEqual(LEVELS[4]);
    expect(getLevel(999)).toEqual(LEVELS[4]);
  });

  it("완전한 답변과 점수로 총점, 강점, 약점을 계산한다", () => {
    const answers = createCompleteAnswers(5);
    const taskScores = createCompleteTaskScores(10);

    const result = computeResult(answers, taskScores);

    expect(result.partAScore).toBe(150);
    expect(result.partBScore).toBe(30);
    expect(result.total).toBe(180);
    expect(result.percent).toBe(100);
    expect(result.level).toEqual(LEVELS[4]);
    expect(result.areaResults).toHaveLength(6);
    expect(result.areaResults.every((area) => area.score === 25)).toBe(true);
    // 동점일 때는 영역 순서를 우선하므로 첫 영역이 강점, 마지막 영역이 약점입니다.
    expect(result.strongest.id).toBe("awareness");
    expect(result.weakest.id).toBe("impact");
  });

  it("Part A 완료 여부와 응답 수를 올바르게 계산한다", () => {
    const partialAnswers = createCompleteAnswers(3);
    delete partialAnswers[QUESTIONS[0].id];

    expect(answeredCount(partialAnswers)).toBe(QUESTIONS.length - 1);
    expect(isPartAComplete(partialAnswers)).toBe(false);
    expect(isPartAComplete(createCompleteAnswers(3))).toBe(true);
  });

  it("과제 입력이 비어 있거나 너무 짧으면 검증 오류를 반환한다", () => {
    const invalidTask = validateTask(TASKS[0], { prompt: "짧은 답변" }, undefined);

    expect(invalidTask.isValid).toBe(false);
    expect(invalidTask.fieldErrors.prompt).toContain("최소 200자");
    expect(invalidTask.scoreError).toContain("자기평가 점수");
    expect(invalidTask.missingCount).toBe(2);
  });

  it("모든 과제가 유효하면 Part B와 전체 진단이 완료된다", () => {
    const answers = createCompleteAnswers(4);
    const taskAnswers = createCompleteTaskAnswers();
    const taskScores = createCompleteTaskScores(7);

    expect(isPartBComplete(taskAnswers, taskScores)).toBe(true);
    expect(isDiagnosisComplete(answers, taskAnswers, taskScores)).toBe(true);
  });

  it("과제 하나라도 부족하면 Part B와 전체 진단은 미완료다", () => {
    const answers = createCompleteAnswers(4);
    const taskAnswers = createCompleteTaskAnswers();
    const taskScores = createCompleteTaskScores(7);

    delete taskAnswers[3].final;

    expect(isPartBComplete(taskAnswers, taskScores)).toBe(false);
    expect(isDiagnosisComplete(answers, taskAnswers, taskScores)).toBe(false);
  });
});
