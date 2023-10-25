import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "../utilities/axios";
import { delayedTimeout } from "../utilities/delayedTimeout";

// creacion del action para el usuario
export const login = createAsyncThunk(
  "user/login",
  async (params, { rejectWithValue }) => {
    try {
      const requestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      const { data } = await axios.post(
        `/api/v1/usuario/login`,
        params,
        requestConfig
      );

      // almacenamos el token del usuario dentro del storage del browser
      localStorage.setItem("token", data.token);
      await delayedTimeout(1000);
      return data;

    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// creacion del metodo register del action para el usuario
export const register = createAsyncThunk(
  "user/register",
  async (params, { rejectWithValue }) => {
    try {

      const requestConfig = {
        headers: {
          // para que el request pueda aceptar images
          // el formato debe ser multipart/form-data
          "Content-Type": "multipart/form-data",
        },
      };

      const { data } = await axios.post(
        `/api/v1/usuario/register`,
        params,
        requestConfig
      );

      localStorage.setItem("token", data.token);
      await delayedTimeout(1000);
      return data;

    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// metodo para actualizar la data de un usuario
export const update = createAsyncThunk(
  "user/update",
  async (params, { rejectWithValue }) => {
    try {
      const requestConfig = {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      };
      const { data } = await axios.put(
        `/api/v1/usuario/update`,
        params,
        requestConfig
      );
      localStorage.setItem("token", data.token);
      await delayedTimeout(1000);
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// metodo que me permite cargar la data de un usuario en sesion,
// es decir, cuando el token de seguridad ya esta almacenado en el browser
export const loadUser = createAsyncThunk(
  "user/getUser",
  async ({ rejectWithValue }) => {
    try {
      const { data } = await axios.get(`/api/v1/usuario`);

      // la data tambien me devuelve un nuevo token
      // que voy a almacenar en el browser
      localStorage.setItem("token", data.token);
      await delayedTimeout(1000);
      return data;

    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// permite actualizar el password de un usuario
export const updatePassword = createAsyncThunk(
  "user/updatePassword",
  async (params, { rejectWithValue }) => {
    try {
      const requestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // metodo de tipo put (actualizacion)
      const { data } = await axios.put(
        `/api/v1/usuario/updatepassword`,
        params,
        requestConfig
      );

      return data;

    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// metodo para cuando olvido el password
export const forgotSendPassword = createAsyncThunk(
  "user/forgotPassword",
  async (params, { rejectWithValue }) => {
    try {
      const requestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };

      // endpoint desarrollado y probado en el backend
      const { data } = await axios.post(
        `/api/v1/usuario/forgotpassword`,
        params,
        requestConfig
      );

      return data;

    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);

// metodo para resetear el password
export const resetPassword = createAsyncThunk(
  "user/resetPassword",
  async ({ email, password, confirmPassword, token }, { rejectWithValue }) => {
    try {
      const requestConfig = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      // creo un objeto de tipo request
      const request = { email, password, confirmPassword, token };
      const { data } = await axios.post(
        `/api/v1/usuario/resetpassword`,
        request,
        requestConfig
      );
      return data;
    } catch (err) {
      return rejectWithValue(err.response.data.message);
    }
  }
);
