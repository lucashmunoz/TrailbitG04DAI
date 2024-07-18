import React, { useEffect, useState } from "react";
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
  faBookmark as faBookmarkSolid,
  faShareNodes
} from "@fortawesome/free-solid-svg-icons";
import { faBookmark as faBookmarkRegular } from "@fortawesome/free-regular-svg-icons";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import Share from "react-native-share";
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
import NavigatorConstant from "../../../navigation/NavigatorConstant";
import ImageCarousel from "../../components/ImageCarousel";
import ImageCarouselModal from "./ImageCarouselModal";
import { fetchFavoriteMovies } from "../../../state/slices/movies/asyncThunks";

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

  const { id: movieId, is_favorite, user_vote, title: movieTitle } = movieById;
  const [isImagesModalOpen, setIsImagesModalOpen] = useState(false);

  const fetchMovieDetails = async () => {
    dispatch(fetchMovieDetail({ movieId: route.params.movieId }));
  };

  const handleRateChange = async (vote: number) => {
    dispatch(rateMovie({ movieId, score: vote }));
  };

  const handleBackButtonClick = () => {
    navigation.goBack();
  };

  const handleFavoriteButton = async () => {
    await dispatch(toggleFavoriteMovie({ movieId }));
    dispatch(fetchFavoriteMovies());
  };

  const formatDuration = (duration: number) => {
    const hours = Math.trunc(duration / 60);
    const mins = duration - 60 * hours;
    return `${hours}h ${mins}m`;
  };

  const handlePlayTrailer = () => {
    navigation.navigate(NavigatorConstant.MoviePlayer);
  };

  useEffect(() => {
    fetchMovieDetails();
  }, []);

  const movieImage = movieById.poster_path
    ? { uri: movieById.poster_path }
    : IMAGES.NO_IMAGE;

  const handleShareMovie = async () => {
    const base64MovieImage = await fetch(movieById.backdrop_path)
      .then(response => response.blob())
      .then(blob => {
        const reader = new FileReader();
        reader.readAsDataURL(blob);
        return new Promise(res => {
          reader.onloadend = () => {
            res(reader.result);
          };
        });
      });

    try {
      await Share.open({
        title: `${movieTitle} en Trailbit.`,
        message: `Encuentra "${movieTitle}" y todas tus películas favoritas en Trailbit.\n\n${movieById.overview}\n`,
        url: (base64MovieImage as string).replace(
          "data:application/octet-stream;base64,",
          "data:image/png;base64,"
        ),
        type: "image/base64",
        failOnCancel: false
      });
    } catch (error: any) {
      error && console.log(error);
    }
  };

  const casting = [movieById.director, ...movieById.cast];
  return (
    <SafeAreaView style={styles.movieDetailsContainer}>
      <StatusBar backgroundColor={colors.neutral900} />
      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={handleBackButtonClick}>
        <View style={styles.iconShadow}>
          <FontAwesomeIcon
            icon={faChevronLeft}
            style={styles.backIcon}
            size={24}
          />
        </View>
      </TouchableOpacity>
      {loading ? (
        <LoadingIndicator color={colors.neutral50} />
      ) : (
        <ScrollView>
          <View style={styles.container}>
            <TouchableOpacity onPress={() => setIsImagesModalOpen(true)}>
              <ImageCarousel images={movieById.images} />
            </TouchableOpacity>

            {bookmarkLoading ? (
              <View style={styles.favoriteLoadingContainer}>
                <View style={styles.iconShadow}>
                  <LoadingIndicator size={20} color={colors.neutral50} />
                </View>
              </View>
            ) : (
              <TouchableOpacity
                style={styles.favoriteButton}
                onPress={handleFavoriteButton}>
                <View style={styles.iconShadow}>
                  <FontAwesomeIcon
                    icon={is_favorite ? faBookmarkSolid : faBookmarkRegular}
                    style={styles.favoriteIcon}
                    size={24}
                  />
                </View>
              </TouchableOpacity>
            )}

            <TouchableOpacity
              style={styles.shareButton}
              onPress={handleShareMovie}>
              <View style={styles.iconShadow}>
                <FontAwesomeIcon
                  icon={faShareNodes}
                  style={styles.favoriteIcon}
                  size={24}
                />
              </View>
            </TouchableOpacity>

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
                    onPress={handlePlayTrailer}
                  />
                  <View style={styles.movieExtraData}>
                    <View style={styles.rateCountContainer}>
                      <Text style={styles.voteCount}>
                        {(movieById.vote_average / 2).toFixed(2)}
                      </Text>
                      <FontAwesomeIcon
                        icon={faStar}
                        style={styles.rateCountIcon}
                        size={14}
                      />
                      <Text style={styles.voteCount}>
                        ({movieById.vote_count})
                      </Text>
                    </View>
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
                <Button
                  type="primary"
                  title="PLAY"
                  onPress={handlePlayTrailer}
                />
              </View>
              <View style={styles.movieSecondaryData}>
                <Text style={styles.overview}>{movieById.overview}</Text>
                <Text style={styles.valorationWording}>
                  ¿Como lo valorarías?
                </Text>
                <View style={styles.stars}>
                  {rateLoading ? (
                    <LoadingIndicator color={colors.neutral50} />
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
                    ItemSeparatorComponent={() => (
                      <View style={{ width: 15 }} />
                    )}
                  />
                </View>
              </View>
            </View>
          </View>
        </ScrollView>
      )}
      <ImageCarouselModal
        isOpen={isImagesModalOpen}
        setIsOpen={setIsImagesModalOpen}
        images={movieById.images}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  moviesViewContainer: {
    flexDirection: "row"
  },
  casting: {
    flexDirection: "column",
    width: "100%",
    gap: 10
  },
  castWording: {
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
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    gap: 24,
    flexDirection: "column"
  },
  actions: {
    width: "100%"
  },
  stars: {
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
    flexDirection: "column",
    width: "100%",
    gap: 12
  },
  container: {
    flexDirection: "column",
    width: "100%",
    position: "relative"
  },
  description: {
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
    justifyContent: "space-between"
  },
  favoriteLoadingContainer: {
    position: "absolute",
    top: 48,
    right: 32,
    zIndex: 1
  },
  iconShadow: {
    padding: 3,
    width: 30,
    height: 34,
    borderRadius: 6, // Radio igual a la mitad del ancho/alto para hacer un círculo
    backgroundColor: "rgba(41, 41, 41, 0.8)", // Fondo blanco semi-transparente
    justifyContent: "center",
    alignItems: "center"
  },
  favoriteButton: {
    position: "absolute",
    top: 48,
    right: 32,
    zIndex: 1
  },
  shareButton: {
    position: "absolute",
    top: 104,
    right: 32,
    zIndex: 1
  },
  backButtonContainer: {
    position: "absolute",
    top: 48,
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
    flexDirection: "row",
    width: "100%",
    gap: 16
  },
  movieDetails: {
    width: "100%",

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
    fontSize: 14
  },
  movieExtraData: {
    flexDirection: "row",
    justifyContent: "space-between"
  },
  rateCountContainer: {
    flexDirection: "row",
    alignItems: "center",
    gap: 2
  },
  voteCount: {
    color: colors.neutral50,
    fontSize: 14,
    fontWeight: "semibold",
    flexWrap: "wrap",
    alignItems: "flex-start"
  },
  rateCountIcon: { color: colors.neutral50 },
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
