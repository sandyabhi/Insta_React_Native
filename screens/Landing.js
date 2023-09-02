import { Button, StyleSheet, Text, View } from "react-native";
import React from "react";
import { useNavigation } from "@react-navigation/native";

const Landing = () => {
  const navigation = useNavigation();

  return (
    <View style={{ flex: 1, justifyContent: "center" }}>
      <Button
        onPress={() => navigation.navigate("Register")}
        title="Register"
      />
      <Button onPress={() => navigation.navigate("Login")} title="Login" />
    </View>
  );
};

export default Landing;

const styles = StyleSheet.create({});
