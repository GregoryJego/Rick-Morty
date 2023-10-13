import { configureStore, ThunkAction, Action } from "@reduxjs/toolkit"
import charactersReducer from "./charactersSlice"
import { storeStatus } from "../constants"
import { listenerMiddleware } from "./middleware"

const currentPageState = JSON.parse(
  localStorage.getItem("characters-currentPage") || "1", // by default, the page should be page 1
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
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().concat(listenerMiddleware.middleware),
})

export type AppDispatch = typeof store.dispatch
export type RootState = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<
  ReturnType,
  RootState,
  unknown,
  Action<string>
>
