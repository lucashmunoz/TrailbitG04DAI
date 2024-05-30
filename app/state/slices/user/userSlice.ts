import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  authenticateUser,
  deleteUserAccount,
  fetchUserData
} from "./asyncThunks";
import { UserProfileData } from "../../../ui/types/user";

interface UserState {
  loadingData: boolean;
  loadingAuth: boolean;
  userId: number;
  userProfileData: UserProfileData;
  isAuthenticated: boolean;
  error: string;
}

const initialState: UserState = {
  loadingData: false,
  loadingAuth: false,
  userId: 0,
  userProfileData: {
    firstName: "",
    lastName: "",
    nickName: "",
    email: "",
    profilePicture: ""
  },
  isAuthenticated: false,
  error: ""
};

export const userSlice = createSlice({
  name: "user",
  initialState: initialState,
  reducers: {
    saveUserId(state, action: PayloadAction<number>) {
      state.userId = action.payload;
    },
    setUserAuthLoading(state) {
      state.loadingAuth = true;
    },
    clearUserAuthLoading(state) {
      state.loadingAuth = false;
    },
    clearUserData(state) {
      state = initialState;
    }
  },
  selectors: {
    selectUserId: state => state.userId,
    selectUserDataLoadingState: state => state.loadingData,
    selectUserAuthLoadingState: state => state.loadingAuth,
    selectUserAuthState: state => state.isAuthenticated,
    selectUserApiError: state => state.error
  },
  extraReducers: builder => {
    builder.addCase(authenticateUser.pending, state => {
      state.loadingAuth = true;
      state.isAuthenticated = false;
      state.error = "";
    });
    builder.addCase(authenticateUser.fulfilled, (state, response) => {
      state.loadingAuth = false;
      state.userId = response.payload;
      state.isAuthenticated = true;
      state.error = "";
    });
    builder.addCase(authenticateUser.rejected, (state, response) => {
      state.loadingAuth = false;
      state.isAuthenticated = false;
      state.error = response.error.message || "error";
    });
    builder.addCase(fetchUserData.pending, state => {
      state.loadingData = true;
      state.error = "";
    });
    builder.addCase(fetchUserData.fulfilled, (state, response) => {
      state.loadingData = false;
      state.userProfileData = response.payload;
      state.error = "";
    });
    builder.addCase(fetchUserData.rejected, (state, response) => {
      state.loadingData = false;
      state.error = response.error.message || "error";
    });
    builder.addCase(deleteUserAccount.pending, state => {
      state.error = "";
    });
    builder.addCase(deleteUserAccount.fulfilled, (state, response) => {
      state = initialState;
    });
    builder.addCase(deleteUserAccount.rejected, (state, response) => {
      state.error = response.error.message || "error";
    });
  }
});

export const {
  clearUserData,
  saveUserId,
  setUserAuthLoading,
  clearUserAuthLoading
} = userSlice.actions;
export const {
  selectUserId,
  selectUserDataLoadingState,
  selectUserApiError,
  selectUserAuthLoadingState,
  selectUserAuthState
} = userSlice.selectors;

export default userSlice;
