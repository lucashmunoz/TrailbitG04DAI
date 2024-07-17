import React, { useEffect } from "react";
import {
  SafeAreaView,
  StyleSheet,
  StatusBar,
  ScrollView,
  View,
  Image
} from "react-native";
import FavoriteMovies from "./FavoriteMovies";
import RecentMovies from "./RecentMovies";
import colors from "../../styles/colors";
import { IMAGES } from "../../../assets/images";
import { fetchFavoriteMovies } from "../../../state/slices/movies/asyncThunks";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { selectFavoriteMovies } from "../../../state/slices/movies/moviesSlice";
import MainMovie from "./MainMovie";

const Home = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.movies);
  const favoriteMovies = useAppSelector(selectFavoriteMovies);

  const movies = favoriteMovies;

  useEffect(() => {
    dispatch(fetchFavoriteMovies());
  }, [dispatch]);

  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar backgroundColor={colors.neutral900} />
      <ScrollView>
        <MainMovie />
        <View style={styles.moviesContainer}>
          {favoriteMovies.length > 0 && (
            <FavoriteMovies movies={favoriteMovies} />
          )}
          <RecentMovies />
        </View>
      </ScrollView>
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
