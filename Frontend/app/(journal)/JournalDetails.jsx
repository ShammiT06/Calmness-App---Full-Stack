import {
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { useContext } from "react";
import { ThemeContext } from "../lib/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useLocalSearchParams, useRouter } from "expo-router";

function JournalDetails() {
  const { theme, mode } = useContext(ThemeContext);
  const router = useRouter();
  const { data } = useLocalSearchParams();
  const journal = JSON.parse(data);

  const moodImages = {
    Happy: "😄",
    UnHappy: "😔",
    Normal: "😐",
    Sad: "😢",
    Angry: "😠",
  };

  return (
    <View style={[styles.container, { backgroundColor: theme.background }]}>
      {/* Header */}
      <View style={styles.header}>
        <TouchableOpacity
          onPress={() => router.back()}
          style={[
            styles.backBtn,
            { backgroundColor: mode === "dark" ? "#2C2C2C" : "#E0F0FF" },
          ]}
        >
          <Ionicons
            name="arrow-back"
            size={22}
            color={mode === "dark" ? "#FFF" : "#007AFF"}
          />
          <Text
            style={[
              styles.backTxt,
              { color: mode === "dark" ? "#FFF" : "#007AFF" },
            ]}
          >
            Back
          </Text>
        </TouchableOpacity>
        <Text
          style={[styles.headingTxt, { color: mode === "dark" ? "#FFF" : "#333" }]}
        >
          Journal Details
        </Text>
      </View>

      {/* Heading Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.label, { color: mode === "dark" ? "#AAA" : "#555" }]}>
          📝 Heading
        </Text>
        <TextInput
          value={journal.heading || "Untitled"}
          editable={false}
          style={[styles.input, { color: mode === "dark" ? "#FFF" : "#000" }]}
        />
      </View>

      {/* Description Card */}
      <View style={[styles.card, { backgroundColor: theme.card }]}>
        <Text style={[styles.label, { color: mode === "dark" ? "#AAA" : "#555" }]}>
          📖 Description
        </Text>
        <TextInput
          value={journal.description || "No description available"}
          editable={false}
          multiline
          style={[
            styles.input,
            { color: mode === "dark" ? "#FFF" : "#000", height: 120 },
          ]}
        />
      </View>

      {/* Mood Card */}
      <View style={[styles.card, styles.moodCard, { backgroundColor: theme.card }]}>
        <Text style={[styles.label, { color: mode === "dark" ? "#AAA" : "#555" }]}>
          😎 Mood
        </Text>
        <Text style={styles.moodEmoji}>{moodImages[journal.emotions]}</Text>
        <Text
          style={[
            styles.moodText,
            { color: mode === "dark" ? "#FFF" : "#000" },
          ]}
        >
          {journal.emotions}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingHorizontal: 20,
    paddingTop: 50,
  },
  header: {
    flexDirection: "row",
    alignItems: "center",
    marginBottom: 20,
  },
  backBtn: {
    flexDirection: "row",
    alignItems: "center",
    padding: 8,
    borderRadius: 12,
    marginRight: 15,
  },
  backTxt: {
    marginLeft: 5,
    fontSize: 16,
    fontWeight: "500",
  },
  headingTxt: {
    fontSize: 22,
    fontWeight: "700",
  },
  card: {
    borderRadius: 15,
    padding: 15,
    marginVertical: 10,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 5,
    elevation: 3,
  },
  label: {
    fontSize: 14,
    marginBottom: 5,
  },
  input: {
    fontSize: 16,
    fontWeight: "500",
  },
  moodCard: {
    alignItems: "center",
    justifyContent: "center",
    paddingVertical: 25,
  },
  moodEmoji: {
    fontSize: 50,
    marginVertical: 10,
  },
  moodText: {
    fontSize: 18,
    fontWeight: "600",
  },
});

export default JournalDetails;
