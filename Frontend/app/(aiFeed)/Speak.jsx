import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Alert } from "react-native";
import { useState, useRef, useEffect, useContext } from "react";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import { ThemeContext } from "../(lib)/ThemeContext";
import { SafeAreaView } from "react-native-safe-area-context";

function Speak() {
  const { theme } = useContext(ThemeContext);

  const [messages, setMessages] = useState([
    { role: "bot", text: "Hey there 👋 How are you feeling today?" },
  ]);
  const [recording, setRecording] = useState(null);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef();

  useEffect(() => {
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") return Alert.alert("Permission required!");

      await Audio.setAudioModeAsync({
        allowsRecordingIOS: true,
        playsInSilentModeIOS: true,
      });

      const rec = new Audio.Recording();
      await rec.prepareToRecordAsync(Audio.RECORDING_OPTIONS_PRESET_HIGH_QUALITY);
      await rec.startAsync();
      setRecording(rec);
    } catch (err) {
      console.error("Failed to start recording", err);
    }
  };

  const stopRecording = async () => {
    if (!recording) return;
    try {
      await recording.stopAndUnloadAsync();
      setRecording(null);

      const uri = recording.getURI();
      // TODO: Replace with real speech-to-text API
      const text = "Simulated voice input"; 

      handleVoiceMessage(text);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  const handleVoiceMessage = async (text) => {
    if (!text) return;

    // Show only user message in chat
    const userMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    try {
      const response = await fetch(
        "https://calmness-app-full-stack.onrender.com/api/airesponse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: text }),
        }
      );

      const data = await response.json();
      const aiReply = data.reply || "No response from AI 😅";

      // Speak AI reply only
      Speech.speak(aiReply);
    } catch (error) {
      console.error("API Error:", error);
      Alert.alert("Error", "Failed to get response from server.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <Ionicons name="mic-outline" size={26} color={theme.primary} />
        <Text style={[styles.headerText, { color: theme.primary }]}>Voice Calmness App</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.chatContainer}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((m, i) => (
          <View
            key={i}
            style={[
              m.role === "user"
                ? [styles.userMessage, { backgroundColor: theme.primary }]
                : [styles.botMessage, { backgroundColor: theme.card }]
            ]}
          >
            <Text style={{ color: m.role === "user" ? "#fff" : theme.text, fontSize: 15 }}>
              {m.text}
            </Text>
          </View>
        ))}

        {loading && (
          <View style={[styles.botMessage, { backgroundColor: theme.card }]}>
            <Text style={{ color: theme.text }}>Thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={[styles.voiceContainer, { backgroundColor: theme.card }]}>
        <TouchableOpacity
          style={recording ? styles.recordingButton : styles.voiceButton}
          onPress={recording ? stopRecording : startRecording}
        >
          <Ionicons
            name={recording ? "stop-circle-outline" : "mic-outline"}
            size={36}
            color="#fff"
          />
        </TouchableOpacity>
        <Text style={[styles.voiceText, { color: theme.text }]}>
          {recording ? "Recording..." : "Tap to speak"}
        </Text>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  header: {
    flexDirection: "row",
    alignItems: "center",
    paddingVertical: 12,
    paddingHorizontal: 16,
    elevation: 3,
    shadowColor: "#000",
    shadowOpacity: 0.1,
    shadowRadius: 3,
  },
  headerText: {
    fontSize: 18,
    fontWeight: "600",
    marginLeft: 8,
  },
  chatContainer: { flex: 1 },
  botMessage: {
    alignSelf: "flex-start",
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: "85%",
  },
  userMessage: {
    alignSelf: "flex-end",
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: "85%",
  },
  voiceContainer: {
    alignItems: "center",
    paddingVertical: 20,
    borderTopWidth: 0.5,
    borderColor: "#ddd",
  },
  voiceButton: {
    backgroundColor: "#4A6FA5",
    padding: 20,
    borderRadius: 50,
    marginBottom: 10,
  },
  recordingButton: {
    backgroundColor: "#FF4D4D",
    padding: 20,
    borderRadius: 50,
    marginBottom: 10,
  },
  voiceText: { fontSize: 16, marginTop: 4 },
});

export default Speak;
