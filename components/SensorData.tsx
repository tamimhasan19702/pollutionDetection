/** @format */

import { Colors } from "@/constants/Colors";
import React from "react";
import { View, Text, type ViewProps } from "react-native";

type ReferenceDataType = {
  Safety: {
    color: string;
    text: string;
    value: number;
  };
  Moderate: {
    color: string;
    text: string;
    value: number;
  };
  Unhealthy: {
    color: string;
    text: string;
    value: number;
  };
};

type Props = {
  header: string;
  realTimeData: number;
  ReferenceData: ReferenceDataType;
};

export default function SensorData({
  header,
  realTimeData,
  ReferenceData,
}: Props) {
  let displayText: string = "Unhealthy";
  let displayColor: string = Colors.light.unhealthy;

  if (realTimeData <= ReferenceData.Safety.value) {
    displayText = ReferenceData.Safety.text;
    displayColor = ReferenceData.Safety.color;
  } else if (realTimeData <= ReferenceData.Moderate.value) {
    displayText = ReferenceData.Moderate.text;
    displayColor = ReferenceData.Moderate.color;
  } else {
    displayText = ReferenceData.Unhealthy.text;
    displayColor = ReferenceData.Unhealthy.color;
  }

  return (
    <View
      style={{
        display: "flex",
        flexDirection: "column",
        marginBottom: 20,
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
      {/* Reference data */}
      <View
        style={{
          width: "80%",
          backgroundColor: Colors.light.white,
          alignItems: "center",
          padding: 15,
          borderRadius: 5,
          flexDirection: "column",
          elevation: 5,
        }}>
        <Text>Reference Data</Text>
        <View
          style={{
            marginTop: 10,
            flexDirection: "row",
            width: "100%",
            justifyContent: "space-around",
          }}>
          <Text style={{ color: Colors.light.text }}>
            Safe : {ReferenceData.Safety.value}
          </Text>
          <Text style={{ color: Colors.light.text }}>
            Moderate : {ReferenceData.Moderate.value}
          </Text>
          <Text style={{ color: Colors.light.text }}>
            Unhealthy : {ReferenceData.Unhealthy.value}
          </Text>
        </View>
      </View>

      {/* comparison data */}
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
            backgroundColor: displayColor,
            borderRadius: 5,
          }}>
          <Text style={{ color: Colors.light.text }}>{displayText}</Text>
        </View>
      </View>
    </View>
  );
}
