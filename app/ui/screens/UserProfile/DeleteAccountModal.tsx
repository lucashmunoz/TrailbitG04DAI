import React, { Dispatch, SetStateAction } from "react";
import { View, Text, Modal, StyleSheet } from "react-native";
import colors from "../../styles/colors";
import Button from "../../components/Button";

interface DeleteAccountModalProps {
  /** Boolean para mostrar u ocultar el modal, elevado al parent */
  isOpen: boolean;
  /** Callback para setear el valor de `isOpen`  */
  setIsOpen: Dispatch<SetStateAction<boolean>>;
}

const DeleteAccountModal = ({ isOpen, setIsOpen }: DeleteAccountModalProps) => {
  const closeModal = () => {
    setIsOpen(false);
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
            <Button type="secondary" title="Cancelar" onPress={closeModal} />
            <Button
              type="danger"
              title="Eliminar cuenta"
              /* TODO: momentaneamente cerrando el modal */
              onPress={closeModal}
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
    justifyContent: "space-between"
  }
});

export default DeleteAccountModal;
