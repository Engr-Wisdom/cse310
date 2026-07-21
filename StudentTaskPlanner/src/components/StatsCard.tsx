import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
} from "react-native";

import Colors from "@/constants/Colors";

interface StatsCardProps {
  title: string;
  value: number;
  color: string;
  onPress?: () => void;
}

export default function StatsCard({
  title,
  value,
  color,
  onPress,
}: StatsCardProps) {
  return (
    <TouchableOpacity
      activeOpacity={0.8}
      disabled={!onPress}
      onPress={onPress}
      style={{ flex: 1 }}
    >
      <View
        style={[
          styles.card,
          {
            borderLeftColor: color,
          },
        ]}
      >
        <Text style={styles.value}>
          {value}
        </Text>

        <Text style={styles.title}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  card: {
    flex: 1,
    backgroundColor: "#47505F",
    padding: 18,
    borderRadius: 18,
    borderLeftWidth: 6,
    marginHorizontal: 5,

    elevation: 5,

    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 8,
    shadowOffset: {
      width: 0,
      height: 4,
    },
  },

  value: {
    fontSize: 30,
    fontWeight: "bold",
    color: "#FFFFFF",
  },

  title: {
    marginTop: 6,
    color: "#D1D5DB",
    fontSize: 14,
    fontWeight: "600",
  },
});