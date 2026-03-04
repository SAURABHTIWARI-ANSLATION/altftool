import React from "react";

const Features = () => {
  const features = [
    {
      title: "Instant Plant Identification",
      description:
        "Identify plants instantly by uploading a photo and get accurate results within seconds.",
    },
    {
      title: "Detailed Plant Information",
      description:
        "Access comprehensive details including plant name, species, care tips, and growing conditions.",
    },
    {
      title: "Disease Detection Support",
      description:
        "Detect common plant diseases and get helpful suggestions to keep your plants healthy.",
    },
    {
      title: "User-Friendly Interface",
      description:
        "Simply upload or capture an image to scan plants quickly with an easy-to-use design.",
    },
    {
      title: "Secure & Private Scanning",
      description:
        "Your uploaded images are processed securely with no permanent storage or tracking.",
    },
    {
      title: "Fully Responsive Design",
      description:
        "Scan and identify plants seamlessly on desktop, tablet, or mobile devices anytime.",
    },
  ];

  return (
    <section className=" px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-(--foreground) mb-4">
            Why Use Our Plant Scanner?
          </h2>
          <p className="text-base sm:text-lg text-(--muted-foreground) max-w-2xl mx-auto leading-relaxed">
            Identify plants, learn care tips, and keep your garden thriving
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