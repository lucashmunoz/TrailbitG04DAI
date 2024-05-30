import React from "react";
import { Dimensions, Image, StyleSheet, View } from "react-native";
import { IMAGES } from "../../../assets/images";

const SCREEN_WIDTH = Dimensions.get("window").width;

const Logo = () => {
  return (
    <View style={styles.container}>
      <Image
        source={IMAGES.LOGO}
        style={styles.logoImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: SCREEN_WIDTH,
    height: 80,
    marginHorizontal: 40,
    alignItems: "center",
  },
  logoImage: {
    flex: 1,
    width: "100%",
    aspectRatio: 2911 / 859
  },
})

export default Logo;
