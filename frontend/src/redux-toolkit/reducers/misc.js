import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  isNewGroup: false,
  isAddMember: false,
  isNotifications: false,
  isMobileMenu: false,
  isSearch: false,
  isFileMenu: false,
  isDeleteMenu: false,
  uploadingLoader: false,
  selectedDeleteChat: {
    chatId: "",
    groupChat: false,
  },
};

const miscSlice = createSlice({
  name: "misc",
  initialState,
  reducers: {
    setIsNewGroup(state, action) {
      state.isNewGroup = action.payload;
    },
    setIsAddMember(state, action) {
      state.isAddMember = action.payload;
    },
    setIsNotifications(state, action) {
      state.isNotifications = action.payload;
    },
    setIsMobileMenu(state, action) {
      state.isMobileMenu = action.payload;
    },
    setIsSearch(state, action) {
      state.isSearch = action.payload;
    },
    setIsFileMenu(state, action) {
      state.isFileMenu = action.payload;
    },
    setIsDeleteMenu(state, action) {
      state.isDeleteMenu = action.payload;
    },
    setUploadingLoader(state, action) {
      state.uploadingLoader = action.payload;
    },
    setSelectedDeleteChat(state, action) {
      state.selectedDeleteChat = action.payload;
    },
  },
});

export const {
  setIsNewGroup,
  setIsAddMember,
  setIsNotifications,
  setIsMobileMenu,
  setIsSearch,
  setIsFileMenu,
  setIsDeleteMenu,
  setUploadingLoader,
  setSelectedDeleteChat,
} = miscSlice.actions;

export default miscSlice.reducer;
