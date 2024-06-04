import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import {
  authenticateUser,
  deleteUserAccount,
  fetchUserData,
  updateUserProfile
} from "./asyncThunks";
import { UserProfileData } from "../../../ui/types/user";

interface UserState {
  loadingData: boolean;
  loadingAuth: boolean;
  updatingUserLoading: boolean;
  userId: number;
  userProfileData: UserProfileData;
  isAuthenticated: boolean;
  isUserUpdated: boolean;
  error: string;
}

const initialState: UserState = {
  loadingData: false,
  loadingAuth: false,
  updatingUserLoading: false,
  userId: 0,
  userProfileData: {
    firstName: "",
    lastName: "",
    nickName: "",
    email: "",
    profilePicture: ""
  },
  isAuthenticated: false,
  isUserUpdated: false,
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
    clearUserData() {
      return { ...initialState };
    },
    clearUserUpdatedState(state) {
      state.isUserUpdated = false;
    },
    clearUserDataLoading(state) {
      state.loadingData = false;
    }
  },
  selectors: {
    selectUserId: state => state.userId,
    selectUserData: state => state.userProfileData,
    selectUserDataLoadingState: state => state.loadingData,
    selectUserAuthLoadingState: state => state.loadingAuth,
    selectUpdatingUserLoadingState: state => state.updatingUserLoading,
    selectUserAuthState: state => state.isAuthenticated,
    selectUserUpdatedState: state => state.isUserUpdated,
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
    builder.addCase(updateUserProfile.pending, state => {
      state.updatingUserLoading = true;
      state.isUserUpdated = false;
      state.error = "";
    });
    builder.addCase(updateUserProfile.fulfilled, state => {
      state.updatingUserLoading = false;
      state.isUserUpdated = true;
      state.error = "";
    });
    builder.addCase(updateUserProfile.rejected, (state, response) => {
      state.updatingUserLoading = false;
      state.isUserUpdated = false;
      state.error = response.error.message || "error";
    });
    builder.addCase(deleteUserAccount.pending, state => {
      state.error = "";
    });
    builder.addCase(deleteUserAccount.fulfilled, () => {
      return { ...initialState };
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
  clearUserAuthLoading,
  clearUserUpdatedState,
  clearUserDataLoading
} = userSlice.actions;
export const {
  selectUserId,
  selectUserData,
  selectUserDataLoadingState,
  selectUserApiError,
  selectUserAuthLoadingState,
  selectUserUpdatedState,
  selectUpdatingUserLoadingState,
  selectUserAuthState
} = userSlice.selectors;

export default userSlice;
