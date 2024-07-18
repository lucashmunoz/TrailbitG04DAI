import React, { useState } from "react";
import { TouchableOpacity, Text, StyleSheet, View } from "react-native";
import colors from "../../styles/colors";
import { FlashList } from "@shopify/flash-list";

interface GenreButtonsProps {
  genres: Genre[];
  stateGenre: String;
  setStateGenre: Function;
}

interface Genre {
  id: string;
  name: string;
}

const GenreButtons = ({
  genres,
  stateGenre,
  setStateGenre
}: GenreButtonsProps): React.JSX.Element => {
  const Genre = ({ genre }: { genre: Genre }) => {
    console.log(genre);
    const handlePress = (genre: Genre) => {
      if (stateGenre === genre.id) {
        setStateGenre("");
      } else {
        setStateGenre(genre.id);
      }
    };

    return (
      <View style={styles.genreButtonContainer}>
        <TouchableOpacity
          style={[
            styles.button,
            stateGenre === genre.id ? styles.clicked : styles.unclicked
          ]}
          onPress={() => handlePress(genre)}>
          <Text style={styles.buttonText}>{genre.name}</Text>
        </TouchableOpacity>
      </View>
    );
  };

  const selectedGenre = genres.find(genre => genre.id.toString() == stateGenre);

  return (
    <View style={styles.container}>
      {selectedGenre ? (
        <Genre genre={selectedGenre} />
      ) : (
        <FlashList
          data={genres}
          extraData={stateGenre}
          renderItem={({ item }) => <Genre genre={item} />}
          keyExtractor={item => item.id.toString()}
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
