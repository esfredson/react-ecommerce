import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";

// creo este archivo para albergar el action de la direccion del usuario
export const saveAddressInfo = createAsyncThunk(
  "shopingCart/saveAddressInfo",
  async (params, { rejectWithValue }) => {
    try {
      const requestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/v1/order/address`,
        params,
        requestConfig
      );

      return data;
      
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
