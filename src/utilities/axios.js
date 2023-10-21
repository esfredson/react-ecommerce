import axios from "axios";
import { config } from "../constants/AppConstants";

// obtiene el token desde el local storage
const token = localStorage.getItem("token");

const BASE_URL = config.url.API_URL;
axios.defaults.baseURL = BASE_URL;

// agregar a la cabecera de autorizacion el token jwt
axios.defaults.headers.common = { Authorization: `bearer ${token}` };

export default axios;
