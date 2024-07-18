import React from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import NavigatorConstant from "../../../navigation/NavigatorConstant";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface MovieCardProps {
  item: {
    id: number;
    image: string;
  };
}

const MovieCard: React.FC<MovieCardProps> = ({ item }) => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();
  return (
    <TouchableOpacity
      onPress={() =>
        navigation.navigate(NavigatorConstant.MovieDetails, {
          movieId: item.id
        })
      }>
      <View style={styles.movieCard}>
        <Image
          source={{ uri: item.image }}
          style={styles.image}
          resizeMode="contain"
        />
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  movieCard: {
    marginHorizontal: 8
  },
  image: {
    height: 180,
    width: 120
  }
});

export default MovieCard;
