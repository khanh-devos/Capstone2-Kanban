import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';

const URL = 'https://api.tvmaze.com/seasons/1/episodes';
export const LIKES_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
export const APP = 'WJMi62Cw2ldmsCpFe58w';

const initialState = {
  movies: [],
  amount: 2,
  isLoading: true,
};

export const reduxGetEpisodes = createAsyncThunk(
  'movies/reduxGetEpisodes',
  async (name, thunkAPI) => {
    try {
      // console.log(name);
      // console.log(thunkAPI);
      // console.log(thunkAPI.getState());
      // thunkAPI.dispatch(openModal());
      // const resp = await axios(URL);
      // return resp.data;

      let movies = [];
      await fetch(URL)
        .then(async (res) => {
          if (res.ok && res.status === 200) movies = await res.json();
        });

      return movies;
    } catch (error) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  },
);

const movieSlice = createSlice({
  name: 'movies',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reduxGetEpisodes.pending, (state) => {
        state.isLoading = false;
      })
      .addCase(reduxGetEpisodes.fulfilled, (state, action) => {
        // console.log(action);
        state.isLoading = false;
        state.movies = action.payload;
        state.amount = action.payload.length;
      })
      .addCase(reduxGetEpisodes.rejected, (state) => {
        state.isLoading = false;
        // console.log(action);
      });
  },
});

export const { ini } = movieSlice.actions;

export default movieSlice.reducer;
