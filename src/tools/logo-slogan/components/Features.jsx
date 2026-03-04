import React from "react";

const Features = () => {
  const features = [
    {
      title: "Creative Logo Ideas",
      description:
        "Generate unique and brand-ready logo concepts tailored to your business name and niche.",
    },
    {
      title: "Catchy Slogan Generator",
      description:
        "Create memorable and impactful slogans that perfectly represent your brand identity.",
    },
    {
      title: "AI-Powered Suggestions",
      description:
        "Get smart and creative logo and tagline ideas instantly based on your keywords.",
    },
    {
      title: "Brand-Focused Results",
      description:
        "Receive logo and slogan combinations designed to match your industry and target audience.",
    },
    {
      title: "Instant Generation",
      description:
        "Generate multiple logo name and slogan ideas in seconds with just one click.",
    },
    {
      title: "Fully Responsive Design",
      description:
        "Create logos and slogans seamlessly on desktop, tablet, or mobile devices anytime.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-(--foreground) mb-4">
            Why Use Our Logo & Slogan Generator?
          </h2>
          <p className="text-base sm:text-lg text-(--muted-foreground) max-w-2xl mx-auto leading-relaxed">
            Build a strong brand identity with creative logo ideas and powerful slogans
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
              <h3 className="text-lg sm:text-xl font-bold text-(--foreground) mb-3">
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

export default Features;