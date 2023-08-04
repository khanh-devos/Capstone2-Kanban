import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import axios from 'axios';

export const LIKES_URL = 'https://us-central1-involvement-api.cloudfunctions.net/capstoneApi/';
export const APP = 'WJMi62Cw2ldmsCpFe58w';

const initialState = {
  likes: [],
  isLoading: true,
};

export const reduxGetLikes = createAsyncThunk(
  'like/reduxGetLikes',
  async (name, thunkAPI) => {
    try {
    //   console.log(thunkAPI);
      const res = await axios.get(`${LIKES_URL}apps/${APP}/likes`);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  },
);

export const reduxAddLike = createAsyncThunk(
  'like/reduxAddLike',
  async (updateLike, thunkAPI) => {
    try {
    //   console.log(thunkAPI);
      const res = await axios.post(`${LIKES_URL}apps/${APP}/likes`, updateLike);
      return res.data;
    } catch (err) {
      return thunkAPI.rejectWithValue('something went wrong');
    }
  },
);

const likeSlice = createSlice({
  name: 'like',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(reduxGetLikes.pending, (state) => ({
        ...state,
        isLoading: false,
      }))
      .addCase(reduxGetLikes.fulfilled, (state, { payload }) => ({
        ...state,
        isLoading: false,
        likes: payload,
      }))
      .addCase(reduxGetLikes.rejected, (state) => ({
        ...state,
        isLoading: false,
      }))
      .addCase(reduxAddLike.fulfilled, (state) => ({
        ...state,
      }));
  },
});

// export const {} = likeSlice.actions;
export default likeSlice.reducer;