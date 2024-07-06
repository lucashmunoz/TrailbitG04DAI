import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";

const LoadingIndicator = () => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={"large"} color={"white"} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {}
});

export default LoadingIndicator;
