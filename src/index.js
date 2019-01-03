import React from "react";
import ReactDOM from "react-dom";
import App from "./components/App";
import "bootstrap/dist/css/bootstrap.min.css";
import "./stylesheets/index.css";
import { store } from "./store/store";
import { userStore } from "./store/userStore";
import { Provider } from "mobx-react";

ReactDOM.render(
  <Provider store={store} userStore={userStore}>
    <App />
  </Provider>,
  document.getElementById("root")
);
