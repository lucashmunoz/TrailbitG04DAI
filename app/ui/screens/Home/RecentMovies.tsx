import React, { useEffect, useState } from "react";
import { View, Text, StyleSheet } from "react-native";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchGenres } from "../../../state/slices/home/asyncThunks";
import MovieCard from "./MovieCard";
import colors from "../../styles/colors";
import { FlashList } from "@shopify/flash-list";
import GenreButtons from "./GenreButtons";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import { fetchRecentMovies } from "../../../state/slices/recentMovies/asyncThunks";

const RecentMovies = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { loading: genresLoading, genres } = useAppSelector(
    state => state.home
  );
  const { loading: recentMoviesLoading, recentMovies } = useAppSelector(
    state => state.recentMovies
  );
  const [genreSearch, setGenreSearch] = useState("");

  useEffect(() => {
    dispatch(fetchGenres()),
      dispatch(fetchRecentMovies({ page: 1, genre: genreSearch }));
  }, [dispatch, genreSearch]);

  const handleScroll = ({ nativeEvent }) => {};

  const mapData = () => {
    return recentMovies.map(movie => ({
      ...movie,
      image: movie.posterPath
    }));
  };

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
      <Text style={styles.recentsTitle}>Recientes</Text>
      {recentMoviesLoading || genresLoading ? (
        <FlashList
          data={loadingMovies}
          renderItem={() => <MovieCardLoader />}
          keyExtractor={item => item.id.toString()}
          horizontal
          estimatedItemSize={9}
          scrollEventThrottle={50}
        />
      ) : (
        <>
          <GenreButtons
            genres={genres}
            setStateGenre={setGenreSearch}
            stateGenre={genreSearch}
          />
          <FlashList
            data={mapData()}
            renderItem={({ item }) => <MovieCard item={item} />}
            keyExtractor={item => item.id.toString()}
            numColumns={3}
            estimatedItemSize={120}
            onMomentumScrollEnd={handleScroll}
            scrollEventThrottle={50}
          />
        </>
      )}
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
