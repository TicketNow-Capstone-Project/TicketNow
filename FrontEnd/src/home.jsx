import React, { useState, useEffect } from "react";
import { AnimatePresence } from "framer-motion";
import { useLenis } from "./hooks/useLenis";
import { HomeHero } from "./components/HomeHero";
import { AuthButtons } from "./components/auth/AuthButtons";
import { LoginForm } from "./components/auth/LoginForm";
import { RegisterForm } from "./components/auth/RegisterForm";
import { ScrollToTop } from "./components/ui/ScrollToTop";

const Home = () => {
  const [showScrollTop, setShowScrollTop] = useState(false);
  const [formView, setFormView] = useState(null);

  useLenis();

  useEffect(() => {
    const handleScroll = () => setShowScrollTop(window.scrollY > 100);
    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const handleLogin = async (e) => {
    e.preventDefault();
    // ... same login logic
  };

  const handleRegister = async (e) => {
    e.preventDefault();
    // ... same register logic
  };

  return (
    <main className="font-sans scroll-smooth text-white bg-[#002c48] overflow-hidden">
      <section className="min-h-[640px] grid md:grid-cols-2 text-black bg-white items-center pt-12 px-4 md:px-8">
        <HomeHero />
        
        <div className="flex flex-col justify-center items-center bg-[#005299] w-full md:h-[590px] p-6 md:p-8 space-y-4 text-white mt-2 md:mt-0 md:w-[36.9rem] md:ml-20">
          <AnimatePresence mode="wait">
            {!formView && <AuthButtons setFormView={setFormView} />}
            {formView === 'login' && (
              <LoginForm onSubmit={handleLogin} onCancel={() => setFormView(null)} />
            )}
            {formView === 'register' && (
              <RegisterForm onSubmit={handleRegister} onCancel={() => setFormView(null)} />
            )}
          </AnimatePresence>
        </div>
      </section>

      <ScrollToTop show={showScrollTop} />
    </main>
  );
};

export default Home;