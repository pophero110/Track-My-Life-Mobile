import { useEffect, useState } from "react";
import { View, StyleSheet, Text } from "react-native";
import { getTrackers } from "../api/trackers";
import Tracker from "./Tracker";
import StyleConstants from "../StyleConstants";
export default function TrackerList({ setTrackers, trackers, navigation }) {
  useEffect(() => {
    const fetchTracker = async () => {
      const result = await getTrackers();
      if (!result.data.error) {
        setTrackers(result.data);
      }
    };
    fetchTracker();
  }, []);
  return (
    <View style={styles.trackerList}>
      <TrackerListHeader></TrackerListHeader>
      {trackers.map((tracker) => (
        <Tracker
          key={tracker._id.toString()}
          navigation={navigation}
          tracker={tracker}
        ></Tracker>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  trackerList: {},
});

const TrackerListHeader = () => {
  return (
    <View
      style={{
        flexDirection: "row",
        justifyContent: "space-between",
        padding: 12,
      }}
    >
      <View
        style={{
          width: "70%",
        }}
      >
        <Text
          style={{
            color: "grey",
          }}
        >
          Name
        </Text>
      </View>
      <View
        style={{
          width: "30%",
          flexDirection: "row",
          alignItems: "center",
          justifyContent: "space-around",
        }}
      >
        <Text
          style={{
            color: "grey",
            textAlign: "right",
          }}
        >
          Count
        </Text>
        <Text
          style={{
            color: "grey",
          }}
        >
          Total
        </Text>
      </View>
    </View>
  );
};
