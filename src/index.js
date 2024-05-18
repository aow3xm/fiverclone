import React from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import App from "./App";
import { StyleProvider } from "@ant-design/cssinjs";
import { Provider } from "react-redux";
import store from "./redux/store";

const root = ReactDOM.createRoot(document.getElementById("root"));
root.render(
  <Provider store={store}>
    <StyleProvider hashPriority="high">
      <App />
    </StyleProvider>
  </Provider>
);
