import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
import { endpoints } from "./endpoints";
import { handleGoogleSignOut } from "../googleHelpers";

export const BASE_URL = "https://desarrollodeaplicaciones.onrender.com";

axios.defaults.baseURL = BASE_URL;
axios.defaults.timeout = 600000;
axios.defaults.headers.common = {
  Accept: "application/json",
  "Content-Type": "application/json"
};

axios.interceptors.request.use(async config => {
  if (!config.url?.includes(endpoints.refreshToken)) {
    const accessToken = await AsyncStorage.getItem("accessToken");
    config.headers.Authorization = "Bearer " + accessToken;
  }
  return config;
});

/**
 * Función que contiene al response interceptor, para ser re-instanciado despues de refrescar el token
 */
const createAxiosResponseInterceptor = () => {
  const resInterceptor = axios.interceptors.response.use(
    response => {
      return response;
    },
    async error => {
      if (error.response.status !== 403) {
        return Promise.reject(error);
      }

      axios.interceptors.response.eject(resInterceptor);
      const refreshToken = await AsyncStorage.getItem("refreshToken");

      return axios
        .post(
          endpoints.refreshToken,
          {},
          {
            headers: {
              Authorization: `Bearer ${refreshToken}`
            }
          }
        )
        .then(async response => {
          const { accessToken, refreshToken } = response.data;

          await AsyncStorage.setItem("accessToken", accessToken);
          await AsyncStorage.setItem("refreshToken", refreshToken);

          error.response.config.headers["Authorization"] =
            "Bearer " + accessToken;

          // Se vuelve a realizar la petición, con el token nuevo
          return axios(error.response.config);
        })
        .catch(async error2 => {
          // Si hay error por segunda vez, limpiar los tokens y cerrar la sesión
          await AsyncStorage.setItem("accessToken", "");
          await AsyncStorage.setItem("refreshToken", "");

          /**
           * TODO: redirigir a login
           */

          handleGoogleSignOut();

          return Promise.reject(error2);
        })
        .finally(createAxiosResponseInterceptor);
    }
  );
};

createAxiosResponseInterceptor();

export default axios;
