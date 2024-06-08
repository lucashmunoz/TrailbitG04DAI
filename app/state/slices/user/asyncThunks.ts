import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";
import { endpoints } from "../../../networking/endpoints";
import { UserProfileData } from "../../../ui/types/user";
import { RootState } from "../../store";

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
      const userDataUrl = `https://desarrollodeaplicaciones.onrender.com${endpoints.auth}`;
      const apiResponse = await axios.post<AuthenticateUserResponse>(
        userDataUrl,
        {
          googleToken: idToken
        }
      );

      const { userId, accessToken, refreshToken } = apiResponse.data;
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

export const refreshUserToken = createAsyncThunk(
  "auth/refreshUserToken",
  async (
    { refreshToken: token }: RefreshUserTokenPayload,
    { rejectWithValue }
  ) => {
    try {
      const refreshUserTokenUrl = `https://desarrollodeaplicaciones.onrender.com${endpoints.refreshToken}`;
      const apiResponse = await axios.post<RefreshUserTokenResponse>(
        refreshUserTokenUrl,
        {},
        {
          headers: {
            Accept: "application/json",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`
          }
        }
      );

      const { userId, accessToken, refreshToken } = apiResponse.data;
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

export const fetchUserData = createAsyncThunk<
  UserProfileData,
  void,
  { state: RootState }
>("auth/fetchUserData", async (_, { getState, rejectWithValue }) => {
  const { user } = getState();

  try {
    const userDataUrl = `https://desarrollodeaplicaciones.onrender.com${endpoints.users}/${user.userId}`;
    const apiResponse = await axios.get<UserDataApiResponse>(userDataUrl);

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
});

interface UpdateUserPayload {
  nickName?: string;
  profilePicture?: string;
}

export const updateUserProfile = createAsyncThunk(
  "auth/updateUserProfile",
  async (
    { nickName, profilePicture }: UpdateUserPayload,
    { getState, rejectWithValue }
  ) => {
    const { user } = getState() as RootState;
    const userId = user.userId;

    try {
      const updateUserAccountUrl = `https://desarrollodeaplicaciones.onrender.com${endpoints.users}`;

      const image = profilePicture?.includes("http")
        ? profilePicture
        : `data:image/jpeg;base64,${profilePicture}`;

      const payload = {
        id: userId,
        ...(profilePicture && { image }),
        ...(nickName && { nickName })
      };

      await axios.put(updateUserAccountUrl, payload);
    } catch (error) {
      return rejectWithValue({
        error: error
      });
    }
  }
);

export const deleteUserAccount = createAsyncThunk<
  {},
  void,
  { state: RootState }
>("auth/deleteUserAccount", async (_, { getState, rejectWithValue }) => {
  const { user } = getState();

  try {
    const deleteUserAccountUrl = `https://desarrollodeaplicaciones.onrender.com${endpoints.users}/${user.userId}`;
    await axios.delete(deleteUserAccountUrl);
  } catch (error) {
    return rejectWithValue({
      error: error
    });
  }
});
