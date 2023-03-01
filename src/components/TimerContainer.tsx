import { View, Text, StyleSheet } from "react-native";
import TimerButton from "./TimerButton";
import Timer from "./Timer";
import { useState, useEffect } from "react";
export default function TimerContainer({ onCreateTrackerLog, viaScan }) {
  useEffect(() => {
    // scan nfc tag to navigate to this screen
    if (viaScan) {
      onToggleTimer();
    }
  }, []);
  const [intervalId, setIntervalId] = useState(null);
  const [isRunning, setIsRunning] = useState(false);
  const [elapsedSeconds, setElapsedSeconds] = useState(0);
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
    onCreateTrackerLog(elapsedSeconds);
    setElapsedSeconds(0);
  };

  return (
    <View style={{ ...styles.timerContainer }}>
      <Timer isRunning={isRunning} elapsedSeconds={elapsedSeconds}></Timer>
      <TimerButton
        onToggleTimer={onToggleTimer}
        type={isRunning ? "Stop" : "Start"}
      ></TimerButton>
    </View>
  );
}

const styles = StyleSheet.create({
  timerContainer: {
    justifyContent: "space-around",
    alignItems: "center",
    height: "60%",
  },
});
