import { Text, TouchableHighlight } from "react-native";
import StyleConstants from "../StyleConstants";
import { writeNdef } from "../utils/nfcManager";
export default function WriteButton({ trackerId }) {
  const onWriteNdef = async () => {
    await writeNdef(trackerId);
  };
  return (
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
  );
}
