import React from 'react';
import { motion } from 'framer-motion';

export const LoginForm = ({ onSubmit, onCancel }) => (
  <motion.div
    initial={{ opacity: 0, scale: 0.95 }}
    animate={{ opacity: 1, scale: 1 }}
    exit={{ opacity: 0, scale: 0.95 }}
    className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-sm"
  >
    <h2 className="text-xl font-bold mb-4 text-center text-[#002c48]">Login</h2>
    <form onSubmit={onSubmit} className="space-y-4">
      <input type="text" name="username" placeholder="Username" className="w-full p-2 border rounded" required />
      <input type="password" name="password" placeholder="Password" className="w-full p-2 border rounded" required />
      <button type="submit" className="w-full bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600">LOGIN</button>
      <button type="button" onClick={onCancel} className="w-full text-center text-sm text-gray-500 mt-2 hover:underline">Cancel</button>
    </form>
  </motion.div>
);