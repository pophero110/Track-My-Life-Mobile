import { useEffect } from "react";
import { View, StyleSheet } from "react-native";
import { getTrackers } from "../api/trackers";
import Tracker from "./Tracker";

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
