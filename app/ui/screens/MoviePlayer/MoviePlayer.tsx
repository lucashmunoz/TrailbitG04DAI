import React from "react";
import {
  SafeAreaView,
  StatusBar,
  StyleSheet,
  TouchableOpacity
} from "react-native";
import { WebView } from "react-native-webview";
import { useAppSelector } from "../../../state/store";
import colors from "../../styles/colors";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { selectMovieVideos } from "../../../state/slices/movieDetail/movieSlice";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faChevronLeft } from "@fortawesome/free-solid-svg-icons";

const MoviePlayer = (): React.JSX.Element => {
  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const videos = useAppSelector(selectMovieVideos);
  const trailer = videos[0].key;

  const getVideoUri = () => {
    // Identificamos si el video es de youtube
    const isYoutubeVideo = trailer.includes("www.youtube.com/watch?");

    if (isYoutubeVideo) {
      const youtubeVideoIdIndex = trailer.indexOf("v=") + 2;
      const youtubeVideoId = trailer.substring(youtubeVideoIdIndex);
      return `https://www.youtube.com/embed/${youtubeVideoId}?&autoplay=1&mute=1&showinfo=0&controls=1&fullscreen=1`;
    }

    return trailer;
  };

  const handleBackButtonClick = () => {
    navigation.goBack();
  };

  return (
    <SafeAreaView style={styles.playerContainer}>
      <StatusBar hidden />

      <TouchableOpacity
        style={styles.backButtonContainer}
        onPress={handleBackButtonClick}>
        <FontAwesomeIcon
          icon={faChevronLeft}
          style={styles.backIcon}
          size={24}
        />
      </TouchableOpacity>

      <WebView
        javaScriptEnabled
        scrollEnabled={false}
        allowsFullscreenVideo
        userAgent="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_14_6) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/77.0.3865.90 Safari/537.36"
        source={{ uri: getVideoUri() }}
        style={styles.videoPlayer}
      />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  playerContainer: {
    backgroundColor: colors.neutral900,
    flex: 1,
    width: "100%",
    alignItems: "center"
  },
  videoPlayer: {
    flex: 1,
    aspectRatio: 16 / 9,
    borderColor: colors.error,
    borderWidth: 1
  },
  backButtonContainer: {
    position: "absolute",
    top: 24,
    left: 32,
    zIndex: 1
  },
  backIcon: { color: colors.neutral50 }
});

export default MoviePlayer;
