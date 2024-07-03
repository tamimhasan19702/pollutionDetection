/** @format */

import SensorData from "@/components/SensorData";
import { Text, View } from "react-native";

export default function Tab() {
  return (
    <View
      // @ts-ignore
      style={{
        flex: 1,
        marginTop: 20,
        justifyContent: "start",
        alignItems: "center",
      }}>
      <SensorData header="PM2.5 ug" realTimeData={10} ReferenceData={20} />
    </View>
  );
}
