/* eslint-disable no-unused-vars */
import { motion } from "framer-motion";

export default function AboutSection() {
  return (
    <motion.section
      id="about"
      className="py-10 bg-[#00192e] px-4 md:px-8 scroll-mt-5"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      <h1 className="text-l font-bold text-white bg-[gray] p-3 rounded shadow mb-6 w-fit">
        ABOUT TICKETNOW
      </h1>

      {/* First Row */}
      <div className="flex flex-col md:flex-row gap-6 items-start md:items-center">
        <img
          src="/1.png"
          alt="Jeepney Terminal"
          className="w-full md:w-[40%] h-60 object-cover rounded-xl shadow-lg transition-transform hover:scale-105"
        />
        <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full">
          <h2 className="text-2xl font-bold mb-2">TERMINAL MANAGEMENT SYSTEM</h2>
          <p className="text-sm font-lightbold leading-relaxed">
            Welcome to the Maasin City Terminal Management System – your gateway to a more organized and commuter-friendly transportation experience.
            Located at the heart of Maasin City Southern Leyte, our terminal system is designed to streamline travel across the city and nearby provinces
            by providing accessible scheduling, real-time trip updates, and efficient dispatching for buses, vans, and jeepneys.
            Whether you're a local commuter, a tourist, or a transport operator, our platform helps ensure smooth, reliable, and convenient travel.
            As Maasin City continues to grow, we're committed to improving passenger services through digital solutions and better terminal facilities.
            Together, we move Maasin forward — one trip at a time.
          </p>
        </div>
      </div>

      {/* Second Row */}
      <div className="flex flex-col md:flex-row-reverse gap-6 items-start md:items-center mt-10">
        <img
          src="/1.png"
          alt="Modern Terminal"
          className="w-full md:w-[40%] h-60 object-cover rounded-xl shadow-lg transition-transform hover:scale-105"
        />
        <div className="bg-white text-black p-6 rounded-xl shadow-lg w-full">
          <h2 className="text-2xl font-bold mb-2">DIGITAL PASSENGER EXPERIENCE</h2>
          <p className="text-sm font-lightbold leading-relaxed">
            Our advanced terminal management system in Maasin City is designed to provide a faster, safer, and more convenient travel experience.
            We've streamlined your journey with a digital ticketing platform and quick QR code scanning to eliminate long lines.
            Stay informed with real-time bus schedules displayed on-site and online, and enjoy the ease of cashless payments using e-wallets, cards, or prepaid passes.
            Your safety is our priority, ensured by 24/7 CCTV monitoring and dedicated personnel.
            Committed to a greener future, we are also implementing eco-conscious policies and promoting proper waste management.
            Our goal is simple: to make travel in Maasin City smarter, more accessible, and passenger-friendly.
          </p>
        </div>
      </div>
    </motion.section>
  );
}
  