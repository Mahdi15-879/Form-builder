import { Routes, Route } from "react-router-dom";
import Home from "./pages/home.jsx";
import Preview from "./pages/preview.jsx";
import Navbar from "./components/navbar.jsx";
import "./App.css";

function App() {
  return (
    <div className="App">
      <Navbar />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/preview" element={<Preview />} />
      </Routes>
    </div>
  );
}

export default App;
