import React, { Dispatch, SetStateAction, useState } from "react";
import { View, Modal, StyleSheet, Image, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";
import { Image as ImageMovie } from "../../types/movieDetail";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faXmark,
  faAngleLeft,
  faAngleRight
} from "@fortawesome/free-solid-svg-icons";
interface ImagesModalProps {
  /** Boolean para mostrar u ocultar el modal, elevado al parent */
  isOpen: boolean;
  /** Callback para setear el valor de `isOpen` */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  images: ImageMovie[];
}

const ImageCarouselModal = ({
  isOpen,
  setIsOpen,
  images
}: ImagesModalProps) => {
  const [imageIndexActive, setImageIndexActive] = useState(0);

  const closeModal = () => {
    setIsOpen(false);
  };

  const nextImage = () => {
    setImageIndexActive((imageIndexActive + 1) % images.length);
  };

  const prevImage = () => {
    const diff = imageIndexActive - 1;
    setImageIndexActive(diff < 0 ? images.length - 1 : diff);
  };

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <TouchableOpacity onPress={prevImage} style={styles.prevImage}>
            <View style={styles.modalNav}>
              <FontAwesomeIcon
                icon={faAngleLeft}
                size={35}
                style={styles.closeModal}
              />
            </View>
          </TouchableOpacity>
          <TouchableOpacity onPress={nextImage} style={styles.nextImage}>
            <View style={styles.modalNav}>
              <FontAwesomeIcon
                icon={faAngleRight}
                size={35}
                style={styles.closeModal}
              />
            </View>
          </TouchableOpacity>
          <View style={styles.containerStateIndicator}>
            {[0, 1, 2, 3].map(index => (
              <View
                key={`fullscreen-image-${index}`}
                style={
                  imageIndexActive === index
                    ? styles.stateIndicatorActive
                    : styles.stateIndicator
                }
              />
            ))}
          </View>
          <View style={styles.actionsContainer}>
            <TouchableOpacity onPress={closeModal} style={styles.actionButton}>
              <FontAwesomeIcon
                icon={faXmark}
                size={32}
                style={styles.closeModal}
              />
            </TouchableOpacity>
          </View>
          {images.map((image, index) => (
            <View key={image.id}>
              <Image
                source={{ uri: image.file_path }}
                style={imageIndexActive == index && styles.image}
              />
            </View>
          ))}
        </View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  modalView: {
    width: "100%",
    height: 180,
    justifyContent: "space-between",
    alignItems: "center"
  },
  regularText: {
    color: colors.neutral50
  },
  semiboldText: {
    color: colors.neutral50,
    fontWeight: "semibold"
  },
  actionsContainer: {
    position: "absolute",
    width: "100%",
    flexDirection: "row"
  },
  actionButton: {
    flex: 1,
    position: "relative",
    top: -40,
    left: 7,
    zIndex: 2
  },
  image: { width: "100%", aspectRatio: 16 / 9 },
  closeModal: {
    color: "white"
  },
  modalNav: {
    padding: 3,
    width: 50,
    height: 50,
    borderRadius: 25, // Radio igual a la mitad del ancho/alto para hacer un círculo
    backgroundColor: "rgba(41, 41, 41, 0.8)", // Fondo blanco semi-transparente
    justifyContent: "center",
    alignItems: "center"
  },
  prevImage: {
    position: "absolute",
    left: 7,
    top: "50%",
    zIndex: 2
  },
  nextImage: {
    position: "absolute",
    right: 7,
    top: "50%",
    zIndex: 2
  },
  navContainer: {
    position: "absolute",
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    padding: 8
  },
  containerStateIndicator: {
    display: "flex",
    position: "absolute",
    flexDirection: "row",
    top: 200,
    gap: 1,
    zIndex: 1,
    height: "100%"
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
  }
});

export default ImageCarouselModal;
