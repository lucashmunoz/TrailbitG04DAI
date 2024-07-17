import React from "react";

import { View, Text, StyleSheet, FlatList } from "react-native";
import colors from "../../styles/colors";
import MovieCard from "./MovieCard";
import { FlashList } from "@shopify/flash-list";

const FavoriteMovies = ({ movies }): React.JSX.Element => {
  const moviesWithImages = movies.map(movie => ({
    ...movie,
    image: movie.posterPath
  }));

  return (
    <View style={styles.container}>
      <Text style={styles.favouritesTitle}>Favoritas</Text>
      <FlashList
        data={moviesWithImages}
        renderItem={({ item }) => <MovieCard item={item} />}
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
