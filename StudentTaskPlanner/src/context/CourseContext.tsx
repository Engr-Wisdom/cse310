import React, {
  createContext,
  useContext,
  useState,
  useEffect,
} from "react";

import { Assignment } from "@/types/Assignment";
import {
  saveCourses,
  loadCourses,
} from "@/services/storage";

export interface Week {
  id: number;
  assignments: Assignment[];
}

export interface Course {
  id: string;
  name: string;
  code: string;
  credit: number;
  weeks: Week[];
}

interface CourseContextType {
  courses: Course[];

  addCourse: (
    name: string,
    code: string,
    credit: number
  ) => void;

  updateCourse: (
    courseId: string,
    name: string,
    code: string,
    credit: number
  ) => void;

  deleteCourse: (courseId: string) => void;

  addAssignment: (
    courseId: string,
    weekId: number,
    assignment: Assignment
  ) => void;

  deleteAssignment: (
    courseId: string,
    weekId: number,
    assignmentId: string
  ) => void;

  toggleAssignment: (
    courseId: string,
    weekId: number,
    assignmentId: string
  ) => void;
}

const CourseContext =
  createContext<CourseContextType | undefined>(undefined);

export function CourseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [courses, setCourses] = useState<Course[]>([]);

  useEffect(() => {
    async function getCourses() {
      const saved = await loadCourses();

      if (saved) {
        setCourses(saved);
      }
    }

    getCourses();
  }, []);

  useEffect(() => {
    saveCourses(courses);
  }, [courses]);

  const addCourse = (
    name: string,
    code: string,
    credit: number
  ) => {
    const newCourse: Course = {
      id: Date.now().toString(),
      name,
      code,
      credit,
      weeks: Array.from({ length: 7 }, (_, index) => ({
        id: index + 1,
        assignments: [],
      })),
    };

    setCourses((prev) => [...prev, newCourse]);
  };

  const updateCourse = (
    courseId: string,
    name: string,
    code: string,
    credit: number
  ) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? {
              ...course,
              name,
              code,
              credit,
            }
          : course
      )
    );
  };

  const deleteCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.filter((course) => course.id !== courseId)
    );
  };

  const addAssignment = (
    courseId: string,
    weekId: number,
    assignment: Assignment
  ) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? {
              ...course,
              weeks: course.weeks.map((week) =>
                week.id === weekId
                  ? {
                      ...week,
                      assignments: [
                        ...week.assignments,
                        assignment,
                      ],
                    }
                  : week
              ),
            }
          : course
      )
    );
  };

  const deleteAssignment = (
    courseId: string,
    weekId: number,
    assignmentId: string
  ) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? {
              ...course,
              weeks: course.weeks.map((week) =>
                week.id === weekId
                  ? {
                      ...week,
                      assignments: week.assignments.filter(
                        (assignment) =>
                          assignment.id !== assignmentId
                      ),
                    }
                  : week
              ),
            }
          : course
      )
    );
  };

  const toggleAssignment = (
    courseId: string,
    weekId: number,
    assignmentId: string
  ) => {
    setCourses((prev) =>
      prev.map((course) =>
        course.id === courseId
          ? {
              ...course,
              weeks: course.weeks.map((week) =>
                week.id === weekId
                  ? {
                      ...week,
                      assignments: week.assignments.map(
                        (assignment) =>
                          assignment.id === assignmentId
                            ? {
                                ...assignment,
                                completed:
                                  !assignment.completed,
                              }
                            : assignment
                      ),
                    }
                  : week
              ),
            }
          : course
      )
    );
  };

  return (
    <CourseContext.Provider
      value={{
        courses,
        addCourse,
        updateCourse,
        deleteCourse,
        addAssignment,
        deleteAssignment,
        toggleAssignment,
      }}
    >
      {children}
    </CourseContext.Provider>
  );
}

export function useCourse() {
  const context = useContext(CourseContext);

  if (!context) {
    throw new Error(
      "useCourse must be used inside CourseProvider"
    );
  }

  return context;
}