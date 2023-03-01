import { View, StyleSheet } from "react-native";
import StyleConstants from "../StyleConstants";
import { createTrackerLog } from "../api/trackerLogs";
import TrackerLogList from "../components/TrackLogList";
import { deleteTrackerLog } from "../api/trackerLogs";
import { useTrackerContext } from "../context/trackContext";
import WriteTagButton from "../components/WriteTagButton";
import TimerContainer from "../components/TimerContainer";
export default function Trakcer({ route }) {
  const { setTrackers, trackers } = useTrackerContext();
  const { trackerId } = route.params;
  const tracker = trackers.find((t) => t._id === trackerId);

  const onCreateTrackerLog = async (elapsedSeconds) => {
    const result = await createTrackerLog(tracker._id, elapsedSeconds);
    if (result.data.error) {
      console.log("create tracker log error: ", result.data.error);
    } else {
      setTrackers(result.data);
    }
  };

  const onDeleteTrackerLog = async (logId) => {
    const result = await deleteTrackerLog(tracker._id, logId);
    if (result.data.error) {
      console.log("delete tracker log error: ", result.data.error);
    } else {
      setTrackers(result.data);
    }
  };

  return (
    <View style={styles.tracker}>
      <View style={styles.trackerBody}>
        <TrackerLogList
          logs={tracker.logs}
          onDeleteTrackerLog={onDeleteTrackerLog}
        ></TrackerLogList>
        <TimerContainer
          onCreateTrackerLog={onCreateTrackerLog}
          viaScan={route.params.viaScan}
        ></TimerContainer>
      </View>
      <WriteTagButton trackerId={trackerId}></WriteTagButton>
    </View>
  );
}

const styles = StyleSheet.create({
  tracker: {
    height: "100%",
    justifyContent: "space-around",
    alignItems: "center",
    backgroundColor: StyleConstants.secondaryColor,
  },
  trackerBody: {
    flex: 1,
    width: "100%",
    height: "100%",
    alignItems: "center",
  },
});
