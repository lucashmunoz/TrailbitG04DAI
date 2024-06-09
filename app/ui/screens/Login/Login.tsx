import React from "react";
import { StatusBar, StyleSheet } from "react-native";
import Logo from "./Logo";
import GoogleSignInButton from "./GoogleSignInButton";
import colors from "../../styles/colors";
import LinearGradient from "react-native-linear-gradient";

const gradientStart = { x: 1, y: 1 };
const gradientEnd = { x: 1, y: 0 };

const gradientColors = [
  colors.primary700,
  colors.primary500,
  colors.primary500,
  colors.primary700
];

const Login = (): React.JSX.Element => {
  return (
    <LinearGradient
      start={gradientStart}
      end={gradientEnd}
      colors={gradientColors}
      style={styles.container}>
      <StatusBar backgroundColor={colors.primary700} />
      <Logo />
      <GoogleSignInButton />
    </LinearGradient>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 100
  }
});

export default Login;
