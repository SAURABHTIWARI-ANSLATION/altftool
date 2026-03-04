import React from "react";

const HowItWorks = () => {
  const steps = [
    {
      title: "Enter Your Product Details",
      description:
        "Provide your product name, key features, target audience and any important highlights.",
    },
    {
      title: "Choose Platform",
      description:
        "Select where you want to run your ad — Facebook, Instagram, Google or others.",
    },
    {
      title: "Select Tone & Style",
      description:
        "Pick the tone that matches your brand like professional, funny, persuasive or bold.",
    },
    {
      title: "Generate Captions",
      description:
        "Click the generate button to instantly create multiple high-converting ad captions.",
    },
    {
      title: "Review & Edit",
      description:
        "Modify the generated captions to better match your campaign goals if needed.",
    },
    {
      title: "Copy & Use",
      description:
        "Copy your favorite caption and use it directly in your ad campaign.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) mb-4">
            How It Works?
          </h2>
          <p className="text-base sm:text-lg text-(--muted-foreground) max-w-2xl mx-auto leading-relaxed">
            Create powerful ad captions in just a few simple steps
          </p>
        </div>

        {/* Cards Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {steps.map((step, index) => (
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
              {/* Step Number */}
              <span className="text-sm font-semibold text-(--muted-foreground) mb-2">
                Step {index + 1}
              </span>

              {/* Blue Heading by Default */}
              <h3 className="text-lg sm:text-xl font-bold text-blue-600 mb-3">
                {step.title}
              </h3>

              <p className="text-sm sm:text-base text-(--muted-foreground) leading-relaxed">
                {step.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default HowItWorks;
