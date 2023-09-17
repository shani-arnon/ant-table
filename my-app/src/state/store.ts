import { configureStore } from "@reduxjs/toolkit";
import tableReducer from "./tableSlice";

export default configureStore({
  reducer: { 
    table: tableReducer 
  },
  middleware: getDefaultMiddleware =>
  getDefaultMiddleware({
    serializableCheck: false,
  }),
});