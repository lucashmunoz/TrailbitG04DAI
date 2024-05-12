import React from "react";
import { Dimensions, Image, View } from "react-native";
import { IMAGES } from "../../../assets/images";

const Logo = () => {
  const SCREEN_WIDTH = Dimensions.get("window").width;

  return (
    <View
      style={{
        width: SCREEN_WIDTH,
        height: 80,
        marginHorizontal: 40,
        alignItems: "center"
      }}>
      <Image
        source={IMAGES.LOGO}
        style={{
          flex: 1,
          width: "100%",
          height: undefined,
          aspectRatio: 2911 / 859
        }}
      />
    </View>
  );
};

export default Logo;
