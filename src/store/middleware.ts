import { createListenerMiddleware, isAnyOf } from "@reduxjs/toolkit"
import { setCharactersCurrentPage, getCharactersAsync } from "./charactersSlice"
import type { RootState } from "./index"

// This middleware is used to save in local storage the currentPage,
// each time it is changed through `setCharactersCurrentPage` or `getCharactersAsync.fulfilled`
export const listenerMiddleware = createListenerMiddleware()
listenerMiddleware.startListening({
  matcher: isAnyOf(setCharactersCurrentPage, getCharactersAsync.fulfilled),
  effect: (action, listenerApi) =>
    localStorage.setItem(
      "characters-currentPage",
      JSON.stringify(
        (listenerApi.getState() as RootState).characters.currentPage,
      ),
    ),
})
