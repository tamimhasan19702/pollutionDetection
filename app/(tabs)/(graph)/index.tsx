/** @format */

import React, { useContext } from "react";
import { View, Text, Dimensions } from "react-native";
import { LineChart } from "react-native-chart-kit";
import { LiveDataContext } from "@/context/LiveData.context";

const screenWidth = Dimensions.get("window").width;

// Helper function to format data for the chart
const formatData = (data) => {
  const labels = data.map((item) => item.time);
  const pm25Data = data.map((item) => item.pm25);
  const nh3Data = data.map((item) => item.nh3);
  const co2Data = data.map((item) => item.co2);
  const coData = data.map((item) => item.co);

  return {
    labels,
    datasets: [
      {
        data: pm25Data,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: nh3Data,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: co2Data,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
      },
      {
        data: coData,
        color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`,
        strokeWidth: 2,
      },
    ],
  };
};

export default function Tab() {
  const { liveData } = useContext(LiveDataContext);

  const chartData = formatData(liveData);

  const chartConfig = {
    backgroundColor: "#fafafa", // Green background
    backgroundGradientFrom: "#101310",
    backgroundGradientTo: "#101110",
    decimalPlaces: 2,
    color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White font color
    style: {
      borderRadius: 16,
    },
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#ffffff" }}>
      <LineChart
        data={chartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
      />
    </View>
  );
}
