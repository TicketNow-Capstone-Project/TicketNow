// main.jsx
import React from "react"; // useState is no longer needed here
import { createRoot } from "react-dom/client";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import "./index.css";
import Header from "./header";
import About from "./about";
import Home from "./home";
import Contact from "./contact";
import Footer from "./footer";
import Dashboard from "./dashboard";
import { AuthProvider } from './AuthContext'; // <-- Import AuthProvider

function App() {
  // 💥 DELETE: We don't need local state, AuthProvider handles it globally! 💥
  // const [isLoggedIn, setIsLoggedIn] = useState(false);

  return (
    // 💥 FIX 1: The AuthProvider needs to wrap the Router 💥
    //    (This makes the useAuth hook work inside the routing components)
    <AuthProvider> 
      <Router>
        {/* FIX 2: Header should now use the useAuth hook directly, 
            so we remove the props that caused the conflict. */}
        <Header /> 
        <Routes>
          {/* FIX 3: Home should also use the useAuth hook if it needs login status */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
        </Routes>
        <Footer />
      </Router>
    </AuthProvider> 
  );
}

const root = createRoot(document.getElementById("root"));
root.render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);