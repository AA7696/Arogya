export interface Task {
  id: string;
  text: string;
  important: boolean;
  urgent: boolean;
  done: boolean;
}

export const loadTasks = (): Task[] => {
  const data = localStorage.getItem("tasks");
  return data ? JSON.parse(data) as Task[] : [];
};

export const saveTasks = (tasks: Task[]): void => {
  localStorage.setItem("tasks", JSON.stringify(tasks));
};
