/** @format */

import { useEffect, useState } from "react";
import SensorData from "@/components/SensorData";
import { ScrollView, Text, View } from "react-native";
import { Colors } from "@/constants/Colors";
import { ref, onValue } from "firebase/database";
import { Database } from "@/firebase.config";

export default function Tab() {
  const Level = {
    MQ135: {
      Safety: {
        value: 600,
        color: Colors.light.safe,
        text: "good",
      },
      Moderate: {
        value: 1500,
        color: Colors.light.moderate,
        text: "mediocre",
      },
      Unhealthy: {
        value: 2100,
        color: Colors.light.unhealthy,
        text: "bad",
      },
    },
    MQ7: {
      Safety: {
        value: 150,
        color: Colors.light.safe,
        text: "good",
      },
      Moderate: {
        value: 450,
        color: Colors.light.moderate,
        text: "moderate",
      },
      Unhealthy: {
        value: Infinity, // or a very high value
        color: Colors.light.unhealthy,
        text: "bad",
      },
    },
    PM25: {
      Safety: {
        value: 50,
        color: Colors.light.safe,
        text: "good",
      },
      Moderate: {
        value: 100,
        color: Colors.light.moderate,
        text: "moderate",
      },
      Unhealthy: {
        value: 200,
        color: Colors.light.unhealthy,
        text: "unhealthy",
      },
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
          ReferenceData={Level.MQ135}
        />

        <SensorData
          header="MQ7"
          realTimeData={realtimeData?.MQ7}
          ReferenceData={Level.MQ7}
        />

        <SensorData
          header="PM25"
          realTimeData={realtimeData?.PM25}
          ReferenceData={Level.PM25}
        />
      </ScrollView>
    </View>
  );
}
