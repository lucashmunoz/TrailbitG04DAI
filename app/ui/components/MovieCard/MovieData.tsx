import React from "react";
import { Text, View, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faStar } from "@fortawesome/free-solid-svg-icons";
import colors from "../../styles/colors";
import { Movie } from "../../types/movie";

interface MovieDataProps {
  movie: Movie;
}

const MovieData = ({ movie }: MovieDataProps) => {
  const { title, releaseDate, voteAverage, voteCount } = movie;

  const releaseYear = releaseDate?.substring(0, 4);

  return (
    <View style={styles.container}>
      <Text style={styles.title}>{title}</Text>
      <View style={styles.row}>
        <View style={styles.voteContainer}>
          <Text style={styles.vote}>{voteAverage} </Text>
          <FontAwesomeIcon icon={faStar} style={styles.icon} size={14} />
          {Boolean(voteCount) && (
            <Text style={styles.vote}> ({voteCount})</Text>
          )}
        </View>
        {releaseYear && <Text style={styles.releaseYear}>{releaseYear}</Text>}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: "100%",
    flex: 1,
    gap: 4,
    justifyContent: "space-between"
  },
  title: {
    color: colors.neutral50,
    fontSize: 14,
    fontWeight: "semibold",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  row: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  voteContainer: {
    flexDirection: "row",
    alignItems: "center"
  },
  vote: {
    color: colors.neutral50,
    fontSize: 12,
    fontWeight: "light"
  },
  icon: { color: colors.neutral50 },
  releaseYear: {
    color: colors.neutral50,
    fontSize: 12,
    fontWeight: "light"
  }
});

export default MovieData;
