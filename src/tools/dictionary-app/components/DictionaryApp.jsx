"use client";
import React from "react";

import { fetchDictionaryData } from "../utils/api.js";
import { speakWord } from "../utils/speech.js";

import SearchBar from "./SearchBar.jsx";
import ResultHeader from "./ResultHeader.jsx";
import MeaningCard from "./MeaningCard.jsx";
import Synonyms from "./Synonyms.jsx";
import Antonyms from "./Antonyms.jsx";
import ExplorePage from "./ExplorePage.jsx";

export default function DictionaryApp() {
  const [word, setWord] = React.useState("");
  const [results, setResults] = React.useState(null);
  const [loading, setLoading] = React.useState(false);
  const [error, setError] = React.useState(null);

  const handleSearch = async (searchWord) => {
    if (!searchWord) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchDictionaryData(searchWord);
      setResults(data);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  React.useEffect(() => {
    const handleKeyPress = (e) => {
      if (e.key === "Enter") handleSearch(word);
    };
    window.addEventListener("keypress", handleKeyPress);
    return () => window.removeEventListener("keypress", handleKeyPress);
  }, [word]);

  const handleRefresh = () => {
    setWord("");
    setResults(null);
    setError(null);
    setLoading(false);
  };

  return (
    <div className="w-full max-w-4xl mx-auto bg-(--background) text-(--foreground) rounded-xl shadow-lg py-4 sm:py-6 mb-8">
      <h1 className="heading text-center pt-4 sm:pt-5 mb-3 sm:mb-4 animate-fade-up px-4">
        Dictionary App
      </h1>
      <p className="description text-center mb-4 sm:mb-6 animate-fade-up px-4">
        Search for definitions, synonyms, and antonyms of any word.
      </p>

      <div className="my-6 sm:my-10 lg:my-15">
        <SearchBar
          word={word}
          setWord={setWord}
          loading={loading}
          onSearch={handleSearch}
        />

        {!results && !loading && !error && <ExplorePage />}

        {error && (
          <p className="text-red-500 mb-4 px-4 sm:px-6 text-sm sm:text-base">
            Error: {error}
          </p>
        )}
        {loading && (
          <p className="text-blue-500 mb-4 px-4 sm:px-6 text-sm sm:text-base">
            Loading...
          </p>
        )}

        {results && (
          <>
            <ResultHeader word={word} onSpeak={speakWord} />

            <div className="px-4 sm:px-6">
              {results.dict.map((entry, idx) => (
                <MeaningCard key={idx} entry={entry} />
              ))}
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6 mt-6 sm:mt-8 px-4 sm:px-6">
              <Synonyms
                data={results.syn}
                setWord={setWord}
                onSearch={handleSearch}
              />
              <Antonyms
                data={results.ant}
                setWord={setWord}
                onSearch={handleSearch}
              />
            </div>

            <div className="flex justify-end mb-4 py-4 px-4 sm:px-6">
              <button
                onClick={handleRefresh}
                className="px-4 py-2 rounded-lg bg-(--primary) text-white font-semibold cursor-pointer transition text-sm sm:text-base"
              >
                Refresh
              </button>
            </div>
          </>
        )}
      </div>
    </div>
  );
}