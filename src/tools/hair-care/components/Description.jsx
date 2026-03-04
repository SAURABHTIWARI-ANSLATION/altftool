// component/Description.jsx
import React from "react";

const Description = () => {
  const descriptions = [
    {
      title: "Answer Hair Type",
      description:
        "Select your natural hair type to get personalized recommendations."
    },
    {
      title: "Describe Hair Condition",
      description:
        "Tell us about your current hair health, dryness, or oiliness."
    },
    {
      title: "Identify Hair Concerns",
      description:
        "Choose your main hair issues like hair loss, dandruff, or frizz."
    },
    {
      title: "Provide Hair Routine Details",
      description:
        "Share your washing frequency and heat styling habits."
    },
    {
      title: "Get Recommendations",
      description:
        "Receive care tips, product suggestions, and routines based on your answers."
    },
    {
      title: "Follow Routine & Retake Quiz",
      description:
        "Implement the routine for healthy hair and retake the quiz anytime for updated tips."
    }
  ];

  return (
    <section className="py-16 sm:py-20 px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) mb-4">
            How It Works ?
          </h2>
          
        </div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
          {descriptions.map((item, index) => (
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
                group
              "
            >
              <h3 className="text-lg sm:text-xl font-bold text-(--foreground) mb-3 group-hover:text-blue-500 transition-colors duration-300">
                {item.title}
              </h3>

              <p className="text-sm sm:text-base text-(--muted-foreground) leading-relaxed">
                {item.description}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Description;