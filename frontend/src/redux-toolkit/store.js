import { configureStore } from "@reduxjs/toolkit";
import authReducer from "./reducers/reducerAuth";
import { apiSlice } from "./api/apiSlice";
import miscReducer from "./reducers/misc";

const store = configureStore({
  reducer: {
    auth: authReducer,
    misc: miscReducer,
    [apiSlice.reducerPath]: apiSlice.reducer,
  },
  middleware: (defaultMiddleware) => [
    ...defaultMiddleware().concat(apiSlice.middleware),
  ],
});

export default store;
