import React, { useEffect } from "react";
import { Image, Pressable, StyleSheet, View, Text } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import NavigatorConstant from "../../../navigation/NavigatorConstant";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { IMAGES } from "../../../assets/images";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import auth from "@react-native-firebase/auth";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { authenticateUser } from "../../../state/slices/user/asyncThunks";
import {
  clearUserAuthLoading,
  selectUserAuthLoadingState,
  selectUserAuthState,
  selectUserTokens,
  setUserAuthLoading
} from "../../../state/slices/user/userSlice";
import LoadingIndicator from "../../components/LoadingIndicator";
import colors from "../../styles/colors";
import AsyncStorage from "@react-native-async-storage/async-storage";

const GoogleSignInButton = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectUserAuthState);
  const isUserAuthLoading = useAppSelector(selectUserAuthLoadingState);
  const { accessToken, refreshToken } = useAppSelector(selectUserTokens);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  GoogleSignin.configure({
    webClientId:
      "468635318531-tp03vu4veri9u14okj2r2rruaoahk09q.apps.googleusercontent.com"
  });

  const handleGoogleSignIn = async () => {
    dispatch(setUserAuthLoading());
    try {
      // Check if your device supports Google Play
      await GoogleSignin.hasPlayServices({
        showPlayServicesUpdateDialog: true
      });

      // Se obtiene el token de google signin
      const { idToken } = await GoogleSignin.signIn();

      // Se generan las credenciales a partir del token
      const googleCredential = auth.GoogleAuthProvider.credential(idToken);

      // Se loguea al usuario a partir de las credenciales
      await auth().signInWithCredential(googleCredential);

      await dispatch(authenticateUser({ idToken: idToken || "" }));
    } catch (error) {
      console.error(error);
      dispatch(clearUserAuthLoading());
    }
  };

  // Cuando el user sea correctamente autenticado, ir a la pantalla de home
  useEffect(() => {
    if (isAuthenticated) {
      const storeData = async () => {
        try {
          await AsyncStorage.setItem("accessToken", accessToken);
          await AsyncStorage.setItem("refreshToken", refreshToken);
        } catch (e) {
          // saving error
        }
      };
      storeData();
      navigation.navigate(NavigatorConstant.LoggedIn);
      navigation.reset({
        index: 0,
        routes: [{ name: NavigatorConstant.LoggedIn }]
      });
    }
  }, [isAuthenticated]);

  return (
    <View style={styles.container}>
      {isUserAuthLoading ? (
        <LoadingIndicator color={colors.neutral900} size={60} />
      ) : (
        <>
          <Pressable onPress={handleGoogleSignIn}>
            <View style={styles.buttonContainer}>
              <Image source={IMAGES.GOOGLE_ICON} style={styles.icon} />
              <Text style={styles.buttonText}>Acceder con Google</Text>
            </View>
          </Pressable>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    height: 200,
    alignItems: "center",
    justifyContent: "center"
  },
  buttonContainer: {
    backgroundColor: colors.neutral900,
    paddingVertical: 12,
    paddingHorizontal: 24,
    borderRadius: 32,
    gap: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    borderWidth: 1,
    borderColor: colors.neutral300
  },
  buttonText: {
    color: colors.neutral50,
    textAlign: "center",
    fontWeight: "semibold",
    fontSize: 20
  },
  icon: {
    width: 20,
    aspectRatio: 1
  }
});

export default GoogleSignInButton;
