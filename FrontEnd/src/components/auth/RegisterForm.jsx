import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';
import { Eye, EyeOff, User, Mail, Phone, MapPin, Lock } from 'lucide-react';

// Helper function to get cookie
const getCookie = (name) => {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
  return '';
};

export const RegisterForm = ({ onSubmit, onCancel }) => {
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState({ message: '', field: '' });
  const [csrfToken, setCsrfToken] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [csrfLoaded, setCsrfLoaded] = useState(false);

  // Get CSRF token when component mounts
  useEffect(() => {
    const fetchCsrfToken = async () => {
      try {
        // First try to get from cookie
        const existingToken = getCookie('csrftoken');
        if (existingToken) {
          setCsrfToken(existingToken);
          setCsrfLoaded(true);
          return;
        }
        
        // If no cookie, fetch from API endpoint
        const response = await axios.get(
          'http://localhost:8000/auth/api/csrf-token/',
          { 
            withCredentials: true,
            timeout: 5000 // 5 second timeout
          }
        );
        
        if (response.data.csrfToken) {
          setCsrfToken(response.data.csrfToken);
          setCsrfLoaded(true);
        } else {
          setApiError({
            message: 'Failed to get CSRF token from server',
            field: ''
          });
        }
      } catch (error) {
        console.error('Failed to get CSRF token:', error);
        if (error.code === 'ECONNABORTED') {
          setApiError({
            message: 'CSRF token request timed out. Check if server is running.',
            field: ''
          });
        } else if (error.response) {
          setApiError({
            message: `Server error: ${error.response.status} - ${error.response.statusText}`,
            field: ''
          });
        } else if (error.request) {
          setApiError({
            message: 'Cannot connect to server. Make sure the backend is running on localhost:8000',
            field: ''
          });
        } else {
          setApiError({
            message: 'Failed to get CSRF token. Please try again.',
            field: ''
          });
        }
      }
    };

    fetchCsrfToken();
  }, []);

  // Set CSRF token as default header
  useEffect(() => {
    if (csrfToken) {
      axios.defaults.headers.common['X-CSRFToken'] = csrfToken;
    }
  }, [csrfToken]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = e.target;
    setIsLoading(true);

    // Clear errors
    setPasswordError('');
    setApiError({ message: '', field: '' });

    // Check if CSRF token is available
    if (!csrfToken && !getCookie('csrftoken')) {
      setApiError({
        message: 'Security token not available. Please refresh the page and try again.',
        field: ''
      });
      setIsLoading(false);
      return;
    }

    // Validation
    if (formData.password.value !== formData.confirm_password.value) {
      setPasswordError('Passwords do not match');
      setIsLoading(false);
      return;
    }

    if (formData.password.value.length < 8) {
      setPasswordError('Password must be at least 8 characters long');
      setIsLoading(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/auth/api/register/',
        {
          username: formData.username.value,
          firstname: formData.firstname.value,
          lastname: formData.lastname.value,
          phone: formData.phone.value,
          address: formData.address.value,
          password: formData.password.value
        },
        {
          withCredentials: true,
          timeout: 10000, // 10 second timeout
          headers: {
            'X-CSRFToken': csrfToken || getCookie('csrftoken')
          }
        }
      );

      if (response.data.success) {
        alert('Registration successful! Please login to continue.');
        window.location.href = response.data.redirect || '/login';
      } else if (response.data.error) {
        setApiError({
          message: response.data.error,
          field: ''
        });
      }
    } catch (error) {
      console.error("Registration error:", error);
      
      let errorMessage = 'Registration failed. Please try again.';
      let errorField = '';
      
      // Handle different types of errors
      if (error.code === 'ECONNABORTED') {
        errorMessage = 'Request timeout. Server is taking too long to respond.';
      } else if (error.response) {
        // Server responded with error status
        const errorData = error.response.data || {};
        
        if (error.response.status === 403) {
          errorMessage = 'CSRF verification failed. Please refresh the page.';
        } else if (error.response.status === 400) {
          // Bad request - validation errors
          if (errorData.field) {
            errorField = errorData.field;
            errorMessage = errorData.message || errorData.error || 'Invalid input';
          } else if (errorData.username) {
            errorField = 'username';
            errorMessage = Array.isArray(errorData.username) 
              ? errorData.username[0] 
              : errorData.username;
          } else if (errorData.email) {
            errorField = 'email';
            errorMessage = Array.isArray(errorData.email) 
              ? errorData.email[0] 
              : errorData.email;
          } else if (errorData.non_field_errors) {
            errorMessage = Array.isArray(errorData.non_field_errors) 
              ? errorData.non_field_errors[0] 
              : errorData.non_field_errors;
          } else {
            errorMessage = 'Please check your input and try again.';
          }
        } else if (error.response.status === 500) {
          errorMessage = 'Server error. Please try again later.';
        } else if (errorData.detail) {
          errorMessage = errorData.detail;
        }
      } else if (error.request) {
        // Network error
        errorMessage = 'Cannot connect to server. Make sure the backend is running on localhost:8000';
      }
      
      setApiError({
        message: errorMessage,
        field: errorField
      });
    } finally {
      setIsLoading(false);
    }
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);
  const toggleConfirmPasswordVisibility = () => setShowConfirmPassword(!showConfirmPassword);

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95, y: 20 }}
      animate={{ opacity: 1, scale: 1, y: 0 }}
      exit={{ opacity: 0, scale: 0.95, y: 20 }}
      transition={{ duration: 0.3 }}
      className="bg-white text-gray-800 p-5 rounded-xl shadow-lg w-full max-w-sm border border-gray-100"
    >
      <div className="text-center mb-4">
        <h2 className="text-xl font-bold text-gray-900">Create Account</h2>
        <p className="text-xs text-gray-600 mt-1">Join us today and start your journey</p>
      </div>

      {/* CSRF status indicator */}
      {!csrfLoaded && !apiError.message && (
        <div className="mb-3 p-2 bg-yellow-50 border border-yellow-200 rounded-md">
          <p className="text-xs text-yellow-700 flex items-center">
            <span className="mr-1">⏳</span>
            Loading security token...
          </p>
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">First Name</label>
            <div className="relative">
              <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input 
                type="text" 
                name="firstname" 
                placeholder="First name" 
                className="w-full pl-7 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
                required 
              />
            </div>
            {apiError.field === 'firstname' && (
              <p className="text-red-500 text-xs mt-0.5 flex items-center">
                <span className="mr-1">⚠️</span>
                {apiError.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">Last Name</label>
            <div className="relative">
              <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input 
                type="text" 
                name="lastname" 
                placeholder="Last name" 
                className="w-full pl-7 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
                required 
              />
            </div>
            {apiError.field === 'lastname' && (
              <p className="text-red-500 text-xs mt-0.5 flex items-center">
                <span className="mr-1">⚠️</span>
                {apiError.message}
              </p>
            )}
          </div>
        </div>

        {/* Username */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-700 mb-1">Username</label>
          <div className="relative">
            <User className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input 
              type="text" 
              name="username" 
              placeholder="Choose username" 
              className="w-full pl-7 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
              required 
            />
          </div>
          {apiError.field === 'username' && (
            <p className="text-red-500 text-xs mt-0.5 flex items-center">
              <span className="mr-1">⚠️</span>
              {apiError.message}
            </p>
          )}
        </div>

        {/* Address */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-700 mb-1">Address</label>
          <div className="relative">
            <MapPin className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input 
              type="text" 
              name="address" 
              placeholder="Barangay, City, Province" 
              className="w-full pl-7 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
              required 
            />
          </div>
          {apiError.field === 'address' && (
            <p className="text-red-500 text-xs mt-0.5 flex items-center">
              <span className="mr-1">⚠️</span>
              {apiError.message}
            </p>
          )}
        </div>

        {/* Phone */}
        <div className="relative">
          <label className="block text-xs font-medium text-gray-700 mb-1">Phone Number</label>
          <div className="relative">
            <Phone className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
            <input 
              type="tel" 
              name="phone" 
              placeholder="0916 946 4899" 
              className="w-full pl-7 pr-3 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
              required 
            />
          </div>
          {apiError.field === 'phone' && (
            <p className="text-red-500 text-xs mt-0.5 flex items-center">
              <span className="mr-1">⚠️</span>
              {apiError.message}
            </p>
          )}
        </div>

        {/* Password Row */}
        <div className="grid grid-cols-2 gap-3">
          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">Password</label>
            <div className="relative">
              <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input 
                type={showPassword ? "text" : "password"}
                name="password" 
                placeholder="••••••••"
                className="w-full pl-7 pr-8 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
                required 
              />
              <button
                type="button"
                onClick={togglePasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
            {apiError.field === 'password' && (
              <p className="text-red-500 text-xs mt-0.5 flex items-center">
                <span className="mr-1">⚠️</span>
                {apiError.message}
              </p>
            )}
          </div>

          <div className="relative">
            <label className="block text-xs font-medium text-gray-700 mb-1">Confirm</label>
            <div className="relative">
              <Lock className="absolute left-2 top-1/2 transform -translate-y-1/2 h-3.5 w-3.5 text-gray-400" />
              <input 
                type={showConfirmPassword ? "text" : "password"}
                name="confirm_password" 
                placeholder="••••••••"
                className="w-full pl-7 pr-8 py-2 text-xs border border-gray-300 rounded-md focus:ring-1 focus:ring-cyan-500 focus:border-transparent transition-all"
                required 
                onChange={() => setPasswordError('')}
              />
              <button
                type="button"
                onClick={toggleConfirmPasswordVisibility}
                className="absolute right-2 top-1/2 transform -translate-y-1/2 text-gray-400 hover:text-gray-600"
              >
                {showConfirmPassword ? <EyeOff className="h-3.5 w-3.5" /> : <Eye className="h-3.5 w-3.5" />}
              </button>
            </div>
          </div>
        </div>
        
        {passwordError && (
          <p className="text-red-500 text-xs mt-0.5 flex items-center">
            <span className="mr-1">⚠️</span>
            {passwordError}
          </p>
        )}

        {/* Generic API error */}
        {apiError.message && !apiError.field && (
          <p className="text-red-500 text-xs mt-0.5 flex items-center">
            <span className="mr-1">⚠️</span>
            {apiError.message}
          </p>
        )}

        <button 
          type="submit" 
          disabled={isLoading || !csrfLoaded}
          className="w-full bg-gradient-to-r from-cyan-500 to-cyan-600 text-white font-medium py-2 px-4 rounded-md hover:from-cyan-600 hover:to-cyan-700 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 text-xs"
        >
          {isLoading ? (
            <div className="flex items-center justify-center">
              <div className="animate-spin rounded-full h-3 w-3 border-b-2 border-white mr-1.5"></div>
              Creating Account...
            </div>
          ) : (
            'Create Account'
          )}
        </button>

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

      <div className="mt-4 pt-3 border-t border-gray-200">
        <p className="text-xs text-gray-500 text-center">
          By creating an account, you agree to our Terms and Privacy Policy
        </p>
      </div>
    </motion.div>
  );
};