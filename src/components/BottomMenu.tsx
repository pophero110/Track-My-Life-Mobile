import { StyleSheet, Text, TouchableHighlight, View } from "react-native";
import { StyleConstants } from "../StyleConstants";
import TrakcerForm from "../screen/TrackerForm";
import { readNdef } from "../utils/nfcManager";
export default function BottomMenu({
  trackers,
  navigation,
  trackerName,
  onCreateTracker,
  setTrackerName,
}) {
  const onReadNdef = async () => {
    const trackerId = await readNdef();
    console.log("trackerId: ", trackerId);
    if (trackerId) {
      const tracker = trackers.find((tracker) => tracker._id === trackerId);
      if (tracker) {
        navigation.navigate("Tracker", { tracker, viaScan: true });
      }
    }
  };
  return (
    <View style={styles.buttonMenu}>
      <TrakcerForm
        trackerName={trackerName}
        onCreateTracker={onCreateTracker}
        setTrackerName={setTrackerName}
      ></TrakcerForm>
      <View style={{ marginTop: 16 }}></View>
      <TouchableHighlight onPress={onReadNdef} style={styles.scanButton}>
        <Text
          style={{
            textAlign: "center",
            color: "white",
            fontSize: StyleConstants.baseFontSize * 5,
            fontWeight: "bold",
          }}
        >
          Scan
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  buttonMenu: {
    position: "absolute",
    bottom: 0,
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  scanButton: {
    backgroundColor: "black",
    width: "100%",
    padding: 24,
  },
});
