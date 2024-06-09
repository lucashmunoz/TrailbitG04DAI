import { createAsyncThunk } from "@reduxjs/toolkit";
import { endpoints } from "../../../networking/endpoints";
import api from "../../../networking/api";
import AsyncStorage from "@react-native-async-storage/async-storage";

interface AuthenticateUserPayload {
  idToken: string;
}

interface AuthenticateUserResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export const authenticateUser = createAsyncThunk(
  "auth/authenticateUser",
  async ({ idToken }: AuthenticateUserPayload, { rejectWithValue }) => {
    try {
      const userDataUrl = endpoints.auth;
      const apiResponse = await api.post<AuthenticateUserResponse>(
        userDataUrl,
        {
          googleToken: idToken
        }
      );

      const { userId, accessToken, refreshToken } = apiResponse.data;

      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);

      return { userId, accessToken, refreshToken };
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);

interface RefreshUserTokenPayload {
  refreshToken: string;
}

interface RefreshUserTokenResponse {
  userId: string;
  accessToken: string;
  refreshToken: string;
}

export const fetchPersistedUserToken = createAsyncThunk(
  "auth/fetchPersistedUserToken",
  async (
    { refreshToken: token }: RefreshUserTokenPayload,
    { rejectWithValue }
  ) => {
    try {
      const refreshUserTokenUrl = endpoints.refreshToken;
      const apiResponse = await api.post<RefreshUserTokenResponse>(
        refreshUserTokenUrl,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }
      );

      const { userId, accessToken, refreshToken } = apiResponse.data;

      await AsyncStorage.setItem("accessToken", accessToken);
      await AsyncStorage.setItem("refreshToken", refreshToken);

      return { userId, accessToken, refreshToken };
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);

interface UserDataApiResponse {
  id: number;
  name: string;
  lastName: string;
  nickName: string;
  email: string;
  image: string;
}

export const fetchUserData = createAsyncThunk(
  "auth/fetchUserData",
  async (_, { rejectWithValue }) => {
    try {
      const userDataUrl = endpoints.users;
      const apiResponse = await api.get<UserDataApiResponse>(userDataUrl);

      const { name, lastName, nickName, email, image } = apiResponse?.data;

      return {
        firstName: name,
        lastName,
        nickName,
        email,
        profilePicture: image
      };
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);

interface UpdateUserPayload {
  nickName?: string;
  profilePicture?: string;
}

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (
    { nickName, profilePicture }: UpdateUserPayload,
    { rejectWithValue }
  ) => {
    try {
      const updateUserAccountUrl = endpoints.users;

      const image = profilePicture?.includes("http")
        ? profilePicture
        : `data:image/jpeg;base64,${profilePicture}`;

      const payload = {
        ...(profilePicture && { image }),
        ...(nickName && { nickName })
      };

      await api.put(updateUserAccountUrl, payload);
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);

export const deleteUserAccount = createAsyncThunk(
  "auth/deleteUserAccount",
  async (_, { rejectWithValue }) => {
    try {
      const deleteUserAccountUrl = endpoints.users;
      await api.delete(deleteUserAccountUrl);
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);
