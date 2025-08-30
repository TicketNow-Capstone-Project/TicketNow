import React from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faSignInAlt, faUserPlus } from '@fortawesome/free-solid-svg-icons';
import { motion } from 'framer-motion';

export const AuthButtons = ({ setFormView }) => (
  <motion.div
    initial={{ opacity: 0 }}
    animate={{ opacity: 1 }}
    exit={{ opacity: 0 }}
    className="flex flex-col justify-center items-center space-y-4"
  >
    <button onClick={() => setFormView('login')} className="bg-cyan-400 border border-white flex items-center gap-2 px-6 py-2 rounded-xl font-semibold text-xl hover:bg-cyan-500 w-40 transition duration-300 transform hover:scale-105">
      <FontAwesomeIcon icon={faSignInAlt} /> LOGIN
    </button>
    <button onClick={() => setFormView('register')} className="bg-cyan-500 border border-white flex items-center gap-2 px-6 py-2 rounded-xl font-semibold text-[1.4rem] hover:bg-cyan-600 w-48 h-14 mt-6 transition duration-300 transform hover:scale-105">
      <FontAwesomeIcon icon={faUserPlus} /> REGISTER
    </button>
  </motion.div>
);