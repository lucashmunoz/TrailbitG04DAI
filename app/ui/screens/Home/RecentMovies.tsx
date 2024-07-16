import React from "react";
import { View, Text, StyleSheet } from "react-native";
import { IMAGES } from "../../../assets/images";
import MovieCard from "./MovieCard";
import colors from "../../styles/colors";
import { FlashList } from "@shopify/flash-list";

const movies = [
  { id: "1", title: "Movie 1", image: IMAGES.MOVIE_CARD_ONE },
  { id: "2", title: "Movie 2", image: IMAGES.MOVIE_CARD_TWO },
  { id: "3", title: "Movie 3", image: IMAGES.MOVIE_CARD_THREE },
  { id: "4", title: "Movie 4", image: IMAGES.MOVIE_CARD_FOUR },
  { id: "5", title: "Movie 5", image: IMAGES.MOVIE_CARD_ONE },
  { id: "6", title: "Movie 6", image: IMAGES.MOVIE_CARD_TWO },
  { id: "7", title: "Movie 7", image: IMAGES.MOVIE_CARD_THREE },
  { id: "8", title: "Movie 8", image: IMAGES.MOVIE_CARD_FOUR },
  { id: "9", title: "Movie 1", image: IMAGES.MOVIE_CARD_ONE },
  { id: "10", title: "Movie 2", image: IMAGES.MOVIE_CARD_TWO },
  { id: "11", title: "Movie 3", image: IMAGES.MOVIE_CARD_THREE },
  { id: "12", title: "Movie 4", image: IMAGES.MOVIE_CARD_FOUR },
  { id: "13", title: "Movie 5", image: IMAGES.MOVIE_CARD_ONE },
  { id: "14", title: "Movie 6", image: IMAGES.MOVIE_CARD_TWO },
  { id: "15", title: "Movie 7", image: IMAGES.MOVIE_CARD_THREE },
  { id: "16", title: "Movie 8", image: IMAGES.MOVIE_CARD_FOUR }
];

const RecentMovies = (): React.JSX.Element => {
  const handleScroll = ({ nativeEvent }) => {};
  return (
    <View style={styles.container}>
      <Text style={styles.recentsTitle}>Recientes</Text>
      <FlashList
        data={movies}
        renderItem={MovieCard}
        keyExtractor={item => item.id}
        numColumns={3}
        estimatedItemSize={120}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: colors.neutral900,
    gap: 10
  },
  recentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.neutral50
  }
});

export default RecentMovies;
