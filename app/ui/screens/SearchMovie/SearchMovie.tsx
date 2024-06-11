import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  ScrollView,
  StyleSheet,
  StatusBar
} from "react-native";
import { useDebounce } from "use-debounce";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import colors from "../../styles/colors";
import TextField from "../../components/TextField";
import MovieCard from "../../components/MovieCard";
import {
  fetchMoviesBySearch,
  fetchPopularMovies
} from "../../../state/slices/movies/asyncThunks";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import LoadingIndicator from "../../components/LoadingIndicator";
import ToggleOrderButton, {
  ToggleOrderButtonState
} from "../../components/ToggleOrder";
import Toast, { ToastHandle } from "../../components/Toast";
import {
  selectTypeOfResponse,
  selectMoviesBySearch,
  selectPopularMovies
} from "../../../state/slices/movies/moviesSlice";
import { Movies } from "../../types/movie";

const SearchMovie = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.movies);
  const typeOfResponse = useAppSelector(selectTypeOfResponse);
  const moviesBySearch = useAppSelector(selectMoviesBySearch);
  const popularMovies = useAppSelector(selectPopularMovies);

  const [searchValue, setSearchValue] = useState("");
  // Debounce para no llamar a la api hasta que el usuario deje de escribir
  const [debouncedSearchValue] = useDebounce(searchValue, 500, {
    maxWait: 2000
  });

  const [rateOrderState, setRateOrderState] =
    useState<ToggleOrderButtonState>("none");
  const [dateOrderState, setDateOrderState] =
    useState<ToggleOrderButtonState>("none");

  const fetchMoviesErrorToastRef = useRef<ToastHandle>(null);

  const noSearchProvided = debouncedSearchValue.length === 0;

  const getNewToggleState = (oldState: ToggleOrderButtonState) => {
    switch (oldState) {
      case "asc":
        return "desc";
      case "desc":
        return "none";
      case "none":
      default:
        return "asc";
    }
  };

  const noResults =
    debouncedSearchValue.length !== 0 && moviesBySearch.length === 0;

  const displayMovies = () => {
    let movies: Movies = [];
    if (typeOfResponse === "popular" || noResults) {
      movies = popularMovies;
    } else {
      movies = moviesBySearch;
    }

    return movies.map(movie => {
      const { id } = movie;
      return <MovieCard key={id} movie={movie} />;
    });
  };

  useEffect(() => {
    if (debouncedSearchValue.length === 0) {
      dispatch(fetchPopularMovies());
    } else {
      dispatch(
        fetchMoviesBySearch({
          searchValue: debouncedSearchValue,
          rateOrderState,
          dateOrderState
        })
      );
    }
  }, [debouncedSearchValue, rateOrderState, dateOrderState]);

  useEffect(() => {
    if (error.length !== 0) {
      fetchMoviesErrorToastRef?.current?.error(
        "Se produjo un error al intentar buscar las películas. Por favor intente nuevamente."
      );
    }
  }, [error]);

  return (
    <SafeAreaView style={styles.searchMovieContainer}>
      <StatusBar backgroundColor={colors.neutral900} />
      <View style={styles.inputSearchContainer}>
        <TextField
          placeholder="Buscar película por nombre o actor"
          icon={faMagnifyingGlass}
          value={searchValue}
          onChangeText={setSearchValue}
        />
      </View>

      <View style={styles.toggleButtonsContainer}>
        <ToggleOrderButton
          text="Calificación"
          state={rateOrderState}
          onPress={() => {
            setRateOrderState(getNewToggleState(rateOrderState));
          }}
        />

        <ToggleOrderButton
          text="Fecha Publicación"
          state={dateOrderState}
          onPress={() => {
            setDateOrderState(getNewToggleState(dateOrderState));
          }}
        />
      </View>

      {loading ? (
        <LoadingIndicator />
      ) : (
        <ScrollView style={styles.scrollMoviesContainer}>
          {noResults && (
            <Text style={styles.noResultsText}>
              ¡Ups! No encontramos películas con esa búsqueda.
            </Text>
          )}

          {(noSearchProvided || noResults) && (
            <Text style={styles.popularMoviesTitle}>Más populares</Text>
          )}

          <View style={styles.moviesViewContainer}>{displayMovies()}</View>
        </ScrollView>
      )}

      <Toast ref={fetchMoviesErrorToastRef} duration={3500} />
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
  toggleButtonsContainer: {
    flexDirection: "row",
    gap: 16,
    width: "100%",
    justifyContent: "flex-end",
    alignItems: "flex-end"
  },
  popularMoviesTitle: {
    color: colors.neutral50,
    fontSize: 22,
    fontWeight: "semibold",
    width: "100%",
    textAlign: "left",
    paddingBottom: 10
  },
  scrollMoviesContainer: {
    flex: 1,
    width: "100%"
  },
  moviesViewContainer: {
    gap: 20
  },
  noResultsText: {
    color: colors.neutral50,
    fontSize: 18,
    fontWeight: "semibold",
    width: "100%",
    textAlign: "left",
    paddingBottom: 10
  }
});

export default SearchMovie;
