"use client";

import React from "react";

// Ye reusable data hai, jise multiple tools me use kar sakte ho
export const descriptionData = [
    { title: "Create Poll", description: "Easily create a poll with multiple options in seconds." },
  { title: "Share Link", description: "Share the poll link with your friends or team instantly." },
  { title: "Collect Votes", description: "Participants can vote anonymously or publicly." },
  { title: "Real-time Results", description: "See live updates of votes as they come in." },
  { title: "Analyze Trends", description: "Get insights into which options are popular and trends over time." },
  { title: "Export Data", description: "Download poll results in CSV or PDF format for reporting." },
];

const Description = ({ data = descriptionData }) => {
  return (
    <section className="py-16 sm:py-20 px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) mb-4 transition-all hover:text-blue mt-[-200]">
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

export default Description;