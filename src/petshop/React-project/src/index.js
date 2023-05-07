import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App";
import reportWebVitals from "./reportWebVitals";


const root = document.getElementById("root");
const element = (
  <React.StrictMode>
    <App />
  </React.StrictMode>
);

ReactDOM.createRoot(root).render(element);
// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
