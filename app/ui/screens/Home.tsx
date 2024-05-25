import React from "react";
import { SafeAreaView, Text, StyleSheet } from "react-native";
import colors from "../styles/colors";

const Home = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.homeContainer}>
      <Text style={styles.text}>Home Page</Text>
      <Text style={styles.text}>Coming soon...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: colors.neutral900,
    flex: 1,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    gap: 24
  },
  text: { color: colors.neutral50, fontSize: 32 }
});

export default Home;
