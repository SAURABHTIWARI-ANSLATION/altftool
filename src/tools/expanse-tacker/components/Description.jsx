"use client";

import React from "react";
import { CreditCard, DollarSign, BarChart2, Clock, BookOpen, CheckCircle } from "lucide-react";

const steps = [
  {
    title: "Add Your Expenses",
    description: "Easily add your daily expenses and categorize them.",
    icon: <CreditCard size={32} />,
  },
  {
    title: "Track Spending",
    description: "Visualize your spending patterns with charts and summaries.",
    icon: <BarChart2 size={32} />,
  },
  {
    title: "Set Budgets",
    description: "Define monthly budgets to manage your money effectively.",
    icon: <DollarSign size={32} />,
  },
  {
    title: "View History",
    description: "Check past expenses and review your spending patterns.",
    icon: <BookOpen size={32} />,
  },
  {
    title: "Notifications",
    description: "Stay updated with spending alerts and notifications.",
    icon: <Clock size={32} />,
  },
  {
    title: "Review & Save",
    description: "Analyze your expenses and save more efficiently.",
    icon: <CheckCircle size={32} />,
  },
];

export default function Description() {
  return (
    <section className="py-10 bg-gray-50">
      <div className="max-w-6xl mx-auto px-4">
        <h2 className="text-3xl font-bold mb-8 text-center">How It Works ?</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {steps.map((step, index) => (
            <div
              key={index}
              className="p-6 bg-white rounded-xl shadow-md flex flex-col items-center text-center cursor-pointer"
            >
              <div className="mb-4">{step.icon}</div>
              <h3 className="text-xl font-semibold mb-2 transition-colors duration-300 hover:text-blue-500">
                {step.title}
              </h3>
              <p className="text-gray-700">{step.description}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}