import React, { useState } from "react";
import { StyleSheet, Button, Text, TextInput, View } from "react-native";
import { Snackbar } from "react-native-paper";
import { container, form } from "../styles";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState(true);

  const onLogin = () => {};

  return (
    <View style={container.center}>
      <View style={container.formCenter}>
        <TextInput
          style={form.textInput}
          placeholder="Enter Your Email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={form.textInput}
          placeholder="Enter Your Password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <Button style={form.button} onPress={() => onLogin()} title="Login" />
      </View>

      <View style={form.bottomButton}>
        <Text onPress={() => props.navigation.navigate("Register")}>
          Don't have an account? Sign Up.
        </Text>
      </View>
      <Snackbar
        visible={isValid.boolSnack}
        duration={2000}
        onDismiss={() => {
          setIsValid({ boolSnack: false });
        }}
      >
        {isValid.message}
      </Snackbar>
    </View>
  );
};

export default Login;

const styles = StyleSheet.create({});
