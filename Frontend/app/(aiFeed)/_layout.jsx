import { Stack } from "expo-router";
import { KeyboardAvoidingView, Platform } from "react-native";

export default function Layout() {
  return (
    <KeyboardAvoidingView
      behavior={Platform.OS === "ios" ? "padding" : "height"}
      style={{ flex: 1 }}
    >
      <Stack screenOptions={{ headerShown: false }}>
        <Stack.Screen name="Chat" />
        <Stack.Screen name="Speak" />
      </Stack>
    </KeyboardAvoidingView>
  );
}
