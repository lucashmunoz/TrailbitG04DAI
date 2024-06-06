import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import {
  BottomTabBarProps,
  createBottomTabNavigator
} from "@react-navigation/bottom-tabs";
import { TouchableOpacity, View } from "react-native";
import { IconProp } from "@fortawesome/fontawesome-svg-core";
import colors from "../ui/styles/colors";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

//Screens
import Home from "../ui/screens/Home";
import UserProfile from "../ui/screens/UserProfile";
import SearchMovie from "../ui/screens/SearchMovie";
import Login from "../ui/screens/Login";
import MovieDetail from "../ui/screens/MovieDetails"

// Routes
import NavigatorConstant from "./NavigatorConstant";

// Icons
import {
  faHouse,
  faMagnifyingGlass,
  faUser
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

const BottomTab = ({ state, navigation }: BottomTabBarProps) => {
  const getIconByRouteName = (routeName: string): IconProp => {
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

  const getRouteLabelByRouteName = (routeName: string): string => {
    switch (routeName) {
      case NavigatorConstant.SearchMovie:
        return "Página de búsqueda de película";
      case NavigatorConstant.UserProfile:
        return "Página de perfil de usuario";
      case NavigatorConstant.Home:
      default:
        return "Página de inicio";
    }
  };

  return (
    <View style={{ flexDirection: "row", height: 68 }}>
      {state.routes.map((route, index) => {
        const isFocused = state.index === index;

        const { name: routeName } = route;

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
            accessibilityRole="button"
            accessibilityState={isFocused ? { selected: true } : {}}
            accessibilityLabel={getRouteLabelByRouteName(routeName)}
            onPress={onPress}
            onLongPress={onLongPress}
            style={{
              flex: 1,
              backgroundColor: colors.navBar,
              justifyContent: "center",
              alignItems: "center",
              opacity: 0.9
            }}>
            <View>
              <FontAwesomeIcon
                icon={getIconByRouteName(routeName)}
                style={{ color: colors.neutral50 }}
                size={24}
              />
              {isFocused && (
                <View
                  style={{
                    height: 4,
                    width: 24,
                    backgroundColor: colors.primary500,
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

const Tab = createBottomTabNavigator();

const TabNavigator = () => {
  return (
    <Tab.Navigator
      tabBar={props => <BottomTab {...props} />}
      screenOptions={{ headerShown: false }}
      initialRouteName={NavigatorConstant.Home}>
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
  );
};

const Stack = createNativeStackNavigator();

const RootNavigator = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator
        screenOptions={{ headerShown: false }}
        initialRouteName={NavigatorConstant.Login}>
        <Stack.Screen
          name={NavigatorConstant.LoggedIn}
          component={TabNavigator}
        />
        <Stack.Screen name={NavigatorConstant.Login} component={Login} />
        <Stack.Screen name={NavigatorConstant.MovieDetails} component={MovieDetail} />
      </Stack.Navigator>
    </NavigationContainer>
  );
};

export default RootNavigator;
