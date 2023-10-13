interface storeStatusInterface {
  IDLE: string
  LOADING: string
  SUCCEEDED: string
  FAILED: string
}

export const storeStatus: storeStatusInterface = {
  IDLE: "idle",
  LOADING: "loading",
  SUCCEEDED: "succeeded",
  FAILED: "failed",
}

export const info = {
  PREV: "prev",
  NEXT: "next",
}
