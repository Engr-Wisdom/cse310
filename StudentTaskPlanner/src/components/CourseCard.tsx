import { Pressable, Text, StyleSheet, View } from "react-native";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

interface Props {
  course: string;
  progress: number;
}

export default function CourseCard({ course, progress }: Props) {
  let color = "#EF4444";
  let status = "Not Started";

  if (progress >= 30) {
    color = "#F59E0B";
    status = "In Progress";
  }

  if (progress >= 70) {
    color = "#22C55E";
    status = "Almost Finished";
  }

  if (progress === 100) {
    color = "#16A34A";
    status = "Completed";
  }

  return (
    <Pressable
      onPress={() => router.push("/course")}
      style={styles.card}
    >
      <Text style={styles.course}>{course}</Text>

      <View style={styles.progressBackground}>
        <View
          style={[
            styles.progress,
            {
              width: `${progress}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>

      <View style={styles.row}>
        <Text style={{ color, fontWeight: "bold" }}>
          {status}
        </Text>

        <Text>{progress}%</Text>
      </View>
    </Pressable>
  );
}

const styles = StyleSheet.create({
  card: {
    backgroundColor: Colors.card,
    borderRadius: 15,
    padding: 18,
    marginBottom: 20,
    elevation: 4,
  },

  course: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 15,
  },

  progressBackground: {
    height: 12,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
  },

  progress: {
    height: 12,
    borderRadius: 10,
  },

  row: {
    marginTop: 10,
    flexDirection: "row",
    justifyContent: "space-between",
  },
});