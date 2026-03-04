import React from "react";

const Features = () => {
  const features = [
    {
      title: "Instant Facebook Ad Copy",
      description:
        "Generate high-converting Facebook ad copy in seconds tailored to your product or service.",
    },
    {
      title: "Audience-Focused Messaging",
      description:
        "Create ad copy that speaks directly to your target audience and highlights their pain points.",
    },
    {
      title: "Multiple Ad Variations",
      description:
        "Get multiple headline and primary text variations to test and optimize performance.",
    },
    {
      title: "Conversion-Driven Structure",
      description:
        "Craft compelling hooks, benefits, and strong call-to-actions designed to increase clicks and sales.",
    },
    {
      title: "Easy Customization",
      description:
        "Quickly edit and refine generated copy to match your brand voice and campaign goals.",
    },
    {
      title: "Fully Responsive & Fast",
      description:
        "Create ad copy seamlessly on desktop, tablet, or mobile devices with a smooth and user-friendly interface.",
    },
  ];

  return (
    <section className="py-8 sm:py-10 px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-(--foreground) mb-4">
            Why Use Our FB Ad Copy Generator?
          </h2>
          <p className="text-base sm:text-lg text-(--muted-foreground) max-w-2xl mx-auto leading-relaxed">
            Create scroll-stopping Facebook ads that drive engagement and conversions
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
