export default function ResultHeader({ word, onSpeak }) {
  return (
    <div className="flex items-center gap-3 sm:gap-4 mb-4 p-4 sm:p-6 mx-0">
      <h2 className="text-2xl sm:text-3xl lg:text-4xl font-bold break-all">{word}</h2>
      <button
        onClick={() => onSpeak(word)}
        className="cursor-pointer text-xl sm:text-2xl shrink-0"
        aria-label="Listen to pronunciation"
      >
        🔊 <span className="text-sm sm:text-base font-medium">Listen</span>
      </button>
    </div>
  );
}