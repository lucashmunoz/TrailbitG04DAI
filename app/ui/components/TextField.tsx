import React from "react";
import { StyleSheet, Text, TextInput, View } from "react-native";
import colors from "../styles/colors";

interface TextFieldProps {
  /** Nombre del Input. Será el texto que se leerá arriba del mismo */
  name: string;
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
}

const TextField = ({
  name,
  value,
  onChangeText,
  editable = true,
  error
}: TextFieldProps): React.JSX.Element => {
  return (
    <View style={styles.container}>
      <Text style={styles.name}>{name}</Text>
      <TextInput
        style={[
          styles.defaultInput,
          !editable && styles.disabledInput,
          Boolean(error) && styles.errorInput
        ]}
        placeholder={name}
        value={value}
        onChangeText={onChangeText}
        editable={editable}
        selectTextOnFocus={editable}
        placeholderTextColor={colors.neutral400}
      />
      {error && <Text style={styles.error}>{error}</Text>}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    justifyContent: "center"
  },
  name: { color: colors.neutral50 },
  defaultInput: {
    marginTop: 4,
    height: 40,
    width: "100%",
    color: colors.neutral50,
    borderWidth: 1,
    borderColor: colors.neutral50,
    borderRadius: 4
  },
  disabledInput: {
    backgroundColor: colors.neutral500
  },
  errorInput: {
    borderColor: colors.error,
    color: colors.error
  },
  error: {
    color: colors.error
  }
});

export default TextField;
