import { View, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

export default function Header() {
  const hour = new Date().getHours();

  let greeting = "Good Evening";

  if (hour < 12) greeting = "Good Morning";
  else if (hour < 17) greeting = "Good Afternoon";

  return (
    <View style={styles.container}>
      <Text style={styles.title}>📚 Student Task Planner</Text>

      <Text style={styles.greeting}>
        {greeting}
      </Text>

      <Text style={styles.subtitle}>
        Organize your academic life efficiently.
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    marginBottom: 25,
  },

  title: {
    fontSize: 30,
    fontWeight: "bold",
    color: Colors.primary,
  },

  greeting: {
    marginTop: 6,
    fontSize: 18,
    fontWeight: "600",
    color: Colors.text,
  },

  subtitle: {
    marginTop: 4,
    color: Colors.subText,
    fontSize: 15,
  },
});