import { StyleSheet, View, Image, Dimensions } from "react-native";
import React, { useRef, useState } from "react";
import Carousel, { ICarouselInstance } from "react-native-reanimated-carousel";

const ImageCarousel = images => {
  const [imageIndex, setImageIndex] = useState(0);

  const carouselRef = useRef<ICarouselInstance>(null);

  const renderItem = image => {
    return (
      <View style={styles.renderItem1_parentView}>
        <Image
          source={{ uri: image.item.file_path }}
          style={styles.renderItem1_img}
        />
      </View>
    );
  };

  const backdrops = images.images;
  const deviceWidth = Dimensions.get("window").width;

  return (
    <View>
      <Carousel
        ref={carouselRef}
        data={backdrops}
        autoPlay
        autoPlayInterval={4000}
        renderItem={renderItem}
        width={deviceWidth}
        height={(deviceWidth * 9) / 16}
        scrollAnimationDuration={200}
        onSnapToItem={index => setImageIndex(index)}
      />
      <View style={styles.containerStateIndicator}>
        {[0, 1, 2, 3].map(index => (
          <View
            key={index}
            style={
              imageIndex === index
                ? styles.stateIndicatorActive
                : styles.stateIndicator
            }
          />
        ))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  containerStateIndicator: {
    display: "flex",
    position: "absolute",
    flexDirection: "row",
    bottom: 15,
    right: 40,
    gap: 1
  },
  stateIndicator: {
    borderColor: "black",
    borderRadius: 100,
    width: 18,
    height: 18,
    borderWidth: 2
  },
  stateIndicatorActive: {
    borderColor: "black",
    borderRadius: 100,
    width: 18,
    height: 18,
    backgroundColor: "white",
    borderWidth: 2
  },
  renderItem1_parentView: {
    width: "100%",
    alignItems: "center",
    overflow: "hidden"
  },
  renderItem1_view1: {
    width: 80,
    position: "absolute",
    fontSize: 20,
    top: 10,
    right: 20,
    backgroundColor: "#ffffff",
    borderRadius: 18,
    alignItems: "center"
  },
  renderItem1_img: {
    width: "100%",
    aspectRatio: 16 / 9
  },
  renderItem1_text1: {
    fontWeight: "700",
    color: "#000000"
  },
  renderItem1_text2: {
    marginVertical: 10,
    fontSize: 20,
    fontWeight: "bold"
  },
  renderItem1_text3: {
    marginVertical: 12,
    color: "blue",
    fontWeight: "bold"
  }
});

export default ImageCarousel;
