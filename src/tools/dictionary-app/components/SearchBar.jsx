export default function SearchBar({ word, setWord, loading, onSearch }) {
  return (
    <div className="mx-4 sm:mx-6 lg:mx-8 border border-(--border) rounded-lg p-4 sm:p-6 shadow-md">
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center">
        <input
          value={word}
          onChange={(e) => setWord(e.target.value)}
          placeholder="Search for a word..."
          className="flex-1 p-3 sm:p-4 border border-(--border) rounded-md text-sm sm:text-base w-full"
        />
        <button
          onClick={() => onSearch(word)}
          disabled={loading}
          className="px-6 py-3 sm:py-4 bg-(--primary) text-white rounded-md cursor-pointer transition text-sm sm:text-base font-medium whitespace-nowrap disabled:opacity-60"
        >
          {loading ? "Searching..." : "Search"}
        </button>
      </div>
    </div>
  );
}