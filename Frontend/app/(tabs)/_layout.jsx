import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";
import { useTranslation } from "react-i18next";
import "../lib/i18n"; 

const TabLayout = () => {
  const { t } = useTranslation(); 

  const TabLabel = ({ label, focused, color }) => (
    <View style={{ alignItems: "center" }}>
      <Text style={{ color }}>{label}</Text>
      {focused && (
        <View
          style={{
            height: 3,
            backgroundColor: "#A3D5D3",
            width: 20,
            marginTop: 4,
            borderRadius: 2,
          }}
        />
      )}
    </View>
  );

  return (
    <Tabs
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          backgroundColor: "#333F4F",
          height: 60,
          borderTopWidth: 0,
        },
        tabBarActiveTintColor: "#FFFFFF",
        tabBarInactiveTintColor: "#A3D5D3",
      }}
    >
      <Tabs.Screen
        name="index"
        options={{
          title: t("home"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <TabLabel label={t("home")} focused={focused} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Journal"
        options={{
          title: t("journal"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="reader" size={20} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <TabLabel label={t("journal")} focused={focused} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Activities"
        options={{
          title: t("activity"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="walk" size={20} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <TabLabel label={t("activity")} focused={focused} color={color} />
          ),
        }}
      />

      <Tabs.Screen
        name="Profile"
        options={{
          title: t("profile"),
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <TabLabel label={t("profile")} focused={focused} color={color} />
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
