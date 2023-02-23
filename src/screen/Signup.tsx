import {
  TextInput,
  Text,
  View,
  StyleSheet,
  TouchableHighlight,
} from "react-native";
import { StyleConstants } from "../StyleConstants";
import { useState } from "react";
import { signup } from "../api/users";
import { signupValidator } from "../services/userValidator";

export default function Signup({ navigation }) {
  const [name, onChangeName] = useState("");
  const [email, onChangeEmail] = useState("");
  const [password, onChangePassword] = useState("");
  const [confirmPassword, onChangeConfirmPassword] = useState("");
  const [errors, setErrors] = useState({ email: "", name: "", password: "" });
  const [response, setResponse] = useState("");
  const onSignup = async () => {
    const validateErrors = signupValidator(
      name,
      email,
      password,
      confirmPassword
    );
    if (
      validateErrors.email ||
      validateErrors.name ||
      validateErrors.password
    ) {
      setErrors(validateErrors);
    } else {
      const response = await signup(email, password, name);
      if (response.status === 201) {
        setResponse("Signup successful");
        navigation.navigate("Signin");
      } else {
        setResponse("Signup failed");
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

      <Text style={{ color: "green", marginBottom: 8 }}>{response}</Text>
      <Text style={{ color: "red" }}>{errors.name}</Text>
      <Text style={{ color: "red" }}>{errors.email}</Text>
      <Text style={{ color: "red", marginBottom: 8 }}>{errors.password}</Text>
      <TouchableHighlight onPress={onSignup} style={styles.button}>
        <Text style={{ color: "white", fontWeight: "bold" }}>Create</Text>
      </TouchableHighlight>

      <TouchableHighlight onPress={() => navigation.navigate("Signin")}>
        <Text>Sign in</Text>
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
