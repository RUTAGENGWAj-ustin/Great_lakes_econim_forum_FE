import { BrowserRouter as Router, Routes, Route, Link, BrowserRouter } from "react-router-dom";
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
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import ProtectedRoute from "./components/ProtectedRoute";
import Dashboard from "./dashboard/Dashboard";
import Outlayer from "./components/Outlayer";
import DashOutlayer from "./components/DashOutlayer";
import Dash_events from "./dashboard/Dash_events";

function App() {
  return (
    <BrowserRouter>
  
    {/* <Navbar /> */}
    <main className="">
      <Routes>
        <Route element={<Outlayer/>}>
                <Route path="/" element={<Home />} />
                <Route path="/login" element={<Login />} />
                <Route path="/about" element={<About />} />
                <Route path="/events" element={<Events />} />
                <Route path="/speakers" element={<Speakers />} />
                <Route path="/topics" element={<Topics />} />
                <Route path="/news" element={<News />} />
                <Route path="/sponsors" element={<Sponsors />} />
                <Route path="/get-involved" element={<GetInvolved />} />
                <Route path="/contact" element={<Contact />} />
                <Route path="/gallery" element={<Gallery />} />
                <Route path="*" element={<NotFound />} />
        </Route>

           {/* Protected Dashboard Routes */}
        <Route element={<DashOutlayer/>}>
        <Route path="/dashboard" element={<ProtectedRoute />}>
          <Route index element={<Dashboard />} />
          <Route path="dash_events" element={<Dash_events />} />
          <Route path="speakers" element={<Speakers />} />
          <Route path="news" element={<News />} />
        </Route>
        </Route>
       
      </Routes>
    </main>
    {/* <Footer /> */}

  </BrowserRouter>
  );
}

export default App;
