import React from "react";
import { View, Text, StyleSheet } from "react-native";
import MovieCard from "./MovieCard";
import colors from "../../styles/colors";
import { FlashList } from "@shopify/flash-list";
import GenreButtons from "./GenreButtons";

const movies = [
  {
    id: "1",
    title: "Movie 1",
    image:
      "https://res.cloudinary.com/dtrj85lgu/image/upload/v1720543446/uk9isj3wa4yhe98ucv8q.jpg"
  },
  {
    id: "2",
    title: "Movie 2",
    image:
      "https://res.cloudinary.com/dtrj85lgu/image/upload/v1720543446/uk9isj3wa4yhe98ucv8q.jpg"
  },
  {
    id: "3",
    title: "Movie 3",
    image:
      "https://res.cloudinary.com/dtrj85lgu/image/upload/v1720543446/uk9isj3wa4yhe98ucv8q.jpg"
  },
  {
    id: "4",
    title: "Movie 4",
    image:
      "https://res.cloudinary.com/dtrj85lgu/image/upload/v1720543446/uk9isj3wa4yhe98ucv8q.jpg"
  },
  {
    id: "5",
    title: "Movie 5",
    image:
      "https://res.cloudinary.com/dtrj85lgu/image/upload/v1720543446/uk9isj3wa4yhe98ucv8q.jpg"
  },
  {
    id: "6",
    title: "Movie 6",
    image:
      "https://res.cloudinary.com/dtrj85lgu/image/upload/v1720543446/uk9isj3wa4yhe98ucv8q.jpg"
  },
  {
    id: "7",
    title: "Movie 7",
    image:
      "https://res.cloudinary.com/dtrj85lgu/image/upload/v1720543446/uk9isj3wa4yhe98ucv8q.jpg"
  },
  {
    id: "8",
    title: "Movie 8",
    image:
      "https://res.cloudinary.com/dtrj85lgu/image/upload/v1720543446/uk9isj3wa4yhe98ucv8q.jpg"
  }
];

const RecentMovies = (): React.JSX.Element => {
  const handleScroll = ({ nativeEvent }) => {};
  return (
    <View style={styles.container}>
      <Text style={styles.recentsTitle}>Recientes</Text>
      <GenreButtons />
      <FlashList
        data={movies}
        renderItem={({ item }) => <MovieCard item={item} />}
        keyExtractor={item => item.id}
        numColumns={3}
        estimatedItemSize={120}
        onMomentumScrollEnd={handleScroll}
        scrollEventThrottle={50}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center",
    backgroundColor: colors.neutral900,
    gap: 10
  },
  recentsTitle: {
    fontSize: 18,
    fontWeight: "bold",
    color: colors.neutral50
  }
});

export default RecentMovies;
