import {
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  Dimensions,
  TextInput,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from "react-native";
import { Ionicons } from "@expo/vector-icons";
import { useState, useEffect } from "react";
import { useLocalSearchParams, useRouter } from "expo-router";
import AsyncStorage from "@react-native-async-storage/async-storage";

const { width, height } = Dimensions.get("window");

export default function HealthScore() {
  const router = useRouter();
  const [journal, setJournal] = useState("");
  const [desc, setDesc] = useState("");
  const [userId, setUserId] = useState(null);
  const { emotion, color } = useLocalSearchParams();

  // Load userId from local storage
  useEffect(() => {
    const loadUserId = async () => {
      try {
        const storedId = await AsyncStorage.getItem("userId");
        setUserId(storedId);
      } catch (error) {
        console.error("Error loading userId:", error);
      }
    };
    loadUserId();
  }, []);

  const handleConfirm = async () => {
    if (!journal.trim() || !desc.trim()) {
      Alert.alert("Missing Fields", "Please fill all required fields.");
      return;
    }

    if (!userId) {
      Alert.alert("Error", "User ID not found. Please re-login.");
      return;
    }

    try {
      const response = await fetch(
        "https://calmness-app-full-stack.onrender.com/api/journal",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({
            UserId: userId,
            heading: journal,
            description: desc,
            emotions: emotion,
          }),
        }
      );

      console.log("Response Status:", response.status);

      if (!response.ok) {
        Alert.alert("Error", "Something went wrong while saving.");
        return;
      }

      const data = await response.json();
      console.log("Journal Saved:", data);

      const date = new Date().toDateString();
      await AsyncStorage.setItem("lstJournalDate", date);

      Alert.alert("Success", "Journal saved successfully!", [
        {
          text: "OK",
          onPress: () => router.push("/(journal)/Score"),
        },
      ]);
    } catch (error) {
      console.error("Error saving journal:", error);
      Alert.alert("Error", "Unable to connect to the server.");
    }
  };

  return (
    <KeyboardAvoidingView
      style={{ flex: 1, backgroundColor: "#E7F0FA" }}
      behavior={Platform.OS === "ios" ? "padding" : undefined}
    >
      <ScrollView
        contentContainerStyle={styles.container}
        keyboardShouldPersistTaps="handled"
      >
        {/* Header */}
        <View style={styles.header}>
          <TouchableOpacity onPress={() => router.back()}>
            <Ionicons name="arrow-back-circle" size={32} color="#555" />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.skipBtn}
            onPress={() => router.push("/(tabs)")}
          >
            <Text style={styles.skipText}>Skip</Text>
          </TouchableOpacity>
        </View>

        {/* Title */}
        <View style={styles.titleContainer}>
          <Text style={styles.title}>
            What makes you
            <Text style={{ color: color || "#4a90e2" }}>
              {" "}
              {emotion || "feel"}
            </Text>{" "}
            today?
          </Text>
          <Text style={styles.subtitle}>
            Save your moments of this {emotion || "special"} day.
          </Text>
        </View>

        {/* Journal Title */}
        <View style={styles.journalHeading}>
          <TextInput
            placeholder="Journal Title"
            placeholderTextColor="#888"
            style={styles.titleInput}
            value={journal}
            onChangeText={setJournal}
          />
          <Ionicons name="pencil-outline" size={22} color="#888" />
        </View>

        {/* Description Box */}
        <Text style={styles.subText}>Write your thoughts here</Text>
        <TextInput
          placeholder="Your Ideas..."
          placeholderTextColor="#aaa"
          multiline
          style={styles.textarea}
          value={desc}
          onChangeText={setDesc}
        />

        {/* Confirm Button */}
        <TouchableOpacity
          style={styles.confirmButton}
          activeOpacity={0.8}
          onPress={handleConfirm}
        >
          <Text style={styles.btnText}>Confirm</Text>
        </TouchableOpacity>
      </ScrollView>
    </KeyboardAvoidingView>
  );
}

const styles = StyleSheet.create({
  container: {
    flexGrow: 1,
    paddingBottom: 40,
  },
  header: {
    marginTop: 20,
    paddingHorizontal: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  skipBtn: {
    backgroundColor: "#fff",
    paddingHorizontal: 15,
    paddingVertical: 8,
    borderRadius: 10,
    elevation: 2,
  },
  skipText: {
    fontSize: 15,
    color: "#333",
  },
  titleContainer: {
    paddingHorizontal: 20,
    marginTop: 25,
  },
  title: {
    fontSize: width * 0.065,
    fontWeight: "700",
    color: "#333",
  },
  subtitle: {
    marginTop: 10,
    color: "#555",
    fontSize: width * 0.045,
  },
  journalHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginTop: 25,
    paddingHorizontal: 20,
    backgroundColor: "#fff",
    borderRadius: 20,
    elevation: 2,
  },
  titleInput: {
    flex: 1,
    fontSize: 16,
    paddingVertical: 15,
    color: "#333",
  },
  subText: {
    paddingHorizontal: 25,
    marginTop: 25,
    fontSize: width * 0.045,
    color: "#333",
    fontWeight: "500",
  },
  textarea: {
    backgroundColor: "#fff",
    marginHorizontal: 20,
    marginTop: 10,
    borderRadius: 15,
    minHeight: height * 0.35,
    paddingHorizontal: 20,
    paddingVertical: 15,
    fontSize: 16,
    color: "#333",
    textAlignVertical: "top",
    elevation: 2,
  },
  confirmButton: {
    backgroundColor: "#4a90e2",
    marginHorizontal: 40,
    marginTop: 30,
    borderRadius: 12,
    paddingVertical: 14,
    elevation: 3,
  },
  btnText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "700",
    textAlign: "center",
  },
});
