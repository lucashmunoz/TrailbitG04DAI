import React from "react";
import { Text, View, StyleSheet, Image } from "react-native";
import { Cast } from "../../types/movieDetail";

interface CastDataProps {
  cast: Cast;
}

const CastCard = ({ cast }: CastDataProps) => {
  const { id, name, character, known_for_department, profile_path } = cast;

  return (
    <View style={styles.container}>
      <Image source={{ uri: profile_path }} style={styles.image} />
      <Text style={styles.name}>{name}</Text>
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    width: 64,
    display: "flex",
    gap: 4,
    height: 138,
    justifyContent: "space-between"
  },
  image: {
    width: 64,
    height: "100%",
    resizeMode: "stretch",
    aspectRatio: 2 / 3
  },
  name: {
    fontSize: 25.2,
    fontWeight: "semibold",
    flexWrap: "wrap",
    alignItems: "flex-start"
  }
});

export default CastCard;
