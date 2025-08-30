import React, { useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faBars, faTimes } from "@fortawesome/free-solid-svg-icons";

const Header = () => {
  const [navOpen, setNavOpen] = useState(false);

  return (
    <>
      {/* Header */}
      <header className="bg-[#00192e] px-6 py-4 flex justify-between items-center fixed w-full top-0 z-50 shadow-md">
        <h1 className="font-bold text-white md:hidden">TicketNow</h1>
        <nav className="hidden md:flex gap-6 text-sm">
          <a href="#home" className="text-white hover:text-cyan-400 hover:bg-white/10 px-3 py-1 rounded transition duration-300 ease-in-out transform hover:scale-105">HOME</a>
          <a href="#about" className="text-white hover:text-cyan-400 hover:bg-white/10 px-3 py-1 rounded transition duration-300 ease-in-out transform hover:scale-105">ABOUT</a>
          <a href="#contact" className="text-white hover:text-cyan-400 hover:bg-white/10 px-3 py-1 rounded transition duration-300 ease-in-out transform hover:scale-105">CONTACT US</a>
        </nav>
        <button onClick={() => setNavOpen(!navOpen)} className="md:hidden text-white text-2xl">
          <FontAwesomeIcon icon={navOpen ? faTimes : faBars} />
        </button>
      </header>

      {/* Mobile Nav */}
      {navOpen && (
        <div className="md:hidden bg-[#00192e] px-6 py-4 space-y-4 fixed top-16 left-0 w-full z-40">
          <a href="#home" onClick={() => setNavOpen(false)} className="block text-white hover:text-cyan-400 hover:bg-white/10 px-3 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105">HOME</a>
          <a href="#about" onClick={() => setNavOpen(false)} className="block text-white hover:text-cyan-400 hover:bg-white/10 px-3 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105">ABOUT</a>
          <a href="#contact" onClick={() => setNavOpen(false)} className="block text-white hover:text-cyan-400 hover:bg-white/10 px-3 py-2 rounded transition duration-300 ease-in-out transform hover:scale-105">CONTACT US</a>
        </div>
      )}
    </>
  );
};

export default Header;
