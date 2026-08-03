import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import server from "../../constants/config";

/**
 * API slice for managing all backend API calls using RTK Query.
 * Defines endpoints and provides auto-generated hooks for data fetching.
 */
export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: `${server}/api/v1/`,
  }),
  tagTypes: ["Chat", "User", "Message"],
  endpoints: (builder) => ({
    // Fetch current user's chats
    myChats: builder.query({
      query: () => ({
        url: "chat/mychats",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    // Search users by name
    searchUser: builder.query({
      query: (name) => ({
        url: `auth/search?name=${name}`,
        credentials: "include",
      }),
      providesTags: ["User"],
    }),
    // Send friend request
    sendFriendRequest: builder.mutation({
      query: (data) => ({
        url: "auth/send-request",
        method: "POST",
        credentials: "include",
        body: data,
      }),
      invalidatesTags: ["User"],
    }),
    // Get user notifications
    getNotifications: builder.query({
      query: () => ({
        url: "auth/notifications",
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    // Accept friend request
    acceptFriendRequest: builder.mutation({
      query: (data) => ({
        url: "auth/accept-request",
        method: "POST",
        body: data,
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    // Get chat details with members
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
    // Get messages for a chat with pagination
    getMessages: builder.query({
      query: ({ chatId, page }) => ({
        url: `chat/message/${chatId}?page=${page}`,
        credentials: "include",
      }),
      keepUnusedDataFor: 0,
    }),
    // Send file attachments
    sendFileAttachments: builder.mutation({
      query: (data) => ({
        url: "chat/message",
        method: "POST",
        body: data,
        credentials: "include",
      }),
    }),
    // Get user's groups
    getMyGroups: builder.query({
      query: () => ({
        url: "chat/mychats/mygroups",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
    // Get available friends for adding to group
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
    // Create new group
    newGroup: builder.mutation({
      query: ({ name, members }) => ({
        url: "chat/groupchat",
        method: "POST",
        body: { name, members },
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    // Rename group
    renameGroup: builder.mutation({
      query: ({ chatId, name }) => ({
        url: `chat/${chatId}`,
        method: "PATCH",
        body: { name },
        credentials: "include",
      }),
    }),
    // Add member to group
    addGroupMember: builder.mutation({
      query: ({ members, chatId }) => ({
        url: "chat/addmembers",
        method: "PUT",
        credentials: "include",
        body: { members, chatId },
      }),
      invalidatesTags: ["Chat"],
    }),
    // Remove member from group
    removeGroupMember: builder.mutation({
      query: ({ chatId, userId }) => ({
        url: "chat/removemember",
        method: "DELETE",
        credentials: "include",
        body: { chatId, userId },
      }),
      invalidatesTags: ["Chat"],
    }),
    // Delete group chat
    deleteGroupChats: builder.mutation({
      query: (chatId) => ({
        url: `chat/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
    // Leave group
    leaveGroup: builder.mutation({
      query: (chatId) => ({
        url: `chat/leave/${chatId}`,
        method: "DELETE",
        credentials: "include",
      }),
      invalidatesTags: ["Chat"],
    }),
  }),
});

// Export auto-generated hooks for use in components
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
  useRenameGroupMutation,
  useAddGroupMemberMutation,
  useRemoveGroupMemberMutation,
  useDeleteGroupChatsMutation,
  useLeaveGroupMutation,
} = apiSlice;
