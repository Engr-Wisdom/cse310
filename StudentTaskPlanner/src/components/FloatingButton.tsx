import { TouchableOpacity, Text, StyleSheet } from "react-native";
import Colors from "@/constants/Colors";

interface Props {
  onPress: () => void;
}

export default function FloatingButton({
  onPress,
}: Props) {
  return (
    <TouchableOpacity
      style={styles.button}
      onPress={onPress}
    >
      <Text style={styles.icon}>＋</Text>
    </TouchableOpacity>
  );
}

const styles = StyleSheet.create({
  button: {
    position: "absolute",
    right: 25,
    bottom: 30,

    width: 65,
    height: 65,

    borderRadius: 40,

    backgroundColor: Colors.primary,

    justifyContent: "center",
    alignItems: "center",

    elevation: 6,
  },

  icon: {
    color: "white",
    fontSize: 34,
    marginTop: -2,
  },
});