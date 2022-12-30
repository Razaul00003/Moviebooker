import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";

import "./App.css";
import Footer from "./components/Footer";
import Header from "./components/Header";
import Home from "./screens/Home";
import ShowDetails from "./screens/ShowDetails";

function App() {
  return (
    <Router>
      <Header />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/show/:id" element={<ShowDetails />} />
      </Routes>
      <Footer />
    </Router>
  );
}

export default App;
