import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  notificationCount: 0,
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotificationCount: (state) => {
      state.notificationCount += 1;
    },
    decrementNotificationCount: (state) => {
      state.notificationCount = 0;
    },
  },
});

export const { incrementNotificationCount, decrementNotificationCount } =
  chatSlice.actions;

export default chatSlice.reducer;
