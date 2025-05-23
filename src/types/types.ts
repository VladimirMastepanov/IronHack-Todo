
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
  importance: 1 | 2 | 3;
  createdAt: string; //TODO
  isDone: boolean;
}

export interface EditedTaskDescription {
  text: string;
  importance: 1 | 2 | 3;
}

export interface SignupDataDescription {
}

export type SortType = "none" | "importance" | "text" | "status";