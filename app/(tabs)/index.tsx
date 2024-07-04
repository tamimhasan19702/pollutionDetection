/** @format */

import SensorData from "@/components/SensorData";
import { ScrollView, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";

export default function Tab() {
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
    Unhealthy: {
      value: 30,
      color: Colors.light.unhealthy,
      text: "unhealthy",
    },
  };
  return (
    <View
      // @ts-ignore
      style={{
        flex: 1,
        marginTop: 20,
        justifyContent: "start",
        alignItems: "center",
      }}>
      <ScrollView style={{ width: "100%", flex: 1 }}>
        <SensorData
          header="PM2.5 ug/m3"
          realTimeData={10}
          ReferenceData={Level}
        />
        <SensorData header="CO2 ppm" realTimeData={24} ReferenceData={Level} />
        <SensorData header="NH3 ppm" realTimeData={18} ReferenceData={Level} />
        <SensorData header="CO ppm" realTimeData={12} ReferenceData={Level} />
      </ScrollView>
    </View>
  );
}
