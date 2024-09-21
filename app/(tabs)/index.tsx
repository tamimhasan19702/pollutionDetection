/** @format */

import { useEffect, useState } from "react";
import SensorData from "@/components/SensorData";
import { ScrollView, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ref, onValue } from "firebase/database";
import { Database } from "@/firebase.config";

export default function Tab() {
  const Level = {
    Safety: {
      value: 100,
      color: Colors.light.safe,
      text: "safe",
    },
    Moderate: {
      value: 1000,
      color: Colors.light.moderate,
      text: "moderate",
    },
    Unhealthy: {
      value: 3000,
      color: Colors.light.unhealthy,
      text: "unhealthy",
    },
  };

  const [realtimeData, setRealtimeData] = useState(null);
  const [cachedData, setCachedData] = useState(null);

  useEffect(() => {
    const dbRef = ref(Database, "liveData"); // assuming the liveData path is at the root of the database
    onValue(dbRef, (snapshot) => {
      const data = snapshot.val();
      setRealtimeData(data);
      setCachedData(data); // cache the data
    });
    return () => {
      // clean up the listener when the component unmounts
    };
  }, []);

  useEffect(() => {
    if (cachedData) {
      setRealtimeData(cachedData); // restore cached data when component re-mounts
      console.log(realtimeData);
    }
  }, [cachedData]);

  return (
    <View
      // @ts-ignore
      style={{
        flex: 1,
        marginTop: 20,
        justifyContent: "start",
        alignItems: "center",
      }}>
      <ScrollView style={{ width: "100%", flex: 1 }}>
        <SensorData
          header="MQ135"
          realTimeData={realtimeData?.MQ135}
          ReferenceData={Level}
        />
        <SensorData
          header="MQ7"
          realTimeData={realtimeData?.MQ7}
          ReferenceData={Level}
        />
        <SensorData
          header="PM25"
          realTimeData={realtimeData?.PM25}
          ReferenceData={Level}
        />
      </ScrollView>
    </View>
  );
}
