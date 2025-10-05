import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { Eye, EyeOff, User, Lock } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../AuthContext";

export const LoginForm = ({ onCancel }) => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState({ username: "", password: "" });
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    if (error) setError("");
  };

  const togglePasswordVisibility = () => setShowPassword(!showPassword);

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsLoading(true);
    setError("");

    const result = await login(formData);
    if (result.success) {
      navigate("/dashboard", { state: { message: "Login Successful!" } });
    } else {
      setError(result.message);
    }

    setIsLoading(false);
  };

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
              className="w-full pl-7 pr-3 py-2 text-xs border border-gray-300 rounded-md"
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
              className="w-full pl-7 pr-8 py-2 text-xs border border-gray-300 rounded-md"
              required
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={togglePasswordVisibility}
              className="absolute right-2 top-1/2 transform -translate-y-1/2"
            >
              {showPassword ? <EyeOff /> : <Eye />}
            </button>
          </div>
        </div>

        {/* Error */}
        <AnimatePresence>
          {error && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="p-2 bg-red-50 border border-red-200 rounded-md"
            >
              <p className="text-red-600 text-xs">{error}</p>
            </motion.div>
          )}
        </AnimatePresence>

        <button
          type="submit"
          disabled={isLoading}
          className="w-full bg-cyan-500 text-white py-2 px-4 rounded-md hover:bg-cyan-600 disabled:opacity-50"
        >
          {isLoading ? "Logging in..." : "Sign In"}
        </button>

        <div className="text-center">
          <button
            type="button"
            onClick={onCancel}
            disabled={isLoading}
            className="text-xs text-gray-600 hover:text-gray-800"
          >
            Back
          </button>
        </div>
      </form>
    </motion.div>
  );
};
