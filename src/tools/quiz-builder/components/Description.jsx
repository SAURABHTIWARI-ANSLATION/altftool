import React from "react";

const Description = () => {
  const features = [
    {
      title: "Create Custom Quizzes",
      description:
        "Design quizzes with multiple-choice, true/false, and short answer questions to match your learning goals.",
    },
    {
      title: "Question Bank",
      description:
        "Access and reuse a library of pre-made questions for faster quiz creation.",
    },
    {
      title: "Timed Quizzes",
      description:
        "Set time limits for each quiz or question to add a challenge for participants.",
    },
    {
      title: "Instant Scoring",
      description:
        "Automatically grade quizzes and provide detailed results immediately after submission.",
    },
    {
      title: "Share & Embed",
      description:
        "Easily share your quizzes via link or embed them into websites and learning platforms.",
    },
    {
      title: "Analytics & Insights",
      description:
        "Track participant performance, question difficulty, and overall quiz statistics to improve content.",
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) mb-4 mt-[-50]">
            How It Works ?
          </h2>
          <p className="text-base sm:text-lg text-(--muted-foreground) max-w-2xl mx-auto leading-relaxed">
            Create, share, and analyze quizzes effortlessly
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