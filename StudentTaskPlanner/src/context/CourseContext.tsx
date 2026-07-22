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

/**
 * CourseProvider manages all course and assignment data.
 * It provides functions for creating, updating, deleting,
 * and storing courses and assignments throughout the app.
 */
export function CourseProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [courses, setCourses] = useState<Course[]>([]);

  /**
   * Loads previously saved courses from AsyncStorage
   * when the application starts.
   */
  useEffect(() => {
    async function getCourses() {
      const saved = await loadCourses();

      if (saved) {
        setCourses(saved);
      }
    }

    getCourses();
  }, []);

  /**
   * Automatically saves all course data whenever
   * the courses state changes.
   */
  useEffect(() => {
    saveCourses(courses);
  }, [courses]);

  /**
   * Creates a new course with seven empty weeks
   * and adds it to the application.
   */
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

  /**
   * Updates the information of an existing course,
   * including its name, code, and credit hours.
   */
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

  /**
   * Removes a course and all of its assignments
   * from the application.
   */
  const deleteCourse = (courseId: string) => {
    setCourses((prev) =>
      prev.filter((course) => course.id !== courseId)
    );
  };

  /**
   * Adds a new assignment to the selected course
   * and week.
   */
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

  /**
   * Deletes an assignment from the selected
   * course and week.
   */
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

  /**
   * Changes the completion status of an assignment.
   * Completed assignments become incomplete and
   * incomplete assignments become completed.
   */
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

/**
 * Custom hook that provides access to the
 * CourseContext throughout the application.
 */
export function useCourse() {
  const context = useContext(CourseContext);

  if (!context) {
    throw new Error(
      "useCourse must be used inside CourseProvider"
    );
  }

  return context;
}