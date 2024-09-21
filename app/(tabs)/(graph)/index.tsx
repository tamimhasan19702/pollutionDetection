/** @format */
import React, { useContext, useState } from "react";
import { View, Text, Dimensions, ScrollView } from "react-native";
import { LineChart } from "react-native-chart-kit";
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
  const [selectedData, setSelectedData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  console.log(liveData);

  const data = {
    labels: [
      "2022-01-01",
      "2022-01-02",
      "2022-01-03",
      "2022-01-04",
      "2022-01-05",
    ],
    datasets: [
      {
        data: [10, 20, 30, 40, 50],
      },
    ],
  };

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#ffffff" }}>
      <Text style={{ color: "#000000", fontSize: 20, marginBottom: 16 }}>
        CO Value Over Time
      </Text>

      <LineChart
        data={data}
        width={screenWidth}
        height={220}
        chartConfig={chartConfig}
        bezier
      />

      <ScrollView style={{ flex: 1, padding: 16 }}>
        {data.labels.map((label, index) => (
          <View key={index} style={{ marginBottom: 16 }}>
            <Text style={{ fontSize: 16, color: "#000000" }}>
              {label} - CO: {data.datasets[0].data[index]}
            </Text>
          </View>
        ))}
      </ScrollView>
    </View>
  );
}
