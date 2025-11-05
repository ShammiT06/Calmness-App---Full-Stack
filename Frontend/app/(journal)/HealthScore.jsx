import { ScrollView, StyleSheet, Text, TouchableOpacity, View, Dimensions, TextInput } from "react-native";
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
    if (!journal || !desc) {
      return alert("Please fill all Required Fields");
    }

    try {
      const response = await fetch("https://wellness-backend-2-bd5h.onrender.com/api/journal", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          UserId: userId, 
          heading: journal,
          description: desc,
          emotions: emotion,
        }),
      });

      if (!response.ok) {
        alert("There is an Error");
        return;
      }

      const date = new Date().toDateString()
      await AsyncStorage.setItem("lstJournalDate",date)

      const data = await response.json();
      console.log("Journal Saved");

      router.push({
        pathname: "/(journal)/Score",
      });
    } catch (error) {
      console.log("There is an Error:", error);
    }
  };

  return (
    <ScrollView
      style={{ backgroundColor: "#E7F0FA" }}
      contentContainerStyle={{ flexGrow: 1 }}
    >
      {/* Top Header */}
      <View style={Styles.hero}>
        <TouchableOpacity onPress={() => router.back()}>
          <Ionicons name="arrow-back-circle" size={30} color="#555" />
        </TouchableOpacity>

        <TouchableOpacity style={Styles.backbtn} onPress={()=>{
          router.push("/(tabs)")

        }
        }>
          <Text>Skip</Text>
        </TouchableOpacity>
      </View>

      <View style={{ paddingHorizontal: 20, marginTop: 20 }}>
        <Text style={{ fontSize: 28, fontWeight: "700", color: "#333" }}>
          What makes you <Text style={{ color: color }}> {emotion || "feel"} </Text> today?
        </Text>
      </View>

      <Text style={Styles.subHeading}>
        Save your moments of this {emotion || "special"} day
      </Text>

      <View style={Styles.journalHeading}>
        <TextInput
          placeholder="Journal Title"
          style={{ flex: 1, fontSize: 16 }}
          value={journal}
          onChangeText={setJournal}
        />
        <Ionicons name="pencil-outline" size={20} color="#888" />
      </View>

      <View>
        <Text style={Styles.subTxt}>Write your thoughts here</Text>
        <TextInput
          placeholder="Your Ideas..."
          multiline
          numberOfLines={10}
          style={Styles.textarea}
          value={desc}
          onChangeText={setDesc}
        />

        <TouchableOpacity style={Styles.confirm} onPress={handleConfirm}>
          <Text style={Styles.btnTxt}>Confirm</Text>
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
}

const Styles = StyleSheet.create({
  hero: {
    marginTop: 10,
    paddingHorizontal: 20,
    paddingVertical: 20,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  backbtn: {
    backgroundColor: "#FFFFFF",
    paddingHorizontal: 10,
    paddingVertical: 10,
    borderRadius: 10,
  },
  subHeading: {
    paddingHorizontal: 20,
    marginTop: 10,
    color: "#555",
    fontSize: width * 0.045,
  },
  journalHeading: {
    flexDirection: "row",
    margin: 10,
    width: width * 0.96,
    backgroundColor: "#fff",
    alignItems: "center",
    justifyContent: "space-between",
    gap: 10,
    paddingHorizontal: 20,
    borderRadius: 20,
  },
  subTxt: {
    paddingHorizontal: 20,
    fontSize: width * 0.05,
    fontWeight: "400",
  },
  textarea: {
    paddingHorizontal: 20,
    textAlignVertical: "top",
    margin: 15,
    borderRadius: 10,
    height: height * 0.55,
    backgroundColor: "#fff",
    fontSize: 16,
  },
  confirm: {
    backgroundColor: "#fff",
    paddingHorizontal: 20,
    margin: width * 0.05,
    paddingVertical: 10,
    borderRadius: 10,
  },
  btnTxt: {
    textAlign: "center",
    fontSize: 20,
    fontWeight: "700",
    color: "#333",
  },
});
