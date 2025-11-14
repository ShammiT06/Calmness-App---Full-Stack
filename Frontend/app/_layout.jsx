import { Stack, useRouter } from "expo-router";
import "./global.css";
import useFontHook from "../hooks/useFonts";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useEffect } from "react";
import ThemeProvider from "./lib/ThemeContext";

export default function RootLayout() {
  const router = useRouter();
  const fontsLoaded = useFontHook();

  useEffect(() => {
    const checkFlow = async () => {
      try {
        const token = await AsyncStorage.getItem("userToken");
        if (!token) {
          router.replace("/(auth)");
          return;
        }
        const today = new Date().toDateString();
        const savedDate = await AsyncStorage.getItem("lstJournalDate");

        if (savedDate === today) {
          router.replace("/(tabs)");
        } else {
          router.replace("/(journal)");
        }
      } catch (error) {
        console.error("Error checking app flow:", error);
      }
    };

    checkFlow();
  }, []);

  if (!fontsLoaded) return null;

  return (
    <ThemeProvider>
      <Stack
        screenOptions={{
          headerShown: false,
          animation: "none",
        }}
      >
        <Stack.Screen name="(auth)" />
        <Stack.Screen name="(tabs)" />
        <Stack.Screen name="(journal)" />
        <Stack.Screen name="(aiFeed)" />
        <Stack.Screen name="(relax)" />
      </Stack>
    </ThemeProvider>
  );
}
