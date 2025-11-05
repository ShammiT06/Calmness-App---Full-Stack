import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";
import { View, Text } from "react-native";

const TabLayout = () => {
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
          title: "Home",
          tabBarIcon: ({ color }) => (
            <Ionicons name="home" size={20} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <View style={{ alignItems: "center" }}>
              <Text style={{ color }}>{`Home`}</Text>
              {focused && (
                <View
                  style={{
                    height: 3,
                    backgroundColor: "#A3D5D3", // Bottom border color
                    width: 20,
                    marginTop: 4,
                    borderRadius: 2,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
      <Tabs.Screen
        name="Journal"
        options={{
          title: "Journal",
          tabBarIcon: ({ color }) => (
            <Ionicons name="reader" size={20} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <View style={{ alignItems: "center" }}>
              <Text style={{ color }}>Journal</Text>
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
          ),
        }}
      />
      <Tabs.Screen
        name="Activities"
        options={{
          title: "Activities",
          tabBarIcon: ({ color }) => (
            <Ionicons name="walk" size={20} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <View style={{ alignItems: "center" }}>
              <Text style={{ color }}>Activities</Text>
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
          ),
        }}
      />
      <Tabs.Screen
        name="Profile"
        options={{
          title: "Profile",
          tabBarIcon: ({ color }) => (
            <Ionicons name="person" size={20} color={color} />
          ),
          tabBarLabel: ({ focused, color }) => (
            <View style={{ alignItems: "center" }}>
              <Text style={{ color }}>Profile</Text>
              {focused && (
                <View
                  style={{
                    height: 3,
                    backgroundColor: "#A3D5D3",
                    width: 20,
                    marginTop: 4,
                    borderRadius:2,
                  }}
                />
              )}
            </View>
          ),
        }}
      />
    </Tabs>
  );
};

export default TabLayout;
