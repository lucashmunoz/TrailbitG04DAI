import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator,
  FlatList
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

const SearchMovie = (): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { loading, error } = useAppSelector(state => state.movies);
  const typeOfResponse = useAppSelector(selectTypeOfResponse);
  const moviesBySearch = useAppSelector(selectMoviesBySearch);
  const popularMovies = useAppSelector(selectPopularMovies);
  const [orderDateEnabled, setOrderDateEnabled] = useState(true);
  const [orderCalificationEnabled, setOrderCalificationEnabled] =
    useState(true);

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 500, {
    maxWait: 2000
  });

  const [searchPage, setSearchPage] = useState(1); // Inicializamos searchPage en 1
  const [paginationLoader, setPaginationLoader] = useState(false);

  const [rateOrderState, setRateOrderState] =
    useState<ToggleOrderButtonState>("none");
  const [dateOrderState, setDateOrderState] =
    useState<ToggleOrderButtonState>("none");

  const fetchMoviesErrorToastRef = useRef<ToastHandle>(null);

  const noSearchProvided = searchValue.length === 0;

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

  const movies =
    typeOfResponse === "popular" || noResults ? popularMovies : moviesBySearch;

  const fetchMovies = ({ page = searchPage }: { page?: number }) => {
    if (debouncedSearchValue.length === 0) {
      dispatch(fetchPopularMovies({ page }));
    } else {
      dispatch(
        fetchMoviesBySearch({
          searchValue: debouncedSearchValue,
          rateOrderState,
          dateOrderState,
          page
        })
      );
    }
  };

  useEffect(() => {
    fetchMovies({ page: 1 });
    setPaginationLoader(false);
    setSearchPage(1);
  }, [debouncedSearchValue]);

  useEffect(() => {
    if (error.length !== 0) {
      fetchMoviesErrorToastRef?.current?.error(
        "Se produjo un error al intentar buscar las películas. Por favor intente nuevamente."
      );
    }
  }, [error]);

  const handleScroll = ({ nativeEvent }) => {
    const { layoutMeasurement, contentOffset, contentSize } = nativeEvent;
    if (layoutMeasurement.height + contentOffset.y >= contentSize.height - 20) {
      if (!loading) {
        setSearchPage(prev => prev + 1);
        setPaginationLoader(true);
        fetchMovies({ page: searchPage + 1 });
      }
    }
  };

  useEffect(() => {
    console.log(typeOfResponse);
    console.log(noResults);
    if (typeOfResponse === "popular" || noResults) {
      setOrderCalificationEnabled(true);
      setOrderDateEnabled(true);
    } else {
      setOrderCalificationEnabled(false);
      setOrderDateEnabled(false);
    }

    console.log(orderCalificationEnabled, orderDateEnabled);
  }, [typeOfResponse, noResults]);

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
          disabled={orderCalificationEnabled}
          onPress={() => {
            setRateOrderState(getNewToggleState(rateOrderState));
          }}
        />

        <ToggleOrderButton
          text="Fecha Publicación"
          state={dateOrderState}
          disabled={orderDateEnabled}
          onPress={() => {
            setDateOrderState(getNewToggleState(dateOrderState));
          }}
        />
      </View>

      {loading && !paginationLoader ? (
        <LoadingIndicator />
      ) : (
        <>
          {noResults && (
            <Text style={styles.noResultsText}>
              ¡Ups! No encontramos películas con esa búsqueda.
            </Text>
          )}

          {(noSearchProvided || noResults) && (
            <Text style={styles.popularMoviesTitle}>Más populares</Text>
          )}

          <View style={styles.moviesViewContainer}>
            <FlatList
              onScroll={handleScroll}
              onMomentumScrollEnd={handleScroll}
              scrollEventThrottle={50}
              data={movies}
              renderItem={({ item }) => <MovieCard movie={item} />}
              keyExtractor={movie => movie.id.toString()}
            />
          </View>
          {loading && paginationLoader && (
            <ActivityIndicator size="large" color={colors.neutral50} />
          )}
        </>
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
    flexDirection: "row",
    flex: 1,
    width: "100%"
  },
  noResultsText: {
    color: colors.neutral50,
    fontSize: 18,
    fontWeight: "semibold",
    width: "100%",
    textAlign: "left",
    gap: 20,
    paddingBottom: 20
  }
});

export default SearchMovie;
