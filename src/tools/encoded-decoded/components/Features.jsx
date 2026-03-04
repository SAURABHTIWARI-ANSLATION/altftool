import React from "react";

const Features = () => {
  const features = [
    {
      title: "Instant Encode & Decode",
      description:
        "Quickly encode or decode text in seconds using popular formats with accurate results.",
    },
    {
      title: "Supports Multiple Formats",
      description:
        "Convert text using formats like Base64, URL encoding, and other commonly used encoding standards.",
    },
    {
      title: "Secure & Browser-Based",
      description:
        "All processing happens directly in your browser. Your data is never uploaded or stored.",
    },
    {
      title: "Copy & Clear in One Click",
      description:
        "Easily copy the encoded or decoded output and clear fields instantly for repeated use.",
    },
    {
      title: "Simple & Developer-Friendly Interface",
      description:
        "Clean layout designed for developers, students, and professionals who need fast text conversion.",
    },
    {
      title: "Fully Responsive Design",
      description:
        "Use the tool seamlessly across desktop, tablet, and mobile devices without any issues.",
    },
  ];

  return (
    <section className="py-8 sm:py-10 px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-(--foreground) mb-4">
            Why Use Our Encode & Decode Tool?
          </h2>
          <p className="text-base sm:text-lg text-(--muted-foreground) max-w-2xl mx-auto leading-relaxed">
            Easily convert text between encoded and decoded formats for development and data handling
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
