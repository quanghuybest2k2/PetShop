import React from "react";
import { BrowserRouter as Router, Switch } from "react-router-dom";
import config from "./config";

// import MasterLayout from './layouts/admin/MasterLayout';
import AdminPrivateRoute from "./AdminPrivateRoute";
import PublicRoute from "./PublicRoute";

import axios from "axios";

axios.defaults.baseURL = `${config.API_URL}/`; // base_url
axios.defaults.headers.post["Content-Type"] = "application/json";
axios.defaults.headers.post["Accept"] = "application/json";

axios.defaults.withCredentials = true;
// lưu vào localStorage
axios.interceptors.request.use(function (config) {
  const token = localStorage.getItem("auth_token");
  config.headers.Authorization = token ? `Bearer ${token}` : "";
  return config;
});

function App() {
  return (
    <div className="App">
      <Router>
        <Switch>
          <AdminPrivateRoute path="/admin" name="Admin" />

          <PublicRoute path="/" name="Home" />
        </Switch>
      </Router>
    </div>
  );
}

export default App;
