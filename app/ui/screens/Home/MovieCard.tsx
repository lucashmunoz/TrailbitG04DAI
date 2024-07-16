import React from "react";
import { View, StyleSheet, Image, Dimensions } from "react-native";

const { width } = Dimensions.get("window");

const MovieCard = ({ item }) => (
  <View style={styles.movieCard}>
    <Image source={item.image} style={styles.image} resizeMode="contain" />
  </View>
);

const styles = StyleSheet.create({
  movieCard: {
    width: width * 0.28,
    marginHorizontal: 10
  },
  image: {
    width: "100%",
    height: 180
  }
});

export default MovieCard;
