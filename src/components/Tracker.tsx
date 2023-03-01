import { View, Text, TouchableHighlight, StyleSheet } from "react-native";
import StyleConstants from "../StyleConstants";
export default function Tracker({ tracker, navigation }) {
  return (
    <TouchableHighlight
      underlayColor="white"
      onPress={() =>
        navigation.navigate("Tracker", {
          trackerId: tracker._id,
          trackerName: tracker.name,
        })
      }
    >
      <View style={styles.tracker}>
        <View style={styles.trackerLeft}>
          <Text style={styles.trackerName}>{tracker.name}</Text>
        </View>
        <View style={styles.trackerRight}>
          <Text style={styles.trackerLogs}>{tracker.logs.size || 0}</Text>
          <Text style={styles.trackerPercentage}>0%</Text>
        </View>
      </View>
    </TouchableHighlight>
  );
}

const styles = StyleSheet.create({
  tracker: {
    backgroundColor: "white",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",

    borderRadius: StyleConstants.borderRadius,
    marginBottom: 8,
  },
  trackerRight: {
    width: "30%",
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-around",
  },
  trackerLeft: {
    width: "70%",
    padding: 12,
  },
  trackerName: {
    fontSize: StyleConstants.baseFontSize * 6,
  },
  trackerLogs: {
    fontSize: StyleConstants.baseFontSize * 4,
    color: StyleConstants.tertiaryColor,
  },
  trackerPercentage: {},
});
