import {
  Text,
  TouchableOpacity,
  View,
  TextInput,
  FlatList,
  StyleSheet,
  ScrollView,
  SafeAreaView,
  Dimensions,
  Alert,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../lib/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";
import { useTranslation } from "react-i18next";
import "../lib/i18n";
import Svg, { Path } from "react-native-svg";
import * as Animatable from "react-native-animatable";

function Journal() {
  const { width, height } = Dimensions.get("window");
  const { theme, mode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("New");
  const [prevData, setPrevData] = useState([]);
  const [userId, setUserId] = useState("")
  const [heading, setHeading] = useState("")
  const [description, setDescription] = useState("")
  const [selectedEmotion, setSelectedEmotion] = useState(null);
  const router = useRouter();
  const { t } = useTranslation();

  const emotionColors = {
    Happy: "#01B263",
    Unhappy: "#368AE9",
    Normal: "#F97243",
    Sad: "#856EFA",
    Angry: "#DE385E",
  };
  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userDetails = await AsyncStorage.getItem("userId");
        if (!userDetails) return;
        setUserId(userDetails)
        const res = await axios.get(
          `https://calmness-app-full-stack.onrender.com/api/userData/${userDetails}`
        );
        if (Array.isArray(res.data)) {
          setPrevData(res.data);
        } else {
          console.warn("Invalid data format:", res.data);
          setPrevData([]);
        }
      } catch (error) {
        console.log("Something Went Wrong", error);
      }
    };
    fetchDetails();
  }, []);


  const handleUpdate = async () => {
    try {

      const response = await axios.post("https://calmness-app-full-stack.onrender.com/api/journal", {
        heading: heading,
        description: description,
        emotions: selectedEmotion,
        UserId: userId
      })
      Alert.alert("Journal Saved")
      setSelectedEmotion("")
      setHeading("")
      setDescription("")
    } catch (error) {
      console.log("Something Went Wrong", error)

    }

  }

  const EmotionList = [
    { key: "Happy", label: t("happy"), img: require("../../assets/Journal/Happy.png") },
    { key: "UnHappy", label: t("unhappy"), img: require("../../assets/Journal/UnHappy.png") },
    { key: "Normal", label: t("normal"), img: require("../../assets/Journal/Normal.png") },
    { key: "Sad", label: t("sad"), img: require("../../assets/Journal/Sad.png") },
    { key: "Angry", label: t("angry"), img: require("../../assets/Journal/Angry.png") },
  ];

  const WaveBackground = ({ color }) => (
    <Animatable.View
      animation="pulse"
      easing="ease-in-out"
      iterationCount="infinite"
      duration={4000}
      style={{
        position: "absolute",
        width,
        height,
        backgroundColor: color + "33",
      }}
    >
      <Svg
        height={height}
        width={width}
        viewBox={`0 0 ${width} ${height}`}
        style={{ position: "absolute", bottom: 0 }}
      >
        <Path
          fill={color}
          d={`M0,${height * 0.8} 
              C${width * 0.25},${height * 0.75} 
              ${width * 0.75},${height * 0.85} 
              ${width},${height * 0.8} 
              L${width},${height} L0,${height}Z`}
          opacity={0.7}
        />
      </Svg>
    </Animatable.View>
  );

  return (
    <SafeAreaView style={[styles.container, { backgroundColor: theme.background }]}>
      {activeTab === "New" && selectedEmotion && (
        <WaveBackground color={emotionColors[selectedEmotion]} />
      )}
      <View style={styles.heading}>
        <Text
          style={[
            styles.headingTxt,
            { color: mode === "dark" ? "#FFF" : "#333F4F" },
          ]}
        >
          {t("journal")}
        </Text>
      </View>
      <View
        style={[
          styles.toggleContainer,
          { width: width * 0.6 },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === "New" && styles.activeToggle,
          ]}
          onPress={() => setActiveTab("New")}
        >
          <Text
            style={[
              styles.toggleText,
              activeTab === "New" && styles.activeToggleText,
            ]}
          >
            {t("new")}
          </Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[
            styles.toggleButton,
            activeTab === "History" && styles.activeToggle,
          ]}
          onPress={() => setActiveTab("History")}
        >
          <Text
            style={[
              styles.toggleText,
              activeTab === "History" && styles.activeToggleText,
            ]}
          >
            {t("history")}
          </Text>
        </TouchableOpacity>
      </View>

      {/* 📝 NEW TAB */}
      {activeTab === "New" ? (
        <ScrollView showsVerticalScrollIndicator={false}>
          <View>
            <Text
              style={[
                styles.subHeading,
                { color: mode === "dark" ? theme.heading : "black" },
              ]}
            >
              {t("save_moments")}
            </Text>
            <View
              style={[
                styles.inputHeading,
                { backgroundColor: theme.card, marginHorizontal: width * 0.05 },
              ]}
            >
              <TextInput
                value={heading}
                onChangeText={setHeading}
                placeholder={t("journal_title")}
                style={{
                  color: mode === "dark" ? theme.heading : "black",
                  flex: 1,
                }}
                placeholderTextColor={theme.heading}
              />
              <Ionicons name="pencil" size={20} color={theme.heading} />
            </View>
            <Text
              style={[
                styles.ContHeading,
                { color: mode === "dark" ? theme.heading : "black" },
              ]}
            >
              {t("write_thoughts")}
            </Text>
            <View>
              <TextInput
                value={description}
                onChangeText={setDescription}
                style={[
                  styles.inputCont,
                  {
                    backgroundColor: theme.card,
                    color: mode === "dark" ? theme.heading : "black",
                    marginHorizontal: width * 0.05,
                  },
                ]}
                multiline={true}
                placeholder={t("your_journal")}
                placeholderTextColor={theme.heading}
                maxLength={300}
              />
            </View>
            <Text
              style={[
                styles.emotionTxt,
                { color: mode === "dark" ? theme.heading : "black" },
              ]}
            >
              {t("mood")}
            </Text>

            <View
              style={[
                styles.emotionContainer,
                { backgroundColor: theme.card, marginHorizontal: width * 0.05 },
              ]}
            >
              {EmotionList.map((item) => (
                <TouchableOpacity
                  key={item.key}
                  onPress={() => setSelectedEmotion(item.key)}
                  style={[
                    styles.emotionItem,
                    {
                      borderColor:
                        selectedEmotion === item.key
                          ? theme.primary
                          : "transparent",
                      backgroundColor:
                        selectedEmotion === item.key
                          ? theme.primary + "22"
                          : "transparent",
                    },
                  ]}
                >
                  <Image source={item.img} style={styles.imgCont} />
                  <Text
                    style={{
                      color: mode === "dark" ? theme.heading : "black",
                      textAlign: "center",
                      fontSize: 12,
                    }}
                  >
                    {item.label}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
            <View style={styles.conBtn}>
              <TouchableOpacity
                style={[
                  styles.btn,
                  { backgroundColor: theme.card, marginHorizontal: width * 0.05 },
                ]}
                onPress={handleUpdate}
              >
                <Text
                  style={{
                    textAlign: "center",
                    color: mode === "dark" ? theme.heading : theme.primary,
                  }}
                >
                  {t("confirm")}
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </ScrollView>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={prevData}
            keyExtractor={(item, index) => item._id?.toString() ?? index.toString()}
            showsVerticalScrollIndicator={false}
            contentContainerStyle={{ paddingBottom: 100 }}
            ListHeaderComponent={() => (
              <Text
                style={[
                  styles.historyDesc,
                  { color: mode === "dark" ? "#FFF" : "#333F4F" },
                ]}
              >
                {t("history_desc")}
              </Text>
            )}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: theme.card,
                  marginHorizontal: width * 0.05,
                  marginVertical: 10,
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                <View style={styles.hisHeading}>
                  <Text
                    style={{
                      color: mode === "dark" ? theme.heading : "black",
                      fontWeight: "bold",
                    }}
                    numberOfLines={1}
                  >
                    {item.heading || t("untitled")}
                  </Text>
                  <Text
                    style={{
                      color: "#888",
                      marginTop: 5,
                      fontSize: 12,
                    }}
                    numberOfLines={1}
                  >
                    {t("mood")}: {item.emotions || t("unknown")}
                  </Text>
                </View>

                <Text
                  style={{
                    color: mode === "dark" ? theme.heading : "black",
                    marginTop: 5,
                    fontSize: 14,
                  }}
                  numberOfLines={3}
                >
                  {item.description
                    ? item.description.length > 100
                      ? item.description.slice(0, 100) + "..."
                      : item.description
                    : t("no_description")}
                </Text>

                <TouchableOpacity
                  onPress={() =>
                    router.push({
                      pathname: "/(journal)/JournalDetails",
                      params: { data: JSON.stringify(item) },
                    })
                  }
                >
                  <Text
                    style={{
                      color: "#007AFF",
                      marginTop: 8,
                      fontWeight: "600",
                    }}
                  >
                    {t("read_more")} →
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  heading: { marginTop: 40, paddingHorizontal: 15, paddingVertical: 25 },
  headingTxt: { fontSize: 28, fontWeight: "bold" },
  toggleContainer: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#F0F4FA",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E3E6ED",
    overflow: "hidden",
    marginVertical: 10,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleText: { fontSize: 15, color: "#7A8AA0", fontWeight: "500" },
  activeToggle: { backgroundColor: "#333F4F", borderRadius: 25 },
  activeToggleText: { color: "#FFF", fontWeight: "600" },
  historyDesc: { marginTop: 5, paddingHorizontal: 20, fontSize: 15 },
  hisHeading: { flexDirection: "column" },
  subHeading: { paddingHorizontal: 15, marginTop: 10 },
  ContHeading: { marginTop: 20, paddingHorizontal: 15, paddingVertical: 5 },
  inputHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 15,
    elevation: 2,
  },
  inputCont: {
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 15,
    height: 150,
    shadowRadius: 4,
    elevation: 2,
    textAlignVertical: "top",
  },
  emotionTxt: { paddingVertical: 5, paddingHorizontal: 25 },
  emotionContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "space-around",
    alignItems: "center",
    marginTop: 10,
    paddingVertical: 10,
    borderRadius: 15,
  },
  emotionItem: {
    alignItems: "center",
    width: 65,
    marginVertical: 5,
    padding: 5,
    borderRadius: 10,
    borderWidth: 2,
  },
  imgCont: { width: 35, height: 35, alignSelf: "center" },
  conBtn: { marginTop: 30 },
  btn: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginVertical: 10,
    borderRadius: 15,
  },
});

export default Journal;
