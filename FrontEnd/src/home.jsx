import React, { useState, useEffect } from "react";
import { AnimatePresence, motion } from "framer-motion";
import { useLenis } from "./hooks/useLenis";
import { AuthButtons } from "./components/auth/AuthButtons";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { ScrollToTop } from "./components/ui/ScrollToTop";
import { useLocation } from "react-router-dom";
import { useAuth } from "./AuthContext"; // <-- import context

const Home = () => {
  const location = useLocation();
  const [message, setMessage] = useState(location.state?.message || "");
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formView, setFormView] = useState(location.state?.openForm || null);

  const { user, login } = useAuth(); // get user from context

  useLenis();

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => setMessage(""), 3000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = async (data) => {
    try {
      await login(data); // login handled in AuthContext
      setFormView(null);
      setMessage("Login successful!");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  const handleRegister = async (data) => {
    // You can create a similar register function in AuthContext or handle locally
    console.log("Register data:", data);
  };

  return (
    <main className="font-sans scroll-smooth text-white bg-[#002c48] relative">
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
                <h3 className="text-lg font-semibold text-gray-900 mb-2">Success!</h3>
                <p className="text-gray-600 leading-relaxed">{message}</p>
              </div>

              
             {/* Progress Bar */}
              <motion.div
                className={`absolute bottom-0 left-0 right-0 h-1 rounded-b-2xl origin-left ${
                  user ? "bg-green-500" : "bg-yellow-400"
                }`}
                initial={{ scaleX: 1 }}
                animate={{ scaleX: 0 }}
                transition={{ duration: 3, ease: "linear" }}
              />

            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Main Section */}
      <section className="min-h-[640px] grid md:grid-cols-2 text-black bg-white items-center pt-12 px-4 md:px-8">
        <div className="text-center p-4 w-full">
          <img
            src="/ticketnow1.png"
            className="rounded-md w-60 h-60 object-cover mx-auto"
            alt="TicketNow"
          />
          <h2 className="mt-4 font-bold text-xl text-blue-900">TERMINAL MANAGEMENT SYSTEM</h2>
          <img
            src="/terminal.png"
            alt="Terminal Illustration"
            className="w-full max-w-xs object-cover shadow-md mx-auto mt-2"
          />
        </div>

        <div className="flex flex-col justify-center items-center bg-[#005299] w-full md:h-[590px] p-6 md:p-8 space-y-4 text-white mt-2 md:mt-0 md:w-[36.9rem] md:ml-20">
          <AnimatePresence mode="wait">
            {!user && (
              <>
                {!formView && <AuthButtons setFormView={setFormView} />}
                {formView === "login" && (
                  <LoginForm
                    onSubmit={handleLogin}
                    onCancel={() => setFormView(null)}
                  />
                )}
                {formView === "register" && (
                  <RegisterForm
                    onSubmit={handleRegister}
                    onCancel={() => setFormView(null)}
                  />
                )}
              </>
            )}
          </AnimatePresence>
        </div>
      </section>

      <ScrollToTop show={showScrollTop} />
    </main>
  );
};

export default Home;
