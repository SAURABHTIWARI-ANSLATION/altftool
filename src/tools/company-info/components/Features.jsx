import React from "react";

const Features = () => {
  const features = [
    {
      title: "Search Companies Instantly",
      description:
        "Quickly find detailed information about companies by entering their name or registration details.",
    },
    {
      title: "Comprehensive Company Profiles",
      description:
        "Access key business data including company status, registration date, industry type, and more.",
    },
    {
      title: "Verified Public Information",
      description:
        "View publicly available company records compiled from reliable and trusted data sources.",
    },
    {
      title: "Fast & Accurate Results",
      description:
        "Get relevant company details within seconds using our optimized search system.",
    },
    {
      title: "Secure & Private Browsing",
      description:
        "Your searches are not stored or tracked. Browse company information securely and privately.",
    },
    {
      title: "Fully Responsive Design",
      description:
        "Access company data seamlessly across desktop, tablet, and mobile devices anytime, anywhere.",
    },
  ];

  return (
    <section className="py-8 sm:py-10 px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) mb-4">
            Why Use Our Company Info Finder?
          </h2>
          <p className="text-base sm:text-lg text-(--muted-foreground) max-w-2xl mx-auto leading-relaxed">
            Access essential company information quickly and make informed business decisions
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
