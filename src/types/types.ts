export interface UserDescription {
  id: string;
  name: string;
  email: string;
  image: string;
  createdAt: string; //TODO
}

export interface TaskDescription {
  id: number;
  userId: string;
  text: string;
  importance: ImportanceType;
  createdAt: string; //TODO
  isDone: boolean;
}

export interface EditedTaskDescription {
  text: string;
  importance: ImportanceType;
}

export type SortType = "none" | "importance" | "text" | "status";

export type ImportanceType = 1 | 2 | 3

export interface OptionsDescription {
label: string;
value: ImportanceType;
color: string;
}