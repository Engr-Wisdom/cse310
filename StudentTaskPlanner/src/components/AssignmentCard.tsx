import React, { useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  Switch,
} from "react-native";

import {
  Menu,
  Divider,
} from "react-native-paper";

import Colors from "@/constants/Colors";
import { Assignment } from "@/types/Assignment";

interface Props {
  assignment: Assignment;
  onToggle: () => void;
  onDelete: () => void;
}

/**
 * Displays an individual assignment card with its title,
 * description, priority, due date, completion status,
 * and menu options for deleting the assignment.
 */

export default function AssignmentCard({
  assignment,
  onToggle,
  onDelete,
}: Props) {
  const [menuVisible, setMenuVisible] = useState(false);

  const priorityColor =
    assignment.priority === "High"
      ? "#EF4444"
      : assignment.priority === "Medium"
      ? "#F59E0B"
      : "#22C55E";

  return (
    <View
      style={[
        styles.card,
        assignment.completed &&
          styles.completedCard,
      ]}
    >
      {/* Header */}
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

        <Menu
          visible={menuVisible}
          onDismiss={() =>
            setMenuVisible(false)
          }
          anchor={
            <Text
              style={styles.menu}
              onPress={() =>
                setMenuVisible(true)
              }
            >
              ⋮
            </Text>
          }
        >
          <Menu.Item
            leadingIcon="delete"
            title="Delete Assignment"
            onPress={() => {
              setMenuVisible(false);
              onDelete();
            }}
          />

          <Divider />
        </Menu>
      </View>

      {/* Description */}
      <Text style={styles.description}>
        {assignment.description ||
          "No description"}
      </Text>

      {/* Footer */}
      <View style={styles.footer}>
        <Text
          style={[
            styles.priority,
            {
              color: priorityColor,
            },
          ]}
        >
          {assignment.priority}
        </Text>

        <Text style={styles.date}>
          📅{" "}
          {assignment.dueDate ||
            "No due date"}
        </Text>
      </View>

      {/* Completed Switch */}
      <View
        style={styles.switchContainer}
      >
        <Text
          style={styles.completedLabel}
        >
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
}const styles = StyleSheet.create({
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
    paddingVertical: 2,
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
    fontSize: 15,
    color: Colors.text,
  },
});