import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  favoriteItems: [],
};

const favoriteSlice = createSlice({
  name: 'favorite',
  initialState,
  reducers: {
    addFavoriteProduct: (state, action) => {
      state.favoriteItems.push(action.payload);
    },
    removeFavoriteProduct: (state, action) => {
      state.favoriteItems = state.favoriteItems.filter(
        (item) => item.id !== action.payload
      );
    },
  },
});

export const { addFavoriteProduct, removeFavoriteProduct } = favoriteSlice.actions;
export default favoriteSlice.reducer;
