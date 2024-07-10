/** @format */

import { StyleSheet, Text, View } from "react-native";
import React from "react";

type LiveListProps = {
  livedata: {
    latitude: number;
    longitude: number;
    pm25: number;
    co2: number;
    nh3: number;
    co: number;
  };
};

const LiveList = ({ livedata }: LiveListProps) => {
  return (
    <View>
      <Text>Live Location : </Text>
    </View>
  );
};

export default LiveList;
