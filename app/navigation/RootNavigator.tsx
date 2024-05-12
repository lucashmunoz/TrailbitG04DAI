import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabBarProps,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";

//Screens
import Home from "../ui/screens/Home";
import UserProfile from "../ui/screens/UserProfile";
import SearchMovie from "../ui/screens/SearchMovie";

// Routes
import NavigatorConstant from "./NavigatorConstant";

// Icons
import {
  faHouse,
  faMagnifyingGlass,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { TouchableOpacity, View } from "react-native";

const Tab = createBottomTabNavigator();

const BottomTab = ({ state, descriptors, navigation }: BottomTabBarProps) => {
  const getIconByRouteName = (routeName: string) => {
    switch (routeName) {
      case NavigatorConstant.SearchMovie:
        return faMagnifyingGlass;
      case NavigatorConstant.UserProfile:
        return faUser;
      case NavigatorConstant.Home:
      default:
        return faHouse;
    }
  };

  return (
    <View style={{ flexDirection: "row", height: 68 }}>
      {state.routes.map((route, index) => {
        const { options } = descriptors[route.key];

        const isFocused = state.index === index;

        const { name: routeName } = route;
        const icon = getIconByRouteName(routeName);

        const onPress = () => {
          const event = navigation.emit({
            type: "tabPress",
            target: route.key,
            canPreventDefault: true
          });

          if (!isFocused && !event.defaultPrevented) {
            navigation.navigate(routeName, route.params);
          }
        };

        const onLongPress = () => {
          navigation.emit({
            type: "tabLongPress",
            target: route.key
          });
        };

        // No esta funcionando con TouchableWithoutFeedback
        return (
          <TouchableOpacity
            key={routeName}
            activeOpacity={0.9}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: "#1e1e1e",
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.9
            }}>
            <View>
              <FontAwesomeIcon
                icon={icon}
                style={{ color: "#fcfcfc" }}
                size={24}
              />
              {isFocused && (
                <View
                  style={{
                    height: 4,
                    width: 24,
                    backgroundColor: "#5B2DDB",
                    marginTop: 8,
                    borderRadius: 2
                  }}
                />
              )}
            </View>
          </TouchableOpacity>
        );
      })}
    </View>
  );
};

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Tab.Navigator tabBar={props => <BottomTab {...props} />}>
        <Tab.Screen name={NavigatorConstant.Home} component={Home} />
        <Tab.Screen
          name={NavigatorConstant.SearchMovie}
          component={SearchMovie}
        />
        <Tab.Screen
          name={NavigatorConstant.UserProfile}
          component={UserProfile}
        />
      </Tab.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
