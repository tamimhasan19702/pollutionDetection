/** @format */

import { Colors } from "@/constants/Colors";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { Tabs } from "expo-router";

export default function TabLayout() {
  return (
    <Tabs
      screenOptions={{
        headerShown: true,
        headerStyle: {
          backgroundColor: Colors.light.darkGreen,
        },
        headerTintColor: Colors.light.background,
        headerTitleStyle: {
          fontWeight: "bold",
        },

        tabBarActiveTintColor: Colors.light.darkGreen,
        tabBarInactiveTintColor: Colors.light.text,
        tabBarStyle: {
          backgroundColor: Colors.light.background,
          paddingTop: 5,
          paddingBottom: 5,
        },
      }}>
      <Tabs.Screen
        name="index"
        options={{
          title: "Data Visualization",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="home" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(location)/index"
        options={{
          title: "Selected Location",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="map" color={color} />
          ),
        }}
      />
      <Tabs.Screen
        name="(graph)/index"
        options={{
          title: "Analytics",
          tabBarIcon: ({ color }) => (
            <FontAwesome size={28} name="bar-chart" color={color} />
          ),
        }}
      />
    </Tabs>
  );
}
