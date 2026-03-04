"use client";

import React from "react";
import { MessageCircle, Brain, Lightbulb, Copy, RefreshCw, Shield } from "lucide-react";
import { motion } from "framer-motion";

const howItWorks = [
  {
    icon: <MessageCircle size={28} />,
    title: "Ask Your Question",
    description:
      "Apna relationship concern ya question clearly type karein. Love, breakup, trust ya confusion — sab share kar sakte hain.",
  },
  {
    icon: <Brain size={28} />,
    title: "Smart Analysis",
    description:
      "System aapke question ko analyze karta hai aur situation ko samajhne ki koshish karta hai.",
  },
  {
    icon: <Lightbulb size={28} />,
    title: "Get Practical Advice",
    description:
      "Aapko realistic aur practical suggestions milte hain jo aap real life me apply kar sakte hain.",
  },
  {
    icon: <Copy size={28} />,
    title: "Copy & Use Anywhere",
    description:
      "Advice ko copy karke aap notes, chats ya kisi bhi jagah use kar sakte hain.",
  },
  {
    icon: <RefreshCw size={28} />,
    title: "Ask Again Anytime",
    description:
      "Agar aur doubt ho ya situation change ho jaye, aap dobara question pooch sakte hain.",
  },
  {
    icon: <Shield size={28} />,
    title: "Safe & Private",
    description:
      "Aapka conversation private rehta hai. Aap bina hesitation ke apni baat share kar sakte hain.",
  },
];

export default function HowItWorks() {
  return (
    <section className="w-full py-16 px-4 sm:px-6 lg:px-12 bg-white">
      <div className="max-w-7xl mx-auto">
        
        {/* Heading */}
        <div className="text-center mb-12">
          <h2 className="text-3xl sm:text-4xl font-bold text-gray-900 mt-[-40]">
            How It Works ?
          </h2>
          <p className="text-gray-600 mt-3 text-sm sm:text-base">
            Simple steps to get clear relationship guidance instantly.
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {howItWorks.map((item, index) => (
            <motion.div
              key={index}
              whileHover={{ scale: 1.05 }}
              className="bg-white rounded-2xl shadow-md p-6 border border-gray-200 hover:shadow-xl transition duration-300 group"
            >
              <div className="text-gray-700 mb-4">
                {item.icon}
              </div>

              <h3 className="text-lg font-semibold text-gray-800 mb-2 transition duration-300 group-hover:text-blue-600">
                {item.title}
              </h3>

              <p className="text-gray-600 text-sm leading-relaxed">
                {item.description}
              </p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}