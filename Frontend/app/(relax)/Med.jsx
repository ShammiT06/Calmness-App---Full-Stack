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
import { useTranslation } from "react-i18next";
import Svg, { Path, Defs, LinearGradient, Stop } from "react-native-svg";

const { width, height } = Dimensions.get("window");

// ✅ Animated sine wave component
const AnimatedSineWave = ({ animatedValue }) => {
  const AnimatedPath = Animated.createAnimatedComponent(Path);

  // Smooth continuous left scroll
  const translateX = animatedValue.interpolate({
    inputRange: [0, 1],
    outputRange: [0, -width], // shifts the wave smoothly to the left
  });

  // Create a smooth sine wave
  const createSinePath = () => {
    const amplitude = 25; // wave height
    const wavelength = 80; // distance between peaks
    const midY = 60; // middle line height

    let path = `M 0 ${midY}`;
    for (let x = 0; x <= width * 2; x++) {
      const y = midY + amplitude * Math.sin((2 * Math.PI * x) / wavelength);
      path += ` L ${x} ${y}`;
    }
    return path;
  };

  const path = createSinePath();

  return (
    <View
      style={{
        overflow: "hidden",
      }}
    >
      <Animated.View style={{ transform: [{ translateX }] }}>
        <Svg height="120" width={width * 2} viewBox={`0 0 ${width * 2} 120`}>
          <Defs>
            <LinearGradient id="grad" x1="0" y1="0" x2="1" y2="0">
              <Stop offset="0" stopColor="#6D8DFF" stopOpacity="0.9" />
              <Stop offset="1" stopColor="#C3A6FF" stopOpacity="0.6" />
            </LinearGradient>
          </Defs>
          <AnimatedPath
            d={path}
            stroke="url(#grad)"
            strokeWidth={4}
            fill="none"
          />
        </Svg>
      </Animated.View>
    </View>
  );
};

export default function Meditation() {
  const router = useRouter();
  const { t } = useTranslation();

  const [seconds, setSeconds] = useState(0);
  const [isRunning, setIsRunning] = useState(false);
  const [duration, setDuration] = useState(5 * 60);
  const intervalRef = useRef(null);

  const animatedValue = useRef(new Animated.Value(0)).current;

  useEffect(() => {
    if (isRunning) {
      // timer
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

      // wave animation
      startSineAnimation();
    } else {
      clearInterval(intervalRef.current);
      animatedValue.stopAnimation();
    }

    return () => clearInterval(intervalRef.current);
  }, [isRunning]);

  const startSineAnimation = () => {
    Animated.loop(
      Animated.timing(animatedValue, {
        toValue: 1,
        duration: 2500, // wave speed
        easing: Easing.linear,
        useNativeDriver: true,
      })
    ).start(() => animatedValue.setValue(0));
  };

  const formatTime = (sec) => {
    const minutes = Math.floor(sec / 60).toString().padStart(2, "0");
    const seconds = (sec % 60).toString().padStart(2, "0");
    return `${minutes}:${seconds}`;
  };

  const handleStartPause = () => setIsRunning(!isRunning);
  const handleReset = () => {
    setIsRunning(false);
    setSeconds(0);
  };
  const handleSetDuration = (mins) => {
    setDuration(mins * 60);
    setSeconds(0);
    setIsRunning(false);
  };

  return (
    <SafeAreaView style={styles.container}>
      <Image
        source={require("../../assets/Dashboard/Medi.png")}
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
        <Text style={styles.title}>{t("Meditation Sessions")}</Text>
        <Text style={styles.timer}>{formatTime(seconds)}</Text>

        <TouchableOpacity style={styles.reset} onPress={handleReset}>
          <Text style={styles.resetText}>{t("reset")}</Text>
        </TouchableOpacity>
      </View>

      <View style={styles.bottomContainer}>
        <View style={styles.graphBox}>
          {/* ✅ Animated sine / heart-rate style wave */}
          <AnimatedSineWave animatedValue={animatedValue} />
        </View>

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
                {t("minutes", { count: min })}
              </Text>
            </TouchableOpacity>
          ))}
        </View>

        <TouchableOpacity style={styles.startBtn} onPress={handleStartPause}>
          <Text style={styles.startText}>
            {isRunning ? t("pause") : t("start")}
          </Text>
        </TouchableOpacity>
      </View>
    </SafeAreaView>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, backgroundColor: "#000" },
  backgroundImage: { ...StyleSheet.absoluteFillObject },
  content: {
    flex: 1,
    paddingHorizontal: width * 0.07,
    paddingVertical: height * 0.04,
  },
  title: {
    color: "#fff",
    fontSize: width * 0.07,
    marginTop: height * 0.02,
    textAlign: "center",
    fontWeight: "600",
  },
  timer: {
    color: "#fff",
    textAlign: "center",
    marginTop: height * 0.05,
    fontSize: width * 0.16,
    fontWeight: "700",
  },
  reset: {
    backgroundColor: "#E7F0FA",
    paddingHorizontal: width * 0.05,
    paddingVertical: height * 0.012,
    borderRadius: 8,
    marginTop: height * 0.03,
    alignSelf: "center",
  },
  resetText: {
    fontWeight: "600",
    color: "#333F4F",
    fontSize: width * 0.04,
  },
  bottomContainer: {
    flex: 1,
    backgroundColor: "#fff",
    borderTopLeftRadius: 40,
    borderTopRightRadius: 40,
    alignItems: "center",
    paddingTop: height * 0.03,
  },
  graphBox: {
    width: width * 0.8,
    height: height * 0.22,
    borderRadius: 30,
    backgroundColor: "#E9EEF5",
    justifyContent: "center",
    alignItems: "center",
    overflow: "hidden",
    elevation: 3,
  },
  durationContainer: {
    flexDirection: "row",
    gap: width * 0.03,
    marginTop: height * 0.05,
  },
  durationBtn: {
    backgroundColor: "#F6F6F6",
    borderRadius: 20,
    paddingHorizontal: width * 0.04,
    paddingVertical: height * 0.01,
  },
  durationSelected: {
    backgroundColor: "#E7F0FA",
  },
  durationText: {
    fontSize: width * 0.04,
    color: "#777",
  },
  startBtn: {
    backgroundColor: "#333F4F",
    width: width * 0.8,
    height: height * 0.065,
    borderRadius: 20,
    justifyContent: "center",
    alignItems: "center",
    marginTop: height * 0.05,
  },
  startText: {
    color: "#fff",
    fontSize: width * 0.05,
    fontWeight: "700",
  },
});
