import { View, Text, StyleSheet, TouchableHighlight } from "react-native";
import { StyleConstants } from "../StyleConstants";
import { writeNdef } from "../utils/nfcManager";
import TimerButton from "../components/TimerButton";
import Quote from "../components/Quote";
import { useEffect, useState } from "react";
import { createTrackerLog } from "../api/trackerLogs";
export default function Trakcer({ navigation, route }) {
  const { tracker, viaScan } = route.params;
  const onWriteNdef = async () => {
    await writeNdef(tracker);
  };
  useEffect(() => {
    if (viaScan) {
      onToggleTimer();
    }
  }, []);
  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
  const onCreateTrackerLog = async () => {
    const result = await createTrackerLog(tracker._id, elapsedSeconds);
    if (result.data.error) {
      console.log("create tracker log error: ", result.data.error);
    }
  };
  const onToggleTimer = () => {
    if (isRunning) {
      setIsRunning(false);
      stopTimer();
    } else {
      setIsRunning(true);
      startTimer();
    }
  };

  const startTimer = () => {
    const newIntervalId = setInterval(() => {
      setElapsedSeconds((elapsedSeconds) => elapsedSeconds + 1);
    }, 1000);
    setIntervalId(newIntervalId);
  };

  const stopTimer = () => {
    clearInterval(intervalId);
    onCreateTrackerLog();
    setElapsedSeconds(0);
  };

  return (
    <View style={styles.tracker}>
      <View
        style={{
          flex: 1,
          paddingTop: 24,
          paddingBottom: 50,
          alignItems: "center",
        }}
      >
        <Quote></Quote>
        <View style={styles.timerContainer}>
          <Timer elapsedSeconds={elapsedSeconds}></Timer>
          <TimerButton
            type={isRunning ? "Stop" : "Start"}
            width={30}
            height={60}
            onToggleTimer={onToggleTimer}
          ></TimerButton>
        </View>
      </View>
      <TouchableHighlight
        onPress={onWriteNdef}
        style={{
          backgroundColor: "black",
          width: "100%",
          padding: 24,
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <Text
          style={{
            color: "white",
            fontSize: StyleConstants.baseFontSize * 5,
            fontWeight: "bold",
          }}
        >
          Write
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const Timer = ({ elapsedSeconds }) => {
  const formatSecondsToTime = () => {
    const hours = Math.floor(elapsedSeconds / 3600);
    const minutes = Math.floor((elapsedSeconds - hours * 3600) / 60);
    const seconds = Math.floor(elapsedSeconds - hours * 3600 - minutes * 60);
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  return (
    <View>
      <Text
        style={{
          fontSize: StyleConstants.baseFontSize * 20,
        }}
      >
        {formatSecondsToTime()}
      </Text>
    </View>
  );
};

const styles = StyleSheet.create({
  tracker: {
    height: "100%",
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: StyleConstants.secondaryColor,
  },
  quote: {
    width: "80%",
    borderRadius: StyleConstants.borderRadius,
    padding: 12,
  },
  timerContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "90%",
  },
});
