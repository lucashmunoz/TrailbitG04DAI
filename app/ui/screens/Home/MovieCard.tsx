import React from "react";
import {
  View,
  StyleSheet,
  Image,
  TouchableOpacity,
  Dimensions
} from "react-native";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import NavigatorConstant from "../../../navigation/NavigatorConstant";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";

interface MovieCardProps {
  item: {
    id: string;
    image: string;
  };
}

const { width } = Dimensions.get("window");

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
    width: width * 0.28,
    marginHorizontal: 10
  },
  image: {
    width: "100%",
    height: 180
  }
});

export default MovieCard;
