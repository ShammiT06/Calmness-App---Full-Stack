import { Ionicons } from "@expo/vector-icons";
import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useState, useRef, useEffect } from "react";
import * as Speech from "expo-speech";
import { Audio } from "expo-av";
import { askAI } from "../(lib)/api";


function Speak() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hey there 👋 How are you feeling today?" },
  ]);
  const [recording, setRecording] = useState(null);
  const [loading, setLoading] = useState(false);

  const scrollRef = useRef();

  useEffect(() => {
    // Scroll to bottom whenever messages change
    scrollRef.current?.scrollToEnd({ animated: true });
  }, [messages]);

  const startRecording = async () => {
    try {
      const { status } = await Audio.requestPermissionsAsync();
      if (status !== "granted") return alert("Permission required!");
      
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
      const uri = recording.getURI();
      setRecording(null);
      const text = "Simulated voice input"; // Replace with real speech-to-text API

      handleVoiceMessage(text);
    } catch (err) {
      console.error("Failed to stop recording", err);
    }
  };

  const handleVoiceMessage = async (text) => {
    if (!text) return;
    const userMessage = { role: "user", text };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    const aiReply = await askAI(text);
    const botMessage = { role: "bot", text: aiReply };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);

    Speech.speak(aiReply);
  };

  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <Ionicons name="mic-outline" size={26} color="#4A6FA5" />
        <Text style={styles.headerText}>Voice Calmness App</Text>
      </View>

      <ScrollView
        ref={scrollRef}
        style={styles.chatContainer}
        contentContainerStyle={{ padding: 16 }}
      >
        {messages.map((m, i) => (
          <View
            key={i}
            style={m.role === "user" ? styles.userMessage : styles.botMessage}
          >
            <Text style={m.role === "user" ? styles.userText : styles.botText}>
              {m.text}
            </Text>
          </View>
        ))}

        {loading && (
          <View style={styles.botMessage}>
            <Text style={styles.botText}>Thinking...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.voiceContainer}>
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
        <Text style={styles.voiceText}>
          {recording ? "Recording..." : "Tap to speak"}
        </Text>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#F4F5F9" },
  header: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#FFFFFF",
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
    color: "#4A6FA5",
    marginLeft: 8,
  },
  chatContainer: { flex: 1 },
  botMessage: {
    backgroundColor: "#E8ECF4",
    alignSelf: "flex-start",
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: "85%",
  },
  botText: { color: "#333", fontSize: 15 },
  userMessage: {
    backgroundColor: "#4A6FA5",
    alignSelf: "flex-end",
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: "85%",
  },
  userText: { color: "#fff", fontSize: 15 },
  voiceContainer: {
    alignItems: "center",
    paddingVertical: 20,
    backgroundColor: "#fff",
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
  voiceText: { color: "#333", fontSize: 16 },
});

export default Speak;
