import React from "react";
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

const Home = (): React.JSX.Element => {
  return (
    <SafeAreaView style={styles.homeContainer}>
      <StatusBar backgroundColor={colors.neutral900} />
      <ScrollView>
        <View style={styles.principalMovieContainer}>
          <Image
            source={IMAGES.BACKGROUND_HOME}
            style={styles.backgroundImage}
          />

          <Image
            source={IMAGES.PRINCIPAL_MOVIE}
            style={styles.principalMovieImage}
          />
        </View>

        <View style={styles.moviesContainer}>
          <FavoriteMovies />
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
    top: 300 - 75,
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
