import { TouchableHighlight, Text, StyleSheet } from "react-native";
import StyleConstants from "../StyleConstants";
export default function TimerButton({ onToggleTimer, type }) {
  if (type === "Start") {
    return <StartButton onToggleTimer={onToggleTimer}></StartButton>;
  } else if (type === "Stop") {
    return <StopButton onToggleTimer={onToggleTimer}></StopButton>;
  } else {
    throw new Error("TimerButton type must be either Start or Stop");
  }
}

const StopButton = ({ onToggleTimer }) => {
  return (
    <TouchableHighlight
      style={{ ...styles.button, backgroundColor: "red" }}
      onPress={onToggleTimer}
    >
      <Text style={{ ...styles.buttonText }}>Stop</Text>
    </TouchableHighlight>
  );
};

const StartButton = ({ onToggleTimer }) => {
  return (
    <TouchableHighlight
      style={{ ...styles.button, backgroundColor: "green" }}
      onPress={onToggleTimer}
    >
      <Text style={{ ...styles.buttonText }}>Start</Text>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  button: {
    borderRadius: StyleConstants.borderRadius,
    padding: 24,
    width: "100%",
    alignItems: "center",
  },
  buttonText: {
    fontSize: StyleConstants.baseFontSize * 10,
    color: "white",
  },
});
