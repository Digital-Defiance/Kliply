import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import PrivacyPage from "./pages/PrivacyPage";
import GuidePage from "./pages/GuidePage";
import "./App.css";

function App() {
  return (
    <Router basename="/Kliply">
      <div className="app">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/privacy" element={<PrivacyPage />} />
          <Route path="/guide" element={<GuidePage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
