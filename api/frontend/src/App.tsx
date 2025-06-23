import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Posturas from "./pages/Posturas";
import Header from "./components/Header/Header";
import Nav from "./components/Nav/Nav";
import Video from "./components/MainContent/Video/Video";
function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Posturas />} />
        <Route path="/posturas" element={<Posturas />} />
        <Route path="/api/" element={<Posturas />} />
        <Route path="/video/:faixa" element={<Video />} />
      </Routes>
    </Router>
  );
}

export default App;
