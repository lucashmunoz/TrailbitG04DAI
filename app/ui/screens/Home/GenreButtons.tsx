import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import colors from "../../styles/colors";

const GenreButtons = () => {
  const [isClicked, setIsClicked] = useState(false);

  const handlePress = () => {
    setIsClicked(!isClicked);
  };

  return (
    <View style={styles.container}>
      <TouchableOpacity
        style={[styles.button, isClicked ? styles.clicked : styles.unclicked]}
        onPress={handlePress}>
        <Text style={styles.buttonText}>Aventura</Text>
      </TouchableOpacity>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center"
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: 120,
    height: 30
  },
  unclicked: {
    backgroundColor: colors.neutral500
  },
  clicked: {
    backgroundColor: colors.primary500
  },
  buttonText: {
    color: colors.neutral50,
    fontSize: 14
  }
});

export default GenreButtons;
