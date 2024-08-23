import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";
import server from "../../constants/config";

export const apiSlice = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: `${server}/api/v1/` }),
  tagTypes: ["Chat"],
  endpoints: (builder) => ({
    myChats: builder.query({
      query: () => ({
        url: "chat/mychats",
        credentials: "include",
      }),
      providesTags: ["Chat"],
    }),
  }),
});

export const { useMyChatsQuery } = apiSlice;
