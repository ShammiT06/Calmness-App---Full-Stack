import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
  Image,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useRef, useState } from "react";
import LottieView from "lottie-react-native";
import { ThemeContext } from "../lib/ThemeContext";
import { useTranslation } from "react-i18next";

export default function Chat() {
  const { t } = useTranslation();
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hey there 👋 How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme, mode } = useContext(ThemeContext);
  const scrollViewRef = useRef();

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const response = await fetch(
        "https://calmness-app-full-stack.onrender.com/api/airesponse",
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ message: userMessage.text }),
        }
      );
      const data = await response.json();
      const botMessage = {
        role: "bot",
        text: data.reply || "No response from AI 😅",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (e) {
      console.log(e);
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "Error contacting AI 😔" },
      ]);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages, loading]);

  return (
    <SafeAreaView
      style={[styles.safeArea, { backgroundColor: theme.background }]}
    >
      {/* Header */}
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <Ionicons name="happy-outline" size={26} color={theme.primary} />
        <Text style={[styles.headerText, { color: theme.primary }]}>
          Calmness App
        </Text>
      </View>

      {/* Chat Messages */}
      <ScrollView
        ref={scrollViewRef}
        style={styles.chatContainer}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
      >
        {messages.map((m, i) => (
          <View
            key={i}
            style={[
              styles.messageRow,
              m.role === "user" ? styles.userRow : styles.botRow,
            ]}
          >
            {/* Bot avatar (left side) */}
            {m.role === "bot" && (
              <Image
                source={require("../../assets/bot/bot.png")}
                style={styles.avatar}
              />
            )}

            {/* Message bubble */}
            <View
              style={[
                m.role === "user"
                  ? [styles.userMessage, { backgroundColor: theme.primary }]
                  : [styles.botMessage, { backgroundColor: theme.card }],
              ]}
            >
              <Text
                style={[
                  m.role === "user"
                    ? [styles.userText, { color: "#fff" }]
                    : [styles.botText, { color: theme.text }],
                ]}
              >
                {m.text}
              </Text>
            </View>

            {/* User avatar (right side) */}
            {m.role === "user" && (
              <View style={styles.userAvatarContainer}>
                <Ionicons
                  name="person-circle-outline"
                  size={34}
                  color={theme.primary}
                />
              </View>
            )}
          </View>
        ))}

        {/* While bot is typing */}
        {loading && (
          <View style={[styles.messageRow, styles.botRow]}>
            <Image
              source={require("../../assets/bot/bot.png")}
              style={styles.avatar}
            />
            <View
              style={[
                styles.botMessage,
                { backgroundColor: theme.card, alignItems: "center" },
              ]}
            >
              {/* Lottie Bot Speaking Animation */}
              <LottieView
                source={require("../../assets/bot/bot.json")}
                autoPlay
                loop
                style={styles.botAnimation}
              />
              <Text
                style={[
                  styles.typingText,
                  { color: theme.text, fontStyle: "italic" },
                ]}
              >
                Typing...
              </Text>
            </View>
          </View>
        )}
      </ScrollView>

      {/* Input Box */}
      <View
        style={[
          styles.inputContainer,
          {
            backgroundColor: theme.card,
            borderColor: mode === "dark" ? "#333" : "#ddd",
          },
        ]}
      >
        <View
          style={[
            styles.inputBox,
            { backgroundColor: theme.inputBackground },
          ]}
        >
          <TextInput
            placeholder="Ask anything..."
            placeholderTextColor={mode === "dark" ? "#888" : "#999"}
            style={[styles.input, { color: theme.text }]}
            multiline
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity
            style={[styles.sendButton, { backgroundColor: theme.primary }]}
            onPress={sendMessage}
          >
            <Ionicons name="arrow-up" size={20} color="#fff" />
          </TouchableOpacity>
        </View>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  safeArea: { flex: 1 },
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
  headerText: { fontSize: 18, fontWeight: "600", marginLeft: 8 },
  chatContainer: { flex: 1 },

  // Message rows
  messageRow: {
    flexDirection: "row",
    alignItems: "flex-end",
    marginVertical: 6,
  },
  botRow: { justifyContent: "flex-start" },
  userRow: { justifyContent: "flex-end" },

  avatar: {
    width: 36,
    height: 36,
    borderRadius: 18,
    marginRight: 8,
  },
  userAvatarContainer: {
    marginLeft: 8,
  },

  botMessage: {
    padding: 12,
    borderRadius: 16,
    maxWidth: "75%",
  },
  userMessage: {
    padding: 12,
    borderRadius: 16,
    maxWidth: "75%",
  },

  botText: { fontSize: 15 },
  userText: { fontSize: 15 },
  botAnimation: {
    width: 80,
    height: 80,
  },
  typingText: {
    fontSize: 13,
    textAlign: "center",
    marginTop: -10,
  },

  inputContainer: {
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 0.5,
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 5,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    paddingVertical: 8,
    paddingRight: 10,
  },
  sendButton: {
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});
