import { useMemo, useState } from "react";
import {
  View,
 Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
  ScrollView,
} from "react-native";

import { useLocalSearchParams } from "expo-router";

import Colors from "@/constants/Colors";
import { useCourse } from "@/context/CourseContext";
import AssignmentCard from "@/components/AssignmentCard";
import AddAssignmentModal from "@/components/AddAssignmentModal";
import { Assignment } from "@/types/Assignment";

/**
 * Displays the selected course, allows users to switch
 * between weeks, view assignment progress, add new
 * assignments, delete assignments, and mark assignments
 * as completed.
 */

export default function WeekScreen() {
  const params = useLocalSearchParams();

  const courseId = Array.isArray(params.courseId)
    ? params.courseId[0]
    : params.courseId;

  const {
    courses,
    addAssignment,
    deleteAssignment,
    toggleAssignment,
  } = useCourse();

  const [selectedWeek, setSelectedWeek] = useState(1);

  const [modalVisible, setModalVisible] =
    useState(false);

  const course = courses.find(
    (course) => course.id === courseId
  );

  if (!course) {
    return (
      <View style={styles.container}>
        <Text style={styles.title}>
          Course not found
        </Text>
      </View>
    );
  }

  const selectedWeekData =
    course.weeks.find(
      (week) => week.id === selectedWeek
    );

  const assignments =
    selectedWeekData?.assignments ?? [];

    /**
     * Calculates the completion percentage for all
     * assignments in the currently selected week.
    */

  const progress = useMemo(() => {
    if (assignments.length === 0) return 0;

    const completed =
      assignments.filter(
        (assignment) => assignment.completed
      ).length;

    return Math.round(
      (completed / assignments.length) * 100
    );
  }, [assignments]);

  let progressColor = "#9CA3AF";
  let progressStatus = "Not Started";

  if (assignments.length > 0) {
    if (progress < 70) {
      progressColor = "#EF4444";
      progressStatus = "In Progress";
    } else if (progress < 90) {
      progressColor = "#F59E0B";
      progressStatus = "Almost Finished";
    } else {
      progressColor = "#22C55E";
      progressStatus = "Completed";
    }
  }

  /**
   * Adds a new assignment to the currently selected
   * week of the active course.
  */


  const handleAddAssignment = (
    assignment: Assignment
  ) => {
    addAssignment(
      course.id,
      selectedWeek,
      assignment
    );
  };

  return (
    <View style={styles.container}>

      <Text style={styles.title}>
        {course.name}
      </Text>

      <Text style={styles.subtitle}>
        Select Week
      </Text>

      <View style={styles.weekSection}>

        <ScrollView
          horizontal
          showsHorizontalScrollIndicator={false}
          contentContainerStyle={
            styles.weekContainer
          }
        >
          {course.weeks.map((week) => (
            <TouchableOpacity
              key={week.id}
              style={[
                styles.weekButton,
                selectedWeek === week.id &&
                  styles.selectedWeek,
              ]}
              onPress={() =>
                setSelectedWeek(week.id)
              }
            >
              <Text
                style={[
                  styles.weekText,
                  selectedWeek === week.id && {
                    color: "#FFFFFF",
                  },
                ]}
              >
                Week {week.id}
              </Text>
            </TouchableOpacity>
          ))}
        </ScrollView>

      </View>

      <Text style={styles.progressText}>
        {progressStatus} ({progress}%)
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

      <TouchableOpacity
        style={styles.addButton}
        onPress={() =>
          setModalVisible(true)
        }
      >
        <Text style={styles.addButtonText}>
          + Add Assignment
        </Text>
      </TouchableOpacity>

      <View style={styles.assignmentContainer}>

        <FlatList
          data={assignments}
          keyExtractor={(item) => item.id}
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{
            paddingBottom: 40,
            flexGrow: 1,
          }}
          ListEmptyComponent={
            <Text style={styles.empty}>
              No assignments added for this week.
            </Text>
          }
          renderItem={({ item }) => (
            <AssignmentCard
              assignment={item}
              onToggle={() =>
                toggleAssignment(
                  course.id,
                  selectedWeek,
                  item.id
                )
              }
              onDelete={() =>
                deleteAssignment(
                  course.id,
                  selectedWeek,
                  item.id
                )
              }
            />
          )}
        />

      </View>

      <AddAssignmentModal
        visible={modalVisible}
        onClose={() =>
          setModalVisible(false)
        }
        onAdd={handleAddAssignment}
      />

    </View>
  );
}

const styles = StyleSheet.create({  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 8,
  },

  subtitle: {
    fontSize: 18,
    color: Colors.subText,
    marginBottom: 12,
  },

  weekSection: {
    height: 150,
    justifyContent: "center",
    marginBottom: 18,
  },

  weekContainer: {
    alignItems: "center",
    paddingRight: 12,
  },

  weekButton: {
    width: 95,
    height: 130,
    justifyContent: "flex-start",
    alignItems: "center",
    borderRadius: 14,
    backgroundColor: Colors.card,
    marginRight: 12,
    flexShrink: 0,
    elevation: 3,
    paddingTop: 12,
  },

  selectedWeek: {
    backgroundColor: Colors.primary,
  },

  weekText: {
    fontSize: 16,
    fontWeight: "bold",
    color: Colors.text,
  },

  progressText: {
    fontSize: 17,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 10,
  },

  progressBackground: {
    height: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 22,
  },

  progressFill: {
    height: "100%",
    borderRadius: 20,
  },

  addButton: {
    backgroundColor: Colors.primary,
    borderRadius: 16,
    paddingVertical: 16,
    alignItems: "center",
    marginBottom: 16,
    elevation: 4,
  },

  addButtonText: {
    color: "#FFFFFF",
    fontSize: 17,
    fontWeight: "bold",
  },

  assignmentContainer: {
    flex: 1,
  },

  empty: {
    marginTop: 50,
    textAlign: "center",
    fontSize: 16,
    color: Colors.subText,
  },
});