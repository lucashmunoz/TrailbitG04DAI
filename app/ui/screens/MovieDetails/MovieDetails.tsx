import React, { useEffect } from "react";
import {
  SafeAreaView,
  Text,
  View,
  Image,
  StyleSheet,
  TouchableOpacity,
  StatusBar,
  FlatList,
  Pressable,
  ScrollView
} from "react-native";
import colors from "../../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faChevronLeft,
  faStar,
  faBookmark as faBookmarkSolid
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import {
  rateMovie,
  fetchMovieDetail,
  toggleFavoriteMovie
} from "../../../state/slices/movieDetail/asyncThunks";
import {
  selectMovieById,
  selectRateLoading,
  selectBookmarkLoading
} from "../../../state/slices/movieDetail/movieSlice";
import { IMAGES } from "../../../assets/images";
import LoadingIndicator from "../../components/LoadingIndicator";
import Button from "../../components/Button";
import CastCard from "../../components/CastCard/CastCard";

interface MovieDetailProps {
  route: { params: { movieId: number } };
}

const MovieDetails = ({ route }: MovieDetailProps): React.JSX.Element => {
  const dispatch = useAppDispatch();
  const { loading } = useAppSelector(state => state.movie);
  const movieById = useAppSelector(selectMovieById);
  const rateLoading = useAppSelector(selectRateLoading);
  const bookmarkLoading = useAppSelector(selectBookmarkLoading);
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const { id: movieId, is_favorite, user_vote } = movieById;

  const fetchMovieDetails = async () => {
    dispatch(fetchMovieDetail({ movieId: route.params.movieId }));
  };

  const handleRateChange = async (vote: number) => {
    dispatch(rateMovie({ movieId, score: vote }));
  };

  const handleBackButtonClick = () => {
    navigation.goBack();
  };

  const handleFavoriteButton = () => {
    dispatch(toggleFavoriteMovie({ movieId }));
  };

  const formatDuration = (duration: number) => {
    const hours = Math.trunc(duration / 60);
    const mins = duration - 60 * hours;
    return `${hours}h ${mins}m`;
  };

  useEffect(() => {
    fetchMovieDetails();
  }, [dispatch]);

  const movieImage = movieById.poster_path
    ? { uri: movieById.poster_path }
    : IMAGES.NO_IMAGE;

  const movieBackdropImage = movieById.backdrop_path
    ? { uri: movieById.backdrop_path }
    : IMAGES.NO_IMAGE;

  const casting = [movieById.director, ...movieById.cast];
  return (
    <SafeAreaView style={styles.movieDetailsContainer}>
      <StatusBar backgroundColor={colors.neutral900} />
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={handleBackButtonClick}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          style={styles.backIcon}
          size={24}
        />
      </TouchableOpacity>
      {!bookmarkLoading && (
        <TouchableOpacity
          style={styles.favoriteButtonContainer}
          onPress={handleFavoriteButton}>
          <FontAwesomeIcon
            icon={is_favorite ? faBookmarkSolid : faBookmarkRegular}
            style={styles.favoriteIcon}
            size={24}
          />
        </TouchableOpacity>
      )}
      {loading ? (
        <LoadingIndicator color={colors.neutral50} />
      ) : (
        <ScrollView contentContainerStyle={{ display: "flex" }}>
          <View style={styles.container}>
            <View style={styles.actions}>
              <Image style={styles.backdropImage} source={movieBackdropImage} />
            </View>
            <View style={styles.description}>
              <View style={styles.movieContainer}>
                <Image source={movieImage} style={styles.image} />
                <View style={styles.movieDataContainer}>
                  <View style={styles.movieDetails}>
                    <Text style={styles.title}>{movieById.title}</Text>
                    <Text style={styles.tagline}>{movieById.tagline}</Text>
                    <Text style={styles.genres}>
                      {movieById.genres.map(genre => genre.name).join(", ")}
                    </Text>
                  </View>
                  <Button
                    type="secondary"
                    title="Ver Trailer"
                    onPress={() => {}}
                  />

                  <View style={styles.movieExtraData}>
                    <Text style={styles.voteCount}>
                      {movieById.vote_average.toFixed(2)}({movieById.vote_count}
                      )
                    </Text>
                    <Text style={styles.duration}>
                      {formatDuration(movieById.runtime)}
                    </Text>
                    <Text style={styles.releaseDate}>
                      {movieById.release_date.slice(0, 4)}
                    </Text>
                  </View>
                </View>
              </View>
              <View style={styles.playButton}>
                <Button type="primary" title="PLAY" onPress={() => {}} />
              </View>
              <View style={styles.movieSecondaryData}>
                <Text style={styles.overview}>{movieById.overview}</Text>
                <Text style={styles.valorationWording}>
                  ¿Como lo valorarías?
                </Text>
                <View style={styles.stars}>
                  {rateLoading ? (
                    <LoadingIndicator color={colors.neutral50} size={20} />
                  ) : (
                    [1, 2, 3, 4, 5].map(rateValue => (
                      <Pressable
                        key={rateValue}
                        onPress={() => handleRateChange(rateValue)}>
                        <FontAwesomeIcon
                          icon={faStar}
                          style={
                            user_vote < rateValue
                              ? styles.star
                              : styles.starLight
                          }
                          size={35}
                        />
                      </Pressable>
                    ))
                  )}
                </View>
              </View>

              <View style={styles.casting}>
                <Text style={styles.castWording}>Equipo</Text>
                <View style={styles.moviesViewContainer}>
                  <FlatList
                    style={styles.moviesViewContainer}
                    horizontal
                    scrollEventThrottle={50}
                    data={casting}
                    renderItem={({ item }) => <CastCard cast={item} />}
                    keyExtractor={(movie, index) => `${movie.id} - ${index}`}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  moviesViewContainer: {
    flexDirection: "row",
    display: "flex",
    gap: 10
  },
  casting: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  castWording: {
    position: "absolute",
    left: 0,
    color: colors.neutral50,
    fontSize: 18,
    fontWeight: "bold",
    flexWrap: "wrap"
  },
  playButton: {
    width: "100%"
  },
  movieDetailsContainer: {
    backgroundColor: colors.neutral900,
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    flexDirection: "column"
  },
  actions: {
    width: "100%",
    display: "flex"
  },
  stars: {
    display: "flex",
    flexDirection: "row",
    height: 35,
    width: "100%",
    justifyContent: "center",
    gap: 13
  },
  star: {
    height: 35,
    width: 35,
    color: "white"
  },
  starLight: {
    height: 35,
    width: 35,
    color: "#ffcb45"
  },
  backdropImage: {
    width: "100%",
    aspectRatio: 16 / 9
  },
  movieSecondaryData: {
    display: "flex",
    flexDirection: "column",
    width: "100%",
    gap: 12
  },
  container: {
    display: "flex",
    flexDirection: "column",
    width: "100%"
  },
  description: {
    display: "flex",
    width: "100%",
    alignItems: "center",
    justifyContent: "center",
    flexDirection: "column",
    padding: 23,
    gap: 24
  },
  valorationWording: {
    color: colors.neutral50,
    fontSize: 23,
    fontWeight: "semibold",
    flexWrap: "wrap"
  },
  overview: {
    color: colors.neutral50,
    fontSize: 14,
    flexWrap: "wrap"
  },
  movieDataContainer: {
    flex: 1,
    flexDirection: "column",
    gap: 10
  },
  favoriteButtonContainer: {
    position: "absolute",
    top: 64,
    right: 32,
    zIndex: 1
  },
  backButtonContainer: {
    position: "absolute",
    top: 64,
    left: 32,
    zIndex: 1
  },
  backIcon: { color: colors.neutral50 },
  text: { color: colors.neutral50, fontSize: 32 },
  image: {
    height: 220,
    aspectRatio: 2 / 3
  },
  movieContainer: {
    display: "flex",
    flexDirection: "row",
    width: "100%",
    gap: 16
  },
  movieDetails: {
    width: "100%",
    display: "flex",
    gap: 6,
    flexDirection: "column"
  },
  title: {
    color: colors.neutral50,
    fontSize: 25.2,
    fontWeight: "semibold",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  tagline: {
    color: colors.neutral50,
    fontSize: 14,
    fontWeight: "semibold",
    flexWrap: "wrap"
  },
  genres: {
    color: colors.neutral50,
    fontSize: 14,
    display: "flex"
  },
  movieExtraData: {
    display: "flex",
    flexDirection: "row",
    justifyContent: "space-between"
  },
  voteCount: {
    color: colors.neutral50,
    fontSize: 14,
    fontWeight: "semibold",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  duration: {
    color: colors.neutral50,
    fontSize: 14,
    fontWeight: "semibold",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  releaseDate: {
    color: colors.neutral50,
    fontSize: 14,
    fontWeight: "semibold",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  favoriteIcon: {
    color: "white"
  }
});

export default MovieDetails;
