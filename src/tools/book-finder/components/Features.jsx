import React from "react";

const Features = () => {
  const features = [
    {
      title: "Search by Book Title",
      description:
        "Quickly find books by entering the exact or partial title and discover matching results instantly.",
    },
    {
      title: "Find Books by Author",
      description:
        "Search for books written by your favorite authors and explore their complete works in one place.",
    },
    {
      title: "Accurate & Fast Results",
      description:
        "Get precise search results within seconds using our optimized and responsive search system.",
    },
    {
      title: "Explore Detailed Book Information",
      description:
        "View essential details such as publication info, descriptions, and related titles before choosing a book.",
    },
    {
      title: "Clean & User-Friendly Interface",
      description:
        "Enjoy a simple, distraction-free layout designed to make book discovery easy and enjoyable.",
    },
    {
      title: "Fully Responsive Design",
      description:
        "Seamlessly works across desktop, tablet, and mobile devices for smooth browsing anytime, anywhere.",
    },
  ];

  return (
    <section className="py-8 sm:py-10 px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) mb-4">
            Why Use Our Book Finder?
          </h2>
          <p className="text-base sm:text-lg text-(--muted-foreground) max-w-2xl mx-auto leading-relaxed">
            Discover books quickly by title or author and explore your next great read
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
