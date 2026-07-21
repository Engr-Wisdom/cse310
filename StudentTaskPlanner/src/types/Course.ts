import { Week } from "./Week";

export interface Course {
  id: string;
  name: string;
  weeks: Week[];
}