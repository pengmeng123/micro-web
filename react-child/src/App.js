import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import AppRoutes from "./router";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
