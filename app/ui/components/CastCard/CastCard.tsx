import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Cast } from "../../types/movieDetail";

interface CastDataProps {
  cast: Cast;
}
const cardWidth = 90;

const CastCard = ({ cast }: CastDataProps) => {
  const { name, character, known_for_department, profile_path } = cast;

  return (
    <View style={styles.container}>
      <Image source={{ uri: profile_path }} style={styles.image} />
      <View style={styles.castData}>
        <Text style={styles.name}>{name}</Text>
        {known_for_department == "Director" ? (
          <Text style={styles.role}>{known_for_department}</Text>
        ) : (
          <Text style={styles.role}>{character}</Text>
        )}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    display: "flex",
    flexDirection: "column",
    gap: 8,
    width: cardWidth
  },
  image: {
    width: cardWidth,
    resizeMode: "stretch",
    aspectRatio: 2 / 3
  },
  castData: {
    display: "flex"
  },
  name: {
    width: cardWidth,
    color: "white",
    fontSize: 13,
    fontWeight: "semibold",
    flex: 1,
    flexWrap: "wrap"
  },
  role: {
    width: cardWidth,
    color: "white",
    fontSize: 13,
    fontFamily: "Roboto-LightItalic",
    flex: 1,
    flexWrap: "wrap"
  }
});

export default CastCard;
