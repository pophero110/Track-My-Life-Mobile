import { useEffect, useState } from "react";
import { View, Text, StyleSheet, Button } from "react-native";
import { StyleConstants } from "../StyleConstants";
import { getTrackers } from "../api/trackers";
export default function TrackerList() {
  const [trackers, setTrackers] = useState([]);
  // get trackers from api
  // set trackers to state
  // render trackers
  useEffect(() => {
    const fetchTracker = async () => {
      const result = await getTrackers();
      console.log(result);
    };
    fetchTracker();
  }, []);
  return (
    <View>
      <Text>TrackerList</Text>
      <Button
        onPress={async () => {
          getTrackers().then((result) => {
            console.log(result);
          });
        }}
        title="view"
      ></Button>
    </View>
  );
}

const Tracker = ({ tracker }) => {
  return (
    <View style={styles.tracker}>
      <Text style={styles.trackerName}>{tracker.name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tracker: {
    backgroundColor: "white",
    padding: 8,
    width: "100%",
    borderRadius: StyleConstants.borderRadius,
    height: 42,
  },
  trackerName: {
    fontSize: 16,
  },
});
