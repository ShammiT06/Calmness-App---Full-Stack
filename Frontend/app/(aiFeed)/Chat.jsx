import { Ionicons } from "@expo/vector-icons";
import {
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import { useContext, useEffect, useRef, useState } from "react";
import { ThemeContext } from "../(lib)/ThemeContext";

function ChatScreen() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hey there 👋 How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const { theme, mode } = useContext(ThemeContext);
  const scrollViewRef = useRef()

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
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ message: userMessage.text }),
      }
    );

    const data = await response.json();
    const aiReply = data.reply || "No response from AI 😅";

    const botMessage = { role: "bot", text: aiReply };
    setMessages((prev) => [...prev, botMessage]);
  } catch (error) {
    console.log("Error sending message:", error);
    const botMessage = { role: "bot", text: "Error contacting AI 😔" };
    setMessages((prev) => [...prev, botMessage]);
  } finally {
    setLoading(false);
  }
};

  useEffect(() => {
    scrollViewRef.current?.scrollToEnd({ animated: true });
  }, [messages]);


  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header, { backgroundColor: theme.card }]}>
        <Ionicons name="happy-outline" size={26} color={theme.primary} />
        <Text style={[styles.headerText, { color: theme.primary }]}>Calmness App</Text>
      </View>
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
        ))}

        {loading && (
          <View style={[styles.botMessage, { backgroundColor: theme.card }]}>
            <Text style={[styles.botText, { color: theme.text }]}>Typing...</Text>
          </View>
        )}
      </ScrollView>
      <View style={[styles.inputContainer, { backgroundColor: theme.card, borderColor: mode === "dark" ? "#333" : "#ddd" }]}>
        <View style={[styles.inputBox, { backgroundColor: theme.inputBackground }]}>
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
  safeArea: {
    flex: 1,
  },
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
  chatContainer: {
    flex: 1,
  },
  botMessage: {
    alignSelf: "flex-start",
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: "85%",
  },
  botText: {
    fontSize: 15,
  },
  userMessage: {
    alignSelf: "flex-end",
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: "85%",
  },
  userText: {
    fontSize: 15,
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
    paddingVertical: 6,
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

export default ChatScreen;
