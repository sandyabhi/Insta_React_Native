import React, { useState } from "react";
import { StyleSheet, Button, Text, TextInput, View, Alert } from "react-native";
import { Snackbar } from "react-native-paper";
import { container, form } from "../styles";
import { auth, db } from "../../firebase";
import { addDoc, collection, setDoc, doc } from "firebase/firestore";
import { createUserWithEmailAndPassword } from "firebase/auth";

const Register = (props) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [name, setName] = useState("");
  const [username, setUsername] = useState("");
  const [isValid, setIsValid] = useState(true);

  const onRegister = () => {
    if (
      name.length == 0 ||
      username.length == 0 ||
      email.length == 0 ||
      password.length == 0
    ) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: "Please fill out everything",
      });
      return;
    }
    if (password.length < 6) {
      setIsValid({
        bool: true,
        boolSnack: true,
        message: "passwords must be at least 6 characters",
      });
      return;
    }

    createUserWithData(username, name, email, password);
  };

  const createUserWithData = async (username, name, email, password) => {
    try {
      // Create the user with email and password
      const userCredential = await createUserWithEmailAndPassword(
        auth,
        email,
        password
      );

      // Access the user object
      const user = userCredential.user;
      console.log("User created:", user);

      // Update additional user data in Firestore
      const userDocRef = doc(db, "users", user.uid);
      const userData = {
        email: user.email,
        name: name,
        username: username,
      };

      // Set the user data in Firestore
      await setDoc(userDocRef, userData);

      console.log("User data updated in Firestore:", userData);
      navigation.navigate("Home");
    } catch (error) {
      console.error("Error creating user:", error);
      Alert.alert(
        { error },
        [
          {
            text: "Cancel",
            onPress: () => console.log("Cancel Pressed"),
            style: "cancel",
          },
          { text: "OK", onPress: () => console.log("OK Pressed") },
        ],
        { cancelable: false }
      );
    }
  };

  return (
    <View style={container.center}>
      <View style={container.formCenter}>
        <TextInput
          style={form.textInput}
          placeholder="Username"
          value={username}
          keyboardType="twitter"
          onChangeText={(username) =>
            setUsername(
              username
                .normalize("NFD")
                .replace(/[\u0300-\u036f]/g, "")
                .replace(/\s+/g, "")
                .replace(/[^a-z0-9]/gi, "")
            )
          }
        />
        <TextInput
          style={form.textInput}
          placeholder="name"
          onChangeText={(name) => setName(name)}
        />
        <TextInput
          style={form.textInput}
          placeholder="email"
          onChangeText={(email) => setEmail(email)}
        />
        <TextInput
          style={form.textInput}
          placeholder="password"
          secureTextEntry={true}
          onChangeText={(password) => setPassword(password)}
        />

        <Button
          style={form.button}
          onPress={() => onRegister()}
          title="Register"
        />
      </View>

      <View style={form.bottomButton}>
        <Text onPress={() => props.navigation.navigate("Login")}>
          Already have an account? Sign In.
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

export default Register;

const styles = StyleSheet.create({});
