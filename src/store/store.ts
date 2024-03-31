import { configureStore } from "@reduxjs/toolkit";
import { websocketMiddleware, websocketSlice } from "./socket";

export const makeStore = () => {
  return configureStore({
    reducer: {
      websocket: websocketSlice,
    },
    middleware: (getDefaultMiddleware) => {
      return getDefaultMiddleware().concat(websocketMiddleware);
    },
  });
};

// Infer the type of makeStore
export type AppStore = ReturnType<typeof makeStore>;
// Infer the `RootState` and `AppDispatch` types from the store itself
export type RootState = ReturnType<AppStore["getState"]>;
export type AppDispatch = AppStore["dispatch"];
