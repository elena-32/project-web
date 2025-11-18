import "./App.css";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
// import Navbar from "./components/Navbar";
// import Footer from "./components/Footer";
import Home from "./pages/Home";
// import Dashboard from "./pages/Dashboard";
// import Discussions from "./pages/Discussions";
// import DoctorUpdates from "./pages/DoctorUpdates";
// import Profile from "./pages/Profile";

function App() {
  return (
    <Router>
      <div className="App">
        {/* <Navbar /> */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<Home />} />
            {/* <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/discussions" element={<Discussions />} />
            <Route path="/updates" element={<DoctorUpdates />} />
            <Route path="/profile" element={<Profile />} /> */}
          </Routes>
        </main>
        {/* <Footer /> */}
      </div>
    </Router>
  );
}

export default App;
