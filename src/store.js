import { configureStore } from "@reduxjs/toolkit"
import movieReducer from "./redux/movies/movieSlice"

export default function createStore() {
  return configureStore({
    reducer: {
      movie: movieReducer
    },
  })
}