import React from "react";
import { Text, TouchableNativeFeedback } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import colors from "../../styles/colors";
import NavigatorConstant from "../../../navigation/NavigatorConstant";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const GoogleSignInButton = () => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleGoogleSignIn = () => {
    navigation.navigate(NavigatorConstant.LoggedIn);
    navigation.reset({
      index: 0,
      routes: [{ name: NavigatorConstant.LoggedIn }]
    });
  };

  return (
    <TouchableNativeFeedback
      style={{
        width: "100%",
        alignItems: "center"
      }}
      onPress={handleGoogleSignIn}>
      <Text style={{ color: colors.neutral100, fontSize: 28 }}>
        Google Sign In
      </Text>
    </TouchableNativeFeedback>
  );
};

export default GoogleSignInButton;
