/** @format */

import { Text, View, TouchableOpacity } from "react-native";
import React from "react";
// @ts-ignore
import Icon from "react-native-vector-icons/FontAwesome"; // Import FontAwesome icon set
import { Colors } from "@/constants/Colors";

type LiveListProps = {
  livedata: {
    index: number; // Add index to the props
    latitude: number;
    longitude: number;
    pm25: number;
    co2: number;
    nh3: number;
    co: number;
    time: string;
  };
  handleDelete: (index: number) => void; // Ensure handleDelete is in props
};

const LiveList = ({ livedata, handleDelete }: LiveListProps) => {
  const { index, latitude, longitude, pm25, co2, nh3, co, time } = livedata;

  return (
    <View
      style={{
        width: "100%",
        alignItems: "center",
        paddingVertical: 20,
        paddingHorizontal: 10,
        backgroundColor: Colors.light.darkBlue,
        marginTop: 20,
        borderRadius: 10,
        elevation: 10,
      }}>
      <View
        style={{
          display: "flex",
          flexDirection: "column",
          gap: 10,
          alignItems: "center",
        }}>
        <Text style={{ color: "white", fontSize: 16 }}>
          Latitude: {latitude}, Longitude: {longitude}
        </Text>
        <Text style={{ color: "white", fontSize: 16 }}>
          Time: {time.toString()}
        </Text>
      </View>
      <View
        style={{
          marginTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: 20,
        }}>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 40,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
            PM2.5 ug/m3: {pm25}
          </Text>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
            CO2 : {co2}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 40,
            alignItems: "center",
            justifyContent: "center",
          }}>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
            NH3 : {nh3}
          </Text>
          <Text style={{ fontWeight: "bold", color: "white", fontSize: 16 }}>
            CO : {co}
          </Text>
        </View>
      </View>
      <TouchableOpacity
        onPress={() => handleDelete(index)} // Call handleDelete with the current index
        style={{
          position: "absolute",
          top: 10,
          right: 10,
        }}>
        <Icon name="trash" size={20} color="white" />
      </TouchableOpacity>
    </View>
  );
};

export default LiveList;
