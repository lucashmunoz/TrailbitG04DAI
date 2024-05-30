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
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import NavigatorConstant from "../../../navigation/NavigatorConstant";
import { useAppDispatch, useAppSelector } from "../../../state/store";
import { fetchUserData } from "../../../state/slices/user/asyncThunks";
import {
  clearUserData,
  selectUserAuthState,
  selectUserDataLoadingState
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

  const navigation = useNavigation<NativeStackNavigationProp<ParamListBase>>();

  const [nickname, setNickname] = useState("Nickname");
  const [nombre, setNombre] = useState("Nombre Completo");
  const [email, setEmail] = useState("test@example.com");

  const [deleteAccountModalOpen, setDeleteAccountModalOpen] = useState(false);

  const userDataSavedToastRef = useRef<ToastHandle>(null);

  const navigateToLogin = () => {
    navigation.navigate(NavigatorConstant.Login);
    navigation.reset({
      index: 0,
      routes: [{ name: NavigatorConstant.Login }]
    });
  };

  const handleSignOut = async () => {
    await handleGoogleSignOut();
    dispatch(clearUserData());
    navigateToLogin();
  };

  useEffect(() => {
    dispatch(fetchUserData());
  }, []);

  return (
    <SafeAreaView style={styles.userProfileContainer}>
      <ScrollView style={styles.scrollContainer}>
        <View style={styles.formContainer}>
          {isUserDataLoading ? (
            <LoadingIndicator />
          ) : (
            <>
              <ProfilePicture />

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
                  value={nickname}
                  onChangeText={setNickname}
                />
                <TextField
                  name="Nombre"
                  placeholder="Nombre"
                  value={nombre}
                  onChangeText={setNombre}
                  editable={false}
                />
                <TextField
                  name="Email"
                  placeholder="Email"
                  value={email}
                  onChangeText={setEmail}
                  editable={false}
                />
                <View
                  style={{
                    paddingVertical: 32
                  }}>
                  <Button
                    type="primary"
                    onPress={() => {
                      userDataSavedToastRef?.current?.success(
                        "Datos de usuario modificados con éxito."
                      );
                    }}
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
          )}
        </View>
      </ScrollView>

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
    padding: 32,
    alignItems: "center"
  },
  scrollContainer: {
    flex: 1,
    width: "100%"
  },
  formContainer: { flex: 1, width: "100%", alignItems: "center" },
  dangerButtonsContainer: { gap: 32, width: "100%" }
});

export default UserProfile;
