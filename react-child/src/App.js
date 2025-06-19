import logo from "./logo.svg";
import MicroImage from "./components/micro-image";
import "./App.css";

function App() {
  console.log("xx----", window.__MICRO_APP_ENVIRONMENT__);
  // 使用完整的URL路径或相对路径
  const logoSrc = window.__MICRO_APP_ENVIRONMENT__
    ? window.__MICRO_APP_PUBLIC_PATH__ + logo
    : logo;

  console.log("");

  return (
    <div className="App">
      <MicroImage src={logo} />
      <p className="title">react-child应用1</p>
    </div>
  );
}

export default App;
