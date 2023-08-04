import { configureStore } from '@reduxjs/toolkit';
import likeReducer from './likes/likeSlice.js';
import movieReducer from './movies/movieSlice.js';

export default function createGlobalStore() {
  return configureStore({
    reducer: {
      movie: movieReducer,
      like: likeReducer,
    },
  });
}