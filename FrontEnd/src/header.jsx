import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "./AuthContext";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);
  const navigate = useNavigate();

  const { user, logout } = useAuth(); // use user object from AuthContext

  const handleLogout = async () => {
    setIsLoggingOut(true);
    try {
      await logout(); // call logout from context
    } catch (error) {
      console.error("Logout failed:", error);
    }
    setIsLoggingOut(false);
    navigate("/", { state: { message: "Logout Successful!" } });
  };

  return (
    <>
      {/* Header */}
      <header className="bg-[#00192e] px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50 shadow-md">
        <h1 className="font-bold text-white md:hidden">TicketNow</h1>

        {/* Desktop Nav */}
        <nav className="hidden md:flex gap-6 text-sm items-center">
          <Link to="/" className="text-white hover:text-cyan-400 hover:bg-white/10 px-3 py-1 rounded transition">
            HOME
          </Link>
          <Link to="/about" className="text-white hover:text-cyan-400 hover:bg-white/10 px-3 py-1 rounded transition">
            ABOUT
          </Link>
          <Link to="/contact" className="text-white hover:text-cyan-400 hover:bg-white/10 px-3 py-1 rounded transition">
            CONTACT US
          </Link>

          {/* Only show Logout if user is logged in */}
          {user && (
            <button
              onClick={handleLogout}
              disabled={isLoggingOut}
              className="ml-4 bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600 transition text-sm"
            >
              {isLoggingOut ? "Logging Out..." : "LOGOUT"}
            </button>
          )}
        </nav>

        {/* Mobile Menu Toggle */}
        <button onClick={() => setNavOpen(!navOpen)} className="md:hidden text-white text-2xl">
          <FontAwesomeIcon icon={navOpen ? faTimes : faBars} />
        </button>
      </header>

      {/* Mobile Nav */}
      {navOpen && (
        <div className="md:hidden bg-[#00192e] px-6 py-4 space-y-4 fixed top-16 left-0 w-full z-40">
          <Link
            to="/"
            onClick={() => setNavOpen(false)}
            className="block text-white hover:text-cyan-400 hover:bg-white/10 px-3 py-2 rounded transition"
          >
            HOME
          </Link>
          <Link
            to="/about"
            onClick={() => setNavOpen(false)}
            className="block text-white hover:text-cyan-400 hover:bg-white/10 px-3 py-2 rounded transition"
          >
            ABOUT
          </Link>
          <Link
            to="/contact"
            onClick={() => setNavOpen(false)}
            className="block text-white hover:text-cyan-400 hover:bg-white/10 px-3 py-2 rounded transition"
          >
            CONTACT US
          </Link>

          {/* Mobile Logout */}
          {user && (
            <button
              onClick={() => {
                setNavOpen(false);
                handleLogout();
              }}
              disabled={isLoggingOut}
              className="block w-full text-left text-white bg-red-500 hover:bg-red-600 px-3 py-2 rounded transition"
            >
              {isLoggingOut ? "Logging Out..." : "LOGOUT"}
            </button>
          )}
        </div>
      )}
    </>
  );
};

export default Header;
