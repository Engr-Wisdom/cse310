import { Assignment } from "@/types/Assignment";

export function calculateProgress(
  assignments: Assignment[]
) {
  if (assignments.length === 0) {
    return {
      progress: null,
      status: "Not Started",
      color: "#9CA3AF",
    };
  }

  const completed = assignments.filter(
    item => item.completed
  ).length;

  const progress = Math.round(
    (completed / assignments.length) * 100
  );

  let color = "#EF4444";
  let status = "In Progress";

  if (progress >= 70)
    color = "#F97316";

  if (progress >= 80) {
    color = "#EAB308";
    status = "Almost Finished";
  }

  if (progress >= 90) {
    color = "#22C55E";
    status = "Almost Finished";
  }

  if (progress === 100) {
    color = "#16A34A";
    status = "Completed";
  }

  return {
    progress,
    status,
    color,
  };
}