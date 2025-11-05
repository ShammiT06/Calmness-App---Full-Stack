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
import { useContext, useState } from "react";
import { askAI } from "../(lib)/api";
import { ThemeContext } from "../(lib)/ThemeContext";

function ChatScreen() {
  const [messages, setMessages] = useState([
    { role: "bot", text: "Hey there 👋 How are you feeling today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const {theme,mode}=useContext(ThemeContext)

  const sendMessage = async () => {
    if (!input.trim()) return;
    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);
    const aiReply = await askAI(userMessage.text);
    const botMessage = { role: "bot", text: aiReply };
    setMessages((prev) => [...prev, botMessage]);
    setLoading(false);
  };

  return (
    <SafeAreaView style={[styles.safeArea, { backgroundColor: theme.background }]}>
      <View style={[styles.header,{backgroundColor: mode === "dark" ? theme.background:"#FFFFFF"}]}>
        <Ionicons name="happy-outline" size={26} color="#4A6FA5" />
        <Text style={styles.headerText}>Calmness App</Text>
      </View>

      <ScrollView
        style={styles.chatContainer}
        contentContainerStyle={{ padding: 16 }}
        showsVerticalScrollIndicator={false}
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
            <Text style={styles.botText}>Typing...</Text>
          </View>
        )}
      </ScrollView>

      <View style={styles.inputContainer}>
        <View style={styles.inputBox}>
          <TextInput
            placeholder="Ask anything..."
            placeholderTextColor="#999"
            style={styles.input}
            multiline
            value={input}
            onChangeText={setInput}
          />
          <TouchableOpacity style={styles.sendButton} onPress={sendMessage}>
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
    backgroundColor: "#F4F5F9",
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
    color: "#4A6FA5",
    marginLeft: 8,
  },
  chatContainer: {
    flex: 1,
  },
  botMessage: {
    backgroundColor: "#E8ECF4",
    alignSelf: "flex-start",
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: "85%",
  },
  botText: {
    color: "#333",
    fontSize: 15,
  },
  userMessage: {
    backgroundColor: "#4A6FA5",
    alignSelf: "flex-end",
    padding: 12,
    borderRadius: 16,
    marginVertical: 6,
    maxWidth: "85%",
  },
  userText: {
    color: "#fff",
    fontSize: 15,
  },
  inputContainer: {
    backgroundColor: "#fff",
    paddingVertical: 10,
    paddingHorizontal: 10,
    borderTopWidth: 0.5,
    borderColor: "#ddd",
  },
  inputBox: {
    flexDirection: "row",
    alignItems: "center",
    backgroundColor: "#F2F3F7",
    borderRadius: 25,
    paddingHorizontal: 15,
    paddingVertical: 6,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 15,
    color: "#333",
    paddingVertical: 8,
    paddingRight: 10,
  },
  sendButton: {
    backgroundColor: "#4A6FA5",
    padding: 10,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
  },
});

export default ChatScreen;
