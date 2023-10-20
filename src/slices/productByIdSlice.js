import { createSlice } from "@reduxjs/toolkit";
import { getProductById } from "../actions/productsAction";

// creo este slice para obtener el estado del detalle de producto
export const initialState = {
    product: null,
    loading: false,
    error: null
}

export const productByIdSlice = createSlice({
    name: "productByIdSlice",
    initialState,
    reducers: {
        resetGetById: (state, action) => { //reducer local
            state.loading = false;
            state.error = null;
            state.product = null;
        }
    },
    extraReducers: {  // reducers remotos
        [getProductById.pending]: (state) => { // utiliza el nuevo action para obtener el detalle de producto
            state.loading = true;
            state.error = null;
        },
        [getProductById.fulfilled]: (state, {payload}) => { // utiliza el nuevo action para obtener el detalle de producto
            state.loading = false;
            state.product = payload.data;
            state.error = null;
        },
        [getProductById.rejected]: (state, action) => { // utiliza el nuevo action para obtener el detalle de producto
            state.loading = false;
            state.error = action.payload;
        },
    },
});

export const { resetGetById } = productByIdSlice.actions;
export const productByIdReducer = productByIdSlice.reducer;