import { createSlice } from "@reduxjs/toolkit";
import { adminLogin } from "../thunks/admin";
import toast from "react-hot-toast";

const initialState = {
  user: null,
  admin: false,
  loader: true,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(adminLogin.fulfilled, (state, action) => {
        console.log("Admin login successful:", action.payload); // Check this log

        state.admin = true;
        // state.loader = false;
        toast.success("Login Successful!", action.payload);
      })
      .addCase(adminLogin.rejected, (state, action) => {
        state.admin = false;
        // state.loader = false;
        const errorMessage = action.error.message || "Error While Login!";
        toast.error(errorMessage);
      });
  },
});

export const { userExists, userNotExists } = authSlice.actions;

export default authSlice.reducer;
