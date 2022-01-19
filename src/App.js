import "./App.css";
import Home from "./componants/Home";

function App() {
  return (
    // Main App
    <div className="App">
      <div className="heading">
        <h1>VCS Search engine</h1>
        <h2>Enter a username to search across Github, Gitlab and BitBucket </h2>
      </div>
      <Home />
    </div>
  );
}

export default App;
