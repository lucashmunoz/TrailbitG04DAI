import React from "react";
import { Image, View, StyleSheet, TouchableOpacity } from "react-native";
import colors from "../../styles/colors";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import { faPenToSquare, faUser } from "@fortawesome/free-solid-svg-icons";

interface ProfilePictureProps {
  profilePicture: string;
  handleChangeImage: () => void;
}

const ProfilePicture = ({
  profilePicture,
  handleChangeImage
}: ProfilePictureProps): React.JSX.Element => {
  const imagePath = profilePicture.includes("https")
    ? profilePicture
    : `data:image/png;base64,${profilePicture}`;

  return (
    <View style={styles.container}>
      {profilePicture ? (
        <View style={styles.imageContainer}>
          <Image source={{ uri: imagePath }} style={styles.image} />
          <TouchableOpacity onPress={handleChangeImage}>
            <FontAwesomeIcon
              icon={faPenToSquare}
              style={styles.editIcon}
              size={24}
            />
          </TouchableOpacity>
        </View>
      ) : (
        <FontAwesomeIcon
          icon={faUser}
          style={{ color: colors.neutral50 }}
          size={56}
        />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    borderColor: colors.neutral50,
    borderWidth: 2,
    width: 100,
    height: 100,
    borderRadius: 100 / 2,
    justifyContent: "center",
    alignItems: "center"
  },
  imageContainer: {},
  image: {
    width: 100,
    height: undefined,
    aspectRatio: 1,
    borderRadius: 150 / 2
  },
  editIcon: {
    position: "absolute",
    bottom: 0,
    right: 0,
    color: colors.neutral50
  }
});

export default ProfilePicture;
