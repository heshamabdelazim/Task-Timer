import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";

import "../node_modules//bootstrap/dist/css/bootstrap.min.css";
import "../node_modules/bootstrap/dist/js/bootstrap.min.js";
import { Provider } from "react-redux";
import myStore from "./RTK/store.js";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Provider store={myStore}>
      <App />
    </Provider>
  </React.StrictMode>
);
