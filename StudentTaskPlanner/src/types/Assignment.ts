export interface Assignment {
  id: string;
  title: string;
  description: string;
  completed: boolean;
  priority: "High" | "Medium" | "Low";
  dueDate: string;
}