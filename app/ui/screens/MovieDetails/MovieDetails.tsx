import React from "react";
import {
  SafeAreaView,
  Text,
  StyleSheet,
  TouchableOpacity,
  StatusBar
} from "react-native";
import colors from "../../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

const Moviedetails = (): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const handleBackButton = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.movieDetailsContainer}>
      <StatusBar backgroundColor={colors.neutral900} />
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={handleBackButton}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          style={styles.backIcon}
          size={24}
        />
      </TouchableOpacity>
      <Text style={styles.text}>Movie Details Page</Text>
      <Text style={styles.text}>Coming soon...</Text>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  movieDetailsContainer: {
    backgroundColor: colors.neutral900,
    flex: 1,
    padding: 32,
    alignItems: "center",
    justifyContent: "center",
    gap: 24
  },
  backButtonContainer: {
    position: "absolute",
    top: 64,
    left: 32
  },
  backIcon: { color: colors.neutral50 },
  text: { color: colors.neutral50, fontSize: 32 }
});

export default Moviedetails;
