import React, { useState, useRef, useEffect } from "react";
import { SafeAreaView, View, ScrollView, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import TextField from "../../components/TextField";
import Button from "../../components/Button";
import Toast, { ToastHandle } from "../../components/Toast";
import ProfilePicture from "./ProfilePicture";
import DeleteAccountModal from "./DeleteAccountModal";
import { GoogleSignin } from "@react-native-google-signin/google-signin";
import { ParamListBase, useNavigation } from "@react-navigation/native";
import { launchImageLibrary } from "react-native-image-picker";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import NavigatorConstant from "../../../navigation/NavigatorConstant";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import {
  fetchUserData,
  updateUserProfile
} from "../../../state/slices/user/asyncThunks";
import {
  clearUserData,
  clearUserUpdatedState,
  selectUpdatingUserLoadingState,
  selectUserAuthState,
  selectUserData,
  selectUserDataLoadingState,
  selectUserUpdatedState
} from "../../../state/slices/user/userSlice";
import LoadingIndicator from "../../components/LoadingIndicator";

const handleGoogleSignOut = async () => {
  try {
    await GoogleSignin.signOut();
  } catch (error) {
    console.error(error);
  }
};

const UserProfile = (): React.JSX.Element => {
  const dispatch = useAppDispatch();

  const isAuthenticated = useAppSelector(selectUserAuthState);
  const isUserDataLoading = useAppSelector(selectUserDataLoadingState);
  const { firstName, lastName, nickName, email, profilePicture } =
    useAppSelector(selectUserData);
  const isUserBeingUppdated = useAppSelector(selectUpdatingUserLoadingState);
  const isUserDataUpdated = useAppSelector(selectUserUpdatedState);

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [nicknameInput, setNicknameInput] = useState(nickName);
  const [nicknameInputError, setNicknameInputError] = useState("");
  const [profilePictureInput, setProfilePictureInput] =
    useState(profilePicture);
  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

  const userDataSavedToastRef = useRef<ToastHandle>(null);

  const handleChangeImage = async () => {
    const result = await launchImageLibrary({
      mediaType: "photo",
      includeBase64: true
    });

    if (result.assets?.[0]?.base64) {
      setProfilePictureInput(result.assets?.[0]?.base64);
    }
  };

  const handleNicknameChange = (newNickname: string) => {
    setNicknameInput(newNickname);

    const nicknameAllowedCharacters = new RegExp(/^[a-zA-Z0-9]*$/);
    if (!nicknameAllowedCharacters.test(newNickname)) {
      setNicknameInputError(
        "El nickname solo puede contener letras o números."
      );
      return;
    }
    setNicknameInputError("");
  };

  const handleSaveChanges = async () => {
    await dispatch(
      updateUserProfile({
        nickName: nicknameInput,
        profilePicture: profilePictureInput
      })
    );
  };

  const handleSignOut = async () => {
    await handleGoogleSignOut();
    dispatch(clearUserData());
  };

  // Fecth de los datos de usuario
  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  // Cuando los datos de usuario son modificados éxito, mostrar el Toast
  useEffect(() => {
    if (isUserDataUpdated) {
      userDataSavedToastRef?.current?.success(
        "Datos de usuario modificados con éxito."
      );
      dispatch(fetchUserData());
      dispatch(clearUserUpdatedState());
    }
  }, [isUserDataUpdated]);

  // Set del nickname y la foto de perfil una vez que es devuelto por la api
  useEffect(() => {
    setNicknameInput(nickName);
    setProfilePictureInput(profilePicture);
  }, [nickName, profilePicture]);

  // Cuando se cierra sesión / elimina la cuenta, ir a la pantalla de login
  useEffect(() => {
    if (!isAuthenticated) {
      navigation.navigate(NavigatorConstant.Login);
      navigation.reset({
        index: 0,
        routes: [{ name: NavigatorConstant.Login }]
      });
    }
  }, [isAuthenticated]);

  const fullName = `${firstName} ${lastName || ""}`;

  const isSaveChangesDisabled =
    (nickName === nicknameInput && profilePicture === profilePictureInput) ||
    nicknameInputError.length !== 0;

  const showLoader = isUserDataLoading || isUserBeingUppdated;

  return (
    <SafeAreaView style={styles.userProfileContainer}>
      {showLoader ? (
        <View style={styles.loaderContainer}>
          <LoadingIndicator />
        </View>
      ) : (
        <ScrollView style={styles.scrollContainer}>
          <View style={styles.formContainer}>
            <>
              <ProfilePicture
                profilePicture={profilePictureInput}
                handleChangeImage={handleChangeImage}
              />

              {/* Formulario */}
              <View
                style={{
                  paddingVertical: 40,
                  width: "100%",
                  gap: 8
                }}>
                <TextField
                  name="Nickname"
                  placeholder="Nickname"
                  value={nicknameInput}
                  onChangeText={handleNicknameChange}
                  error={nicknameInputError}
                />
                <TextField
                  name="Nombre"
                  placeholder="Nombre"
                  value={fullName}
                  editable={false}
                />
                <TextField
                  name="Email"
                  placeholder="Email"
                  value={email}
                  editable={false}
                />
                <View
                  style={{
                    paddingVertical: 32
                  }}>
                  <Button
                    type="primary"
                    disabled={isSaveChangesDisabled}
                    onPress={handleSaveChanges}
                    title="Guardar cambios"
                  />
                </View>
              </View>

              {/* Danger Zone */}
              <View style={styles.dangerButtonsContainer}>
                <Button
                  type="secondary"
                  title="Cerrar sesión"
                  onPress={handleSignOut}
                />
                <Button
                  type="danger"
                  title="Eliminar cuenta"
                  onPress={() => {
                    setDeleteAccountModalOpen(true);
                  }}
                />
              </View>
            </>
          </View>
        </ScrollView>
      )}

      <DeleteAccountModal
        isOpen={deleteAccountModalOpen}
        setIsOpen={setDeleteAccountModalOpen}
        handleSignOut={handleSignOut}
      />
      <Toast ref={userDataSavedToastRef} duration={3500} />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  userProfileContainer: {
    backgroundColor: colors.neutral900,
    flex: 1,
    paddingTop: 60,
    paddingBottom: 32,
    paddingHorizontal: 32,
    alignItems: "center"
  },
  scrollContainer: {
    flex: 1,
    width: "100%"
  },
  loaderContainer: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  },
  formContainer: { flex: 1, width: "100%", alignItems: "center" },
  dangerButtonsContainer: { gap: 32, width: "100%" }
});

export default UserProfile;
