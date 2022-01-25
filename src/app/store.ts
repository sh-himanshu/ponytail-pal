import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit";
import postsReducers from "../features/posts/postsSlice";
import toggleReducers from "../features/toggle/toggleSlice";

export const store = configureStore({
  reducer: {
    posts: postsReducers,
    toggle: toggleReducers,
  },
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>;
