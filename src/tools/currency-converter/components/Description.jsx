import React from "react";
import {
  ArrowLeftRight,
  Hash,
  Globe,
  Zap,
  RefreshCw,
  ShieldCheck,
} from "lucide-react";

const steps = [
  {
    icon: ArrowLeftRight,
    title: "Select Your Currencies",
    description:
      "Choose the currency you want to convert from and the currency you want to convert to using the dropdown menus.",
  },
  {
    icon: Hash,
    title: "Enter the Amount",
    description:
      "Type the amount you want to convert in the input field. Only valid numeric values are accepted for accurate results.",
  },
  {
    icon: Globe,
    title: "Fetch Live Exchange Rates",
    description:
      "The app automatically retrieves the latest real-time exchange rates from a trusted financial API.",
  },
  {
    icon: Zap,
    title: "Instant Conversion",
    description:
      "As soon as you enter the amount, the converted value is calculated and displayed instantly.",
  },
  {
    icon: RefreshCw,
    title: "Swap Currencies Easily",
    description:
      "Use the swap button to quickly switch between selected currencies without re-entering the data.",
  },
  {
    icon: ShieldCheck,
    title: "Accurate & Secure Data",
    description:
      "All exchange rates are fetched securely and updated frequently to ensure maximum accuracy.",
  },
];

export default function Description() {
  return (
    <section className="py-16 px-4 bg-gray-50">
      <div className="max-w-6xl mx-auto">
        <h2 className="text-3xl font-bold text-center mb-12">
          How It Works ?
        </h2>

        <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {steps.map((step, index) => {
            const Icon = step.icon;
            return (
              <div
                key={index}
                className="group bg-white rounded-2xl shadow-md p-6 hover:shadow-xl transition duration-300"
              >
                <div className="w-12 h-12 flex items-center justify-center rounded-xl bg-blue-100 mb-4 group-hover:bg-blue-200 transition">
                  <Icon className="text-blue-600 w-6 h-6" />
                </div>

                <h3 className="text-lg font-semibold mb-2 transition-colors duration-300 group-hover:text-blue-600">
                  {step.title}
                </h3>

                <p className="text-gray-600 text-sm leading-relaxed">
                  {step.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}