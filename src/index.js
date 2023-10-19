import React from "react";
import ReactDOM from "react-dom";
import { Provider } from "react-redux";
import store from "./store";
import App from "./App";
import { positions, transitions, Provider as AlertProvider } from "react-alert"; //añadida esta libreria
import AlertTemplate from "react-alert-template-basic"; //referenciamos al template

//indico cuales van a ser las caracteristicas de este mensaje
const options = {
  timeout: 5000,
  offset: "30px",
  position: positions.BOTTOM_CENTER,
  transition: transitions.SCALE,
};

ReactDOM.render(
  <Provider store={store}>
     {/* inyectamos el mensage en el react-dom render */}
    <AlertProvider template={AlertTemplate} {...options}>
      <App />
    </AlertProvider>
  </Provider>,
  document.getElementById("root")
);
