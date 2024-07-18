import React, { useEffect } from "react";
import { View, StyleSheet, Image, TouchableOpacity } from "react-native";
import { fetchMainMovie } from "../../../state/slices/mainMovie/asyncThunks";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import NavigatorConstant from "../../../navigation/NavigatorConstant";
import SkeletonPlaceholder from "react-native-skeleton-placeholder";
import colors from "../../styles/colors";
import { IMAGES } from "../../../assets/images/index";
import LinearGradient from "react-native-linear-gradient";

const MainMovie = () => {
  const dispatch = useAppDispatch();
  const { mainMovie, loading } = useAppSelector(state => state.mainMovie);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const gradientStart = { x: 0.5, y: 0 };
  const gradientEnd = { x: 0.5, y: 1 };

  const gradientColors = [
    "rgba(0, 0, 0, 0.0)",
    "rgba(0, 0, 0, 0.5)",
    "rgba(0, 0, 0, 0.0)"
  ];

  useEffect(() => {
    dispatch(fetchMainMovie());
  }, [dispatch]);

  if (loading) {
    return (
      <View style={styles.principalMovieContainer}>
        <View style={styles.backgroundImage}>
          <SkeletonPlaceholder
            borderRadius={4}
            speed={1100}
            backgroundColor={colors.neutral900}
            highlightColor={colors.neutral700}>
            <SkeletonPlaceholder.Item width={533} height={300} />
          </SkeletonPlaceholder>
        </View>

        <View style={styles.mainMovieContainer}>
          <SkeletonPlaceholder
            borderRadius={4}
            speed={1100}
            backgroundColor={colors.neutral900}
            highlightColor={colors.neutral700}>
            <SkeletonPlaceholder.Item width={266} height={150} />
          </SkeletonPlaceholder>
        </View>
      </View>
    );
  }
  //
  return (
    <View style={styles.principalMovieContainer}>
      <Image
        source={{ uri: mainMovie.images[0]?.file_path }}
        style={styles.backgroundImage}
      />

      <LinearGradient
        start={gradientStart}
        end={gradientEnd}
        colors={gradientColors}
        style={styles.logoContainer}>
        <View>
          <Image
            source={IMAGES.LOGO}
            resizeMode="cover"
            style={styles.logoImage}
          />
        </View>
      </LinearGradient>

      <View style={styles.mainMovieContainer}>
        <TouchableOpacity
          onPress={() =>
            navigation.navigate(NavigatorConstant.MovieDetails, {
              movieId: mainMovie.id
            })
          }>
          <Image
            source={{ uri: mainMovie.images[1]?.file_path }}
            style={styles.principalMovieImage}
          />
        </TouchableOpacity>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  principalMovieContainer: {
    width: "100%",
    height: 375,
    overflow: "hidden",
    alignItems: "center"
  },
  backgroundImage: {
    height: 300,
    aspectRatio: 16 / 9
  },
  logoContainer: {
    position: "absolute",
    width: "100%",
    height: 160,
    overflow: "hidden",
    alignItems: "center",
    justifyContent: "center",
    zIndex: 1,
    top: 60
  },
  logoImage: {
    height: 50,
    aspectRatio: 2911 / 859
  },
  mainMovieContainer: {
    position: "absolute",
    top: 225,
    height: 150,
    width: 266
  },
  principalMovieImage: {
    width: 266,
    height: 150
  }
});

export default MainMovie;
