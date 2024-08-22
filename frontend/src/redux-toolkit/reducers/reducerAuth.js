// import { createSlice } from "@reduxjs/toolkit";

// const initialState = {
//   user: null,
//   admin: false,
//   loader: true,
// };

// const authSlice = createSlice({
//   name: "auth",
//   initialState,
//   reducers: {
//     userExists: (state, action) => {
//       state.user = action.payload;
//       state.loader = false;
//     },
//     userNotExists: (state) => {
//       state.user = null;
//       state.loader = false;
//     },
//   },
// });

// export const { userExists, userNotExists } = authSlice.actions;

// export default authSlice.reducer;

import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  user: null,
  admin: false,
  loader: true,
  loading: false, // Added loading state
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userExists: (state, action) => {
      state.user = action.payload;
      state.loader = false;
      state.loading = false; // Reset loading state on success
    },
    userNotExists: (state) => {
      state.user = null;
      state.loader = false;
      state.loading = false; // Reset loading state on failure
    },
    setLoading: (state, action) => {
      state.loading = action.payload;
    },
  },
});

export const { userExists, userNotExists, setLoading } = authSlice.actions;

export default authSlice.reducer;
