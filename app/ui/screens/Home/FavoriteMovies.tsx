import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import { IMAGES } from "../../../assets/images";
import MovieCard from "./MovieCard";
import { FlashList } from "@shopify/flash-list";

const movies = [
  { id: "1", title: "Movie 1", image: IMAGES.MOVIE_CARD_ONE },
  { id: "2", title: "Movie 2", image: IMAGES.MOVIE_CARD_TWO },
  { id: "3", title: "Movie 3", image: IMAGES.MOVIE_CARD_THREE },
  { id: "4", title: "Movie 4", image: IMAGES.MOVIE_CARD_FOUR },
  { id: "5", title: "Movie 5", image: IMAGES.MOVIE_CARD_ONE }
];

const FavoriteMovies = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.favouritesTitle}>Favoritas</Text>
      <FlashList
        data={movies}
        renderItem={MovieCard}
        keyExtractor={item => item.id}
        horizontal
        estimatedItemSize={120}
        scrollEventThrottle={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.neutral900,
    gap: 10
  },
  favouritesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.neutral50
  }
});

export default FavoriteMovies;
