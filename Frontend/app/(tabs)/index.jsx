import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { Image } from "expo-image";
import { LinearGradient } from "expo-linear-gradient";
import { useRouter } from "expo-router";
import { useContext, useEffect, useState } from "react";
import { useTranslation } from "react-i18next";
import {
  View,
  Text,
  StyleSheet,
  FlatList,
  Dimensions,
  ScrollView,
  TouchableOpacity,
} from "react-native";
import { ThemeContext } from "../lib/ThemeContext";

const { width, height } = Dimensions.get("window");

export default function Index() {
  const { t } = useTranslation();
  const [userName, setUserName] = useState("");
  const [score, setScore] = useState(0);
  const [dates, setDates] = useState([]);
  const { theme, mode } = useContext(ThemeContext);
  const router = useRouter();

  useEffect(() => {
    const fetchData = async () => {
      try {
        setUserName("Loading...");
        const userValue = await AsyncStorage.getItem("userId");
        const res = await axios.get(
          `https://calmness-app-full-stack.onrender.com/api/getJournal/${userValue}`
        );
        if (Array.isArray(res.data) && res.data.length > 0) {
          setUserName(res.data[0].UserId.firstName);
          setScore(res.data[0].score);
        }
        else if (res.data.emotionData) {
          setUserName(res.data.emotionData.userId.firstName);
          setScore(res.data.emotionData.score);
        }
        else {
          setUserName("Unknown");
          setScore(0);
        }
      } catch (err) {
        console.log("Error:", err);
        setUserName("Error");
        setScore(0);
      }
    };

    fetchData();
  }, []);




  return (
    <LinearGradient
      colors={
        mode === "light" ? ["#E7F0FA", "#DDECF5"] : ["#0f172a", "#1e293b"]
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
            <Text style={[styles.greeting, { color: theme.text }]}>
              {t("hello")}
            </Text>
            <Text style={[styles.name, { color: theme.text }]}>{userName}</Text>
          </View>
          <View style={styles.heroScore}>
            <Text style={[styles.scores, { color: theme.text }]}>{score}</Text>
            <Text style={[styles.healthTxt, { color: theme.text }]}>
              {t("mental_score")}
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
            style={{ width: width }}
          />
        </View>
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
            <View
              style={[
                styles.aiBox,
                {
                  backgroundColor:
                    mode === "dark" ? theme.inputBackground : "#E7C2FF",
                },
              ]}
            >
              <View style={styles.sparkles}>
                <Ionicons name="sparkles-outline" size={30} color="#FFC016" />
              </View>
              <Text style={[styles.TxtHeading, { color: theme.text }]}>
                {t("type_thoughts")}
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => router.push("/(aiFeed)/Chat")}
              >
                <Text style={styles.btnText}>{t("chat")}</Text>
              </TouchableOpacity>
            </View>
            <View
              style={[
                styles.aiBox,
                {
                  backgroundColor:
                    mode === "dark" ? theme.inputBackground : "#CCF8AB",
                },
              ]}
            >
              <View style={styles.sparkles}>
                <Ionicons name="headset-outline" size={30} color="#FFC016" />
              </View>
              <Text style={[styles.TxtHeading, { color: theme.text }]}>
                {t("speak_mind")}
              </Text>
              <TouchableOpacity
                style={styles.btn}
                onPress={() => router.push("/(aiFeed)/Speak")}
              >
                <Text style={styles.btnText}>{t("speak")}</Text>
              </TouchableOpacity>
            </View>
          </View>

          {/* Activities */}
          <Text style={[styles.activity, { color: theme.text }]}>
            {t("activities")}
          </Text>

          <View style={styles.actContianer}>
            <TouchableOpacity
              style={[styles.medContainer, { backgroundColor: theme.card }]}
              onPress={() => router.push("/(relax)/Med")}
            >
              <Image
                source={require("../../assets/Dashboard/Meditate.png")}
                style={styles.medImage}
              />
              <Text style={[styles.ActTxt, { color: theme.text }]}>
                {t("meditation")}
              </Text>
            </TouchableOpacity>

            <TouchableOpacity onPress={() => router.push("/(relax)/Breath")}
              style={[styles.medContainer, { backgroundColor: theme.card }]}
            >
              <Image
                source={require("../../assets/Dashboard/Breathing.png")}
                style={styles.medImage}
              />
              <Text style={[styles.ActTxt, { color: theme.text }]}>
                {t("breathing")}
              </Text>
            </TouchableOpacity>
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
    width: width * 0.9,
    height: height * 0.14,
    marginTop: height * 0.08,
    borderRadius: 14,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
  heroHead: { padding: 10 },
  calnder: { marginTop: 20, width: "100%" },
  heroScore: { padding: 10 },
  greeting: { fontSize: width * 0.05, lineHeight: 45 },
  name: { fontSize: width * 0.055 },
  scores: { textAlign: "center", fontSize: width * 0.09 },
  healthTxt: { fontSize: width * 0.04 },
  months: {
    width: width * 0.15,
    height: width * 0.15,
    borderRadius: 100,
    justifyContent: "center",
    alignItems: "center",
  },
  day: { fontSize: width * 0.05 },
  monTxt: { fontSize: width * 0.035 },
  main: {
    marginTop: 25,
    width: width * 0.99,
    minHeight: height,
    paddingVertical: height * 0.02,
    paddingHorizontal: width * 0.03,
  },
  aiFeed: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
    marginTop: 10,
  },
  aiBox: {
    flex: 1,
    borderRadius: 20,
    padding: 15,
    justifyContent: "space-between",
    alignItems: "center",
    marginHorizontal: 5,
  },
  sparkles: {
    backgroundColor: "#fff",
    width: 50,
    padding: 10,
    borderRadius: 100,
  },
  TxtHeading: {
    fontFamily: "InterLight",
    fontSize: width * 0.04,
    marginTop: 18,
    textAlign: "center",
  },
  btn: {
    width: width * 0.35,
    height: 48,
    backgroundColor: "#fff",
    borderRadius: 20,
    justifyContent: "center",
    marginTop: 10,
  },
  btnText: {
    textAlign: "center",
    fontFamily: "Sans",
    fontSize: width * 0.05,
  },
  actContianer: {
    flexDirection: "row",
    gap: 20,
    marginTop: 20,
  },
  activity: {
    fontSize: width * 0.05,
    marginTop: 10,
    fontFamily: "One",
    paddingHorizontal: 5,
  },
  medContainer: {
    width: width * 0.43,
    height: height * 0.25,
    alignItems: "center",
    justifyContent: "center",
    borderRadius: 20,
    elevation: 2,
  },
  medImage: { width: width * 0.33, height: width * 0.33 },
  ActTxt: { fontSize: width * 0.05, fontFamily: "Lilita" },
});
