import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import colors from "../styles/colors";
import { IconProp } from "@fortawesome/fontawesome-svg-core";

interface TextFieldProps {
  /** Nombre del Input. Será el texto que se leerá arriba del mismo */
  name?: string;
  /** Placeholder del Input. Será el texto que se leerá dentro del mismo cuando no haya nada ingresado */
  placeholder: string;
  /** Text value del Input */
  value: string;
  /** Callback que se ejecuta en el onChangeText del Input */
  onChangeText?: (text: string) => void;
  /**
   * * true: Input habilitado
   * * false: Input deshabilitado
   */
  editable?: boolean;
  /** Mensaje de error del Input. Si se provee también se aplican los estilos de error */
  error?: string;
  /** Ícono posicionado a la derecha dentro del input. Debe ser de FontAwesome */
  icon?: IconProp;
}

const TextField = ({
  name,
  placeholder,
  value,
  onChangeText,
  editable = true,
  error,
  icon
}: TextFieldProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      {name && <Text style={styles.name}>{name}</Text>}
      <View
        style={[
          styles.defaultInputContainer,
          !editable && styles.disabledInputContainer,
          Boolean(error) && styles.errorInputContainer
        ]}>
        <TextInput
          style={[
            styles.defaultInput,
            !editable && styles.disabledInput,
            Boolean(error) && styles.errorInput
          ]}
          placeholder={placeholder}
          value={value}
          onChangeText={onChangeText}
          editable={editable}
          selectTextOnFocus={editable}
          placeholderTextColor={colors.neutral400}
        />
        {icon && <FontAwesomeIcon icon={icon} style={styles.icon} size={16} />}
      </View>
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  name: { color: colors.neutral50 },
  defaultInputContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
    borderWidth: 1,
    color: colors.error,
    borderColor: colors.neutral50,
    borderRadius: 4,
    paddingHorizontal: 8,
    marginTop: 4,
    height: 40
  },
  disabledInputContainer: {
    backgroundColor: colors.neutral500
  },
  errorInputContainer: {
    borderColor: colors.error,
    color: colors.error
  },
  defaultInput: {
    color: colors.neutral50
  },
  disabledInput: {
    color: colors.neutral50
  },
  errorInput: {
    color: colors.error
  },
  error: {
    color: colors.error
  },
  icon: { color: colors.neutral50 }
});

export default TextField;
