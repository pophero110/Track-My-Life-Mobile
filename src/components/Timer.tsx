import { Text, View } from "react-native";
import StyleConstants from "../StyleConstants";

export default function Timer({ elapsedSeconds, isRunning }) {
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
          color: isRunning ? "red" : "green",
        }}
      >
        {formatSecondsToTime()}
      </Text>
    </View>
  );
}
