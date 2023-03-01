import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import StyleConstants from "../StyleConstants";
import { useState } from "react";
import { signup } from "../api/users";
import { validateSignup } from "../utils/userValidator";

export default function Signup({ navigation }) {
  const [name, onChangeName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");
  const [errors, setErrors] = useState([]);
  const [response, setResponse] = useState("");
  const onSignup = async () => {
    const validateErrors = validateSignup({
      name,
      email,
      password,
      confirmPassword,
    });
    if (
      validateErrors.email ||
      validateErrors.name ||
      validateErrors.password
    ) {
      setErrors(Object.values(validateErrors));
    } else {
      const result = await signup(email, password, name);
      if (result.data.error) {
        setResponse("Signup failed");
      } else {
        setResponse("Signup successful");
        navigation.navigate("Signin");
      }
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
        value={name}
        onChangeText={onChangeName}
        style={styles.inputBox}
        placeholder="Name"
      />
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
      <TextInput
        value={confirmPassword}
        onChangeText={onChangeConfirmPassword}
        style={styles.inputBox}
        placeholder="Confirm Password"
      />

      {response && (
        <Text
          style={{
            color: "green",
            marginBottom: 8,
          }}
        >
          {response}
        </Text>
      )}
      {errors.map((error) => (
        <Text style={{ color: "red", marginBottom: 8 }}>{error}</Text>
      ))}
      <TouchableHighlight onPress={onSignup} style={styles.button}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Create</Text>
      </TouchableHighlight>

      <TouchableHighlight
        style={{
          marginTop: 16,
        }}
        onPress={() => navigation.navigate("Signin")}
      >
        <Text
          style={{
            textDecorationLine: "underline",
          }}
        >
          Sign in with an existing account
        </Text>
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
