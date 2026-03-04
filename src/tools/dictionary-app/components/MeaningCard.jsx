// export default function MeaningCard({ entry }) {
//   return (
//     <div className="p-4 sm:p-5 bg-(--background) text-(--foreground) rounded-lg shadow mb-4 border border-(--border) w-full">
//       {entry.meanings.map((meaning, idx) => (
//         <div key={idx} className="mb-3 last:mb-0">
//           <p className="font-semibold text-sm sm:text-base uppercase tracking-wide text-(--primary) mb-1">
//             {meaning.partOfSpeech}
//           </p>
//           {meaning.definitions.map((def, i) => (
//             <p key={i} className="text-sm sm:text-base leading-relaxed pl-2 sm:pl-3 border-l-2 border-(--border) mb-1">
//               {def.definition}
//             </p>
//           ))}
//         </div>
//       ))}
//     </div>
//   );
// }

import { useState,useEffect } from "react";

async function translateToHindi(text) {
  try {
    const res = await fetch(
      `https://api.mymemory.translated.net/get?q=${encodeURIComponent(text)}&langpair=en|hi`
    );
    const data = await res.json();
    return data?.responseData?.translatedText || null;
  } catch {
    return null;
  }
}

function DefinitionRow({ definition }) {
  const [hindi, setHindi] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showHindi, setShowHindi] = useState(false);


   // Reset translation whenever the definition changes (new word searched)
  useEffect(() => {
    setHindi(null);
    setShowHindi(false);
    setLoading(false);
  }, [definition]);

  const handleToggle = async () => {
    if (!showHindi && !hindi) {
      setLoading(true);
      const translated = await translateToHindi(definition);
      setHindi(translated);
      setLoading(false);
    }
    setShowHindi((prev) => !prev);
  };

  return (
    <div className="mb-2 pl-2 sm:pl-3 border-l-2 border-(--border)">
      <p className="text-sm sm:text-base leading-relaxed">{definition}</p>

      {showHindi && hindi && (
        <p className="text-sm sm:text-base leading-relaxed mt-1 text-orange-600 font-medium">
          🇮🇳 {hindi}
        </p>
      )}
      {loading && (
        <p className="text-xs text-gray-400 mt-1 italic">Translating...</p>
      )}

      <button
        onClick={handleToggle}
        className="mt-1 text-xs text-indigo-500 hover:text-indigo-700 underline cursor-pointer transition"
      >
        {loading ? "..." : showHindi ? "Hide Hindi" : "Show Hindi meaning"}
      </button>
    </div>
  );
}

export default function MeaningCard({ entry }) {
  return (
    <div className="p-4 sm:p-5 bg-(--background) text-(--foreground) rounded-lg shadow mb-4 border border-(--border) w-full">
      {entry.meanings.map((meaning, idx) => (
        <div key={idx} className="mb-4 last:mb-0">
          <p className="font-semibold text-sm sm:text-base uppercase tracking-wide text-(--primary) mb-2">
            {meaning.partOfSpeech}
          </p>
          {meaning.definitions.map((def, i) => (
            <DefinitionRow key={i} definition={def.definition} />
          ))}
        </div>
      ))}
    </div>
  );
}