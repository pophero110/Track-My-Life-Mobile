import {
  View,
  Text,
  TextInput,
  TouchableHighlight,
  StyleSheet,
} from "react-native";
import { StyleConstants } from "../StyleConstants";
import { useState } from "react";
import { signin } from "../api/sessions";
export default function Signin({ navigation }) {
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [error, setError] = useState("");

  const onSignin = async () => {
    const result = await signin(email, password);
    console.log(result);
    if (result.data.error) {
      setError(result.data.error);
    } else {
      navigation.navigate("Home");
    }
  };

  return (
    <View
      style={{
        height: "100%",
        alignItems: "center",
        backgroundColor: StyleConstants.primaryColor,
      }}
    >
      <Text
        style={{
          fontSize: 32,
          fontWeight: "bold",
          marginTop: 24,
          marginBottom: 16,
        }}
      >
        Start tracking
      </Text>
      <TextInput
        value={email}
        onChangeText={onChangeEmail}
        style={styles.inputBox}
        placeholder="Email"
      />
      <TextInput
        value={password}
        onChangeText={onChangePassword}
        style={styles.inputBox}
        placeholder="Password"
      />

      <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text>
      <TouchableHighlight onPress={onSignin} style={styles.button}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Sign in</Text>
      </TouchableHighlight>
    </View>
  );
}

const styles = StyleSheet.create({
  inputBox: {
    backgroundColor: "#fff",
    width: "60%",
    marginBottom: 12,
    padding: 12,
    borderRadius: StyleConstants.borderRadius,
    borderColor: StyleConstants.callToActionColor,
  },
  button: {
    backgroundColor: StyleConstants.callToActionColor,
    borderRadius: StyleConstants.borderRadius,
    padding: 12,
    width: "60%",
    alignItems: "center",
  },
});
