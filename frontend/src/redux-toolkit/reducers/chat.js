import { createSlice } from "@reduxjs/toolkit";
import { getMessagesCountInLocalStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";

const initialState = {
  notificationCount: 0,
  newMessagesAlert: getMessagesCountInLocalStorage({
    key: NEW_MESSAGE_ALERT,
    get: true,
  }) || [
    {
      chatId: "",
      count: 0,
    },
  ],
};

const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    incrementNotificationCount: (state) => {
      console.log("incrementNotificationCount triggered");

      state.notificationCount++;
    },
    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },

    setNewMessagesAlert: (state, action) => {
      let { chatId } = action.payload;
      console.log("setNewMessagesAlert triggered for chatId:", chatId); // log here

      const index = state.newMessagesAlert.findIndex(
        (item) => item.chatId === chatId
      );

      if (index !== -1) {
        state.newMessagesAlert[index].count += 1;
      } else {
        state.newMessagesAlert.push({
          chatId,
          count: 1,
        });
      }
    },
    removeMessagesAlert: (state, action) => {
      state.newMessagesAlert = state.newMessagesAlert.filter(
        (item) => item.chatId !== action.payload
      );
    },
  },
});

export const {
  incrementNotificationCount,
  resetNotificationCount,
  setNewMessagesAlert,
  removeMessagesAlert,
} = chatSlice.actions;

export default chatSlice.reducer;
