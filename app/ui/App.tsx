import React from "react";
import RootNavigator from "../navigation/RootNavigator";
import { Provider } from "react-redux";
import store from "../state/store";

function App(): React.JSX.Element {
  return (
    <Provider store={store}>
      <RootNavigator />
    </Provider>
  );
}

export default App;
