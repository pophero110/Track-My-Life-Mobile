import { TouchableHighlight, Text, View } from "react-native";

export default function TimerButton({ onToggleTimer, type, width, height }) {
  if (type === "Start") {
    return (
      <StartButton
        onToggleTimer={onToggleTimer}
        width={width}
        height={height}
      ></StartButton>
    );
  } else if (type === "Stop") {
    return (
      <StopButton
        onToggleTimer={onToggleTimer}
        width={width}
        height={height}
      ></StopButton>
    );
  } else {
    throw new Error("TimerButton type must be either Start or Stop");
  }
}

const StopButton = ({ onToggleTimer, width, height }) => {
  return (
    <TouchableHighlight onPress={onToggleTimer}>
      <View
        style={{
          flexDirection: "row",
          paddingLeft: "10%",
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <View
          style={{
            width: width / 2,
            height: height,
            backgroundColor: "red",
            borderRadius: 10,
          }}
        />
        <View
          style={{
            width: width / 2,
            height: height,
            backgroundColor: "red",
            borderRadius: 10,
            marginLeft: 5,
          }}
        />
      </View>
    </TouchableHighlight>
  );
};

const StartButton = ({ onToggleTimer, width, height }) => {
  return (
    <TouchableHighlight
      onPress={onToggleTimer}
      style={{
        width: 0,
        height: 0,
        backgroundColor: "transparent",
        borderStyle: "solid",
        borderLeftWidth: width,
        borderRightWidth: width,
        borderBottomWidth: height,
        borderLeftColor: "transparent",
        borderRightColor: "transparent",
        borderBottomColor: "green",
        transform: [{ rotate: "90deg" }],
      }}
    >
      <Text></Text>
    </TouchableHighlight>
  );
};
