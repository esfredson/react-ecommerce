import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";
import { delayedTimeout } from "../utilities/delayedTimeout";
import { httpParams } from "../utilities/httpParams";

export const getProducts = createAsyncThunk(
  "products/getProducts",
  async (ThunkApi, { rejectWithValue }) => {
    try {
      await delayedTimeout(1000); // consume esta funcion de utilidad para poder ver en accion al componente Loader (utiliza await porque trabaja con una promesa)
      return await axios.get(`/api/v1/product/list`);
    }
    catch (err) {
      return rejectWithValue(`Errores: ${err.message}`);
    }
  }
);

// creo este metodo para obtener el detalle de producto
export const getProductById = createAsyncThunk(
  "products/getProductId",
  async (id, { rejectWithValue }) => {
    try {
      await delayedTimeout(1000);
      return await axios.get(`/api/v1/product/${id}`);
    }
    catch (err) {
      return rejectWithValue(`Errores: ${err.message}`);
    }
  }
);

// creo este metodo action para trabajar con la paginacion de productos
export const getProductPagination = createAsyncThunk(
  "products/getProductPagination",
  async (params, { rejectWithValue }) => {
    try {
      await delayedTimeout(1000);

      // los 'params' nos llegan en formato json. Necesitamos convertirlo a un string
      // que representa los parametros de la paginacion y que se va a colocar en la url
      params = httpParams(params);

      const paramUrl = new URLSearchParams(params).toString();

      // 'paramUrl' por ejemplo, se dibuja asi: ?'pageSize=10&pageIndex=1&categoryId=100'
      var results = axios.get(`/api/v1/product/pagination?${paramUrl}`);

      return (await results).data;
    }
    catch (err) {
      return rejectWithValue(`Errores: ${err.message}`);
    }
  }
);
