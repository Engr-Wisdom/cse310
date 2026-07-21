import { Pressable, View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";

import Colors from "@/constants/Colors";
import ProgressBar from "./ProgressBar";
import { Task } from "@/types/Task";

interface Props {
  task: Task;
}

export default function TaskCard({ task }: Props) {
  const badgeColor =
    task.priority === "High"
      ? Colors.high
      : task.priority === "Medium"
      ? Colors.medium
      : Colors.low;

  return (
    <Pressable
      onPress={() => router.push("/course")}
      style={({ pressed }) => [
        styles.card,
        {
          opacity: pressed ? 0.8 : 1,
        },
      ]}
    >
      <View style={styles.topRow}>
        <Text style={styles.title}>
          {task.title}
        </Text>

        <View
          style={[
            styles.badge,
            {
              backgroundColor: badgeColor,
            },
          ]}
        >
          <Text style={styles.badgeText}>
            {task.priority}
          </Text>
        </View>
      </View>

      <Text style={styles.description}>
        {task.description}
      </Text>

      <Text style={styles.course}>
        📚 {task.course}
      </Text>

      <Text style={styles.date}>
        📅 Due: {task.dueDate}
      </Text>

      <View style={{ marginTop: 15 }}>
        <ProgressBar progress={task.progress} />
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    padding: 18,
    borderRadius: 16,
    marginBottom: 16,
    elevation: 4,
  },

  topRow: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },

  title: {
    fontWeight: "bold",
    fontSize: 18,
    color: Colors.text,
    flex: 1,
  },

  badge: {
    paddingHorizontal: 12,
    paddingVertical: 5,
    borderRadius: 20,
  },

  badgeText: {
    color: "#fff",
    fontWeight: "bold",
    fontSize: 12,
  },

  description: {
    marginTop: 10,
    color: Colors.subText,
    lineHeight: 22,
  },

  course: {
    marginTop: 15,
    fontWeight: "700",
    color: Colors.text,
  },

  date: {
    marginTop: 5,
    color: Colors.subText,
  },
});