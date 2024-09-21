/** @format */
import React, { useContext, useState, useEffect } from "react";
import {
  View,
  Text,
  ScrollView,
  TextInput,
  Button,
  Platform,
} from "react-native";
import DateTimePicker from "@react-native-community/datetimepicker";
import LiveLocation from "@/components/LiveLocation";
import LiveList from "@/components/LiveList";
import { ref, onValue, remove } from "firebase/database";
import { Database } from "@/firebase.config";
import { LiveDataContext } from "@/context/LiveData.context";

export default function Tab() {
  const { liveData, handleDelete } = useContext(LiveDataContext);
  const [realtimeData, setRealtimeData] = useState(null);
  const [cachedData, setCachedData] = useState(null);
  const [latitude, setLatitude] = useState("");
  const [longitude, setLongitude] = useState("");
  const [selectedDate, setSelectedDate] = useState(new Date());
  const [selectedTime, setSelectedTime] = useState(new Date());
  const [showDatePicker, setShowDatePicker] = useState(false);
  const [showTimePicker, setShowTimePicker] = useState(false);

  // Fetch live data from Firebase
  useEffect(() => {
    const dbRef = ref(Database, "liveData");
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      if (data) {
        // Add a check for valid data
        setRealtimeData(data);
        setCachedData(data);
      } else {
        setRealtimeData(null); // Handle case when data is null
      }
    });
  }, []);

  // Handle date change
  const onDateChange = (event, selectedDate) => {
    setShowDatePicker(Platform.OS === "ios");
    if (selectedDate) {
      setSelectedDate(selectedDate);
    }
  };

  // Handle time change
  const onTimeChange = (event, selectedTime) => {
    setShowTimePicker(Platform.OS === "ios");
    if (selectedTime) {
      setSelectedTime(selectedTime);
    }
  };

  return (
    <View
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "start",
        marginTop: 20,
        width: "100%",
      }}>
      {/* Input fields for Latitude and Longitude */}
      <View style={{ flexDirection: "row", marginBottom: 10, width: "80%" }}>
        <TextInput
          placeholder="Latitude"
          value={latitude}
          onChangeText={(text) => setLatitude(text)}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 10,
            width: "48%",
            marginRight: "4%",
          }}
        />
        <TextInput
          placeholder="Longitude"
          value={longitude}
          onChangeText={(text) => setLongitude(text)}
          keyboardType="numeric"
          style={{
            borderWidth: 1,
            borderColor: "gray",
            padding: 10,
            width: "48%",
          }}
        />
      </View>

      <View style={{ flexDirection: "row", gap: 20, marginVertical: 10 }}>
        <Button title="Select Date" onPress={() => setShowDatePicker(true)} />
        {showDatePicker && (
          <DateTimePicker
            value={selectedDate}
            mode="date"
            display="default"
            onChange={onDateChange}
          />
        )}
        <Button title="Select Time" onPress={() => setShowTimePicker(true)} />
        {showTimePicker && (
          <DateTimePicker
            value={selectedTime}
            mode="time"
            display="default"
            onChange={onTimeChange}
          />
        )}
      </View>
      {/* Date and Time Pickers */}

      {/* Pass Data as Props */}
      <LiveLocation
        latitude={parseFloat(latitude)}
        longitude={parseFloat(longitude)}
        data={realtimeData}
        selectedDate={selectedDate}
        selectedTime={selectedTime}
      />

      {/* List Saved Data */}
      <View style={{ marginTop: 10, width: "80%" }}>
        <Text
          style={{
            fontWeight: "bold",
            fontSize: 20,
            textAlign: "center",
            marginBottom: 10,
          }}>
          Previously Saved Value
        </Text>
        <ScrollView style={{ height: "40%" }}>
          {liveData.length > 0 ? (
            liveData.map((item, index) => (
              <LiveList
                key={index}
                livedata={{ ...item, index }}
                handleDelete={handleDelete}
              />
            ))
          ) : (
            <Text>No Data is saved</Text>
          )}
        </ScrollView>
      </View>
    </View>
  );
}
