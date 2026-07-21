export type Priority = "High" | "Medium" | "Low";

export interface Milestone {
  id: string;
  title: string;
  completed: boolean;
}

export interface Task {
  id: string;

  title: string;

  description: string;

  course: string;

  priority: Priority;

  dueDate: string;

  progress: number;

  status:
    | "Not Started"
    | "In Progress"
    | "Almost Finished"
    | "Completed";

  milestones: Milestone[];

  completed: boolean;

  createdAt: string;

  updatedAt: string;
}