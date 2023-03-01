import {
  View,
  Text,
  StyleSheet,
  ScrollView,
  TouchableHighlight,
} from "react-native";
import StyleConstants from "../StyleConstants";
export default function TrackerLogList({ logs, onDeleteTrackerLog }) {
  const formatDate = (date) => {
    const d = new Date(date);
    return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
  };

  const formatDuration = (value: number) => {
    const hours = Math.floor(value / 3600);
    const minutes = Math.floor((value - hours * 3600) / 60);
    const seconds = Math.floor(value - hours * 3600 - minutes * 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <ScrollView style={styles.container}>
      <View style={styles.row}>
        <Text style={[styles.cell, styles.header]}>Start Date</Text>
        <Text style={[styles.cell, styles.header]}>Duration</Text>
        <Text style={[styles.cell, styles.header]}>{"   "}</Text>
      </View>
      {logs
        .sort((a, b) => a.createdAt < b.createdAt)
        .map((log) => (
          <View style={styles.row} key={log._id}>
            <Text style={styles.cell}>{formatDate(log.createdAt)}</Text>
            <Text style={styles.cell}>{formatDuration(log.value)}</Text>
            <TouchableHighlight
              underlayColor="white"
              onPress={() => {
                onDeleteTrackerLog(log._id);
              }}
            >
              <Text style={{ ...styles.cell, fontWeight: "bold" }}>X</Text>
            </TouchableHighlight>
          </View>
        ))}
    </ScrollView>
  );
}

const styles = StyleSheet.create({
  container: {
    width: "100%",
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-around",
    borderBottomWidth: 1,
    borderBottomColor: "gray",
    backgroundColor: StyleConstants.callToActionColor,
  },
  cell: {
    padding: 16,
    textAlign: "center",
  },
  header: {
    fontWeight: "bold",
  },
});
