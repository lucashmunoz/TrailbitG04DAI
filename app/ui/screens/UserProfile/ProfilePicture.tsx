import React from "react";
import { View, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faUser } from "@fortawesome/free-solid-svg-icons";

const ProfilePicture = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <FontAwesomeIcon
        icon={faUser}
        style={{ color: colors.neutral50 }}
        size={56}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.neutral50,
    borderWidth: 2,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    justifyContent: "center",
    alignItems: "center"
  }
});

export default ProfilePicture;
