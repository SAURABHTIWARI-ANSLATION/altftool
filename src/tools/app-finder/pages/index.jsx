"use client";

import { useState } from "react";

import { Globe, Shield, Zap } from "lucide-react";
import { SearchBar } from "../components/SearchBar";
import { FeatureCard } from "../components/FeatureCard";
import { AppCard } from "../components/AppCard";
import { truncateText } from "../utils/helper";
import { demoApps } from "../utils/appService";
import { fetchApps } from "../utils/appService";
import Features from "../components/Features";

export default function ToolHome() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState(demoApps);
  const [loading, setLoading] = useState(false);

  const toast = (message) => {
    const toastEl = document.createElement("div");
    toastEl.className =
      "fixed bottom-8 right-4 bg-red-800 text-white px-6 py-3 rounded-lg shadow-2xl z-50 animate-pulse";
    toastEl.textContent = message;
    document.body.appendChild(toastEl);
    setTimeout(() => toastEl.remove(), 3000);
  };

  const searchApps = async () => {
    if (!query.trim()) {
      toast("⚠️ Please enter a search App");
      return;
    }

    setLoading(true);

    try {
      const apps = await fetchApps(query);
      setResults(apps.length ? apps : demoApps);
      if (!apps.length) {
        toast("No results found. Showing popular apps.");
      }
    } catch (error) {
      console.error(error);
      setResults(demoApps);
      toast("❌ Failed to fetch results. Showing demo apps.");
    } finally {
      setLoading(false);
    }
  };

  const features = [
    {
      icon: Zap,
      title: "Lightning Fast",
      description:
        "Get instant search results from the App Store in milliseconds.",
      gradient: "from-yellow-400 to-orange-500",
    },
    {
      icon: Shield,
      title: "Safe & Secure",
      description: "No login required. Your privacy is our priority.",
      gradient: "from-green-400 to-emerald-600",
    },
    {
      icon: Globe,
      title: "Global Discovery",
      description: "Find apps from all around the world in one place.",
      gradient: "from-blue-400 to-cyan-600",
    },
  ];

  return (
    <div className="min-h-screenbg-(--background)">
      <div className="max-w-7xl mx-auto px-4 py-6 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="mb-16 text-center">
          <h1 className="heading text-center pt-5 animate-fade-up">Find Your Mobile App</h1>
          <p className="description text-center pt-2 animate-fade-up">
            Search for your favorite apps and discover new ones.
          </p>
        </div>

        {/* Search Bar */}
        <div className="mb-16 max-w-3xl mx-auto">
          <SearchBar
            query={query}
            setQuery={setQuery}
            onSearch={searchApps}
            loading={loading}
          />
        </div>

        {/* Features Grid */}
        <div className=" m-4 grid grid-cols-1 md:grid-cols-3 gap-6 mb-16">
          {features.map((feature, index) => (
            <FeatureCard key={index} {...feature} />
          ))}
        </div>

        {/* Results Section */}
        <div className=" rounded-3xl shadow-lg border-2 border-(--border) p-8 md:p-12">
          <div className="flex items-center justify-between mb-8">
            <h2 className="subheading">
              {loading
                ? "Searching..."
                : query
                  ? "Search Results"
                  : "Popular Apps"}
            </h2>
            <span className="px-4 py-2 bg-blue-100 text-blue-700 rounded-full text-sm font-medium">
              {results.length} Apps
            </span>
          </div>

          {loading ? (
            <div className="flex flex-col justify-center items-center h-64 space-y-4">
              <div className="animate-spin rounded-full h-16 w-16 border-4 border-blue-500 border-t-transparent"></div>
              <p className="text-gray-500 font-medium">
                Finding the best apps for you...
              </p>
            </div>
          ) : (
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {results.map((app, index) => (
                <AppCard key={index} app={app} short={truncateText} />
              ))}
            </div>
          )}
        </div>

        
      </div>
      <Features/>
    </div>
  );
}
