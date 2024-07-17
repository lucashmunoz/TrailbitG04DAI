import React, { useEffect } from "react";
import { View, StyleSheet, Image } from "react-native";
import { fetchMainMovie } from "../../../state/slices/mainMovie/asyncThunks";
import { useAppDispatch, useAppSelector } from "../../../state/store";

const MainMovie = () => {
  const dispatch = useAppDispatch();
  const { mainMovie, loading, error } = useAppSelector(
    state => state.mainMovie
  );

  useEffect(() => {
    dispatch(fetchMainMovie());
  }, [dispatch]);

  return (
    <View style={styles.principalMovieContainer}>
      <Image
        source={{ uri: mainMovie.images[0]?.file_path }}
        style={styles.backgroundImage}
      />
      <Image
        source={{ uri: mainMovie.images[1]?.file_path }}
        style={styles.principalMovieImage}
      />
    </View>
  );
};

const styles = StyleSheet.create({
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
  }
});

export default MainMovie;
