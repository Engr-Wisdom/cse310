import React from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
  Pressable,
  Alert,
} from "react-native";

import Colors from "@/constants/Colors";
import { Assignment } from "@/types/Assignment";

interface Props {
  assignment: Assignment;
  onToggle: () => void;
  onDelete: () => void;
}

export default function AssignmentCard({
  assignment,
  onToggle,
  onDelete,
}: Props) {
  const priorityColor =
    assignment.priority === "High"
      ? "#EF4444"
      : assignment.priority === "Medium"
      ? "#F59E0B"
      : "#22C55E";

  const handleDelete = () => {
    Alert.alert(
      "Delete Assignment",
      "Are you sure you want to delete this assignment?",
      [
        {
          text: "Cancel",
          style: "cancel",
        },
        {
          text: "Delete",
          style: "destructive",
          onPress: onDelete,
        },
      ]
    );
  };

  return (
    <View
      style={[
        styles.card,
        assignment.completed && styles.completedCard,
      ]}
    >
      <View style={styles.header}>
        <View style={{ flex: 1 }}>
          <Text
            style={[
              styles.title,
              assignment.completed &&
                styles.completedText,
            ]}
          >
            {assignment.title}
          </Text>
        </View>

        <Pressable onPress={handleDelete}>
          <Text style={styles.menu}>⋮</Text>
        </Pressable>
      </View>

      <Text style={styles.description}>
        {assignment.description || "No description"}
      </Text>

      <View style={styles.footer}>
        <Text
          style={[
            styles.priority,
            { color: priorityColor },
          ]}
        >
          {assignment.priority}
        </Text>

        <Text style={styles.date}>
          📅 {assignment.dueDate || "No due date"}
        </Text>
      </View>

      <View style={styles.switchContainer}>
        <Text style={styles.completedLabel}>
          Completed
        </Text>

        <Switch
          value={assignment.completed}
          onValueChange={onToggle}
          trackColor={{
            false: "#D1D5DB",
            true: "#22C55E",
          }}
          thumbColor="#FFFFFF"
        />
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 18,
    padding: 18,
    marginBottom: 18,
    elevation: 4,
  },

  completedCard: {
    borderWidth: 2,
    borderColor: "#22C55E",
  },

  header: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "flex-start",
  },

  title: {
    flex: 1,
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginRight: 10,
  },

  completedText: {
    textDecorationLine: "line-through",
    color: "#9CA3AF",
  },

  menu: {
    fontSize: 28,
    fontWeight: "bold",
    color: Colors.text,
    paddingHorizontal: 8,
  },

  description: {
    marginTop: 12,
    color: Colors.subText,
    fontSize: 15,
    lineHeight: 22,
  },

  footer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 18,
  },

  priority: {
    fontWeight: "bold",
    fontSize: 15,
  },

  date: {
    color: Colors.subText,
    fontSize: 14,
  },

  switchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    marginTop: 20,
  },

  completedLabel: {
    fontWeight: "600",
    color: Colors.text,
    fontSize: 15,
  },
});