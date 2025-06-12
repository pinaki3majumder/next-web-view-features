import { configureStore } from "@reduxjs/toolkit";
import { loanDataReducer } from "./slices/loan";

export const store = configureStore({
  reducer: {
    loan: loanDataReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
