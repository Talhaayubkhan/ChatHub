import { createSlice } from "@reduxjs/toolkit";
import { adminLogin, adminLogOut, getVerifiedAdmin } from "../thunks/admin";
import toast from "react-hot-toast";

/**
 * Initial state for the authentication slice.
 * Tracks user data, admin status, and loading state.
 */
const initialState = {
  user: null,
  admin: false,
  loader: true,
};

/**
 * Auth slice manages authentication state including user info and admin status.
 * Handles login/logout actions and async thunks for admin operations.
 */
const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    /**
     * Sets user data when user exists (logged in).
     * @param {Object} state - Current state
     * @param {Object} action - Action with user payload
     */
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    /**
     * Clears user data when user doesn't exist (logged out).
     * @param {Object} state - Current state
     */
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
  extraReducers: (builder) => {
    builder
      // Admin login cases
      .addCase(adminLogin.fulfilled, (state, action) => {
        state.admin = true;
        toast.success("Login Successful!");
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.admin = false;
        const errorMessage = action.error.message || "Error While Login!";
        toast.error(errorMessage);
      })
      // Get verified admin cases
      .addCase(getVerifiedAdmin.fulfilled, (state, action) => {
        state.admin = !!action.payload;
      })
      .addCase(getVerifiedAdmin.rejected, (state) => {
        state.admin = false;
      })
      // Admin logout cases
      .addCase(adminLogOut.fulfilled, (state) => {
        state.admin = false;
        toast.success("Logout Successful!");
      })
      .addCase(adminLogOut.rejected, (state, action) => {
        state.admin = true;
        const errorMessage = action.error.message || "Error While Logout!";
        toast.error(errorMessage);
      });
  },
});

export const { userExists, userNotExists } = authSlice.actions;

export default authSlice.reducer;
