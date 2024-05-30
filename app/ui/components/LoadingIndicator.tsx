import React from "react";
import { ActivityIndicator, View, StyleSheet } from "react-native";
import colors from "../styles/colors";

interface LoadingIndicatorProps {
  /** Color del spinner */
  color?: string;
  /** Size del spinner */
  size?: number | "large" | "small" | undefined;
}

const LoadingIndicator = ({
  color = colors.primary500,
  size = "large"
}: LoadingIndicatorProps) => {
  return (
    <View style={styles.container}>
      <ActivityIndicator size={size} color={color} />
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
