import {
  View,
  TextInput,
  TouchableHighlight,
  StyleSheet,
  Text,
} from "react-native";
import StyleConstants from "../StyleConstants";
export default function TrakcerForm({
  onCreateTracker,
  setTrackerName,
  trackerName,
}) {
  return (
    <View style={styles.trackerForm}>
      <TextInput
        style={styles.inputBox}
        value={trackerName}
        onChangeText={(value) => setTrackerName(value)}
        placeholder="What you want to track?"
      />
      <TouchableHighlight
        style={styles.button}
        onPress={() => onCreateTracker()}
      >
        <Text
          style={{
            color: "white",
            fontWeight: "bold",
            fontSize: StyleConstants.baseFontSize * 4,
          }}
        >
          Add
        </Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  trackerForm: {
    paddingLeft: 16,
    paddingRight: 16,

    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
    alignItems: "center",
  },
  inputBox: {
    backgroundColor: StyleConstants.secondaryColor,
    width: "80%",

    color: "black",
    fontSize: StyleConstants.baseFontSize * 4,
    padding: 16,
    borderBottomLeftRadius: StyleConstants.borderRadius,
    borderTopLeftRadius: StyleConstants.borderRadius,
  },
  button: {
    backgroundColor: StyleConstants.callToActionColor,

    justifyContent: "center",
    alignItems: "center",
    padding: 16,
    width: "20%",

    borderTopRightRadius: StyleConstants.borderRadius,
    borderBottomRightRadius: StyleConstants.borderRadius,
  },
});
