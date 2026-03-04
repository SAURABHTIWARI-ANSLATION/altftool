"use client";

import React from "react";

// Meeting Time Optimizer ke liye How It Works data
export const meetingTimeData = [
  {
    title: "Analyze Participants' Timezones",
    description:
      "Detects the time zones of all meeting participants automatically to prevent confusion.",
  },
  {
    title: "Suggest Optimal Time Slots",
    description:
      "Generates the best possible meeting times that fit everyone’s availability across countries.",
  },
  {
    title: "Supports Multiple Countries",
    description:
      "Handles participants from different countries, adjusting for daylight saving and local working hours.",
  },
  {
    title: "Conflict-Free Scheduling",
    description:
      "Avoids overlapping commitments and ensures the selected time slot works for all attendees.",
  },
  {
    title: "Customizable Preferences",
    description:
      "Set preferred working hours, meeting duration, and other constraints to get tailored suggestions.",
  },
  {
    title: "Visual Dashboard",
    description:
      "Displays suggested time slots in a clear visual timeline, making it easy to pick the best option.",
  },
];

const MeetingTimeDescription = ({ data = meetingTimeData }) => {
  return (
    <section className="py-16 sm:py-20 px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) mb-4 mt-[-45]">
            How It Works ?
          </h2>
          
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 justify-center">
          {data.map((feature, index) => (
            <div
              key={index}
              className="
                bg-(--card)
                rounded-2xl
                shadow-md
                border border-(--border)
                p-6 sm:p-8
                flex flex-col
                min-h-[200px] 
                max-w-[350px]
                hover:shadow-xl
                hover:-translate-y-2
                transition-all duration-300
              "
            >
              <h3 className="text-lg sm:text-xl font-bold text-(--foreground) mb-3 hover:text-blue-600 transition-colors duration-300">
                {feature.title}
              </h3>

              <p className="text-sm sm:text-base text-(--muted-foreground) leading-relaxed">
                {feature.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MeetingTimeDescription;