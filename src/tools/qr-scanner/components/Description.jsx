import React from "react";

const Description = () => {
  const features = [
    {
      title: "Open the QR Scanner",
      description:
        "Launch the QR Scanner tool directly in your browser — no downloads or installations required.",
    },
    {
      title: "Allow Camera Access",
      description:
        "Grant camera permission so the tool can instantly detect and scan QR codes in real time.",
    },
    {
      title: "Scan the QR Code",
      description:
        "Point your camera at any QR code and let the scanner automatically recognize the embedded data.",
    },
    {
      title: "Instant Data Extraction",
      description:
        "The tool quickly decodes the QR code and displays the information, whether it's a URL, text, or contact details.",
    },
    {
      title: "Preview & Verify",
      description:
        "Review the scanned content safely before taking any action to ensure accuracy and security.",
    },
    {
      title: "Open or Copy the Result",
      description:
        "Instantly open links, copy text, or save the extracted information with a single click.",
    },
  ];

  return (
    <section className="py-10 px-4 bg-(--background)">
      <div className="mx-auto max-w-6xl">
        {/* Header */}
        <div className="text-center mb-12 sm:mb-16">
          <h2 className="text-2xl sm:text-4xl font-extrabold text-(--foreground) mb-4">
            How It Works
          </h2>
          <p className="text-base sm:text-lg text-(--muted-foreground) max-w-2xl mx-auto leading-relaxed">
            Scan and decode QR codes instantly in just a few simple steps
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
                Step {index + 1}: {feature.title}
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