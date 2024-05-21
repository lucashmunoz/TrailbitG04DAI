import React, { useState } from "react";
import { SafeAreaView, Text, View, ScrollView, StyleSheet } from "react-native";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import colors from "../../styles/colors";
import TextField from "../../components/TextField";
import { Movies } from "../../types/movie";
import MovieCard from "../../components/MovieCard";

const movies: Movies = [
  {
    id: 0,
    title: "Godzilla x Kong: The New Empire",
    subtitle: "Rise together or fall alone.",
    overview:
      "Following their explosive showdown, Godzilla and Kong must reunite against a colossal undiscovered threat hidden within our world, challenging their very existence – and our own.",
    posterPath:
      "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/nDCN5WubZtnrUy5B1q67xde4wQI.jpg",
    release_date: "2024-03-27",
    duration: "1h 55m",
    vote_average: 7.235,
    vote_count: 1862
  },
  {
    id: 1,
    title: "Kingdom of the Planet of the Apes",
    subtitle: "No one can stop the reign.",
    overview:
      "Several generations in the future following Caesar's reign, apes are now the dominant species and live harmoniously while humans have been reduced to living in the shadows. As a new tyrannical ape leader builds his empire, one young ape undertakes a harrowing journey that will cause him to question all that he has known about the past and to make choices that will define a future for apes and humans alike.",
    posterPath:
      "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/fqv8v6AycXKsivp1T5yKtLbGXce.jpg",
    release_date: "2024-04-25",
    duration: "2h 25m",
    vote_average: 235,
    vote_count: 862
  },
  {
    id: 2,
    title: "Shrek",
    subtitle: "The greatest fairy tale never told.",
    overview:
      "It ain't easy bein' green -- especially if you're a likable (albeit smelly) ogre named Shrek. On a mission to retrieve a gorgeous princess from the clutches of a fire-breathing dragon, Shrek teams up with an unlikely compatriot -- a wisecracking donkey.",
    posterPath:
      "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/sRvXNDItGlWCqtO3j6wks52FmbD.jpg",
    release_date: "2001-01-19",
    duration: "1h 30m",
    vote_average: 8.235,
    vote_count: 9861
  },
  {
    id: 3,
    title: "Dune: Part Two",
    subtitle: "Long live the fighters.",
    overview:
      "Follow the mythic journey of Paul Atreides as he unites with Chani and the Fremen while on a path of revenge against the conspirators who destroyed his family. Facing a choice between the love of his life and the fate of the known universe, Paul endeavors to prevent a terrible future only he can foresee.",
    posterPath:
      "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/xOMo8BRK7PfcJv9JCnx7s5hj0PX.jpg",
    release_date: "2024-04-29",
    duration: "2h 47m",
    vote_average: 8.745,
    vote_count: 4761
  },
  {
    id: 4,
    title: "Ghostbusters: Frozen Empire",
    subtitle: "It'll send a chill down your spine.",
    overview:
      "After the original team developed a top-secret research laboratory to take the shattered ghosts to the next level. But when the discovery of an ancient artifact unleashes an evil force, both new and old must join forces to protect their homeland and save the world from the Second Ice Age... from the very thing that unleashes an unstoppable force from the depths of history. As chaos reigns and pure evil plunges the world into darkness, the Ghostbusters must step forward once again to save humanity from the brink of doom. With two generations of Ghostbusters fighting side by side, the stakes have never been higher. Will they be able to avert the inevitable before everything freezes?",
    posterPath:
      "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/wODqakS0jinTUECNS6n4VomQbew.jpg",
    release_date: "2024-05-02",
    duration: "1h 55m",
    vote_average: 6.75,
    vote_count: 2461
  },
  {
    id: 5,
    title: "Interstellar",
    subtitle: "Mankind was born on Earth. It was never meant to die here.",
    overview:
      "The adventures of a group of explorers who make use of a newly discovered wormhole to surpass the limitations on human space travel and conquer the vast distances involved in an interstellar voyage.",
    posterPath:
      "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/xJHokMbljvjADYdit5fK5VQsXEG.jpg",
    release_date: "2014",
    duration: "2h 49m",
    vote_average: 9.417,
    vote_count: 10761
  },
  {
    id: 6,
    title: "Joker",
    subtitle: "Put on a happy face.",
    overview:
      "During the 1980s, a failed stand-up comedian is driven insane and turns to a life of crime and chaos in Gotham City while becoming an infamous psychopathic crime figure.",
    posterPath:
      "https://media.themoviedb.org/t/p/w533_and_h300_bestv2/2nbKZ5RWFSvjq5IGVRcz8kAolmw.jpg",
    release_date: "2019-10-03",
    duration: "2h 2m",
    vote_average: 7.987,
    vote_count: 7894
  }
];

const SearchMovie = (): React.JSX.Element => {
  const [searchValue, setSearchValue] = useState("");

  const noSearchInputTyped = searchValue.length === 0;

  return (
    <SafeAreaView style={styles.searchMovieContainer}>
      <View style={styles.inputSearchContainer}>
        <TextField
          placeholder="Buscar película por nombre o actor"
          icon={faMagnifyingGlass}
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>

      {noSearchInputTyped && (
        <Text style={styles.popularMoviesTitle}>Más populares</Text>
      )}

      <ScrollView style={styles.scrollMoviesContainer}>
        <View style={styles.moviesViewContainer}>
          {movies.map(movie => {
            const { id } = movie;
            return <MovieCard key={id} movie={movie} />;
          })}
        </View>
      </ScrollView>
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  searchMovieContainer: {
    backgroundColor: colors.neutral900,
    flex: 1,
    gap: 20,
    paddingHorizontal: 24,
    paddingTop: 64,
    paddingBottom: 16,
    width: "100%",
    alignItems: "center"
  },
  inputSearchContainer: {
    width: "100%"
  },
  popularMoviesTitle: {
    color: colors.neutral50,
    fontSize: 22,
    fontWeight: "semibold",
    width: "100%",
    textAlign: "left"
  },
  scrollMoviesContainer: {
    flex: 1,
    width: "100%"
  },
  moviesViewContainer: {
    gap: 20
  }
});

export default SearchMovie;
