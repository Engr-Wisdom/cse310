import { Pressable, View, Text, StyleSheet } from "react-native";
import { router } from "expo-router";
import Colors from "@/constants/Colors";

interface Props {
  title: string;
  progress: number;
}

export default function WeekCard({ title, progress }: Props) {
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
      style={styles.card}
      onPress={() => router.push("/week")}
    >
      <Text style={styles.title}>{title}</Text>

      <View style={styles.bar}>
        <View
          style={[
            styles.fill,
            {
              width: `${progress}%`,
              backgroundColor: color,
            },
          ]}
        />
      </View>

      <View style={styles.row}>
        <Text style={{ color, fontWeight: "bold" }}>{status}</Text>
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
    marginBottom: 15,
  },

  title: {
    fontSize: 20,
    fontWeight: "bold",
    color: Colors.text,
    marginBottom: 12,
  },

  bar: {
    height: 10,
    backgroundColor: "#DDD",
    borderRadius: 8,
    overflow: "hidden",
  },

  fill: {
    height: 10,
    borderRadius: 8,
  },

  row: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 10,
  },
});