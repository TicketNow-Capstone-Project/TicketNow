// main.jsx or index.jsx
import React from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import Header from './header';
import About from './about';
import Home from './home';
import Contact from './contact';
import Footer from './footer';

const root = createRoot(document.getElementById('root'));

root.render(
  <React.StrictMode>
    <>
      <Header />
      <Home />
      <About />
      <Contact />
      <Footer />
    </>
  </React.StrictMode>
);
