import React from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faAngleRight } from "@fortawesome/free-solid-svg-icons";
import { Movie } from "../../types/movie";
import colors from "../../styles/colors";
import MovieData from "./MovieData";
import { IMAGES } from "../../../assets/images";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import NavigatorConstant from "../../../navigation/NavigatorConstant";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface MovieCardProps {
  movie: Movie;
}

const MovieCard = ({ movie }: MovieCardProps) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  const { backdropPath } = movie;

  const movieImage = backdropPath ? { uri: backdropPath } : IMAGES.NO_IMAGE;

  return (
    <TouchableOpacity
      onPress={() => navigation.navigate(NavigatorConstant.MovieDetails)}>
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image source={movieImage} style={styles.image} />
        </View>

        <View style={styles.dataContainer}>
          <MovieData movie={movie} />
        </View>

        <View style={styles.caretContainer}>
          <FontAwesomeIcon icon={faAngleRight} style={styles.icon} size={32} />
        </View>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    gap: 16,
    height: 90,
    flexDirection: "row",
    alignItems: "center",
    paddingTop: 16
  },
  imageContainer: {
    width: 140,
    height: undefined
  },
  image: {
    width: 140,
    height: undefined,
    aspectRatio: 16 / 9
  },
  dataContainer: { flex: 1 },
  caretContainer: { width: 40, alignSelf: "center" },
  icon: { color: colors.neutral50 }
});

export default MovieCard;
