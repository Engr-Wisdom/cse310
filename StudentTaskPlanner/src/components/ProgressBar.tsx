import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

interface Props {
  progress: number;
}

export default function ProgressBar({ progress }: Props) {
  let color = "#9CA3AF";
  let status = "Not Started";

  if (progress === 0) {
    color = "#9CA3AF";
    status = "Not Started";
  } else if (progress < 70) {
    color = "#EF4444";
    status = "In Progress";
  } else if (progress < 90) {
    color = "#F59E0B";
    status = "Almost Finished";
  } else {
    color = "#22C55E";
    status = progress === 100 ? "Completed" : "Almost Finished";
  }

  return (
    <>
      {progress > 0 && (
        <>
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
            <Text style={{ color }}>{status}</Text>
            <Text style={{ color }}>{progress}%</Text>
          </View>
        </>
      )}

      {progress === 0 && (
        <Text style={styles.notStarted}>Not Started</Text>
      )}
    </>
  );
}

const styles = StyleSheet.create({
  bar: {
    height: 10,
    backgroundColor: "#E5E7EB",
    borderRadius: 10,
    overflow: "hidden",
    marginTop: 10,
  },

  fill: {
    height: "100%",
    borderRadius: 10,
  },

  row: {
    marginTop: 6,
    flexDirection: "row",
    justifyContent: "space-between",
  },

  notStarted: {
    marginTop: 10,
    color: "#6B7280",
    fontWeight: "600",
  },
});