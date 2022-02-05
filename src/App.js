import "./App.css";
import Home from "./components/Home";
import Install from "./components/Install";

function App() {
  return (
    <div className="App">
      <div className="App-header">
        {window.ethereum ? <Home /> : <Install />}
      </div>
    </div>
  );
}

export default App;
