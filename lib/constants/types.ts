export type AreaId =
  | "awareness"
  | "usage"
  | "craft"
  | "integration"
  | "critical"
  | "impact";

export interface Area {
  id: AreaId;
  no: number;
  label: string;
  english: string;
  short: string;
  description: string;
}

export interface Question {
  id: number;
  area: AreaId;
  text: string;
}

export interface TaskField {
  id: string;
  label: string;
  placeholder: string;
  type: "text" | "textarea";
  minLength?: number;
  maxLength?: number;
}

export interface Task {
  id: number;
  title: string;
  minutes: number;
  maxScore: number;
  mission: string;
  guide: string;
  fields: TaskField[];
}

export interface Level {
  level: number;
  key: string;
  name: string;
  english: string;
  min: number;
  max: number;
  message: string;
  roadmap: string[];
}

export interface AreaComment {
  interpretation: string;
  nextAction: string;
}
