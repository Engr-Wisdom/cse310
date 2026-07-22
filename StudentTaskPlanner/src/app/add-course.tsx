import React, { useState } from "react";
import {
  View,
  Text,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  Alert,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from "react-native";
import { router } from "expo-router";

import Colors from "@/constants/Colors";
import { useCourse } from "@/context/CourseContext";

/**
 * Displays the screen used to create a new course.
 * Allows the user to enter the course name, code,
 * and credit hours before saving the course.
 */

export default function AddCourseScreen() {
  const { addCourse } = useCourse();

  const [courseName, setCourseName] = useState("");
  const [courseCode, setCourseCode] = useState("");
  const [courseCredit, setCourseCredit] = useState("");

  /**
   * Validates the user's input and creates a new course.
   * If any required field is missing or the credit hours
   * are invalid, an alert is displayed instead of saving.
  */

  function createCourse() {
    if (
      !courseName.trim() ||
      !courseCode.trim() ||
      !courseCredit.trim()
    ) {
      Alert.alert(
        "Missing Information",
        "Please complete all fields."
      );
      return;
    }

    const credit = Number(courseCredit);

    if (isNaN(credit) || credit <= 0) {
      Alert.alert(
        "Invalid Credit Hours",
        "Credit hours must be a number greater than 0."
      );
      return;
    }

    addCourse(
      courseName.trim(),
      courseCode.trim().toUpperCase(),
      credit
    );

    setCourseName("");
    setCourseCode("");
    setCourseCredit("");

    router.replace("/");
  }

  return (
    <KeyboardAvoidingView
      style={{ flex: 1 }}
      behavior={
        Platform.OS === "ios" ? "padding" : undefined
      }
    >
      <ScrollView
        style={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        <Text style={styles.title}>
          Create Course
        </Text>

        <Text style={styles.label}>
          Course Name
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Example: Mobile Application Development"
          placeholderTextColor="#9CA3AF"
          value={courseName}
          onChangeText={setCourseName}
        />

        <Text style={styles.label}>
          Course Code
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Example: CSE 310"
          placeholderTextColor="#9CA3AF"
          value={courseCode}
          autoCapitalize="characters"
          onChangeText={setCourseCode}
        />

        <Text style={styles.label}>
          Credit Hours
        </Text>

        <TextInput
          style={styles.input}
          placeholder="Example: 3"
          placeholderTextColor="#9CA3AF"
          keyboardType="numeric"
          value={courseCredit}
          onChangeText={setCourseCredit}
        />

        <TouchableOpacity
          style={styles.button}
          onPress={createCourse}
        >
          <Text style={styles.buttonText}>
            Create Course
          </Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingHorizontal: 20,
    paddingTop: 60,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 30,
  },

  label: {
    fontSize: 16,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 8,
    marginTop: 10,
  },

  input: {
    backgroundColor: "#FFFFFF",
    borderRadius: 12,
    padding: 16,
    fontSize: 16,
    color: Colors.text,
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#E5E7EB",
  },

  button: {
    backgroundColor: Colors.primary,
    padding: 18,
    borderRadius: 15,
    alignItems: "center",
    marginTop: 20,
    marginBottom: 40,
  },

  buttonText: {
    color: "#FFFFFF",
    fontSize: 18,
    fontWeight: "bold",
  },
});