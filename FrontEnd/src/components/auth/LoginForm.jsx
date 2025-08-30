import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export const LoginForm = ({ onSubmit, onCancel }) => {
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = e.target;
    
    // Clear previous errors
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:8000/auth/api/login/',
        {
          username: formData.username.value,
          password: formData.password.value
        },
        {
          withCredentials: true  // Important for session cookies
        }
      );

      if (response.data.success) {
        alert('Login successful!');
        // Redirect to dashboard or home page
        window.location.href = response.data.redirect || '/dashboard';
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      
      const errorData = error.response?.data || {};
      setError(errorData.message || errorData.error || 'Login failed');
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white text-black p-6 rounded-xl shadow-lg w-full max-w-sm"
    >
      <h2 className="text-xl font-bold mb-4 text-center text-[#002c48]">Login</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input 
          type="text" 
          name="username" 
          placeholder="Username" 
          className="w-full p-2 border rounded" 
          required 
        />
        <input 
          type="password" 
          name="password" 
          placeholder="Password" 
          className="w-full p-2 border rounded" 
          required 
        />
        
        {error && (
          <p className="text-red-500 text-sm mt-1">{error}</p>
        )}
        
        <button 
          type="submit" 
          className="w-full bg-cyan-500 text-white px-4 py-2 rounded hover:bg-cyan-600"
        >
          LOGIN
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          className="w-full text-center text-sm text-gray-500 mt-2 hover:underline"
        >
          Cancel
        </button>
      </form>
    </motion.div>
  );
};