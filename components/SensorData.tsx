/** @format */

import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text } from "react-native";

type Props = {
  header: string;
  realTimeData: number;
  ReferenceData: number;
};

export default function SensorData({
  header,
  realTimeData,
  ReferenceData,
}: Props) {
  const Level = {
    Safety: {
      value: 10,
      color: Colors.light.safe,
      text: "safe",
    },
    Moderate: {
      value: 20,
      color: Colors.light.moderate,
      text: "moderate",
    },
    Unhealty: {
      value: 30,
      color: Colors.light.unhealthy,
      text: "unhealthy",
    },
  };
  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",

        alignItems: "center",
        width: "100%",
      }}>
      {/* Header */}
      <View
        style={{
          width: "80%",
          backgroundColor: Colors.light.lightBlue,
          alignItems: "center",
          padding: 15,
          borderRadius: 5,
        }}>
        <Text style={{ color: Colors.light.text }}>{header}</Text>
      </View>
      {/* Data */}
      <View
        style={{
          flexDirection: "row",

          width: "80%",
          alignItems: "center",
          justifyContent: "space-around",
        }}>
        <View
          style={{
            alignItems: "center",
            width: "50%",
            padding: 15,
            backgroundColor: Colors.light.darkBlue,
            borderRadius: 5,
          }}>
          <Text style={{ color: Colors.light.white }}>
            Realtime: {realTimeData}
          </Text>
        </View>
        <View
          style={{
            alignItems: "center",
            width: "50%",
            padding: 15,
            backgroundColor: Colors.light.darkGreen,
            borderRadius: 5,
          }}>
          <Text style={{ color: Colors.light.white }}>
            Safe = {Level.Safety.value}
          </Text>
        </View>
      </View>
      {/* result */}
      <View
        style={{
          width: "80%",
          backgroundColor: Colors.light.lightBlue,
          alignItems: "center",
          padding: 15,
          borderRadius: 5,
        }}>
        <Text style={{ color: Colors.light.text }}>{header}</Text>
      </View>
    </View>
  );
}
