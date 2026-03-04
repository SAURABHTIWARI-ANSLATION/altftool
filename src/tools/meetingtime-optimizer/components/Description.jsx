// Description.jsx
import React from "react";
import { Clock, Users, Calendar, Zap, CheckCircle, AlertTriangle } from "lucide-react";

const cards = [
  {
    title: "Smart Scheduling",
    description: "Automatically finds the best time slots for all participants based on availability.",
    icon: <Calendar className="w-6 h-6 text-white" />,
    bg: "bg-blue-600",
  },
  {
    title: "Conflict Detection",
    description: "Detects overlapping meetings and suggests alternatives to avoid conflicts.",
    icon: <AlertTriangle className="w-6 h-6 text-white" />,
    bg: "bg-red-500",
  },
  {
    title: "Time Zone Friendly",
    description: "Handles participants across multiple time zones and finds a convenient slot for everyone.",
    icon: <Clock className="w-6 h-6 text-white" />,
    bg: "bg-purple-600",
  },
  {
    title: "Participant Management",
    description: "Easily add, remove, or prioritize participants while optimizing meeting time.",
    icon: <Users className="w-6 h-6 text-white" />,
    bg: "bg-green-500",
  },
  {
    title: "Quick Recommendations",
    description: "Get instant suggestions for alternative meeting slots when conflicts arise.",
    icon: <Zap className="w-6 h-6 text-white" />,
    bg: "bg-yellow-500",
  },
  {
    title: "Confirmation & Tracking",
    description: "Track who has confirmed attendance and get reminders automatically.",
    icon: <CheckCircle className="w-6 h-6 text-white" />,
    bg: "bg-indigo-500",
  },
];

export default function Description() {
  return (
    <div className="max-w-7xl mx-auto py-10 px-4 sm:px-6 lg:px-8">
      <h2 className="text-3xl font-bold text-(--foreground) text-center mb-8 mt-[-40]">How It Works ?</h2>
      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-(--card) rounded-xl p-6 shadow-lg flex flex-col hover:shadow-2xl transition-all"
          >
            <div className={`w-12 h-12 flex items-center justify-center rounded-full mb-4 ${card.bg}`}>
              {card.icon}
            </div>
            <h3 className="text-xl font-semibold text-(--foreground) mb-2 hover:text-blue-600 transition-colors duration-300">
  {card.title}
</h3>
            <p className="text-(--foreground) opacity-90 text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}