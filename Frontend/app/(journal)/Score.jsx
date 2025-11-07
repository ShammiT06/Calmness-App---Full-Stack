import { Ionicons } from "@expo/vector-icons";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { useRouter } from "expo-router";
import { useEffect, useState } from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";
import Svg, { Path } from "react-native-svg";

function Score() {
    const [score, setScore] = useState(0)
    const [emotion, setEmotion] = useState()
    const router = useRouter()


    useEffect(() => {
        const fetchData = async () => {
            try {
                const userValue = await AsyncStorage.getItem("userId");

                const res = await axios.get(`https://calmness-app-full-stack.onrender.com/api/getJournal/${userValue}`);
                console.log("Journal data:", res.data);
                setScore(res.data[0].score)
                setEmotion(res.data[0].emotions)
            } catch (error) {
                console.error("Something went wrong:", error);
            }
        };

        fetchData();
    }, []);



    return (
        <View style={styles.container}>
            <View style={styles.header}>
                <Text style={styles.headerTxt}>You’re all Set Up.</Text>
                <Text style={styles.subHeader}>
                    Your current Health Score {"\n"} is:
                </Text>
            </View>

            <View style={styles.score}>
                <View style={styles.outerCircle}>
                    <View style={styles.innerCircle}>
                        <View style={styles.lastCircle}>
                            <View style={styles.final}>
                                <Svg height="230" width="230" style={styles.svgBackground}>
                                    <Path
                                        d="M10 60 Q40 30 90 50 T220 70"
                                        stroke="#D6DAE3"
                                        strokeWidth="1.2"
                                        fill="none"
                                    />
                                    <Path
                                        d="M0 90 Q30 70 100 85 T230 100"
                                        stroke="#D6DAE3"
                                        strokeWidth="1"
                                        fill="none"
                                    />
                                    <Path
                                        d="M10 120 Q70 110 130 130 T230 130"
                                        stroke="#D6DAE3"
                                        strokeWidth="1"
                                        fill="none"
                                    />
                                    <Path
                                        d="M0 160 Q50 150 120 170 T240 180"
                                        stroke="#D6DAE3"
                                        strokeWidth="1"
                                        fill="none"
                                    />
                                    <Path
                                        d="M20 190 Q80 200 150 210 T230 220"
                                        stroke="#D6DAE3"
                                        strokeWidth="1"
                                        fill="none"
                                    />

                                </Svg>
                                <Text style={styles.scoreText}>{score}</Text>
                            </View>
                        </View>
                    </View>
                </View>
            </View>
            <View>
                <Text style={styles.screenTxt}>You're mentally stable. We're redirecting you back to the home screen.
                    Are you ready?</Text>
            </View>
            <View style={styles.mood}>
                <Text style={styles.moodHeading}>MOOD :</Text>
                <Text style={styles.moodSubTxt}>{emotion}</Text>
            </View>
            <View>
                <TouchableOpacity style={styles.startBtn} onPress={() => {
                    router.push("/(tabs)")
                }}>
                    <Text style={styles.btn}>Start</Text>
                </TouchableOpacity>
            </View>

        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "#E7F0FA",
        alignItems: "center",
    },
    header: {
        marginTop: 60,
    },
    headerTxt: {
        fontSize: 35,
        fontWeight: "600",
    },
    subHeader: {
        fontSize: 18,
        textAlign: "center",
        marginTop: 10,
        lineHeight: 25,
        color: "#333F4F",
    },
    score: {
        marginTop: 50,
    },
    outerCircle: {
        width: 300,
        height: 300,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#D1DBEB",
        borderRadius: 150,
    },
    innerCircle: {
        width: 270,
        height: 270,
        borderRadius: 135,
        backgroundColor: "#B4C2D2",
        alignItems: "center",
        justifyContent: "center",
    },
    lastCircle: {
        width: 250,
        height: 250,
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 125,
        backgroundColor: "#87A6B4",
    },
    final: {
        width: 220,
        height: 220,
        borderRadius: 110,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#fff",
        overflow: "hidden",
    },
    svgBackground: {
        position: "absolute",
        top: 0,
        left: 0,
    },
    scoreText: {
        fontSize: 70,
        fontWeight: "bold",
        color: "#1E2432",
    },
    screenTxt: {
        textAlign: "center",
        paddingHorizontal: 10,
        marginTop: 18,
        fontSize: 16,
        fontFamily: "One",
        color: "#333f4f"
    },
    mood: {
        marginTop: 15,
        flexDirection: "row",
        alignItems: "center",
        justifyContent: "center",
        gap: 10
    },
    moodHeading: {
        fontSize: 20,
        fontWeight: "bold"
    },
    moodSubTxt: {
        fontSize: 20,
        fontWeight: "bold"

    },
    startBtn: {
        marginTop: 40,
        backgroundColor: "#A3D5E3",
        paddingHorizontal: 20,
        paddingVertical: 20,
        width: 180,
        borderRadius: 20,
    },
    btn: {
        fontSize: 25,
        fontFamily: "One",
        textAlign: "center"
    }
});

export default Score;
