import React from "react";
import { BrowserRouter as Router } from "react-router-dom";
import logo from "./logo.svg";
import MicroImage from "./components/micro-image";
import { Alert } from "antd";
import AppRoutes from "./router";

import "./App.css";

function App() {
  return (
    <Router>
      <div>
        {window.__MICRO_APP_ENVIRONMENT__ ? (
          <Alert
            type="warning"
            message={
              <div className="appTip">
                <MicroImage width={40} src={logo} />
                这是react-child子应用
              </div>
            }
          >
            <div>这是警告信息</div>
          </Alert>
        ) : null}

        <AppRoutes />
      </div>
    </Router>
  );
}

export default App;
