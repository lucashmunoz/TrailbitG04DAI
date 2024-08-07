import React, { useEffect, useRef, useState } from "react";
import RootNavigator from "../navigation/RootNavigator";
import { useNetInfo } from "@react-native-community/netinfo";
import { Provider } from "react-redux";
import store from "../state/store";
import SplashScreen from "react-native-splash-screen";
import { Platform, View, StyleSheet } from "react-native";
import BootSplash from "react-native-bootsplash";
import Toast, { ToastHandle } from "./components/Toast";
import "react-native-gesture-handler";
import "react-native-reanimated";
import "@react-native-masked-view/masked-view";
import colors from "./styles/colors";

function App(): React.JSX.Element {
  const netInfo = useNetInfo();
  const noInternetToastRef = useRef<ToastHandle>(null);
  const [isNoInternetToastDisplayed, setIsNoInternetToastDisplay] =
    useState(false);

  // Cuando no haya conexión a internet se mostratá un toast de error
  useEffect(() => {
    // si hay internet y se estaba mostrando el toast, ocultarlo
    if (netInfo.isConnected && isNoInternetToastDisplayed) {
      noInternetToastRef?.current?.close();
      setIsNoInternetToastDisplay(false);
    }

    // si no hay internet y no se estaba mostrando el toast, mostrarlo
    if (netInfo.isConnected === false && isNoInternetToastDisplayed === false) {
      noInternetToastRef?.current?.error("No hay conexión a internet.");
      setIsNoInternetToastDisplay(true);
    }
  }, [netInfo, isNoInternetToastDisplayed]);

  useEffect(() => {
    hideSplashScreen();
  }, []);

  const hideSplashScreen = async () => {
    try {
      if (Platform.OS === "android") {
        await BootSplash.hide({ fade: true });
      } else {
        SplashScreen.hide();
      }
    } catch (error) {
      console.error("Error hiding splash screen", error);
    }
  };

  return (
    <Provider store={store}>
      <View
        style={styles.mainContainer}
        pointerEvents={isNoInternetToastDisplayed ? "none" : "auto"}>
        <RootNavigator />
        <View
          style={[
            styles.noInternetOVerlay,
            isNoInternetToastDisplayed && styles.showToastContainer
          ]}
        />
        <View style={styles.toastContainer}>
          <Toast ref={noInternetToastRef} />
        </View>
      </View>
    </Provider>
  );
}

const styles = StyleSheet.create({
  mainContainer: { flex: 1 },
  noInternetOVerlay: {
    position: "absolute",
    top: 0,
    left: 0,
    bottom: 0,
    right: 0,
    opacity: 0.5,
    height: "100%",
    backgroundColor: colors.neutral900,
    alignItems: "center",
    paddingHorizontal: 16,
    display: "none"
  },
  toastContainer: {
    paddingHorizontal: 16,
    position: "absolute",
    top: 0,
    left: 0,
    width: "100%",
    alignItems: "center"
  },
  showToastContainer: {
    display: "flex"
  }
});

export default App;
