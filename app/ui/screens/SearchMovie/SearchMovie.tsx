import React, { useEffect, useRef, useState } from "react";
import {
  SafeAreaView,
  Text,
  View,
  StyleSheet,
  StatusBar,
  ActivityIndicator
} from "react-native";
import { useDebounce } from "use-debounce";
import { FlashList } from "@shopify/flash-list";
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
  const [isOrderDisabled, setIsOrderDisabled] = useState(true);

  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 500, {
    maxWait: 2000
  });

  const [searchPage, setSearchPage] = useState(1); // Inicializamos searchPage en 1
  const [paginationLoader, setPaginationLoader] = useState(false);

  const [rateOrderState, setRateOrderState] =
    useState<ToggleOrderButtonState>("none");
  const [debouncedRateOrderState] = useDebounce(rateOrderState, 500, {
    maxWait: 2000
  });
  const [dateOrderState, setDateOrderState] =
    useState<ToggleOrderButtonState>("none");
  const [debouncedDateOrderState] = useDebounce(dateOrderState, 500, {
    maxWait: 2000
  });

  const fetchMoviesErrorToastRef = useRef<ToastHandle>(null);

  const noSearchProvided = searchValue.length === 0;

  const getNewToggleState = (oldState: ToggleOrderButtonState) => {
    switch (oldState) {
      case "asc":
        return "none";
      case "desc":
        return "asc";
      case "none":
      default:
        return "desc";
    }
  };

  const noResults =
    debouncedSearchValue.length !== 0 && moviesBySearch.length === 0;

  const movies =
    typeOfResponse === "popular" || noResults ? popularMovies : moviesBySearch;

  const fetchMovies = ({ page = searchPage }: { page?: number }) => {
    if (debouncedSearchValue.length === 0) {
      setIsOrderDisabled(true);
      dispatch(fetchPopularMovies({ page }));
    } else {
      dispatch(
        fetchMoviesBySearch({
          searchValue: debouncedSearchValue,
          rateOrderState: debouncedRateOrderState,
          dateOrderState: debouncedDateOrderState,
          page
        })
      );
    }
  };

  useEffect(() => {
    fetchMovies({ page: 1 });
    setPaginationLoader(false);
    setSearchPage(1);
  }, [debouncedSearchValue, debouncedRateOrderState, debouncedDateOrderState]);

  useEffect(() => {
    setRateOrderState("none");
    setDateOrderState("none");
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
    if (typeOfResponse === "popular" || noResults) {
      setIsOrderDisabled(true);
    } else {
      setIsOrderDisabled(false);
    }
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
          disabled={isOrderDisabled}
          onPress={() => {
            setRateOrderState(getNewToggleState(rateOrderState));
          }}
        />

        <ToggleOrderButton
          text="Fecha Publicación"
          state={dateOrderState}
          disabled={isOrderDisabled}
          onPress={() => {
            setDateOrderState(getNewToggleState(dateOrderState));
          }}
        />
      </View>

      {loading && !paginationLoader ? (
        <LoadingIndicator color={colors.neutral50} />
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
            <FlashList
              onMomentumScrollEnd={handleScroll}
              scrollEventThrottle={50}
              data={movies}
              estimatedItemSize={120}
              renderItem={({ item }) => <MovieCard movie={item} />}
              keyExtractor={(movie, index) => `${movie.id} - ${index}`}
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
    gap: 12,
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
    textAlign: "left"
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
    paddingTop: 8
  }
});

export default SearchMovie;
