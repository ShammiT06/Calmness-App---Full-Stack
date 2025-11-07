import {
  FlatList,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  TextInput,
} from "react-native";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../(lib)/ThemeContext";
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import axios from "axios";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useRouter } from "expo-router";

function Journal() {
  const { theme, mode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("New");
  const [prevData, setPrevData] = useState([]);
  const router = useRouter()

  useEffect(() => {
    const fetchDetails = async () => {
      try {
        const userDetails = await AsyncStorage.getItem("userId");
        if (!userDetails) return;
        const res = await axios.get(
          `https://calmness-app-full-stack.onrender.com/api/userData/${userDetails}`
        )
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

  return (
    <View
      style={[styles.container, { backgroundColor: theme.background }]}
    >
      <View style={styles.heading}>
        <Text
          style={[
            styles.headingTxt,
            { color: mode === "dark" ? "#FFF" : "#333F4F" },
          ]}
        >
          Journal
        </Text>
      </View>
      <View style={styles.toggleContainer}>
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
            New
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
            History
          </Text>
        </TouchableOpacity>
      </View>
      {activeTab === "New" ? (
        <View>
          <Text
            style={[
              styles.subHeading,
              { color: mode === "dark" ? theme.heading : "black" },
            ]}
          >
            Save your moments of this day
          </Text>

          <View style={[styles.inputHeading, { backgroundColor: theme.card }]}>
            <TextInput
              placeholder="Journal Title"
              style={{ color: mode === "dark" ? theme.heading : "black" }}
              placeholderTextColor={theme.heading}
            />
            <Ionicons
              name="pencil"
              size={20}
              color={theme.heading}
            />
          </View>

          <Text
            style={[
              styles.ContHeading,
              { color: mode === "dark" ? theme.heading : "black" },
            ]}
          >
            Write your thoughts here
          </Text>

          <View>
            <TextInput
              style={[
                styles.inputCont,
                {
                  backgroundColor: theme.card,
                  color: mode === "dark" ? theme.heading : "black",
                },
              ]}
              multiline={true}
              placeholder="Your Journal"
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
            Mood
          </Text>

          <View
            style={[styles.emotionContainer, { backgroundColor: theme.card }]}
          >
            {[
              { label: "Happy", img: require("../../assets/Journal/Happy.png") },
              { label: "UnHappy", img: require("../../assets/Journal/UnHappy.png") },
              { label: "Normal", img: require("../../assets/Journal/Normal.png") },
              { label: "Sad", img: require("../../assets/Journal/Sad.png") },
              { label: "Angry", img: require("../../assets/Journal/Angry.png") },
            ].map((item, index) => (
              <View key={index}>
                <Image source={item.img} style={styles.imgCont} />
                <Text
                  style={{
                    color: mode === "dark" ? theme.heading : "black",
                    textAlign: "center",
                  }}
                >
                  {item.label}
                </Text>
              </View>
            ))}
          </View>
          <View style={styles.conBtn}>
            <TouchableOpacity
              style={[styles.btn, { backgroundColor: theme.card }]}
            >
              <Text
                style={{
                  textAlign: "center",
                  color: mode === "dark" ? theme.heading : theme.primary,
                }}
              >
                Confirm
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View style={{ flex: 1 }}>
          <FlatList
            data={prevData}
            keyExtractor={(item, index) => item._id?.toString() ?? index.toString()}
            ListHeaderComponent={() => (
              <Text
                style={[
                  styles.historyDesc,
                  { color: mode === "dark" ? "#FFF" : "#333F4F" },
                ]}
              >
                Letting you revisit your past thoughts, moods, and moments in one place.
              </Text>
            )}
            renderItem={({ item }) => (
              <View
                style={{
                  backgroundColor: theme.card,
                  marginHorizontal: 20,
                  marginVertical: 10,
                  padding: 15,
                  borderRadius: 10,
                }}
              >
                {/* Heading & Mood */}
                <View style={styles.hisHeading}>
                  <Text
                    style={{
                      color: mode === "dark" ? theme.heading : "black",
                      fontWeight: "bold",
                    }}
                  >
                    {item.heading || "Untitled"}
                  </Text>
                  <Text style={{ color: "#888", marginTop: 5, fontSize: 12 }}>
                    Mood: {item.emotions || "Unknown"}
                  </Text>
                </View>

                {/* Description */}
                <Text
                  style={{
                    color: mode === "dark" ? theme.heading : "black",
                    marginTop: 5,
                  }}
                >
                  {item.description
                    ? item.description.length > 100
                      ? item.description.slice(0, 100) + "..."
                      : item.description
                    : "No description available"}
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
                    Read More →
                  </Text>
                </TouchableOpacity>
              </View>
            )}
          />
        </View>
      )}
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  heading: {
    marginTop: 40,
    paddingHorizontal: 15,
    paddingVertical: 25,
  },
  headingTxt: {
    fontSize: 30,
    fontWeight: "bold",
  },
  toggleContainer: {
    flexDirection: "row",
    alignSelf: "center",
    backgroundColor: "#F0F4FA",
    borderRadius: 25,
    borderWidth: 1,
    borderColor: "#E3E6ED",
    overflow: "hidden",
    marginVertical: 10,
    width: 200,
  },
  toggleButton: {
    flex: 1,
    paddingVertical: 10,
    justifyContent: "center",
    alignItems: "center",
  },
  toggleText: {
    fontSize: 15,
    color: "#7A8AA0",
    fontWeight: "500",
  },
  activeToggle: {
    backgroundColor: "#333F4F",
    borderRadius: 25,
  },
  activeToggleText: {
    color: "#FFF",
    fontWeight: "600",
  },
  historyDesc: {
    marginTop: 5,
    paddingHorizontal: 20,
    fontSize: 15,
  },
  hisHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
  },
  subHeading: {
    paddingHorizontal: 15,
    marginTop: 10,
  },
  ContHeading: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 5,
  },
  inputHeading: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 15,
    elevation: 2,
  },
  inputCont: {
    marginHorizontal: 20,
    marginVertical: 10,
    paddingHorizontal: 15,
    paddingVertical: 12,
    borderRadius: 15,
    height: 150,
    shadowRadius: 4,
    elevation: 2,
    textAlignVertical: "top",
  },
  emotionTxt: {
    paddingVertical: 5,
    paddingHorizontal: 25,
  },
  emotionContainer: {
    marginHorizontal: 25,
    marginTop: 10,
    paddingVertical: 10,
    paddingHorizontal: 10,
    flexDirection: "row",
    borderRadius: 15,
    alignItems: "center",
    justifyContent: "space-evenly",
  },
  imgCont: {
    width: 35,
    height: 35,
  },
  conBtn: {
    marginTop: 30,
  },
  btn: {
    paddingHorizontal: 15,
    paddingVertical: 15,
    marginHorizontal: 20,
    marginVertical: 10,
    borderRadius: 15,
  },
});

export default Journal;
