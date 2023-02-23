import { useState } from "react";
import { Button, View, TextInput } from "react-native";
import { createTracker } from "../api/trackers";
import { StyleConstants } from "../StyleConstants";
import TrackerList from "../components/TrackerList";
export default function HomeScreen({ navigation }) {
  const [name, setName] = useState("");

  const onCreateTracker = async () => {
    const result = await createTracker(name);
  };
  return (
    <View>
      <View style={styles.sectionContainer}>
        <TrackerList></TrackerList>
        <TextInput
          style={{
            backgroundColor: "white",
            padding: 8,
            width: "100%",
            borderRadius: StyleConstants.borderRadius,
            height: 42,
          }}
          value={name}
          onChangeText={(value) => setName(value)}
          placeholder="What you want to track?"
        />
        <Button onPress={onCreateTracker} title="create"></Button>
        <Button
          onPress={() => navigation.navigate("Signin")}
          title="sign in"
        ></Button>
        <Button
          onPress={() => navigation.navigate("Signup")}
          title="sign up"
        ></Button>
      </View>
    </View>
  );
}

const styles = {
  sectionContainer: {
    marginTop: 32,
    paddingHorizontal: 24,
  },
};
