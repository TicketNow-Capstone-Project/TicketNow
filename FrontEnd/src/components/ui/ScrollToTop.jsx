import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';

export const ScrollToTop = ({ show }) => (
  <AnimatePresence>
    {show && (
      <motion.button
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 20 }}
        transition={{ duration: 0.3 }}
        onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
        className="fixed bottom-24 right-6 bg-cyan-500 text-white px-4 py-2 rounded-full shadow-md hover:bg-cyan-600 z-50"
      >
        ↑ Top
      </motion.button>
    )}
  </AnimatePresence>
);