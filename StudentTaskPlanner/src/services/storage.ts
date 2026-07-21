import AsyncStorage from "@react-native-async-storage/async-storage";
import { Course } from "@/context/CourseContext";

const STORAGE_KEY = "@student_task_planner_courses";

/**
 * Save all courses
 */
export async function saveCourses(courses: Course[]) {
  try {
    const json = JSON.stringify(courses);
    await AsyncStorage.setItem(STORAGE_KEY, json);
  } catch (error) {
    console.error("Error saving courses:", error);
  }
}

/**
 * Load all courses
 */
export async function loadCourses(): Promise<Course[] | null> {
  try {
    const json = await AsyncStorage.getItem(STORAGE_KEY);

    if (json) {
      return JSON.parse(json);
    }

    return null;
  } catch (error) {
    console.error("Error loading courses:", error);
    return null;
  }
}

/**
 * Delete all saved data
 */
export async function clearCourses() {
  try {
    await AsyncStorage.removeItem(STORAGE_KEY);
  } catch (error) {
    console.error("Error clearing courses:", error);
  }
}