import React, { Dispatch, SetStateAction } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import Button from "../../components/Button";
import axios from "axios";

interface DeleteAccountModalProps {
  /** Boolean para mostrar u ocultar el modal, elevado al parent */
  isOpen: boolean;
  /** Callback para setear el valor de `isOpen` */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
  /** Callback para cerrar la sesion */
  handleSignOut: () => void;
}

const DeleteAccountModal = ({
  isOpen,
  setIsOpen,
  handleSignOut
}: DeleteAccountModalProps) => {
  const closeModal = () => {
    setIsOpen(false);
  };

  const handleDeleteAccount = async () => {
    try {
      const response = await axios.delete(
        `https://desarrollodeaplicaciones.onrender.com/api/v1/users/${5}`
      );
      closeModal();
      console.log(response);
      if (response.status == 204) {
        handleSignOut();
      }
    } catch (error) {
      console.error(error);
    }
  };

  return (
    <Modal
      transparent
      visible={isOpen}
      animationType="fade"
      onRequestClose={closeModal}>
      <View style={styles.centeredView}>
        <View style={styles.modalView}>
          <Text style={styles.regularText}>
            ¿Está seguro que desea eliminar su cuenta?
          </Text>
          <Text style={styles.regularText}>
            Esta acción no se puede deshacer.
          </Text>
          <View style={styles.actionsContainer}>
            <Button
              type="secondary"
              title="Cancelar"
              onPress={closeModal}
              style={styles.actionButton}
            />
            <Button
              type="danger"
              title="Eliminar cuenta"
              onPress={handleDeleteAccount}
            />
          </View>
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
    padding: 8,
    backgroundColor: "rgba(0, 0, 0, 0.6)"
  },
  modalView: {
    width: "100%",
    height: 180,
    padding: 16,
    justifyContent: "space-between",
    alignItems: "center",
    backgroundColor: colors.neutral900,
    borderWidth: 1,
    borderColor: colors.neutral50,
    borderRadius: 16
  },
  regularText: {
    color: colors.neutral50
  },
  semiboldText: {
    color: colors.neutral50,
    fontWeight: "semibold"
  },
  actionsContainer: {
    width: "100%",
    flexDirection: "row",
    justifyContent: "space-between",
    gap: 8
  },
  actionButton: { flex: 1 }
});

export default DeleteAccountModal;
