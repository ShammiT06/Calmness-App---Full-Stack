import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "../(lib)/ThemeContext";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const [dates, setDates] = useState([]);
  const { theme, mode } = useContext(ThemeContext); 
  const router = useRouter();


  useEffect(() => {
    const today = new Date();
    const temp = [];
    for (let i = -3; i <= 3; i++) {
      const d = new Date(today);
      d.setDate(today.getDate() + i);
      temp.push({
        day: d.getDate(),
        month: d.toLocaleString("default", { month: "short" }),
        isToday: d.toDateString() === today.toDateString(),
      });
    }
    setDates(temp);
  }, []);

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUserName("Loading...");
        const userValue = await AsyncStorage.getItem("userId");
        const res = await axios.get(
          `https://wellness-backend-2-bd5h.onrender.com/api/getJournal/${userValue}`
        );
        setUserName(res.data[0].UserId.firstName);
        setScore(res.data[0].score);
      } catch (err) {
        console.log("Error:", err);
      }
    };
    fetchData();
  }, []);

  return (
    <LinearGradient
      colors={
        mode === "light"
          ? ["#E7F0FA", "#DDECF5"] 
          : ["#0f172a", "#1e293b"] 
      }
      start={{ x: 0, y: 0 }}
      end={{ x: 1, y: 0 }}
      style={styles.container}
    >
      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={styles.scrollContainer}
      >
        <View style={[styles.hero, { backgroundColor: theme.card }]}>
          <View style={styles.heroHead}>
            <Text style={[styles.greeting, { color: theme.text }]}>Hello</Text>
            <Text style={[styles.name, { color: theme.text }]}>{userName}</Text>
          </View>
          <View style={styles.heroScore}>
            <Text style={[styles.scores, { color: theme.text }]}>{score}</Text>
            <Text style={[styles.healthTxt, { color: theme.text }]}>
              Mental Score
            </Text>
          </View>
        </View>
        <View style={styles.calnder}>
          <FlatList
            data={dates}
            keyExtractor={(item, index) => index.toString()}
            renderItem={({ item }) => (
              <View
                style={[
                  styles.months,
                  {
                    backgroundColor: item.isToday ? "" : theme.card,
                    borderColor: item.isToday ? "#FFC016" : theme.background,
                    borderWidth: item.isToday ? 2 : 1,
                  },
                ]}
              >
                <Text style={[styles.day, { color: theme.text }]}>
                  {item.day}
                </Text>
                <Text style={[styles.monTxt, { color: theme.text }]}>
                  {item.month}
                </Text>
              </View>
            )}
            horizontal
            ItemSeparatorComponent={() => <View style={{ width: 16 }} />}
            showsHorizontalScrollIndicator={false}
            contentContainerStyle={{ paddingHorizontal: 10 }}
            style={{ width: 375 }}
          />
        </View>

        {/* Main Content */}
        <View
          style={[
            styles.main,
            {
              backgroundColor: theme.background,
              borderTopLeftRadius: 50,
              borderTopRightRadius: 50,
            },
          ]}
        >
          <View style={styles.aiFeed}>
            <View style={[styles.aiTxt, { backgroundColor: mode ==="dark" ? theme.inputBackground :"#E7C2FF" } ,{ borderRadius:30}]}>
              <View style={styles.sparkles}>
                <Ionicons name="sparkles-outline" size={30} color="#FFC016" />
              </View>
              <Text style={[styles.TxtHeading, { color: theme.text }]}>
                Type Your {"\n"} Thoughts Here
              </Text>
              <TouchableOpacity
                className="w-[144px] h-12 bg-white mt-5 rounded-2xl justify-center"
                onPress={() => router.push("/(aiFeed)/Chat")}
              >
                <Text className="text-center font-Sans text-2xl">Chat</Text>
              </TouchableOpacity>
            </View>

            <View style={[styles.aiVoice, { backgroundColor: mode === "dark" ? theme.inputBackground : "#CCF8AB" }]}>
              <View style={styles.sparkles}>
                <Ionicons name="headset-outline" size={30} color="#FFC016" />
              </View>
              <Text style={[styles.TxtHeading, { color: theme.text }]}>
                Speak your mind {"\n"} We are Listening
              </Text>
              <TouchableOpacity
                className="w-[144px] h-12 bg-white mt-5 rounded-2xl justify-center"
                onPress={() => router.push("/(aiFeed)/Speak")}
              >
                <Text className="text-center font-Sans text-2xl">Speak</Text>
              </TouchableOpacity>
            </View>
          </View>

          <Text style={[styles.activity, { color: theme.text }]}>Activities</Text>

          <View style={styles.actContianer}>
            <TouchableOpacity
              style={[styles.medContainer, { backgroundColor: theme.card }]}
              onPress={() => router.push("/(relax)/Breath")}
            >
              <Image
                source={require("../../assets/Dashboard/Meditation.png")}
                style={styles.medImage}
              />
              <Text style={[styles.ActTxt, { color: theme.text }]}>
                Meditation
              </Text>
            </TouchableOpacity>

            <View style={[styles.medContainer, { backgroundColor: theme.card }]}>
              <Image
                source={require("../../assets/Dashboard/Breathing.png")}
                style={styles.medImage}
              />
              <Text style={[styles.ActTxt, { color: theme.text }]}>
                Breathing
              </Text>
            </View>
          </View>
        </View>
      </ScrollView>
    </LinearGradient>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  scrollContainer: { alignItems: "center", paddingBottom: 50 },

  hero: {
    width: "90%",
    height: 120,
    marginTop: 45,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroHead: { padding: 10 },
  calnder: { marginTop: 20, width: "100%" },
  heroScore: { padding: 10 },
  greeting: { fontSize: 20, lineHeight: 45 },
  name: { fontSize: 22 },
  scores: { textAlign: "center", fontSize: 35 },
  healthTxt: { fontSize: 15 },

  months: {
    width: 60,
    height: 60,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  day: { fontSize: 20 },
  monTxt: { fontSize: 14 },

  main: {
    marginTop: 25,
    width: width * 0.99,
    height: height,
    paddingVertical: 20,
    paddingHorizontal: 10,
  },

  aiTxt: { padding: 15, width: 175, height: 200, borderRadius: 20 },
  aiVoice: { padding: 15, width: 175, height: 200, borderRadius: 20 },
  aiFeed: { flexDirection: "row", gap: 10, marginTop: 10 },
  sparkles: { backgroundColor: "#fff", width: 50, padding: 10, borderRadius: 100 },
  TxtHeading: { fontFamily: "InterLight", fontSize: 15, marginTop: 18 },
  actContianer: { flexDirection: "row", gap: 20, marginTop: 20 },
  activity: {
    fontSize: 20,
    marginTop: 10,
    fontFamily: "One",
    paddingHorizontal: 5,
  },
  medContainer: {
    width: 175,
    height: 200,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 2,
  },
  medImage: { width: 123, height: 126 },
  ActTxt: { fontSize: 20, fontFamily: "Lilita" },
});
