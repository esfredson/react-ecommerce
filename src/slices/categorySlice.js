import { createSlice } from "@reduxjs/toolkit";
import { getCategories } from "../actions/categoryAction";

// creamos el slice state function para las categorias 
export const initialState = {
  categories: [],
  loading: false,
  error: null,
};

export const categorySlice = createSlice({
  name: "categories",
  initialState,
  reducers: {},
  extraReducers: {
    [getCategories.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },
    [getCategories.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.categories = payload.data;
      state.error = null;
    },
    [getCategories.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const categoryReducer = categorySlice.reducer;
