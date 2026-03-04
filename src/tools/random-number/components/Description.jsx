import React from "react";

const Description = () => {
  const features = [
    {
      title: "Generate Random Numbers",
      description:
        "Quickly generate single or multiple random numbers within a specified range.",
    },
    {
      title: "Custom Range",
      description:
        "Set minimum and maximum values to control the range of numbers generated.",
    },
    {
      title: "Multiple Formats",
      description:
        "Choose to generate numbers as integers, decimals, or percentages depending on your need.",
    },
    {
      title: "Reproducible Results",
      description:
        "Optionally use a seed value to reproduce the same set of random numbers for consistency.",
    },
    {
      title: "Copy & Export",
      description:
        "Easily copy generated numbers or export them to use in other applications or spreadsheets.",
    },
    {
      title: "Quick & Lightweight",
      description:
        "Instant number generation with a clean interface and minimal setup, perfect for quick tasks.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) mb-4">
            How It Works ?
          </h2>
          <p className="text-base sm:text-lg text-(--muted-foreground) max-w-2xl mx-auto leading-relaxed">
            Generate numbers effortlessly with precision and flexibility
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