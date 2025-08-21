import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export const RegisterForm = ({ onSubmit, onCancel }) => {
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState({ message: '', field: '' });
  const [isSubmitting, setIsSubmitting] = useState(false); // Add loading state

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = e.target;
    
    // Clear previous errors
    setPasswordError('');
    setApiError({ message: '', field: '' });
    setIsSubmitting(true);

    // Client-side validation
    if (formData.password.value !== formData.confirmPassword.value) {
      setPasswordError('Passwords do not match');
      setIsSubmitting(false);
      return;
    }

    try {
      const response = await axios.post(
        'http://localhost:8000/auth/api/register/',
        {
          username: formData.username.value,
          firstname: formData.firstName.value,
          lastname: formData.lastName.value,
          phonenumber: formData.phonenumber.value,
          address: formData.address.value,
          password: formData.password.value
        },
        {
          timeout: 10000, // 10 second timeout
        }
      );

      if (response.data.success) {
        alert('Registration successful!');
        window.location.href = response.data.redirect;
      }
    } catch (error) {
      console.error("FULL ERROR:", error);
      
      let errorMessage = '';
      let errorField = '';

      if (error.response) {
        // Server responded with error status (4xx, 5xx)
        const errorData = error.response.data || {};
        errorMessage = errorData.error || errorData.message || `Server error: ${error.response.status}`;
        errorField = errorData.field || '';
        
        console.log('Data was sent to server but rejected:', error.response.status);
        
      } else if (error.request) {
        // Request was made but no response received (network issue)
        errorMessage = 'Network error: Could not connect to the server. Please check your internet connection and try again.';
        console.log('Data was not delivered - network connection failed');
        
      } else {
        // Something else happened
        errorMessage = error.message || 'An unexpected error occurred during registration.';
        console.log('Error in request setup:', error.message);
      }

      setApiError({
        message: errorMessage,
        field: errorField
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white text-black p-4 rounded-xl shadow-lg w-full max-w-xs"
    >
      <h2 className="text-lg font-bold mb-3 text-center text-[#002c48]">Register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {/* Name Row */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-0.5">First Name</label>
            <input 
              type="text" 
              name="firstName" 
              placeholder="Enter first name" 
              className="w-full p-1.5 text-xs placeholder:text-xs border rounded" 
              required 
              disabled={isSubmitting}
            />
            {apiError.field === 'firstname' && (
              <p className="text-red-500 text-xs mt-1">{apiError.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-0.5">Last Name</label>
            <input 
              type="text" 
              name="lastName" 
              placeholder="Enter last name" 
              className="w-full p-1.5 text-xs placeholder:text-xs border rounded"
              required 
              disabled={isSubmitting}
            />
            {apiError.field === 'lastname' && (
              <p className="text-red-500 text-xs mt-1">{apiError.message}</p>
            )}
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Username</label>
          <input 
            type="text" 
            name="username" 
            placeholder="Enter your username" 
            className="w-full p-1.5 text-xs placeholder:text-xs border rounded"
            required 
            disabled={isSubmitting}
          />
          {apiError.field === 'username' && (
            <p className="text-red-500 text-xs mt-1">{apiError.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Address</label>
          <input 
            type="text" 
            name="address" 
            placeholder="ex.barangay, city/municipality, province," 
            className="w-full p-1.5 text-xs placeholder:text-xs border rounded"
            required 
            disabled={isSubmitting}
          />
          {apiError.field === 'address' && (
            <p className="text-red-500 text-xs mt-1">{apiError.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">Phone</label>
          <input 
            type="tel" 
            name="phonenumber" 
            placeholder="Enter phone number ex. 09169464899" 
            className="w-full p-1.5 text-xs placeholder:text-xs border rounded"
            required 
            disabled={isSubmitting}
          />
          {apiError.field === 'phone' && (
            <p className="text-red-500 text-xs mt-1">{apiError.message}</p>
          )}
        </div>

        {/* Password Row */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-0.5">Password</label>
            <input 
              type="password" 
              name="password" 
              placeholder="" 
              className="w-full p-1.5 text-xs placeholder:text-xs border rounded"
              required 
              disabled={isSubmitting}
            />
            {apiError.field === 'password' && (
              <p className="text-red-500 text-xs mt-1">{apiError.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-0.5">Confirm</label>
            <input 
              type="password" 
              name="confirmPassword" 
              placeholder="" 
              className="w-full p-1.5 text-xs placeholder:text-xs border rounded"
              required 
              onChange={() => setPasswordError('')}
              disabled={isSubmitting}
            />
          </div>
        </div>
        
        {passwordError && (
          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
        )}
        
        {/* Generic API error (when no specific field) */}
        {apiError.message && !apiError.field && (
          <p className="text-red-500 text-xs mt-1">{apiError.message}</p>
        )}

        <button 
          type="submit" 
          className="w-full bg-cyan-500 text-white px-3 py-1.5 text-sm rounded hover:bg-cyan-600 disabled:bg-gray-400 disabled:cursor-not-allowed"
          disabled={isSubmitting}
        >
          {isSubmitting ? 'PROCESSING...' : 'REGISTER'}
        </button>
        
        {isSubmitting && (
          <p className="text-blue-500 text-xs mt-1 text-center">
            Sending data to server...
          </p>
        )}
        
        <button 
          type="button" 
          onClick={onCancel} 
          className="w-full text-center text-xs text-gray-500 mt-1 hover:underline"
          disabled={isSubmitting}
        >
          Cancel
        </button>
      </form>
    </motion.div>
  );
};