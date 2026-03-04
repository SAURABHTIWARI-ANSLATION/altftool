import React from "react";

const DescriptionSection = () => {
  const cards = [
    {
      title: "Add Your Event",
      description:
        "Create a new event by entering the title, date, time, and important details.",
    },
    {
      title: "Set Date & Year",
      description:
        "Select the correct year and schedule your event properly without errors.",
    },
    {
      title: "Manage Participants",
      description:
        "Add attendees or important contacts related to your event easily.",
    },
    {
      title: "Edit Anytime",
      description:
        "Update event details whenever needed without deleting the entry.",
    },
    {
      title: "Track & Organize",
      description:
        "View all your events in one place and keep everything organized.",
    },
    {
      title: "Stay Notified",
      description:
        "Never miss important dates by keeping your events properly scheduled.",
    },
  ];

  return (
    <section className="w-full px-4 sm:px-6 lg:px-12 py-12">
      <h2 className="text-2xl sm:text-3xl font-bold text-center mb-10">
    How It Works ?
      </h2>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-white shadow-md rounded-xl p-6 hover:shadow-lg transition duration-300"
          >
            <h3 className="text-lg font-semibold mb-3 transition-all hover:text-blue-600">
              {card.title}
            </h3>
            <p className="text-gray-600 text-sm leading-relaxed">
              {card.description}
            </p>
          </div>
        ))}
      </div>
    </section>
  );
};

export default DescriptionSection;