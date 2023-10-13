import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit"
import { config } from "../config"
import { storeStatus } from "../constants"
import { RootState } from "."

interface CharactersState {
  currentPage: number
  results: {
    [key: number]: { data: []; info: { next?: string; prev?: string } }
  } | null
  status: string
  error: string
}

const initialState: CharactersState = {
  currentPage: 1,
  results: {},
  status: storeStatus.IDLE,
  error: "",
}

// The function below is async and fetchs the data from Rick and Morty API
export const getCharactersAsync = createAsyncThunk<
  { data: []; info: {}; page: number },
  number
>("characters/fetchCharacters", async (page: number, { rejectWithValue }) => {
  try {
    const response = await fetch(
      `${config.apiURL}${page}`, // Method GET is implicit
    )
    // There is an error
    if (!response.ok) {
      return rejectWithValue(
        response.status ? `Error: status ${response.status}` : null,
      )
    }
    // We got the results
    const allResults = await response.json()
    const { results, info } = allResults
    return { data: results, info, page }
  } catch (error) {
    // There is an error
    return rejectWithValue(error instanceof Error ? error?.message : null)
  }
})

export const charactersSlice = createSlice({
  name: "characters",
  initialState,
  reducers: {
    setCharactersCurrentPage: (state, action: PayloadAction<number>) => {
      state.currentPage = action.payload
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(getCharactersAsync.pending, (state) => {
        state.status = storeStatus.LOADING
      })
      .addCase(getCharactersAsync.fulfilled, (state, action) => {
        state.status = storeStatus.SUCCEEDED
        state.currentPage = action.payload.page
        state.results = {
          ...state.results,
          [action.payload.page]: {
            data: action.payload.data,
            info: action.payload.info,
          },
        }
        state.error = "" // Reset error
      })
      .addCase(getCharactersAsync.rejected, (state, action) => {
        state.status = storeStatus.FAILED
        state.error =
          typeof action.payload === "string"
            ? action.payload
            : config.genericError
      })
  },
})

// ACTIONS
export const { setCharactersCurrentPage } = charactersSlice.actions

// SELECTORS
export const selectCharactersCurrentPage = (state: RootState) =>
  state.characters.currentPage
export const selectCharactersList = (state: RootState) =>
  state.characters.results
export const selectCharactersStatus = (state: RootState) =>
  state.characters.status
export const selectCharactersError = (state: RootState) =>
  state.characters.error

export default charactersSlice.reducer
