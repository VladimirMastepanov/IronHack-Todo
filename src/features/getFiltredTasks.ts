import type { TaskDescription } from "../types/types";

export const getFiltredTasks = (tasks: TaskDescription[], term: string) => {
  return tasks.filter((task: TaskDescription) =>
    task.text.toLowerCase().includes(term)
  );
};
