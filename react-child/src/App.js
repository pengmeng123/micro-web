import React, { useEffect } from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./router";
import Cookies from "js-cookie";

import "./App.css";

function App() {
  useEffect(() => {
    console.log("sdf----sgsg====");
    if (window.microApp) {
      const data = window.microApp.getGlobalData() || {};
      console.log("data", data);
      Cookies.set("CRMSESSID", data.token);
    }
  }, []);
  return (
    <Router>
      <div>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
