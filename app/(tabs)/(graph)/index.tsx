/** @format */

import React, { useContext, useState } from "react";
import {
  View,
  Text,
  Dimensions,
  Modal,
  TouchableOpacity,
  StyleSheet,
} from "react-native";
import { LineChart, BarChart } from "react-native-chart-kit";
import { LiveDataContext } from "@/context/LiveData.context";

const screenWidth = Dimensions.get("window").width;

// Helper function to format data for the chart
const formatLineChartData = (data) => {
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

const formatBarChartData = (data) => {
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
        color: (opacity = 1) => `rgba(255, 99, 132, ${opacity})`, // Red color for PM2.5
      },
      {
        data: nh3Data,
        color: (opacity = 1) => `rgba(54, 162, 235, ${opacity})`, // Blue color for NH3
      },
      {
        data: co2Data,
        color: (opacity = 1) => `rgba(75, 192, 192, ${opacity})`, // Green color for CO2
      },
      {
        data: coData,
        color: (opacity = 1) => `rgba(153, 102, 255, ${opacity})`, // Purple color for CO
      },
    ],
  };
};

const chartConfig = {
  backgroundColor: "#00fc93", // Green background
  backgroundGradientFrom: "#000000",
  backgroundGradientTo: "#101011",
  decimalPlaces: 2,
  color: (opacity = 1) => `rgba(255, 255, 255, ${opacity})`, // White font color
  style: {
    borderRadius: 16,
  },
};

export default function Tab() {
  const { liveData } = useContext(LiveDataContext);
  const [selectedData, setSelectedData] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const lineChartData = formatLineChartData(liveData);
  const barChartData = formatBarChartData(liveData);

  return (
    <View style={{ flex: 1, padding: 16, backgroundColor: "#ffffff" }}>
      <Text style={{ color: "#000000", fontSize: 20, marginBottom: 16 }}>
        Line Chart
      </Text>
      <LineChart
        data={lineChartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        bezier
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        onDataPointClick={(data) => {
          const { dataset, index } = data;
          const item = liveData[index];
          setSelectedData({
            time: item.time,
            pm25: item.pm25,
            nh3: item.nh3,
            co2: item.co2,
            co: item.co,
          });
          setModalVisible(true);
        }}
      />
      <Text
        style={{
          color: "#000000",
          fontSize: 20,
          marginBottom: 16,
          marginTop: 32,
        }}>
        Bar Chart
      </Text>
      <BarChart
        data={barChartData}
        width={screenWidth - 32}
        height={220}
        chartConfig={chartConfig}
        style={{
          marginVertical: 8,
          borderRadius: 16,
        }}
        onDataPointClick={(data) => {
          const { dataset, index } = data;
          const item = liveData[index];
          setSelectedData({
            time: item.time,
            pm25: item.pm25,
            nh3: item.nh3,
            co2: item.co2,
            co: item.co,
          });
          setModalVisible(true);
        }}
      />
      <Modal
        visible={modalVisible}
        transparent={true}
        animationType="slide"
        onRequestClose={() => setModalVisible(false)}>
        <View style={styles.modalView}>
          <Text style={styles.modalText}>Data Details</Text>
          {selectedData && (
            <View>
              <Text style={styles.modalText}>Time: {selectedData.time}</Text>
              <Text style={styles.modalText}>PM2.5: {selectedData.pm25}</Text>
              <Text style={styles.modalText}>NH3: {selectedData.nh3}</Text>
              <Text style={styles.modalText}>CO2: {selectedData.co2}</Text>
              <Text style={styles.modalText}>CO: {selectedData.co}</Text>
            </View>
          )}
          <TouchableOpacity
            style={styles.closeButton}
            onPress={() => setModalVisible(false)}>
            <Text style={styles.closeButtonText}>Close</Text>
          </TouchableOpacity>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  modalView: {
    margin: 20,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 35,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 4,
    elevation: 5,
  },
  modalText: {
    marginBottom: 15,
    textAlign: "center",
    color: "#000000",
  },
  closeButton: {
    backgroundColor: "#2196F3",
    borderRadius: 10,
    padding: 10,
    elevation: 2,
  },
  closeButtonText: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
});
