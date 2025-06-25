import logo from "./logo.svg";
import MicroImage from "./components/micro-image";
import { Alert } from "antd";

import "./App.css";

function App() {
  return (
    <div>
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
    </div>
  );
}

export default App;
