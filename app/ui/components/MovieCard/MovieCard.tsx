import React from "react";
import { Image, Text, View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Movie } from "../../types/movie";
import colors from "../../styles/colors";
import MovieData from "./MovieData";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const { posterPath } = movie;

  return (
    <View style={styles.container}>
      <View style={styles.imageContainer}>
        <Image source={{ uri: posterPath }} style={styles.image} />
      </View>

      <View style={styles.dataContainer}>
        <MovieData movie={movie} />
      </View>

      <View style={styles.caretContainer}>
        <FontAwesomeIcon icon={faAngleRight} style={styles.icon} size={32} />
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flexDirection: "row",
    gap: 16
  },
  imageContainer: {
    width: 140,
    height: undefined
  },
  image: {
    aspectRatio: 16 / 9
  },
  dataContainer: { flex: 1 },
  caretContainer: { width: 40, alignSelf: "center" },
  icon: { color: colors.neutral50 }
});

export default MovieCard;
