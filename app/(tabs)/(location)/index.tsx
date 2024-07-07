/** @format */

import LiveLocation from "@/components/LiveLocation";
import { View, Text, ScrollView } from "react-native";
import { useState } from "react";

export default function Tab() {
  const [LiveDataList, setLiveDataList] = useState([]);

  const data = {
    PM2_5: 10,
    CO2: 20,
    NH3: 30,
    CO: 40,
  };
  return (
    <View
      // @ts-ignore
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "start",
        marginTop: 20,
      }}>
      <LiveLocation latitude={37.555} longitude={33.222} data={data} />
      <View style={{ marginTop: 20 }}>
        <Text style={{ fontWeight: "bold", fontSize: 20 }}>
          Previously Saved Value
        </Text>
        <ScrollView></ScrollView>
      </View>
    </View>
  );
}
