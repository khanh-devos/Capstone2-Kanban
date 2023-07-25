import { createSlice } from "@reduxjs/toolkit";

const initialState = {
  movies: [
    {
        id: 1,
        title: 'movie1 1',
        image: 'none'
    }
  ],
  amount: 2,
  isLoading: true,
};




const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers:{}
})


export default movieSlice.reducer;

