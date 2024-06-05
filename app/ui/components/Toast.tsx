import React, {
  forwardRef,
  useRef,
  useImperativeHandle,
  useState,
  useEffect
} from "react";
import { Animated, Text, StyleSheet } from "react-native";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
  faCircleCheck,
  faTriangleExclamation
} from "@fortawesome/free-solid-svg-icons";
import colors from "../styles/colors";

/** Los dos Toast posibles */
type ToastType = "success" | "error";

/** Handlers expuestos en la ref asignada al componente Toast */
export type ToastHandle = {
  /**
   * Invoca el toast de éxito.
   * @param message el mensaje del cuerpo del toast
   */
  success: (message: string) => void;
  /**
   * Invoca el toast de error.
   * @param message el mensaje del cuerpo del toast
   */
  error: (message: string) => void;
  /** Cierra el Toast aunque no haya terminado el tiempo de espera */
  close: () => void;
};

interface ToastProps {
  /**
   * Duración en ms del toast.
   * Si no se provee, el toast solamente podrá cerrarse a través del método `.close()`
   * */
  duration?: number;
}

const Toast = forwardRef<ToastHandle, ToastProps>(
  ({ duration }, ref): React.JSX.Element => {
    const [text, setText] = useState("");
    const [type, setType] = useState<ToastType>("success");

    const SuccessIcon = (
      <FontAwesomeIcon
        icon={faCircleCheck}
        style={styles.successIcon}
        size={36}
      />
    );

    const ErrorIcon = (
      <FontAwesomeIcon
        icon={faTriangleExclamation}
        style={styles.errorIcon}
        size={36}
      />
    );

    const icon = type === "success" ? SuccessIcon : ErrorIcon;
    const animatedValue = useRef(new Animated.Value(0)).current;

    let timerId: NodeJS.Timeout;
    const popOut = () => {
      /*
       * Limpiando el timer en caso de que se intente cerrar repetidas veces.
       * Ej. por una combinacion de duration + close()
       */
      if (timerId) {
        clearTimeout(timerId);
      }
      timerId = setTimeout(() => {
        Animated.timing(animatedValue, {
          toValue: 0,
          duration: 350,
          useNativeDriver: true
        }).start();
      }, duration);
    };

    const popIn = (type: ToastType, message: string) => {
      setType(type);
      setText(message);
      Animated.timing(animatedValue, {
        toValue: 180,
        duration: 350,
        useNativeDriver: true
      }).start(duration ? popOut : undefined);
    };

    useImperativeHandle(ref, () => ({
      success(message) {
        popIn("success", message);
      },
      error(message: string) {
        popIn("error", message);
      },
      close() {
        popOut();
      }
    }));

    useEffect(() => {
      () => clearTimeout(timerId);
    }, []);

    return (
      <Animated.View
        style={[
          styles.container,
          {
            transform: [{ translateY: animatedValue }]
          }
        ]}>
        {icon}
        <Text style={styles.text}>{text}</Text>
      </Animated.View>
    );
  }
);

const styles = StyleSheet.create({
  container: {
    width: "100%",
    backgroundColor: colors.neutral200,
    borderRadius: 8,
    flexDirection: "row",
    alignItems: "center",
    paddingHorizontal: 16,
    paddingVertical: 8,

    position: "absolute",
    top: -120,
    zIndex: 1000
  },
  successIcon: { color: colors.success },
  errorIcon: { color: colors.error },
  text: {
    color: colors.neutral900,
    textAlign: "center",
    paddingLeft: 16
  }
});

export default Toast;
