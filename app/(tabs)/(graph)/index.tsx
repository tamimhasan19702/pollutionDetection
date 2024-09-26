/** @format */

import React, { useContext, useState, useEffect } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { BarChart } from "react-native-chart-kit";
import { LiveDataContext } from "@/context/LiveData.context";

const screenWidth = Dimensions.get("window").width;

const chartConfig = {
  backgroundColor: "#00fc93",
  backgroundGradientFrom: "#000000",
  backgroundGradientTo: "#101011",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White font color
  style: {
    borderRadius: 16,
  },
  propsForLabels: {
    fontSize: 12,
  },
};

export default function Tab() {
  const { liveData } = useContext(LiveDataContext);

  console.log(liveData);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#ffffff" }}>
      <Text style={{ color: "#000000", fontSize: 20, marginBottom: 16 }}>
        Air Quality Data
      </Text>

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {liveData.map((data, index) => (
          <View key={index} style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, color: "#000000" }}>
              Time: {data.time}
            </Text>

            <BarChart
              data={{
                labels: ["MQ135", "MQ7", "PM25"],
                datasets: [
                  {
                    data: [data.mq135, data.mq7, data.pm25],
                  },
                ],
              }}
              width={screenWidth - 20}
              height={220}
              chartConfig={chartConfig}
              showValuesOnTopOfBars={true}
            />
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
