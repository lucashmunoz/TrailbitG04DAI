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
    backgroundColor: colors.neutral900
  },
  principalMovieContainer: {},
  moviesContainer: {},
  backgroundImage: {
    width: 420,
    height: 350,
    resizeMode: "cover"
  }
});

export default Home;
