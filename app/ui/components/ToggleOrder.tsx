import React from "react";
import {
  TouchableOpacity,
  Text,
  StyleSheet,
  GestureResponderEvent
} from "react-native";
import { faArrowDown, faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import colors from "../styles/colors";

const ArrowUpIcon = (
  <FontAwesomeIcon icon={faArrowUp} size={16} color={colors.neutral50} />
);
const ArrowDownIcon = (
  <FontAwesomeIcon icon={faArrowDown} size={16} color={colors.neutral50} />
);

/**
 * Estados posibles de ordenamiento.
 * * asc: ordenamiento ascendente
 * * desc: ordenamiento descendente
 * * none: sin ordenamiento
 */
export type ToggleOrderButtonState = "asc" | "desc" | "none";

interface ToggleOrderButtonProps {
  /** Texto a mostrar */
  text: string;
  /** Estados posibles de ordenamiento */
  state: ToggleOrderButtonState;
  /** Callback que se ejecuta en el onPress del componente */
  onPress: (event: GestureResponderEvent) => void;
  /**
   * * true: Input habilitado
   * * false: Input deshabilitado
   */
  disabled?: boolean;
}

const ToggleOrderButton = ({
  text,
  onPress,
  state,
  disabled = false
}: ToggleOrderButtonProps) => {
  const OrderIcon = () => {
    switch (state) {
      case "asc":
        return ArrowUpIcon;
      case "desc":
        return ArrowDownIcon;
      case "none":
      default:
        return null;
    }
  };

  return (
    <TouchableOpacity
      style={[
        styles.container,
        state === "none" && styles.noOrderContainer,
        disabled && styles.disabledContainer
      ]}
      onPress={onPress}>
      <Text style={styles.text}>{text}</Text>
      {OrderIcon()}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    minWidth: 130,
    backgroundColor: colors.primary500,
    borderRadius: 12,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "center",
    gap: 8,
    paddingHorizontal: 16,
    paddingVertical: 4
  },
  noOrderContainer: {
    backgroundColor: colors.neutral500
  },
  disabledContainer: {
    backgroundColor: colors.neutral800
  },
  text: {
    color: colors.neutral50,
    textAlign: "center"
  }
});

export default ToggleOrderButton;
