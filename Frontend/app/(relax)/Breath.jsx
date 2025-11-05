import { Ionicons } from "@expo/vector-icons";
import { Image } from "expo-image";
import { useRouter } from "expo-router";
import React, { useState, useEffect, useRef } from "react";
import {
  StyleSheet,
  View,
  Text,
  TouchableOpacity,
  Animated,
  Easing,
  Dimensions,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const { width: SCREEN_WIDTH } = Dimensions.get("window");

export default function Breathing() {
  const router = useRouter();
  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(5 * 60); 
  const [phase, setPhase] = useState("Inhale");
  const intervalRef = useRef(null);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRunning) {
      intervalRef.current = setInterval(() => {
        setSeconds((prev) => {
          if (prev >= duration) {
            clearInterval(intervalRef.current);
            setIsRunning(false);
            return duration;
          }
          return prev + 1;
        });
      }, 1000);

      startBreathingAnimation();
    } else {
      clearInterval(intervalRef.current);
      animatedValue.stopAnimation();
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startBreathingAnimation = () => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(animatedValue, {
          toValue: 1,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 4000,
          easing: Easing.inOut(Easing.ease),
          useNativeDriver: true,
        }),
      ])
    ).start();

    let inhale = true;
    const phaseInterval = setInterval(() => {
      if (!isRunning) {
        clearInterval(phaseInterval);
        return;
      }
      inhale = !inhale;
      setPhase(inhale ? "Inhale" : "Exhale");
    }, 4000);
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60).toString().padStart(2, "0");
    const seconds = (sec % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleStartPause = () => {
    setIsRunning(!isRunning);
  };

  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
    setPhase("Inhale");
  };

  const handleSetDuration = (mins) => {
    setDuration(mins * 60);
    setSeconds(0);
    setIsRunning(false);
  };

  // breathing wave movement
  const translateY = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [20, -20],
  });

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/Dashboard/Guided.png")}
        style={styles.backgroundImage}
        contentFit="cover"
      />
      <View style={styles.content}>
        <Ionicons
          name="arrow-back-circle-sharp"
          size={35}
          color="#fff"
          onPress={() => router.back()}
        />
        <Text style={styles.title}>Guided Breathing</Text>
        <Text style={styles.timer}>{formatTime(seconds)}</Text>

        <TouchableOpacity style={styles.reset} onPress={handleReset}>
          <Text style={{ fontWeight: "500" }}>RESET</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <Animated.View style={[styles.graphBox, { transform: [{ translateY }] }]}>
          <Text style={styles.phaseText}>{phase}</Text>
        </Animated.View>
        <View style={styles.durationContainer}>
          {[5, 10, 15].map((min) => (
            <TouchableOpacity
              key={min}
              onPress={() => handleSetDuration(min)}
              style={[
                styles.durationBtn,
                duration === min * 60 && styles.durationSelected,
              ]}
            >
              <Text
                style={[
                  styles.durationText,
                  duration === min * 60 && { color: "#333F4F" },
                ]}
              >
                {min} min
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.startBtn} onPress={handleStartPause}>
          <Text style={styles.startText}>
            {isRunning ? "PAUSE" : "START"}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1 },
  backgroundImage: { ...StyleSheet.absoluteFillObject },
  content: { flex: 1, paddingHorizontal: 30, paddingVertical: 40 },
  title: {
    color: "#fff",
    fontSize: 28,
    marginTop: 20,
    textAlign: "center",
    fontWeight: "600",
  },
  timer: {
    color: "#fff",
    textAlign: "center",
    marginTop: 40,
    fontSize: 60,
    fontWeight: "700",
  },
  reset: {
    backgroundColor: "#E7F0FA",
    paddingHorizontal: 20,
    paddingVertical: 10,
    borderRadius: 8,
    marginTop: 30,
    alignSelf: "center",
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    paddingTop: 20,
  },
  graphBox: {
    width: 300,
    height: 170,
    borderRadius: 30,
    backgroundColor: "#E9EEF5",
    justifyContent: "center",
    alignItems: "center",
    elevation: 3,
  },
  phaseText: {
    fontSize: 26,
    fontWeight: "600",
    color: "#333F4F",
  },

  durationContainer: {
    flexDirection: "row",
    gap: 10,
    marginTop: 40,
  },
  durationBtn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingHorizontal: 15,
    paddingVertical: 8,
  },
  durationSelected: {
    backgroundColor: "#E7F0FA",
  },
  durationText: {
    fontSize: 15,
    color: "#777",
  },
  startBtn: {
    backgroundColor: "#333F4F",
    width: 300,
    height: 50,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 40,
  },
  startText: {
    color: "#fff",
    fontSize: 18,
    fontWeight: "600",
  },
});
