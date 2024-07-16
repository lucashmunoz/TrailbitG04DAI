import React from "react";
import { View, Text, StyleSheet, FlatList } from "react-native";
import { IMAGES } from "../../../assets/images";
import MovieCard from "./MovieCard";
import colors from "../../styles/colors";

const movies = [
  { id: "1", title: "Movie 1", image: IMAGES.MOVIE_CARD_ONE },
  { id: "2", title: "Movie 2", image: IMAGES.MOVIE_CARD_TWO },
  { id: "3", title: "Movie 3", image: IMAGES.MOVIE_CARD_THREE },
  { id: "4", title: "Movie 4", image: IMAGES.MOVIE_CARD_FOUR },
  { id: "5", title: "Movie 5", image: IMAGES.MOVIE_CARD_ONE },
  { id: "6", title: "Movie 6", image: IMAGES.MOVIE_CARD_TWO },
  { id: "7", title: "Movie 7", image: IMAGES.MOVIE_CARD_THREE },
  { id: "8", title: "Movie 8", image: IMAGES.MOVIE_CARD_FOUR }
];

const RecentMovies = (): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.recentsTitle}>Recientes</Text>
      <FlatList
        data={movies}
        renderItem={MovieCard}
        keyExtractor={item => item.id}
        showsHorizontalScrollIndicator={false}
        numColumns={3}
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
  recentsTitle: {
    fontSize: 17.72,
    fontWeight: "semibold",
    color: colors.neutral50
  }
});

export default RecentMovies;
