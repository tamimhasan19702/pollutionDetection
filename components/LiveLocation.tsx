/** @format */

import { Colors } from "@/constants/Colors";
import React, { useContext } from "react";
import { Text, View, TouchableOpacity } from "react-native";
import { LiveDataContext } from "@/context/LiveData.context";

type props = {
  latitude: number;
  longitude: number;
  data: {
    PM2_5: number;
    CO2: number;
    NH3: number;
    CO: number;
  };
};

function LiveLocation({ latitude, longitude, data }: props) {
  const { PM2_5, CO2, NH3, CO } = data;
  const { liveData } = useContext(LiveDataContext);
  return (
    <>
      <View
        style={{
          width: "80%",
          alignItems: "center",
          elevation: 5,
          backgroundColor: Colors.light.darkGreen,
          paddingHorizontal: 30,
          paddingVertical: 30,
          borderRadius: 8,
        }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 18,
            color: Colors.light.white,
          }}>
          Live Location & data
        </Text>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            paddingVertical: 10,
            gap: 20,
          }}>
          <Text style={{ color: Colors.light.white }}>
            Latitude : {latitude}
          </Text>
          <Text style={{ color: Colors.light.white }}>
            Longitude : {longitude}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 20,
            justifyContent: "space-between",
          }}>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}>
            <Text style={{ color: Colors.light.white }}>PM2.5 ug/m3</Text>
            <Text style={{ color: Colors.light.white }}>{PM2_5}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}>
            <Text style={{ color: Colors.light.white }}>CO2</Text>
            <Text style={{ color: Colors.light.white }}>{CO2}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}>
            <Text style={{ color: Colors.light.white }}>NH3</Text>
            <Text style={{ color: Colors.light.white }}>{NH3}</Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}>
            <Text style={{ color: Colors.light.white }}>CO</Text>
            <Text style={{ color: Colors.light.white }}>{CO}</Text>
          </View>
        </View>
      </View>
      <View>
        <TouchableOpacity
          style={{
            marginTop: 10,
            width: "100%",
            alignItems: "center",
            backgroundColor: Colors.light.lightBlue,
            paddingVertical: 15,
            paddingHorizontal: 30,
            borderRadius: 8,
            elevation: 5,
          }}
          onPress={() => {}}>
          <Text style={{ color: Colors.light.black }}>Save the Live data</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default LiveLocation;
