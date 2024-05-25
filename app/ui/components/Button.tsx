import React, { ReactNode } from "react";
import {
  StyleSheet,
  GestureResponderEvent,
  TouchableOpacity,
  Text,
  StyleProp,
  ViewStyle
} from "react-native";
import colors from "../styles/colors";

/** Los tres tipos de Button posibles */
type ButtonType = "primary" | "secondary" | "danger";

interface ButtonProps {
  /** Define el estilo del Button segun los posibles ButtonType */
  type: ButtonType;
  /** Texto del Button */
  title?: string;
  /** Ícono del botón, apareceá a la izquierda del title */
  icon?: ReactNode;
  /**
   * * true: Button deshabilitado
   * * false: Button habilitado
   */
  disabled?: boolean;
  /** Callback que se ejecuta en el onPress del Button */
  onPress: (event: GestureResponderEvent) => void;
  /** Label del Button en caso de que no tener un title.  */
  accessibilityLabel?: string;
  /** Permite a el componente que consuma el button asignar estilos */
  style?: StyleProp<ViewStyle>;
}

const Button = ({
  type,
  title,
  icon,
  disabled = false,
  onPress,
  accessibilityLabel,
  style = {}
}: ButtonProps): React.JSX.Element => {
  return (
    <TouchableOpacity
      style={[style, styles.button, styles[type]]}
      accessibilityLabel={accessibilityLabel}
      disabled={disabled}
      onPress={onPress}>
      {icon}
      {title && <Text style={styles.title}>{title}</Text>}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    flexDirection: "row",
    justifyContent: "center",
    alignItems: "center",
    gap: 8,
    borderRadius: 8,
    paddingVertical: 8,
    paddingHorizontal: 40
  },
  primary: { backgroundColor: colors.primary500 },
  secondary: {
    backgroundColor: colors.transparent,
    borderWidth: 1,
    borderColor: colors.neutral50
  },
  danger: { backgroundColor: colors.error },
  title: {
    color: colors.neutral50,
    fontWeight: "semibold"
  }
});

export default Button;
