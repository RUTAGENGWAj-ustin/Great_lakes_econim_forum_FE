import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import About from "./pages/About";
import Events from "./pages/Events";
import Speakers from "./pages/Speakers";
import Topics from "./pages/Topics";
import News from "./pages/News";
import Sponsors from "./pages/Sponsors";
import GetInvolved from "./pages/GetInvolved";
import Contact from "./pages/Contact";
import Gallery from "./pages/Gallery";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";

function App() {
  return (
    <Router>
    <Navbar />
    <main className="">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/events" element={<Events />} />
        <Route path="/speakers" element={<Speakers />} />
        <Route path="/topics" element={<Topics />} />
        <Route path="/news" element={<News />} />
        <Route path="/sponsors" element={<Sponsors />} />
        <Route path="/get-involved" element={<GetInvolved />} />
        <Route path="/contact" element={<Contact />} />
        <Route path="/gallery" element={<Gallery />} />
      </Routes>
    </main>
    <Footer />
  </Router>
  );
}

export default App;
