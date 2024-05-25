import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import colors from "../styles/colors";

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size="large" color={colors.primary500} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default LoadingIndicator;
