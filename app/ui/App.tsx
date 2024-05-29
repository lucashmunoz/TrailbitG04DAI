import React, {useEffect} from "react";
import RootNavigator from "../navigation/RootNavigator";
import { Provider } from "react-redux";
import store from "../state/store";
import SplashScreen from 'react-native-splash-screen'
import {Platform} from 'react-native'
import BootSplash from 'react-native-bootsplash';

function App(): React.JSX.Element {

  useEffect(() => {
    hideSplashScreen();
  }, []);

  const hideSplashScreen = async () => {
    try {
      if (Platform.OS === 'android') {
        await BootSplash.hide({ fade: true });
      } else {
        SplashScreen.hide();
      }
    } catch (error) {
      console.error('Error hiding splash screen', error);
    }
  };
  
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
