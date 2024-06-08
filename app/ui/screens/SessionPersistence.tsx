import React, { useEffect } from "react";
import { StyleSheet } from "react-native";
import LinearGradient from "react-native-linear-gradient";
import LoadingIndicator from "../components/LoadingIndicator";
import colors from "../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useAppDispatch, useAppSelector } from "../../state/store";
import { refreshUserToken } from "../../state/slices/user/asyncThunks";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { selectUserApiError } from "../../state/slices/user/userSlice";
import NavigatorConstant from "../../navigation/NavigatorConstant";

const gradientStart = { x: 1, y: 1 };
const gradientEnd = { x: 1, y: 0 };

const gradientColors = [
  colors.primary700,
  colors.primary500,
  colors.primary500,
  colors.primary700
];

const SessionPersistence = () => {
  const dispatch = useAppDispatch();
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const userAuthError = useAppSelector(selectUserApiError);

  const navigateToLoginPage = () => {
    navigation.navigate(NavigatorConstant.Login);
    navigation.reset({
      index: 0,
      routes: [{ name: NavigatorConstant.Login }]
    });
  };

  const getData = async () => {
    try {
      const refreshToken = await AsyncStorage.getItem("refreshToken");
      if (refreshToken) {
        await dispatch(refreshUserToken({ refreshToken }));
      }
      navigateToLoginPage();
    } catch (e) {
      console.error(e);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  useEffect(() => {
    if (userAuthError) {
      navigateToLoginPage();
    }
  }, [userAuthError]);

  return (
    <LinearGradient
      start={gradientStart}
      end={gradientEnd}
      colors={gradientColors}
      style={styles.container}>
      <LoadingIndicator color={colors.neutral900} size={60} />
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

export default SessionPersistence;
