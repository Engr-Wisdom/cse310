import { Stack } from "expo-router";
import { PaperProvider } from "react-native-paper";
import { CourseProvider } from "@/context/CourseContext";

export default function RootLayout() {
  return (
    <PaperProvider>
      <CourseProvider>
        <Stack
          screenOptions={{
            headerShown: false,
          }}
        />
      </CourseProvider>
    </PaperProvider>
  );
}