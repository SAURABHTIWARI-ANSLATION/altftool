"use client";

import React from "react";

const Description = () => {
  const features = [
    {
      title: "Roadmap Planning",
      description:
        "Get a clear step-by-step roadmap for turning your startup idea into a structured plan.",
    },
    {
      title: "Target Market Analysis",
      description:
        "Identify the ideal audience for your startup and understand their needs for better product-market fit.",
    },
    {
      title: "Revenue Model Suggestion",
      description:
        "Discover potential revenue streams and monetization strategies tailored to your startup concept.",
    },
    {
      title: "Funding Insights",
      description:
        "Receive guidance on funding options, investors, and budgeting to kickstart your business effectively.",
    },
    {
      title: "Marketing Strategy",
      description:
        "Get suggestions for marketing and growth tactics to reach your audience and build your brand.",
    },
    {
      title: "Growth & Scaling",
      description:
        "Learn ways to scale your startup, expand operations, and optimize processes for long-term success.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) mb-4 mt-[-120]">
            How It Works ?
          </h2>
          <p className="text-base sm:text-lg text-(--muted-foreground) max-w-2xl mx-auto leading-relaxed">
            Generate actionable startup ideas and insights with just a few inputs.
          </p>
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {features.map((feature, index) => (
            <div
              key={index}
              className="
                bg-(--card)
                rounded-2xl
                shadow-md
                border border-(--border)
                p-6 sm:p-8
                flex flex-col
                hover:shadow-xl
                hover:-translate-y-2
                transition-all duration-300
              "
            >
              <h3 className="text-lg sm:text-xl font-bold text-(--foreground) mb-3 hover:text-blue-600">
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