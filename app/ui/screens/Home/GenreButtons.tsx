import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import colors from "../../styles/colors";
import { FlashList } from "@shopify/flash-list";

interface GenreButtonsProps {
  genres: Genre[];
}

interface Genre {
  id: string;
  name: string;
}

const GenreButtons = ({ genres }: GenreButtonsProps): React.JSX.Element => {
  const [selectedGenreID, setSelectedGenreID] = useState("");

  const Genre = ({ genre }: { genre: Genre }) => {
    const handlePress = (genreID: Genre["id"]) => {
      if (selectedGenreID === genreID) {
        setSelectedGenreID("");
      } else {
        setSelectedGenreID(genre.id);
      }
    };

    return (
      <View style={styles.genreButtonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            selectedGenreID === genre.id ? styles.clicked : styles.unclicked
          ]}
          onPress={() => handlePress(genre.id)}>
          <Text style={styles.buttonText}>{genre.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const selectedGenre = genres.find(genre => genre.id === selectedGenreID);

  return (
    <View style={styles.container}>
      {selectedGenre ? (
        <Genre genre={selectedGenre} />
      ) : (
        <FlashList
          data={genres}
          extraData={selectedGenreID}
          renderItem={({ item }) => <Genre genre={item} />}
          keyExtractor={item => item.id}
          horizontal
          estimatedItemSize={genres.length}
          showsHorizontalScrollIndicator={false}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: "row",
    flexWrap: "wrap",
    gap: 10
  },
  genreButtonContainer: {
    paddingHorizontal: 4
  },
  button: {
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 12,
    width: 108,
    height: 30
  },
  unclicked: {
    backgroundColor: colors.neutral500
  },
  clicked: {
    backgroundColor: colors.primary500
  },
  buttonText: {
    color: colors.neutral50,
    fontSize: 14
  }
});

export default GenreButtons;
