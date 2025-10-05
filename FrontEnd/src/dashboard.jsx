import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLocation } from "react-router-dom";

const Dashboard = () => {
  const location = useLocation();
  const [message, setMessage] = useState("");

  // Listen for location changes to show messages
  useEffect(() => {
    if (location.state?.message) {
      setMessage(location.state.message);
      // Clear the location state to prevent showing the same message on refresh
      window.history.replaceState({ ...location.state, message: undefined }, '');
    }
  }, [location]);

  // Auto-dismiss message
  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      {/* Floating Message Modal */}
      <AnimatePresence>
        {message && (
          <motion.div
            className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.3 }}
          >
            <motion.div
              className="bg-white rounded-2xl shadow-2xl max-w-sm w-full mx-auto p-6 relative"
              initial={{ scale: 0.8, opacity: 0, y: 20 }}
              animate={{ scale: 1, opacity: 1, y: 0 }}
              exit={{ scale: 0.8, opacity: 0, y: -20 }}
              transition={{ 
                type: "spring",
                damping: 25,
                stiffness: 300,
                duration: 0.4
              }}
            >
              {/* Success Icon */}
              <div className="flex justify-center mb-4">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center">
                  <svg 
                    className="w-6 h-6 text-green-600" 
                    fill="none" 
                    stroke="currentColor" 
                    viewBox="0 0 24 24"
                  >
                    <path 
                      strokeLinecap="round" 
                      strokeLinejoin="round" 
                      strokeWidth={2} 
                      d="M5 13l4 4L19 7" 
                    />
                  </svg>
                </div>
              </div>
              
              {/* Message */}
              <div className="text-center">
                <h3 className="text-lg font-semibold text-gray-900 mb-2">
                  Success!
                </h3>
                <p className="text-gray-600 leading-relaxed">
                  {message}
                </p>
              </div>

              {/* Progress Bar */}
              <motion.div
                className="absolute bottom-0 left-0 right-0 h-1 bg-green-500 rounded-b-2xl origin-left"
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 3, ease: "linear" }}
              />
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto">
        <h1 className="text-3xl font-bold mb-4">Dashboard</h1>
        <p className="text-gray-600 mb-8">Welcome to your dashboard! Here you can see your stats, recent activity, and more.</p>

        {/* Example cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-blue-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Users</h3>
            <p className="text-3xl font-bold">120</p>
          </div>
          <div className="bg-green-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Orders</h3>
            <p className="text-3xl font-bold">75</p>
          </div>
          <div className="bg-purple-500 text-white p-6 rounded-lg shadow-lg">
            <h3 className="text-lg font-semibold mb-2">Revenue</h3>
            <p className="text-3xl font-bold">$5,400</p>
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="mt-8 bg-white rounded-lg shadow-lg p-6">
          <h2 className="text-xl font-bold mb-4">Recent Activity</h2>
          <div className="space-y-3">
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span>New user registration</span>
              <span className="text-sm text-gray-500">2 minutes ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span>Order #1234 completed</span>
              <span className="text-sm text-gray-500">5 minutes ago</span>
            </div>
            <div className="flex items-center justify-between p-3 bg-gray-50 rounded">
              <span>Payment received</span>
              <span className="text-sm text-gray-500">10 minutes ago</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;