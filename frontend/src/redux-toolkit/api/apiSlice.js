import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import server from "../../constants/config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
  }),
  tagTypes: ["Chat", "User", "Message"],
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "chat/mychats",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    searchUser: builder.query({
      query: (name) => ({
        url: `auth/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "auth/send-request",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),

    getNotifications: builder.query({
      query: () => ({
        url: "auth/notifications",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "auth/accept-request",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),

    membersChatDetails: builder.query({
      query: ({ chatId, populate = false }) => {
        let url = `chat/${chatId}`;
        if (populate) url += "?populate=true";

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),
    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/message/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),

    sendFileAttachments: builder.mutation({
      query: (data) => ({
        url: "chat/message",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),

    getMyGroups: builder.query({
      query: () => ({
        url: "chat/mychats/mygroups",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),

    availableFriends: builder.query({
      query: (chatId) => {
        let url = `auth/friends`;
        if (chatId) url += `?chatId=${chatId}`;

        return {
          url,
          credentials: "include",
        };
      },
      providesTags: ["Chat"],
    }),

    newGroup: builder.mutation({
      query: ({ name, members }) => ({
        url: "chat/groupchat",
        method: "POST",
        body: { name, members },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

export const {
  useMyChatsQuery,
  useLazySearchUserQuery,
  useSendFriendRequestMutation,
  useGetNotificationsQuery,
  useAcceptFriendRequestMutation,
  useMembersChatDetailsQuery,
  useGetMessagesQuery,
  useSendFileAttachmentsMutation,
  useGetMyGroupsQuery,
  useAvailableFriendsQuery,
  useNewGroupMutation,
} = apiSlice;
