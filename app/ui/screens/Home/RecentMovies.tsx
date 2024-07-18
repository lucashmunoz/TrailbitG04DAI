import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchGenres } from "../../../state/slices/home/asyncThunks";
import MovieCard from "./MovieCard";
import colors from "../../styles/colors";
import { FlashList } from "@shopify/flash-list";
import GenreButtons from "./GenreButtons";
import { fetchRecentMovies } from "../../../state/slices/recentMovies/asyncThunks";

const RecentMovies = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { genres } = useAppSelector(state => state.home);
  const { recentMovies } = useAppSelector(state => state.recentMovies);

  useEffect(() => {
    dispatch(fetchGenres()), dispatch(fetchRecentMovies({ page: 1 }));
  }, [dispatch]);

  const handleScroll = ({ nativeEvent }) => {};

  const mapData = () => {
    return recentMovies.map(movie => ({
      ...movie,
      id: movie.id.toString(),
      image: movie.posterPath
    }));
  };

  return (
    <View style={styles.container}>
      <Text style={styles.recentsTitle}>Recientes</Text>
      <GenreButtons genres={genres} />
      <FlashList
        data={mapData()}
        renderItem={({ item }) => <MovieCard item={item} />}
        keyExtractor={item => item.id.toString()}
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
  },
  errorText: {
    color: "red",
    fontSize: 18,
    textAlign: "center",
    marginTop: 20
  }
});

export default RecentMovies;
