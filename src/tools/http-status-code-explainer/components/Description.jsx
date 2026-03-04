"use client";

import React from "react";

const codes = [
  { code: "100", title: "Continue", description: "The server has received the request headers, and the client should proceed to send the request body." },
  { code: "200", title: "OK", description: "The request has succeeded. The meaning of success depends on the HTTP method." },
  { code: "301", title: "Moved Permanently", description: "The URI of the requested resource has been changed permanently." },
  { code: "400", title: "Bad Request", description: "The server could not understand the request due to invalid syntax." },
  { code: "404", title: "Not Found", description: "The server cannot find the requested resource." },
  { code: "500", title: "Internal Server Error", description: "The server encountered a situation it doesn't know how to handle." },
];

export default function HowItWorks() {
  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    alert(`Copied: ${text}`);
  };

  return (
    <div className="space-y-6">
      {/* Heading */}
      <h2 className="text-3xl lg:text-4xl font-bold text-center text-(--foreground) mb-6">
        How It Works ?
      </h2>

      {/* Cards */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {codes.map((card, index) => (
          <div
            key={index}
            className="bg-(--card) p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all"
          >
            <h3 className="text-xl font-bold mb-2 text-(--foreground)">
              {card.code} {card.title}
            </h3>
            <p className="text-(--muted-foreground) text-sm mb-4">
              {card.description}
            </p>
            <button
              onClick={() => copyToClipboard(`${card.code} ${card.title} - ${card.description}`)}
              className="px-4 py-2 bg-green-600 text-white rounded-xl hover:bg-green-700 transition-all text-sm font-semibold"
            >
              Copy
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}