import React from 'react';

const cards = [
  {
    title: "Choose Pet Type",
    description: "Select whether you have a dog, cat, bird, or any other type of pet to get relevant name suggestions."
  },
  {
    title: "Select Name Style",
    description: "Pick a style for your pet's name: cute, funny, strong, unique, or classic."
  },
  {
    title: "Add Personality Traits",
    description: "Enter a few traits of your pet, like playful, calm, energetic, or loyal, to personalize the names."
  },
  {
    title: "Generate Names",
    description: "Click the generate button to instantly see a list of creative names tailored for your pet."
  },
  {
    title: "Favorite & Save",
    description: "Mark your favorite names and save them for later to make choosing easier."
  },
  {
    title: "Share With Friends",
    description: "Share your favorite pet names with friends or family to get their opinions."
  }
];

export default function PetNameHowItWorks() {
  return (
    <div className="max-w-7xl mx-auto p-6 sm:p-8">
      <h2 className="text-3xl font-bold text-(--foreground) text-center mb-8 mt-[-45]">
        How It Works ?
      </h2>
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {cards.map((card, index) => (
          <div
            key={index}
            className="bg-(--card) p-6 rounded-xl shadow-lg hover:shadow-2xl transition-all group"
          >
            <h3 className="text-xl font-semibold text-(--foreground) mb-3 group-hover:text-blue-600 transition-colors duration-300">
              {card.title}
            </h3>
            <p className="text-(--foreground) text-sm">{card.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}