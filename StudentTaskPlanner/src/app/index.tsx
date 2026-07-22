import React, { useState } from "react";
import {
  ScrollView,
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { Menu, Divider } from "react-native-paper";

import Header from "@/components/Header";
import StatsCard from "@/components/StatsCard";
import FloatingButton from "@/components/FloatingButton";
import Colors from "@/constants/Colors";
import { useCourse } from "@/context/CourseContext";

/**
 * Displays the application's home screen with an overview
 * of assignment statistics, a list of all courses, course
 * progress, and navigation to course details or the add
 * course screen.
 */ 

export default function HomeScreen() {
  const { courses, deleteCourse } = useCourse();

  const assignments = courses.flatMap((course) =>
    course.weeks.flatMap((week) => week.assignments)
  );

  const totalAssignments = assignments.length;

  const completedAssignments = assignments.filter(
    (assignment) => assignment.completed
  ).length;

  const pendingAssignments =
    totalAssignments - completedAssignments;

  const [menuVisible, setMenuVisible] = useState<string | null>(
    null
  );

  return (
    <View style={styles.container}>
      <ScrollView showsVerticalScrollIndicator={false}>
        <Header />

        <Text style={styles.sectionTitle}>Overview</Text>

        <View style={styles.statsRow}>
          <StatsCard
            title="Total"
            value={totalAssignments}
            color={Colors.primary}
          />

          <StatsCard
            title="Completed"
            value={completedAssignments}
            color={Colors.success}
          />
        </View>

        <View style={styles.statsRow}>
          <StatsCard
            title="Pending"
            value={pendingAssignments}
            color={Colors.warning}
          />

          <StatsCard
            title="Courses"
            value={courses.length}
            color={Colors.danger}
          />
        </View>

        <Text style={styles.sectionTitle}>My Courses</Text>

        {courses.length === 0 ? (
          <View style={styles.emptyCard}>
            <Text style={styles.emptyTitle}>
              No courses created
            </Text>

            <Text style={styles.emptyText}>
              Tap the + button below to create your first
              course.
            </Text>
          </View>
        ) : (
          courses.map((course) => {
            const total = course.weeks.reduce(
              (sum, week) =>
                sum + week.assignments.length,
              0
            );

            const completed = course.weeks.reduce(
              (sum, week) =>
                sum +
                week.assignments.filter(
                  (assignment) => assignment.completed
                ).length,
              0
            );

            const progress =
              total === 0
                ? 0
                : Math.round(
                    (completed / total) * 100
                  );

            let progressColor = "#EF4444";

            if (progress >= 70) {
              progressColor = "#22C55E";
            } else if (progress >= 40) {
              progressColor = "#F59E0B";
            }

            return (
              <TouchableOpacity
                key={course.id}
                style={styles.courseCard}
                activeOpacity={0.9}
                onPress={() =>
                  router.push({
                    pathname: "/week",
                    params: {
                      courseId: course.id,
                    },
                  })
                }
              >
                <View style={styles.cardHeader}>
                  <View style={{ flex: 1 }}>
                    <Text style={styles.courseTitle}>
                      {course.name}
                    </Text>

                    <Text style={styles.courseCode}>
                      {course.code}
                    </Text>

                    <Text style={styles.credit}>
                      {course.credit} Credit Hour(s)
                    </Text>
                  </View>

                  <Menu
                    visible={menuVisible === course.id}
                    onDismiss={() =>
                      setMenuVisible(null)
                    }
                    anchor={
                      <Text
                        style={styles.menu}
                        onPress={() =>
                          setMenuVisible(course.id)
                        }
                      >
                        ⋮
                      </Text>
                    }
                  >
                    <Menu.Item
                      leadingIcon="delete"
                      title="Delete Course"
                      onPress={() => {
                        setMenuVisible(null);
                        deleteCourse(course.id);
                      }}
                    />
                    <Divider />
                  </Menu>
                </View>

                <Text style={styles.courseInfo}>
                  {completed}/{total} Assignments
                  Completed
                </Text>

                <View style={styles.progressBackground}>
                  <View
                    style={[
                      styles.progressFill,
                      {
                        width: `${progress}%`,
                        backgroundColor: progressColor,
                      },
                    ]}
                  />
                </View>

                <Text style={styles.progressText}>
                  {progress}% Complete
                </Text>
              </TouchableOpacity>
            );
          })
        )}

        <View style={{ height: 120 }} />
      </ScrollView>

      <FloatingButton
        onPress={() =>
          router.push("/add-course")
        }
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 55,
    paddingHorizontal: 20,
  },

  sectionTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,
    marginTop: 10,
    marginBottom: 15,
  },

  statsRow: {
    flexDirection: "row",
    marginBottom: 15,
  },

  emptyCard: {
    backgroundColor: "#1F2937",
    padding: 25,
    borderRadius: 18,
    alignItems: "center",
  },

  emptyTitle: {
    color: "white",
    fontSize: 22,
    fontWeight: "bold",
    marginBottom: 10,
  },

  emptyText: {
    color: "#D1D5DB",
    textAlign: "center",
    fontSize: 16,
    lineHeight: 24,
  },

  courseCard: {
    backgroundColor: Colors.card,
    padding: 20,
    borderRadius: 18,
    marginBottom: 18,
    elevation: 3,
  },

  cardHeader: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  courseTitle: {
    fontSize: 22,
    fontWeight: "bold",
    color: Colors.text,
  },

  courseCode: {
    marginTop: 5,
    fontSize: 16,
    fontWeight: "600",
    color: Colors.primary,
  },

  credit: {
    marginTop: 5,
    fontSize: 15,
    color: Colors.subText,
  },

  menu: {
    fontSize: 28,
    color: Colors.text,
    paddingHorizontal: 8,
  },

  courseInfo: {
    marginTop: 15,
    color: Colors.subText,
  },

  progressBackground: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    overflow: "hidden",
    marginTop: 15,
  },

  progressFill: {
    height: "100%",
    borderRadius: 20,
  },

  progressText: {
    marginTop: 10,
    fontWeight: "bold",
    color: Colors.text,
  },
});