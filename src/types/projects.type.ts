export interface ProjectType {
  id: string;
  title: string;
  description?: string;
  dueDate?: Date;
  tasks: TaskType[];
}

export interface TaskType {
  id: string;
  title: string;
  completed: boolean;
}
