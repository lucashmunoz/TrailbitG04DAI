import React from "react";
import { SafeAreaView } from "react-native";
import colors from "../../styles/colors";
import Logo from "./Logo";
import GoogleSignInButton from "./GoogleSignInButton";

const Login = (): React.JSX.Element => {
  return (
    <SafeAreaView
      style={{
        backgroundColor: colors.neutral900,
        flex: 1,
        flexDirection: "column",
        justifyContent: "center",
        alignItems: "center",
        gap: 180
      }}>
      <Logo />
      <GoogleSignInButton />
    </SafeAreaView>
  );
};

export default Login;
