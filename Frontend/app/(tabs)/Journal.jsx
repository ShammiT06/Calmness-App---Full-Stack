import { ScrollView, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { useContext, useEffect, useState } from "react";
import { ThemeContext } from "../(lib)/ThemeContext";
import { TextInput } from "react-native"
import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";

function Journal() {
  const { theme, mode } = useContext(ThemeContext);
  const [activeTab, setActiveTab] = useState("New");


  useEffect(()=>{
    
  })

  return (
    <ScrollView
      style={[
        styles.container,
        { backgroundColor: theme.background },
      ]}
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
      <View
        style={[
          styles.switchWrapper,
          { backgroundColor: mode === "dark" ? "#2C3744" : theme.card },
        ]}
      >
        <TouchableOpacity
          style={[
            styles.btn,
            activeTab === "New" && {
              backgroundColor: mode === "dark" ? "#4B8DD9" : "#333F4F",
              elevation: 5,
            },
          ]}
          onPress={() => setActiveTab("New")}
        >
          <Text
            style={[
              styles.btnText,
              {
                color:
                  activeTab === "New"
                    ? "#FFF"
                    : mode === "dark"
                      ? "#9CA3AF"
                      : "#333F4F",
              },
            ]}
          >
            New
          </Text>
        </TouchableOpacity>
        <TouchableOpacity
          style={[
            styles.btn,
            activeTab === "History" && {
              backgroundColor: mode === "dark" ? "#4B8DD9" : "#333F4F",
              elevation: 5,
            },
          ]}
          onPress={() => setActiveTab("History")}
        >
          <Text
            style={[
              styles.btnText,
              {
                color:
                  activeTab === "History"
                    ? "#FFF"
                    : mode === "dark"
                      ? "#9CA3AF"
                      : "#333F4F",
              },
            ]}
          >
            History
          </Text>
        </TouchableOpacity>
      </View>
      <View>
        {
          activeTab === 'New' ? <View>
            <Text style={[styles.subHeading, { color: mode === "dark" ? theme.heading : "black" }]}>Save your moments of this day</Text>
            <View style={[styles.inputHeading, { backgroundColor: theme.card }]}>
              <TextInput placeholder="Journal Heading" style={{ color: mode === 'dark' ? theme.heading : "black" }} placeholderTextColor={mode === 'dark' ? theme.heading : theme.heading} />
              <Ionicons name="pencil" size={20} color={mode === 'dark' ? theme.heading : theme.heading} />
            </View>
            <Text style={[styles.ContHeading, { color: mode === "dark" ? theme.heading : "black" }]}>Write your thoughts here</Text>
            <View>
              <TextInput
                style={[
                  styles.inputCont,
                  { backgroundColor: theme.card, color: mode === "dark" ? theme.heading : "black" },
                ]}
                multiline={true}
                placeholder="Your Journal"
                placeholderTextColor={mode === "dark" ? theme.heading : theme.heading}
              />
            </View>
            <Text style={[styles.emotionTxt, { color: mode === "dark" ? theme.heading : "black" }]}>Choose Your Emotions</Text>
            <View style={[styles.emotionContainer, { backgroundColor: theme.card }]}>
              <View>
                <Image source={require("../../assets/Journal/Happy.png")} style={styles.imgCont} />
                <Text style={{ color: mode === "dark" ? theme.heading : "black", textAlign: "center" }}>Happy</Text>
              </View>
              <View>
                <Image source={require("../../assets/Journal/UnHappy.png")} style={styles.imgCont} />
                <Text style={{ color: mode === "dark" ? theme.heading : "black", textAlign: "center" }}>UnHappy</Text>
              </View>
              <View>
                <Image source={require("../../assets/Journal/Normal.png")} style={styles.imgCont} />
                <Text style={{ color: mode === "dark" ? theme.heading : "black", textAlign: "center" }}>Normal</Text>
              </View>
              <View>
                <Image source={require("../../assets/Journal/Sad.png")} style={styles.imgCont} />
                <Text style={{ color: mode === "dark" ? theme.heading : "black", textAlign: "center" }}>Sad</Text>
              </View>
              <View>
                <Image source={require("../../assets/Journal/Angry.png")} style={styles.imgCont} />
                <Text style={{ color: mode === "dark" ? theme.heading : "black", textAlign: "center" }}>Angry</Text>
              </View>
            </View>
            <View style={[styles.conBtn]}>
              <TouchableOpacity style={[ styles.btn,{ backgroundColor: theme.card }]}>
                <Text style={[{ textAlign: "center", color: mode === "dark" ? theme.heading : theme.primary }]}>Confrim</Text>
              </TouchableOpacity>
            </View>

          </View> :



            <Text style={{ color: mode === "dark" ? "#FFF" : "#333F4F" }}>Byeee</Text>
        }
      </View>
    </ScrollView>
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
  ContHeading: {
    marginTop: 20,
    paddingHorizontal: 15,
    paddingVertical: 5
  },
  headingTxt: {
    fontSize: 30,
    fontWeight: "bold",
  },
  switchWrapper: {
    flexDirection: "row",
    alignSelf: "center",
    padding: 5,
    borderRadius: 30,
    marginTop: 10,
    width: 240,
  },
  btn: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 25,
    alignItems: "center",
    justifyContent: "center",
  },
  btnText: {
    fontWeight: "600",
    fontSize: 16,
  },
  subHeading: {
    paddingHorizontal: 15,
    marginTop: 10,
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
    flexGrow: 1,
    alignItems: "center",
    justifyContent: "space-evenly"

  },
  imgCont: {
    width: 35,
    height: 35
  },
  conBtn: {
    marginTop:30,
  },
  btn:{
    paddingHorizontal:15,
    paddingVertical:15,
    marginHorizontal:20,
    marginVertical:10,
    borderRadius:15
  }
});

export default Journal;
