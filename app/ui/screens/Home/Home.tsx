import React, { useEffect, useState } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  Text,
  FlatList,
  View
} from "react-native";
import FavoriteMovies from "./FavoriteMovies";
import colors from "../../styles/colors";
import { fetchFavoriteMovies } from "../../../state/slices/movies/asyncThunks";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { selectFavoriteMovies } from "../../../state/slices/movies/moviesSlice";
import { selectFavoriteMoviesLoading } from "../../../state/slices/movies/moviesSlice";
import { fetchRecentMovies } from "../../../state/slices/recentMovies/asyncThunks";
import MainMovie from "./MainMovie";
import GenreButtons from "./GenreButtons";
import MovieCard from "./MovieCard";
import { fetchGenres } from "../../../state/slices/home/asyncThunks";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";

const Home = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const favoriteMovies = useAppSelector(selectFavoriteMovies);
  const favoriteMoviesLoading = useAppSelector(selectFavoriteMoviesLoading);

  const { loading: genresLoading, genres } = useAppSelector(
    state => state.home
  );
  const { loading: recentMoviesLoading, recentMovies } = useAppSelector(
    state => state.recentMovies
  );
  const [genreSearch, setGenreSearch] = useState("");
  const [recentMoviesPage, setRecentMoviesPage] = useState(1); // Inicializamos en la primera pagina

  useEffect(() => {
    dispatch(fetchGenres());
    dispatch(fetchRecentMovies({ page: 1, genre: genreSearch }));
  }, [dispatch, genreSearch]);

  const handleScroll = () => {
    if (!recentMoviesLoading) {
      setRecentMoviesPage(prev => prev + 1);
      dispatch(
        fetchRecentMovies({ page: recentMoviesPage + 1, genre: genreSearch })
      );
    }
  };

  const recentMoviesWithImages = recentMovies.map(movie => ({
    ...movie,
    image: movie.posterPath
  }));

  const loadingMovies = Array.from({ length: 9 }, (_, i) => ({
    id: i + 1,
    image: ""
  }));

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

  useEffect(() => {
    dispatch(fetchFavoriteMovies());
  }, [dispatch]);

  const isRecentMoviesContentLoading = recentMovies.length === 0;

  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar backgroundColor={colors.neutral900} />

      <FlatList
        nestedScrollEnabled
        data={
          isRecentMoviesContentLoading ? loadingMovies : recentMoviesWithImages
        }
        renderItem={({ item }) => {
          if (isRecentMoviesContentLoading) {
            return <MovieCardLoader />;
          } else {
            return <MovieCard item={item} />;
          }
        }}
        keyExtractor={item => item.id.toString()}
        numColumns={3}
        extraData={recentMoviesWithImages}
        onEndReached={handleScroll}
        onEndReachedThreshold={0.8}
        scrollEventThrottle={50}
        columnWrapperStyle={{ paddingLeft: 16, paddingTop: 10 }}
        ListHeaderComponent={
          <>
            <MainMovie />
            <View style={styles.moviesContainer}>
              {(favoriteMovies.length > 0 || favoriteMoviesLoading) && (
                <FavoriteMovies movies={favoriteMovies} />
              )}
              <Text style={styles.recentsTitle}>Recientes</Text>
              {genres.length > 0 && (
                <GenreButtons
                  genres={genres}
                  setStateGenre={setGenreSearch}
                  stateGenre={genreSearch}
                />
              )}
            </View>
          </>
        }
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  homeContainer: {
    backgroundColor: colors.neutral900,
    flex: 1
  },
  principalMovieContainer: {
    width: "100%",
    height: 375,
    overflow: "hidden",
    alignItems: "center"
  },
  backgroundImage: {
    height: 300,
    aspectRatio: 16 / 9
  },
  recentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.neutral50
  },
  principalMovieImage: {
    position: "absolute",
    height: 150,
    top: 225,
    overflow: "hidden",
    width: 266
  },
  moviesContainer: {
    gap: 10,
    flex: 1,
    paddingLeft: 16,
    paddingTop: 16
  }
});

export default Home;
