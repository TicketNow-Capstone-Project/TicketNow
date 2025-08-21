import React from 'react';
import { motion } from 'framer-motion';

export const HomeHero = () => (
  <div className="text-center p-4 w-full">
    <img src="/ticketnow1.png" className="rounded-md w-60 h-60 object-cover mx-auto" alt="TicketNow" />
    <h2 className="mt-4 font-bold text-xl text-blue-900">TERMINAL MANAGEMENT SYSTEM</h2>
    <img src="/terminal.png" alt="Terminal Illustration" className="w-full max-w-xs object-cover shadow-md mx-auto mt-2" />
  </div>
);