import React from "react";

const Features = () => {
    const features = [
        {
            title: "Instant Blood Pressure Reading",
            description:
                "Quickly check and understand your systolic and diastolic blood pressure levels with easy-to-read results.",
        },
        {
            title: "Accurate Health Insights",
            description:
                "Get clear explanations of what your blood pressure numbers mean and how they relate to your overall health.",
        },
        {
            title: "Normal, Elevated & High BP Classification",
            description:
                "Automatically categorize your readings into normal, elevated, or high blood pressure ranges.",
        },
        {
            title: "Simple & User-Friendly Interface",
            description:
                "Enter your readings easily and receive results in seconds with a clean, distraction-free design.",
        },
        {
            title: "100% Private & Secure",
            description:
                "Your health information stays on your device. No data storage, no tracking, complete privacy.",
        },
        {
            title: "Helpful Health Recommendations",
            description:
                "Receive practical lifestyle suggestions and tips to help manage and maintain healthy blood pressure levels.",
        },
    ];

    return (
        <section className="py-16 sm:py-20 px-4 bg-(--background)">
            <div className="mx-auto max-w-6xl">
                {/* Header */}
                <div className="text-center mb-12 sm:mb-16">
                    <h2 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) mb-4">
                        Why Use Our Blood Pressure Checker?
                    </h2>
                    <p className="text-base sm:text-lg text-(--muted-foreground) max-w-2xl mx-auto leading-relaxed">
                        Monitor your blood pressure levels and stay informed about your heart health
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
