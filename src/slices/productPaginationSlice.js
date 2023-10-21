import { createSlice } from "@reduxjs/toolkit";
import { getProductPagination } from "../actions/productsAction";

// creamos la gestion de estados de la paginacion de productos
export const initialState = { products: [], loading: false, error: null,
                              count: 0, pageIndex: 1, pageSize: 3, pageCount: 0, resultByPage: 0,
                              search: null, precioMax: null, precioMin: null, category: null, rating: null,
                            };

export const productPaginationSlice = createSlice({
  name: "getProductPagination",
  initialState,
  reducers: {
    // bloque de reducers locales
    searchPagination: (state, action) => {
      state.search = action.payload.search;
      state.pageIndex = 1;
    },

    setPageIndex: (state, action) => {
      state.pageIndex = action.payload.pageIndex;
    },

    resetPagination: (state, action) => {
      state.precioMax = null;
      state.precioMin = null;
      state.pageIndex = 1;
      state.search = null;
      state.category = null;
      state.rating = null;
    },

    updatePrecio: (state, action) => {
      state.precioMin = action.payload.precio[0];
      state.precioMax = action.payload.precio[1];
    },

    updateCategory: (state, action) => {
      state.category = action.payload.category;
    },

    updateRating: (state, action) => {
      state.rating = action.payload.rating;
    },
  },
  // bloque de reducers remotos
  extraReducers: {
    [getProductPagination.pending]: (state) => {
      state.loading = true;
      state.error = null;
    },

    [getProductPagination.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.products = payload.data;
      state.count = payload.count;
      state.pageIndex = payload.pageIndex;
      state.pageSize = payload.pageSize;
      state.pageCount = payload.pageCount;
      state.resultByPage = payload.resultByPage;
      state.error = null;
    },

    [getProductPagination.rejected]: (state, action) => {
      state.loading = false;
      state.error = action.payload;
    },
  },
});

export const { searchPagination, setPageIndex, resetPagination, updatePrecio,
               updateCategory, updateRating,
             } = productPaginationSlice.actions;

export const productPaginationReducer = productPaginationSlice.reducer;