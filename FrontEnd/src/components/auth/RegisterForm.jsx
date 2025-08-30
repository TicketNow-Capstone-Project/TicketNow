import React, { useState } from 'react';
import { motion } from 'framer-motion';
import axios from 'axios';

export const RegisterForm = ({ onSubmit, onCancel }) => {
  const [passwordError, setPasswordError] = useState('');
  const [apiError, setApiError] = useState({ message: '', field: '' });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = e.target;

    // Clear errors
    setPasswordError('');
    setApiError({ message: '', field: '' });

    // Validation
    if (formData.password.value !== formData.confirm_password.value) {
      setPasswordError('passwords do not match');
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
    }
  );

  if (response.data.success) {
    alert('Registration successful!');
    // Redirect to login page or wherever you want
    window.location.href = response.data.redirect || '/login';
  }
} catch (error) {
  console.error("Registration error:", error.response?.data || error.message);
  
  const errorData = error.response?.data || {};
  
  if (errorData.field) {  
    setApiError({
      message: errorData.message || errorData.error,
      field: errorData.field
    });
  } else {
    setApiError({
      message: errorData.message || errorData.error || 'Registration failed',
      field: ''
    });
  }
}
  };

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.95 }}
      animate={{ opacity: 1, scale: 1 }}
      exit={{ opacity: 0, scale: 0.95 }}
      className="bg-white text-black p-4 rounded-xl shadow-lg w-full max-w-xs"
    >
      <h2 className="text-lg font-bold mb-3 text-center text-[#002c48]">register</h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        
        {/* Name Row */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-0.5">first name</label>
            <input 
              type="text" 
              name="firstname" 
              placeholder="enter first name" 
              className="w-full p-1.5 text-xs placeholder:text-xs border rounded" 
              required 
            />
            {apiError.field === 'firstname' && (
              <p className="text-red-500 text-xs mt-1">{apiError.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-0.5">last name</label>
            <input 
              type="text" 
              name="lastname" 
              placeholder="enter last name" 
              className="w-full p-1.5 text-xs placeholder:text-xs border rounded"
              required 
            />
            {apiError.field === 'lastname' && (
              <p className="text-red-500 text-xs mt-1">{apiError.message}</p>
            )}
          </div>
        </div>

        {/* Username */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">username</label>
          <input 
            type="text" 
            name="username" 
            placeholder="enter your username" 
            className="w-full p-1.5 text-xs placeholder:text-xs border rounded"
            required 
          />
          {apiError.field === 'username' && (
            <p className="text-red-500 text-xs mt-1">{apiError.message}</p>
          )}
        </div>

        {/* Address */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">address</label>
          <input 
            type="text" 
            name="address" 
            placeholder="ex. barangay, city/municipality, province" 
            className="w-full p-1.5 text-xs placeholder:text-xs border rounded"
            required 
          />
          {apiError.field === 'address' && (
            <p className="text-red-500 text-xs mt-1">{apiError.message}</p>
          )}
        </div>

        {/* Phone */}
        <div>
          <label className="block text-xs font-medium text-gray-700 mb-0.5">phone</label>
          <input 
            type="tel" 
            name="phone" 
            placeholder="enter phone number ex. 09169464899" 
            className="w-full p-1.5 text-xs placeholder:text-xs border rounded"
            required 
          />
          {apiError.field === 'phone' && (
            <p className="text-red-500 text-xs mt-1">{apiError.message}</p>
          )}
        </div>

        {/* Password Row */}
        <div className="flex gap-2">
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-0.5">password</label>
            <input 
              type="password" 
              name="password" 
              className="w-full p-1.5 text-xs placeholder:text-xs border rounded"
              required 
            />
            {apiError.field === 'password' && (
              <p className="text-red-500 text-xs mt-1">{apiError.message}</p>
            )}
          </div>
          <div className="flex-1">
            <label className="block text-xs font-medium text-gray-700 mb-0.5">confirm</label>
            <input 
              type="password" 
              name="confirm_password" 
              className="w-full p-1.5 text-xs placeholder:text-xs border rounded"
              required 
              onChange={() => setPasswordError('')}
            />
          </div>
        </div>
        
        {passwordError && (
          <p className="text-red-500 text-xs mt-1">{passwordError}</p>
        )}

        {/* Generic API error */}
        {apiError.message && !apiError.field && (
          <p className="text-red-500 text-xs mt-1">{apiError.message}</p>
        )}

        <button 
          type="submit" 
          className="w-full bg-cyan-500 text-white px-3 py-1.5 text-sm rounded hover:bg-cyan-600"
        >
          register
        </button>
        <button 
          type="button" 
          onClick={onCancel} 
          className="w-full text-center text-xs text-gray-500 mt-1 hover:underline"
        >
          cancel
        </button>
      </form> 
    </motion.div>
  );
};
