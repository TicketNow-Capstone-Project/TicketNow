import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import axios from 'axios';
import { Eye, EyeOff, User, Lock } from 'lucide-react';

export const LoginForm = ({ onSubmit, onCancel, onSuccess }) => {
  const [error, setError] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError('');

    try {
      const response = await axios.post(
        'http://localhost:8000/auth/api/login/',
        formData,
        {
          withCredentials: true,
          headers: {
            'Content-Type': 'application/json',
            'X-CSRFToken': getCSRFToken()
          }
        }
      );

      if (response.data.success) {
        localStorage.setItem('user', JSON.stringify(response.data.user));
        
        if (onSuccess) {
          onSuccess(response.data);
        } else {
          alert('Login successful!');
          window.location.href = response.data.redirect || '/dashboard';
        }
      }
    } catch (error) {
      console.error("Login error:", error.response?.data || error.message);
      
      const errorData = error.response?.data || {};
      setError(
        errorData.message || 
        errorData.error || 
        (error.response?.status === 401 ? 'Invalid credentials' : 'Login failed')
      );
    } finally {
      setIsLoading(false);
    }
  };

  const getCSRFToken = () => {
    const name = 'csrftoken=';
    const decodedCookie = decodeURIComponent(document.cookie);
    const ca = decodedCookie.split(';');
    for (let i = 0; i < ca.length; i++) {
      let c = ca[i];
      while (c.charAt(0) === ' ') {
        c = c.substring(1);
      }
      if (c.indexOf(name) === 0) {
        return c.substring(name.length, c.length);
      }
    }
    return '';
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white text-gray-800 p-5 rounded-xl shadow-lg w-full max-w-sm border border-gray-100"
    >
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Welcome Back</h2>
        <p className="text-xs text-gray-600 mt-1">Sign in to your account to continue</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Username */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-700 mb-1">Username</label>
          <div className="relative">
            <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input 
              type="text" 
              name="username" 
              placeholder="Enter your username" 
              value={formData.username}
              onChange={handleInputChange}
              className="w-full pl-7 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
              required 
              disabled={isLoading}
            />
          </div>
        </div>
        
        {/* Password */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
          <div className="relative">
            <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input 
              type={showPassword ? "text" : "password"}
              name="password" 
              placeholder="Enter your password" 
              value={formData.password}
              onChange={handleInputChange}
              className="w-full pl-7 pr-8 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
              required 
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
            >
              {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
            </button>
          </div>
        </div>
        
        {/* Error Message */}
        <AnimatePresence>
          {error && (
            <motion.div 
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: 'auto' }}
              exit={{ opacity: 0, height: 0 }}
              className="p-2 bg-red-50 border border-red-200 rounded-md overflow-hidden"
            >
              <div className="flex items-center">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-3.5 w-3.5 text-red-500 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                  <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                </svg>
                <p className="text-red-600 text-xs">{error}</p>
              </div>
            </motion.div>
          )}
        </AnimatePresence>
        
        {/* Submit Button */}
        <button 
          type="submit" 
          disabled={isLoading}
          className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium py-2 px-4 rounded-md hover:from-cyan-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-xs"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1.5"></div>
              Logging in...
            </div>
          ) : (
            'Sign In'
          )}
        </button>
        
        {/* Cancel Button */}
        <div className="text-center">
          <button 
            type="button" 
            onClick={onCancel} 
            disabled={isLoading}
            className="text-xs text-gray-600 hover:text-gray-800 disabled:text-gray-400 transition-colors"
          >
            Back to previous page
          </button>
        </div>
      </form>
      
      {/* Sign up Link */}
      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          Don't have an account? <a href="#" className="text-cyan-600 hover:text-cyan-700 font-medium transition-colors">Sign up</a>
        </p>
      </div>
    </motion.div>
  );
};

// Add axios defaults for session authentication
axios.defaults.withCredentials = true;