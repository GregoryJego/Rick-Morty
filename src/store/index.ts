import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import charactersReducer from "./charactersSlice"
import { listenerMiddleware } from "./middleware"
import { storeStatus } from "../constants"

const currentPageState = JSON.parse(
  localStorage.getItem("characters-currentPage") || "1",
)

export const store = configureStore({
  preloadedState: {
    characters: {
      results: null,
      status: storeStatus.IDLE,
      error: "",
      currentPage: currentPageState === null ? 1 : currentPageState,
    },
  },
  reducer: {
    characters: charactersReducer,
  },
  middleware: (getDefaultMiddleware) => [
    ...getDefaultMiddleware(),
    listenerMiddleware.middleware,
  ],
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
