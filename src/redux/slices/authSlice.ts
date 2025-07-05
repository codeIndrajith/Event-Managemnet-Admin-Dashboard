import { createSlice } from "@reduxjs/toolkit";
import type { PayloadAction } from "@reduxjs/toolkit";
import type { UniqueResponseFormat } from "../../api/auth/authAPIs";
import type { RootState } from "../store";

interface AuthSliceUser {
  id: string;
  name: string;
  email: string;
  role: string;
  profileImage: string;
}

interface AuthSlice {
  isLoading: boolean;
  isAuthenticated: boolean;
  user: AuthSliceUser | null;
}

const initialState: AuthSlice = {
  isLoading: false,
  isAuthenticated: false,
  user: null,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    setAuthUser: (state, action: PayloadAction<UniqueResponseFormat>) => {
      const { payload } = action;
      const user: AuthSliceUser = {
        id: payload.data?.id,
        name: payload.data?.name,
        email: payload.data?.email,
        role: payload.data?.role,
        profileImage: payload.data?.profileImage,
      };
      state.user = user;
      state.isAuthenticated = true;
    },
    logout: (state) => {
      state.user = null;
      state.isAuthenticated = false;

      localStorage.removeItem("token");
    },
  },
});

// selectors
export const selectAuthSlice = (state: RootState) => state.auth;
export const selectAuthSliceUser = (state: RootState) => state?.auth.user;
export const selectAuthSliceIsAuthenticated = (state: RootState) =>
  state?.auth.isAuthenticated;

// actions
export const { setAuthUser } = authSlice.actions;
export const { logout } = authSlice.actions;

export default authSlice.reducer;
