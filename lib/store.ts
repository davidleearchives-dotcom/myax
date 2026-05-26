"use client";

import { create, type StateCreator } from "zustand";
import { useShallow } from "zustand/react/shallow";
import {
  createJSONStorage,
  persist,
} from "zustand/middleware";
import type { Answers, TaskAnswers, TaskScores } from "./scoring";

export interface Profile {
  nickname: string;
  age: string;
  job: string;
}

export interface DiagnosisData {
  profile: Profile;
  answers: Answers;
  taskAnswers: TaskAnswers;
  taskScores: TaskScores;
  completedAt: string | null;
}

interface DiagnosisActions {
  setProfile: (profile: Partial<Profile>) => void;
  setAnswer: (questionId: number, value: number) => void;
  setTaskField: (taskId: number, fieldId: string, value: string) => void;
  setTaskScore: (taskId: number, value: number) => void;
  markComplete: () => void;
  reset: () => void;
  setHydrated: () => void;
}

interface DiagnosisMetaState {
  hydrated: boolean;
}

export type DiagnosisState = DiagnosisData &
  DiagnosisMetaState &
  DiagnosisActions;

export interface DiagnosisProfileSlice {
  profile: Profile;
  setProfile: DiagnosisActions["setProfile"];
}

export interface DiagnosisPartASlice {
  answers: Answers;
  setAnswer: DiagnosisActions["setAnswer"];
  hydrated: boolean;
}

export interface DiagnosisPartBSlice {
  taskAnswers: TaskAnswers;
  taskScores: TaskScores;
  setTaskField: DiagnosisActions["setTaskField"];
  setTaskScore: DiagnosisActions["setTaskScore"];
  markComplete: DiagnosisActions["markComplete"];
  hydrated: boolean;
}

export interface DiagnosisResultSlice {
  answers: Answers;
  taskAnswers: TaskAnswers;
  taskScores: TaskScores;
  profile: Profile;
  completedAt: string | null;
  hydrated: boolean;
  reset: DiagnosisActions["reset"];
}

// 브라우저 탭이 살아있는 동안에만 응답을 유지하기 위한 세션 저장소 키입니다.
export const DIAGNOSIS_STORAGE_KEY = "myax-diagnosis";

function createInitialDiagnosisData(): DiagnosisData {
  return {
    profile: { nickname: "", age: "", job: "" },
    answers: {},
    taskAnswers: {},
    taskScores: {},
    completedAt: null,
  };
}

const noopStorage = {
  getItem: () => null,
  setItem: () => {},
  removeItem: () => {},
};

function getDiagnosisStorage() {
  // SSR 환경에서는 sessionStorage가 없으므로 안전한 no-op 저장소를 사용합니다.
  return typeof window !== "undefined" ? window.sessionStorage : noopStorage;
}

function partializeDiagnosisState(state: DiagnosisState): DiagnosisData {
  return {
    profile: state.profile,
    answers: state.answers,
    taskAnswers: state.taskAnswers,
    taskScores: state.taskScores,
    completedAt: state.completedAt,
  };
}

const createDiagnosisState: StateCreator<DiagnosisState, [], [], DiagnosisState> = (
  set,
) => ({
  ...createInitialDiagnosisData(),
  hydrated: false,

  setProfile: (profile) =>
    set((state) => ({
      profile: { ...state.profile, ...profile },
    })),

  setAnswer: (questionId, value) =>
    set((state) => ({
      answers: { ...state.answers, [questionId]: value },
    })),

  setTaskField: (taskId, fieldId, value) =>
    set((state) => ({
      taskAnswers: {
        ...state.taskAnswers,
        [taskId]: {
          ...(state.taskAnswers[taskId] ?? {}),
          [fieldId]: value,
        },
      },
    })),

  setTaskScore: (taskId, value) =>
    set((state) => ({
      taskScores: { ...state.taskScores, [taskId]: value },
    })),

  markComplete: () => set({ completedAt: new Date().toISOString() }),

  reset: () =>
    set(() => ({
      ...createInitialDiagnosisData(),
      hydrated: true,
    })),

  setHydrated: () => set({ hydrated: true }),
});

export const useDiagnosis = create<DiagnosisState>()(
  persist(
    createDiagnosisState,
    {
      name: DIAGNOSIS_STORAGE_KEY,
      storage: createJSONStorage(getDiagnosisStorage),
      partialize: partializeDiagnosisState,
      onRehydrateStorage: () => (state) => {
        state?.setHydrated();
      },
    },
  ),
);

export function useDiagnosisProfile(): DiagnosisProfileSlice {
  return useDiagnosis(
    useShallow((state) => ({
      profile: state.profile,
      setProfile: state.setProfile,
    })),
  );
}

export function useDiagnosisPartA(): DiagnosisPartASlice {
  return useDiagnosis(
    useShallow((state) => ({
      answers: state.answers,
      setAnswer: state.setAnswer,
      hydrated: state.hydrated,
    })),
  );
}

export function useDiagnosisPartB(): DiagnosisPartBSlice {
  return useDiagnosis(
    useShallow((state) => ({
      taskAnswers: state.taskAnswers,
      taskScores: state.taskScores,
      setTaskField: state.setTaskField,
      setTaskScore: state.setTaskScore,
      markComplete: state.markComplete,
      hydrated: state.hydrated,
    })),
  );
}

export function useDiagnosisResult(): DiagnosisResultSlice {
  return useDiagnosis(
    useShallow((state) => ({
      answers: state.answers,
      taskAnswers: state.taskAnswers,
      taskScores: state.taskScores,
      profile: state.profile,
      completedAt: state.completedAt,
      hydrated: state.hydrated,
      reset: state.reset,
    })),
  );
}
