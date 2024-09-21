/** @format */

import { Colors } from "@/constants/Colors";
import React, { useContext, useCallback, useState, useEffect } from "react";
import { Text, View, TouchableOpacity, Alert } from "react-native";
import { LiveDataContext } from "@/context/LiveData.context";
import { LiveDataType } from "@/context/LiveData.context";
import { Database } from "@/firebase.config";
import { ref, onValue, update, push } from "firebase/database";

interface DataProps {
  PM25: number;
  MQ7: number;
  MQ135: number;
}

interface LiveLocationProps {
  latitude: number;
  longitude: number;
  data: DataProps;
  selectedDate: Date;
  selectedTime: Date;
}

function LiveLocation({
  latitude,
  longitude,
  data,
  selectedDate,
  selectedTime,
}: LiveLocationProps) {
  if (!data) {
    return (
      <View>
        <Text>No data available</Text>
      </View>
    ); // or some other fallback UI
  }
  const { PM25, MQ7, MQ135 } = data;
  const { liveData, setLiveData } = useContext(LiveDataContext) as {
    liveData: LiveDataType[];
    setLiveData: React.Dispatch<React.SetStateAction<LiveDataType[]>>;
  };

  const handleSave = useCallback(() => {
    if (isNaN(latitude) || isNaN(longitude)) {
      Alert.alert("Please enter valid latitude and longitude values");
      return;
    }
    const dbRef = ref(Database, "locationData");
    const newLocationData = {
      latitude,
      longitude,
      pm25: PM25 !== undefined && !isNaN(PM25) ? PM25 : "N/A",
      mq7: MQ7 !== undefined && !isNaN(MQ7) ? MQ7 : "N/A",
      mq135: MQ135 !== undefined && !isNaN(MQ135) ? MQ135 : "N/A",
      time: `${selectedDate.toLocaleDateString()} ${selectedTime.toLocaleTimeString()}`,
    };
    push(dbRef, newLocationData);
  }, [latitude, longitude, PM25, MQ7, MQ135, selectedDate, selectedTime]);

  useEffect(() => {
    const dbRef = ref(Database, "locationData");
    onValue(dbRef, (snapshot) => {
      const locationData = snapshot.val();
      if (locationData) {
        const liveDataArray = Object.values(locationData);
        setLiveData(liveDataArray);
      } else {
        setLiveData([]);
      }
    });
  }, []);

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
            gap: 10,
          }}>
          <Text style={{ color: Colors.light.white }}>
            Latitude: {isNaN(latitude) ? "N/A" : latitude}
          </Text>
          <Text style={{ color: Colors.light.white }}>
            Longitude: {isNaN(longitude) ? "N/A" : longitude}
          </Text>
        </View>
        <View
          style={{
            display: "flex",
            flexDirection: "row",
            gap: 10,
            marginTop: 10,
          }}>
          <Text style={{ color: Colors.light.white }}>
            Date: {selectedDate.toLocaleDateString()}
          </Text>
          <Text style={{ color: Colors.light.white }}>
            Time: {selectedTime.toLocaleTimeString()}
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
            <Text style={{ color: Colors.light.white }}>
              {PM25 !== undefined && !isNaN(PM25) ? PM25 : "N/A"}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}>
            <Text style={{ color: Colors.light.white }}>CO2</Text>
            <Text style={{ color: Colors.light.white }}>
              {MQ7 !== undefined && !isNaN(MQ7) ? MQ7 : "N/A"}
            </Text>
          </View>
          <View
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 5,
              alignItems: "center",
            }}>
            <Text style={{ color: Colors.light.white }}>NH3</Text>
            <Text style={{ color: Colors.light.white }}>
              {MQ135 !== undefined && !isNaN(MQ135) ? MQ135 : "N/A"}
            </Text>
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
          onPress={handleSave}>
          <Text style={{ color: Colors.light.black }}>Save the Live data</Text>
        </TouchableOpacity>
      </View>
    </>
  );
}

export default LiveLocation;
