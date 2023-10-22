import { createSlice } from "@reduxjs/toolkit";
import { login, register, update, updatePassword, loadUser } from "../actions/userAction";
import { saveAddressInfo } from "../actions/cartAction";

const initialState = {
  loading: false,
  errores: [],
  isAuthenticated: false,
  user: null,
  isUpdated: false,
  direccionEnvio: null,
};

export const securitySlice = createSlice({
  name: "security",
  initialState,
  reducers: {
    logout: (state, action) => {
      // para salir de sesion elimino el token de seguridad
      localStorage.removeItem("token");
      state.isAuthenticated = false;
      state.user = null;
      state.errores = [];
      state.loading = false;
      state.direccionEnvio = null;
    },

    resetUpdateStatus: (state, action) => {
      state.isUpdated = false;
      state.user = null;
      state.errores = [];
      state.loading = false;
      state.direccionEnvio = null;
    },
  },
  extraReducers: {
    // variables de estado globales remotas
    // bloque función login usuario
    [login.pending]: (state) => {
      state.loading = true;
      state.errores = [];
    },
    [login.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.errores = [];
      state.isAuthenticated = true;
      state.direccionEnvio = payload.direccionEnvio;
    },
    [login.rejected]: (state, action) => {
      state.loading = false;
      state.errores = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    // bloque función register usuario
    [register.pending]: (state) => {
      state.loading = true;
      state.errores = [];
    },
    [register.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.errores = [];
      state.isAuthenticated = true;
    },
    [register.rejected]: (state, action) => {
      state.loading = false;
      state.errores = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    // bloque función update para actualizar el perfil del usuario
    [update.pending]: (state) => {
      state.loading = true;
      state.errores = [];
    },
    [update.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.errores = [];
      state.isAuthenticated = true;
      state.isUpdated = true; // isUpdated pasa a ser true
    },
    [update.rejected]: (state, action) => {
      state.loading = false;
      state.errores = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    // bloque función updatePassword para actualizar el password del usuario
    [updatePassword.pending]: (state) => {
      state.loading = true;
      state.errores = [];
    },
    [updatePassword.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isUpdated = true;
    },
    [updatePassword.rejected]: (state, action) => {
      state.loading = false;
      state.errores = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    // bloque función loadUser para cargar la información del usuario
    [loadUser.pending]: (state) => {
      state.loading = true;
      state.errores = [];
    },
    [loadUser.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.user = payload;
      state.errores = [];
      state.direccionEnvio = payload.direccionEnvio; // necesito su direccion de envio
    },
    [loadUser.rejected]: (state, action) => {
      state.loading = false;
      state.errores = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
    // bloque función saveAddressInfo para almacenar la dirección del usuario
    [saveAddressInfo.pending]: (state) => {
      state.loading = true;
      state.errores = [];
    },
    [saveAddressInfo.fulfilled]: (state, { payload }) => {
      state.loading = false;
      state.isUpdated = true;
      state.errores = [];
      state.direccionEnvio = payload;
    },
    [saveAddressInfo.rejected]: (state, action) => {
      state.loading = false;
      state.errores = action.payload;
      state.isAuthenticated = false;
      state.user = null;
    },
  },
});

export const { logout, resetUpdateStatus } = securitySlice.actions;

export const securityReducer = securitySlice.reducer;
