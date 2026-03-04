// component/Description.jsx
import React from "react";
import { Droplet, Repeat, RotateCw, Copy, Monitor, Save } from "lucide-react";

const Description = () => {
  const steps = [
    {
      title: "Select Colors",
      description:
        "Pick your favorite two colors to create a custom gradient for your project.",
      icon: <Droplet size={28} className="text-blue-500" />,
    },
    {
      title: "Adjust Angle",
      description:
        "Change the angle of the gradient to get the exact direction you want.",
      icon: <RotateCw size={28} className="text-blue-500" />,
    },
    {
      title: "Preview Live",
      description:
        "See a real-time preview of your gradient before copying the CSS.",
      icon: <Monitor size={28} className="text-blue-500" />,
    },
    {
      title: "Use Presets",
      description:
        "Quickly choose from popular gradient presets to save time and effort.",
      icon: <Repeat size={28} className="text-blue-500" />,
    },
    {
      title: "Copy CSS",
      description:
        "Copy the generated CSS code with one click and use it in your project.",
      icon: <Copy size={28} className="text-blue-500" />,
    },
    {
      title: "Apply Anywhere",
      description:
        "Use your gradient on buttons, backgrounds, cards, or any web element.",
      icon: <Save size={28} className="text-blue-500" />,
    },
  ];

  return (
    <section className="py-16 sm:py-20 px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-3xl sm:text-4xl font-extrabold text-(--foreground) mb-4 mt-[-40]">
            How It Works ?
          </h2>
        </div>

        {/* Grid */}
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
                items-start
                hover:shadow-xl
                hover:-translate-y-2
                hover:scale-105
                transition-all duration-300
                group
              "
            >
              {/* Icon */}
              <div className="mb-4">{step.icon}</div>

              {/* Title */}
              <h3 className="text-lg sm:text-xl font-bold text-(--foreground) mb-3 group-hover:text-blue-500 transition-colors duration-300">
                {step.title}
              </h3>

              {/* Description */}
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

export default Description;