/** @format */

import { Stack } from "expo-router";
import { useState } from "react";
import { View } from "react-native";
import LottieView from "lottie-react-native";
import { LiveDataProvider } from "@/context/LiveData.context";

export default function RootLayout() {
  const [showSplash, setShowSplash] = useState(true);
  return showSplash ? (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <LottieView
        source={require("@/assets/animation/leaves")}
        autoPlay
        loop={false}
        onAnimationFinish={() => setShowSplash(false)}
        style={{ width: 400, height: 400 }}
      />
    </View>
  ) : (
    <LiveDataProvider>
      <Stack>
        <Stack.Screen name="(tabs)" options={{ headerShown: false }} />
      </Stack>
    </LiveDataProvider>
  );
}
