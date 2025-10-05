/* eslint-disable no-unused-vars */
import { useState } from "react";
import { motion } from "framer-motion";
import { toast, Toaster } from "react-hot-toast";

export default function ContactSection() {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    email: "",
    message: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const validateForm = () => {
    const { name, phone, email, message } = formData;
    const phoneRegex = /^[0-9]{7,15}$/;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if (!name || !phone || !email || !message) {
      toast.error("Please fill in all fields.");
      return false;
    }
    if (!phoneRegex.test(phone)) {
      toast.error("Phone number must be 7–15 digits.");
      return false;
    }
    if (!emailRegex.test(email)) {
      toast.error("Invalid email format.");
      return false;
    }
    return true;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    toast.success("Message sent successfully!");

    // Reset form
    setFormData({
      name: "",
      phone: "",
      email: "",
      message: "",
    });

    // TODO: Connect to backend/EmailJS/Google Sheets here if needed
  };

  const focusVariant = {
    focus: {
      scale: 1.02,
      transition: { type: "spring", stiffness: 300 },
    },
  };

  return (
    <motion.section
      id="contact"
      className="py-10 px-4 bg-[lightgray] scroll-mt-20"
      initial={{ opacity: 0, y: 60 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.6 }}
      viewport={{ once: true }}
    >
      {/* Toast notifications */}
      <Toaster position="top-center" reverseOrder={false} />

      <h1 className="text-l font-bold text-white bg-[#00192e] p-3 rounded shadow-md mb-6 w-fit">
        CONTACT US
      </h1>

      <div className="grid md:grid-cols-2 gap-6 max-w-6xl mx-auto">
        {/* Google Map */}
        <div className="rounded-xl overflow-hidden shadow-lg">
          <iframe
            src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d31578.142041118345!2d124.8270795462949!3d10.133434064862257!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x33a71c93c49cb303%3A0x340d67f7ed3050f3!2sMaasin%20City%2C%20Southern%20Leyte!5e0!3m2!1sen!2sph!4v1690000000000"
            className="w-full h-72 md:h-full"
            loading="lazy"
            allowFullScreen
            title="Map"
          ></iframe>
        </div>

        {/* Contact Form */}
        <form
          onSubmit={handleSubmit}
          className="bg-white text-black rounded-xl p-6 shadow-lg w-full"
        >
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <motion.input
              whileFocus="focus"
              variants={focusVariant}
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              placeholder="Full Name"
              className="p-2 border border-gray-300 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
            <motion.input
              whileFocus="focus"
              variants={focusVariant}
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              placeholder="Phone Number"
              className="p-2 border border-gray-300 rounded text-sm w-full focus:outline-none focus:ring-2 focus:ring-cyan-400"
            />
          </div>
          <motion.input
            whileFocus="focus"
            variants={focusVariant}
            type="email"
            name="email"
            value={formData.email}
            onChange={handleChange}
            placeholder="Email"
            className="w-full mt-4 p-2 border border-gray-300 rounded text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
          />
          <motion.textarea
            whileFocus="focus"
            variants={focusVariant}
            name="message"
            value={formData.message}
            onChange={handleChange}
            placeholder="Message"
            className="w-full mt-4 p-2 border border-gray-300 rounded h-24 resize-none text-sm focus:outline-none focus:ring-2 focus:ring-cyan-400"
          ></motion.textarea>
          <button
            type="submit"
            className="mt-4 bg-cyan-500 text-white px-6 py-2 rounded hover:bg-cyan-600 text-sm transition duration-300 transform hover:scale-105"
          >
            SUBMIT
          </button>
        </form>
      </div>
    </motion.section>
  );
}
