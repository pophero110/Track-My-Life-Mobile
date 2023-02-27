import { View, Text, StyleSheet } from "react-native";
import { StyleConstants } from "../StyleConstants";

export default function Quote() {
  return (
    <View style={styles.quote}>
      <Text
        style={{
          textAlign: "center",
          fontSize: StyleConstants.baseFontSize * 5,
          marginBottom: 12,
          color: "lightgrey",
        }}
      >
        “We must use time as a tool, not as a couch.”{" "}
      </Text>
      <Text
        style={{
          textAlign: "center",
          color: "lightgrey",
        }}
      >
        John F. Kennedy
      </Text>
    </View>
  );
}

const styles = StyleSheet.create({
  quote: {
    width: "80%",
    borderRadius: StyleConstants.borderRadius,
    padding: 12,
  },
});
