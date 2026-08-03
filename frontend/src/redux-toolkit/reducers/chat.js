import { createSlice } from "@reduxjs/toolkit";
import { getMessagesCountInLocalStorage } from "../../lib/features";
import { NEW_MESSAGE_ALERT } from "../../constants/events";

/**
 * Initial state for chat-related data.
 * Tracks notification count and new message alerts per chat.
 */
const initialState = {
  notificationCount: 0,
  newMessagesAlert:
    getMessagesCountInLocalStorage({
      key: NEW_MESSAGE_ALERT,
      get: true,
    }) || [
      {
        chatId: "",
        count: 0,
      },
    ],
};

/**
 * Chat slice manages chat notifications and new message alerts.
 * Handles incrementing/resetting notification counts and tracking unread messages.
 */
const chatSlice = createSlice({
  name: "chat",
  initialState,
  reducers: {
    /**
     * Increments the global notification count.
     * @param {Object} state - Current state
     */
    incrementNotificationCount: (state) => {
      state.notificationCount++;
    },
    /**
     * Resets the notification count to zero.
     * @param {Object} state - Current state
     */
    resetNotificationCount: (state) => {
      state.notificationCount = 0;
    },
    /**
     * Adds or updates a new message alert for a specific chat.
     * @param {Object} state - Current state
     * @param {Object} action - Action with chatId payload
     */
    setNewMessagesAlert: (state, action) => {
      const { chatId } = action.payload;
      const index = state.newMessagesAlert.findIndex(
        (item) => item.chatId === chatId
      );

      if (index !== -1) {
        // Increment count for existing chat
        state.newMessagesAlert[index].count += 1;
      } else {
        // Add new chat with count of 1
        state.newMessagesAlert.push({
          chatId,
          count: 1,
        });
      }
    },
    /**
     * Removes message alert for a specific chat.
     * @param {Object} state - Current state
     * @param {Object} action - Action with chatId payload
     */
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
