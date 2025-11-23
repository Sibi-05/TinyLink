import { configureStore } from "@reduxjs/toolkit";
import linksReducer from "./slices/linkSlice.js";

export const store = configureStore({
  reducer: {
    links: linksReducer,
  },
});
