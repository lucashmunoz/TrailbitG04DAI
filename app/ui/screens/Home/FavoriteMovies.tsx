import React from "react";
import { View, Text, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import MovieCard from "./MovieCard";
import { FlashList } from "@shopify/flash-list";
import { useAppSelector } from "../../../state/store";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { selectFavoriteMoviesLoading } from "../../../state/slices/movies/moviesSlice";

const FavoriteMovies = ({ movies }): React.JSX.Element => {
  const favoriteMoviesLoading = useAppSelector(selectFavoriteMoviesLoading);

  const moviesWithImages = movies.map(movie => ({
    ...movie,
    image: movie.posterPath
  }));

  const loadingMovies = Array.from({ length: 9 }, (_, i) => ({ id: i + 1 }));

  const MovieCardLoader = () => (
    <View style={{ marginHorizontal: 8 }}>
      <SkeletonPlaceholder
        borderRadius={4}
        speed={1200}
        backgroundColor={colors.neutral900}
        highlightColor={colors.neutral700}>
        <SkeletonPlaceholder.Item width={120} height={180} />
      </SkeletonPlaceholder>
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.favouritesTitle}>Favoritas</Text>
      {favoriteMoviesLoading ? (
        <FlashList
          data={loadingMovies}
          renderItem={() => <MovieCardLoader />}
          keyExtractor={item => item.id.toString()}
          horizontal
          estimatedItemSize={9}
          scrollEventThrottle={50}
        />
      ) : (
        <FlashList
          data={moviesWithImages}
          renderItem={({ item }) => <MovieCard item={item} />}
          keyExtractor={item => item.id}
          horizontal
          estimatedItemSize={40}
          scrollEventThrottle={50}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
    backgroundColor: colors.neutral900
  },
  favouritesTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.neutral50
  }
});

export default FavoriteMovies;
