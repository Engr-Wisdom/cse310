import { useMemo, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  TouchableOpacity,
} from "react-native";
import { useLocalSearchParams } from "expo-router";

import Colors from "@/constants/Colors";
import { useCourse } from "@/context/CourseContext";
import AssignmentCard from "@/components/AssignmentCard";
import AddAssignmentModal from "@/components/AddAssignmentModal";
import { Assignment } from "@/types/Assignment";

export default function WeekScreen() {
  const { courseId } = useLocalSearchParams<{
    courseId: string;
  }>();

  const {
    courses,
    addAssignment,
    deleteAssignment,
    toggleAssignment,
  } = useCourse();

  const [selectedWeek, setSelectedWeek] = useState(1);
  const [modalVisible, setModalVisible] = useState(false);

  const course = courses.find(
    (item) => item.id === courseId
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

  const week = course.weeks.find(
    (item) => item.id === selectedWeek
  );

  const assignments = week?.assignments ?? [];

  const progress = useMemo(() => {
    if (assignments.length === 0) return 0;

    const completed = assignments.filter(
      (item) => item.completed
    ).length;

    return Math.round(
      (completed / assignments.length) * 100
    );
  }, [assignments]);

  let progressColor = "#9CA3AF";
  let status = "Not Started";

  if (assignments.length > 0) {
    if (progress < 70) {
      progressColor = "#EF4444";
      status = "In Progress";
    } else if (progress < 90) {
      progressColor = "#F59E0B";
      status = "Almost Finished";
    } else {
      progressColor = "#22C55E";
      status = "Completed";
    }
  }

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
        Select a Week
      </Text>

      <FlatList
        horizontal
        showsHorizontalScrollIndicator={false}
        data={course.weeks}
        keyExtractor={(item) => item.id.toString()}
        renderItem={({ item }) => (
          <TouchableOpacity
            style={[
              styles.weekButton,
              selectedWeek === item.id &&
                styles.selectedWeek,
            ]}
            onPress={() =>
              setSelectedWeek(item.id)
            }
          >
            <Text
              style={[
                styles.weekText,
                selectedWeek === item.id && {
                  color: "white",
                },
              ]}
            >
              Week {item.id}
            </Text>
          </TouchableOpacity>
        )}
      />

      <Text style={styles.progressText}>
        {status} ({progress}%)
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

      <FlatList
        data={assignments}
        keyExtractor={(item) => item.id}
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

      <AddAssignmentModal
        visible={modalVisible}
        onClose={() =>
          setModalVisible(false)
        }
        onAdd={handleAddAssignment}
      />    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: Colors.background,
    paddingTop: 60,
    paddingHorizontal: 20,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 10,
  },

  subtitle: {
    fontSize: 18,
    color: Colors.subText,
    marginBottom: 15,
  },

  weekButton: {
    backgroundColor: Colors.card,
    paddingHorizontal: 18,
    paddingVertical: 12,
    borderRadius: 12,
    marginRight: 10,
    marginBottom: 20,
    elevation: 2,
  },

  selectedWeek: {
    backgroundColor: Colors.primary,
  },

  weekText: {
    color: Colors.text,
    fontWeight: "bold",
    fontSize: 16,
  },

  progressText: {
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
    marginBottom: 10,
  },

  progressBackground: {
    height: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 20,
    overflow: "hidden",
    marginBottom: 25,
  },

  progressFill: {
    height: "100%",
    borderRadius: 20,
  },

  addButton: {
    backgroundColor: Colors.primary,
    padding: 16,
    borderRadius: 15,
    marginBottom: 20,
    alignItems: "center",
  },

  addButtonText: {
    color: "white",
    fontSize: 17,
    fontWeight: "bold",
  },

  empty: {
    textAlign: "center",
    color: Colors.subText,
    marginTop: 40,
    fontSize: 16,
  },
});