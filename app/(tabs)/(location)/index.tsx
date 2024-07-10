/** @format */

import LiveLocation from "@/components/LiveLocation";
import { View, Text, ScrollView } from "react-native";
import { useState } from "react";
import { useContext } from "react";
import { LiveDataContext } from "@/context/LiveData.context";
import { LiveDataType } from "@/context/LiveData.context";
import LiveList from "@/components/LiveList";

export default function Tab() {
  const { liveData } = useContext(LiveDataContext) as {
    liveData: LiveDataType[];
  };

  console.log(liveData);

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
        <ScrollView>
          {liveData.length > 0 ? (
            liveData.map((data, i) => <LiveList key={i} livedata={data} />)
          ) : (
            <Text>No Data is saved</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
