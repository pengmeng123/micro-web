import logo from "./logo.svg";
import MicroImage from "./components/micro-image";
import "./App.css";

function App() {
  console.log("react-child-window---", window.globalApp);
  return (
    <div className="App">
      <MicroImage src={logo} />
      <p className="title">react-child应用1</p>
    </div>
  );
}

export default App;
