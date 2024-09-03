/** @format */

import LiveLocation from "@/components/LiveLocation";
import { View, Text, ScrollView } from "react-native";
import { useContext } from "react";
import { LiveDataContext } from "@/context/LiveData.context";
import LiveList from "@/components/LiveList";

export default function Tab() {
  const { liveData, handleDelete } = useContext(LiveDataContext);

  const data = {
    PM2_5: 10,
    CO2: 20,
    NH3: 30,
    CO: 40,
  };

  return (
    <View
      // @ts-ignore
      style={{
        flex: 1,
        alignItems: "center",
        justifyContent: "start",
        marginTop: 20,
        width: "100%",
      }}>
      <LiveLocation latitude={37.555} longitude={33.222} data={data} />
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

        <ScrollView style={{ height: "60%" }}>
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
