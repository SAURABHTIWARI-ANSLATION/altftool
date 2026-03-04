// "use client";

// import React, { useState } from "react";
// import {
//   Building2,
//   Search,
//   Globe,
//   ExternalLink,
//   Loader2,
// } from "lucide-react";



// export default function ToolHome() {
//   const [companyName, setCompanyName] = useState("");
//   const [companyInfo, setCompanyInfo] = useState(null);
//   const [loading, setLoading] = useState(false);
//   const [error, setError] = useState("");

//   const safeValue = (value) => {
//     if (value === null || value === undefined) return "N/A";
//     if (typeof value === "string" || typeof value === "number") return value;
//     return JSON.stringify(value, null, 2);
//   };

//   const searchCompany = async () => {
//     if (!companyName.trim()) {
//       setError("Please enter a company name");
//       return;
//     }

//     setLoading(true);
//     setError("");
//     setCompanyInfo(null);

//     try {
//       const query = encodeURIComponent(companyName);
//       const apiUrl = `https://api.allorigins.win/get?url=${encodeURIComponent(
//         `https://api.duckduckgo.com/?q=${query}&format=json&no_html=1&skip_disambig=1`
//       )}`;

//       const res = await fetch(apiUrl);
//       const proxyData = await res.json();
//       const data = JSON.parse(proxyData.contents);

//       const info = {
//         name: data.Heading || companyName,
//         description:
//           data.AbstractText || data.Abstract || "No description available",
//         source: data.AbstractSource || "Unknown",
//         url: data.AbstractURL || "",
//         relatedTopics: [],
//         infobox: null,
//       };

//       if (Array.isArray(data.RelatedTopics)) {
//         info.relatedTopics = data.RelatedTopics.flatMap((item) => {
//           if (item.Text) return [item];
//           if (item.Topics) return item.Topics;
//           return [];
//         });
//       }

//       if (data.Infobox && Array.isArray(data.Infobox.content)) {
//         info.infobox = {
//           content: data.Infobox.content.map((i) => ({
//             label: i.label || "Info",
//             value: i.value,
//           })),
//         };
//       }

//       setCompanyInfo(info);
//     } catch (e) {
//       console.error(e);
//       setError("Failed to fetch company information");
//     } finally {
//       setLoading(false);
//     }
//   };

//   return (
//     <div className="max-w-5xl mx-auto p-4 space-y-6">
//       {/* Header */}
//       <div className=" pt-2 p-8  ">
//         <h1 className="heading text-center animat-fade-up pt-5">Company Info Finder</h1>
//         <p className="description text-center animate-fade-up pt-2">
//           Search any company and get instant details.
//         </p>
//       </div>

//       {/* Search */}
//       <div className="border border-(--border) rounded-lg p-6 space-y-4">
//         <div className="flex flex-col sm:flex-row gap-3">
//           <input
//             type="text"
//             value={companyName}
//             onChange={(e) => setCompanyName(e.target.value)}
//             placeholder="Enter company name (e.g. Google)"
//             className="flex-1 border border-(--border) rounded-md px-4 py-2 "
//           />

//           <button
//             onClick={searchCompany}
//             disabled={loading}
//             className="flex items-center justify-center gap-2 px-6 py-2 rounded-md bg-(--primary) text-white "
//           >
//             {loading ? (
//               <>
//                 <Loader2 className="w-4 h-4 animate-spin" />
//                 Searching
//               </>
//             ) : (
//               <>
//                 <Search className="w-4 h-4" />
//                 Search
//               </>
//             )}
//           </button>
//         </div>
//       </div>

//       {/* Error */}
//       {error && (
//         <div className="border border-red-300 bg-red-50 text-red-700 p-4 rounded-md">
//           {error}
//         </div>
//       )}

//       {/* Result */}
//       {companyInfo && (
//         <div className="space-y-6">
//           <div className="border rounded-lg p-6">
//             <h2 className="text-2xl font-bold">{companyInfo.name}</h2>
//             <p className="text-(--foreground)  mt-2">
//               {companyInfo.description}
//             </p>

//             <p className="flex items-center gap-2 text-sm mt-4">
//               <Globe className="w-4 h-4" />
//               Source: {companyInfo.source}
//             </p>

//             {companyInfo.url && (
//               <a
//                 href={companyInfo.url}
//                 target="_blank"
//                 rel="noreferrer"
//                 className="inline-flex items-center gap-2 mt-4 text-(--primary) hover:underline"
//               >
//                 Learn More <ExternalLink className="w-4 h-4" />
//               </a>
//             )}
//           </div>

//           {/* Infobox */}
//           {companyInfo.infobox?.content?.length > 0 && (
//             <div className="border rounded-lg p-6">
//               <h3 className="text-lg font-semibold mb-4">
//                 Company Details
//               </h3>

//               <div className="grid md:grid-cols-2 gap-4">
//                 {companyInfo.infobox.content.map((item, i) => (
//                   <div key={i} className="bg-(--card) -4 rounded text-center">
//                     <p className="font-semibold">{item.label}</p>
//                     <p className="text-sm text-(--muted-foreground)">
//                       {safeValue(item.value)}
//                     </p>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       )}

//       {/* Empty State */}
//       {!loading && !companyInfo && !error && (
//         <div className="border border-(--border) rounded-lg p-10 text-center">
//           <Building2 className="w-10 h-10 mx-auto mb-3 text-(--muted-foreground)" />
//           <p className="text-(--foreground)">
//             Enter a company name to search
//           </p>
//         </div>
//       )}

    
//     </div>
//   );
// };

"use client";

import React, { useState } from "react";
import {
  Building2,
  Search,
  Globe,
  ExternalLink,
  Loader2,
} from "lucide-react";
import Features from "../components/Features";

export default function ToolHome() {
  const [companyName, setCompanyName] = useState("");
  const [companyInfo, setCompanyInfo] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const safeValue = (value) => {
    if (value === null || value === undefined) return "N/A";
    if (typeof value === "string" || typeof value === "number") return value;
    if (Array.isArray(value)) {
      return value.map(v => v.text || v).join(', ');
    }
    if (typeof value === "object") {
      return value.text || value.value || JSON.stringify(value, null, 2);
    }
    return JSON.stringify(value, null, 2);
  };

  const searchCompany = async () => {
    if (!companyName.trim()) {
      setError("Please enter a company name");
      return;
    }

    setLoading(true);
    setError("");
    setCompanyInfo(null);

    try {
      const query = encodeURIComponent(companyName);
      
      // Try multiple proxy services for reliability
      const proxyUrls = [
        `https://api.allorigins.win/raw?url=${encodeURIComponent(
          `https://api.duckduckgo.com/?q=${query}&format=json&no_html=1&skip_disambig=1`
        )}`,
        `https://corsproxy.io/?${encodeURIComponent(
          `https://api.duckduckgo.com/?q=${query}&format=json&no_html=1&skip_disambig=1`
        )}`,
        `https://cors-anywhere.herokuapp.com/https://api.duckduckgo.com/?q=${query}&format=json&no_html=1&skip_disambig=1`
      ];

      let data = null;
      let lastError = null;

      // Try each proxy until one works
      for (const proxyUrl of proxyUrls) {
        try {
          const res = await fetch(proxyUrl, {
            headers: {
              'Origin': window.location.origin
            }
          });
          
          if (!res.ok) continue;
          
          data = await res.json();
          if (data) break; // Successfully got data
        } catch (e) {
          lastError = e;
          continue; // Try next proxy
        }
      }

      if (!data) {
        throw new Error(lastError || "Failed to fetch company information");
      }

      const info = {
        name: data.Heading || companyName,
        description: data.AbstractText || data.Abstract || "No description available",
        source: data.AbstractSource || "DuckDuckGo",
        url: data.AbstractURL || "",
        relatedTopics: [],
        infobox: null,
        image: data.Image || "",
        type: data.Type || "",
        definition: data.Definition || "",
      };

      // Process related topics
      if (Array.isArray(data.RelatedTopics)) {
        info.relatedTopics = data.RelatedTopics.flatMap((item) => {
          if (item.Text) return [{ text: item.Text, url: item.FirstURL }];
          if (item.Topics) return item.Topics.map(t => ({ text: t.Text, url: t.FirstURL }));
          return [];
        }).slice(0, 10); // Limit to 10 related topics
      }

      // Process infobox
      if (data.Infobox && Array.isArray(data.Infobox.content)) {
        info.infobox = {
          content: data.Infobox.content.map((item) => ({
            label: item.label || "Info",
            value: item.value,
            wiki_order: item.wiki_order,
          })).filter(item => item.value) // Remove empty values
        };
      }

      // Process infobox meta data
      if (data.Infobox && data.Infobox.meta) {
        info.infoboxMeta = data.Infobox.meta;
      }

      setCompanyInfo(info);
    } catch (e) {
      console.error("Search error:", e);
      setError("Failed to fetch company information. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  // Helper to render infobox value properly
  const renderInfoboxValue = (value) => {
    if (!value) return "N/A";
    
    if (Array.isArray(value)) {
      return (
        <div className="space-y-1">
          {value.map((item, idx) => (
            <div key={idx}>
              {typeof item === 'object' ? (
                <div>
                  {item.text && <span>{item.text}</span>}
                  {item.url && (
                    <a href={item.url} target="_blank" rel="noopener noreferrer" 
                       className="ml-1 text-(--primary) hover:underline inline-flex items-center gap-0.5">
                      (Link) <ExternalLink className="w-3 h-3" />
                    </a>
                  )}
                </div>
              ) : (
                <span>{String(item)}</span>
              )}
            </div>
          ))}
        </div>
      );
    }
    
    if (typeof value === 'object' && value !== null) {
      if (value.url) {
        return (
          <a href={value.url} target="_blank" rel="noopener noreferrer" 
             className="text-(--primary) hover:underline inline-flex items-center gap-1">
            {value.text || 'Link'} <ExternalLink className="w-3 h-3" />
          </a>
        );
      }
      return safeValue(value);
    }
    
    return safeValue(value);
  };

  return (
    <div className="max-w-5xl mx-auto p-4 space-y-6">
      {/* Header */}
      <div className="pt-2 p-8">
        <h1 className="heading text-center animate-fade-up">Company Info Finder</h1>
        <p className="description text-center animate-fade-up pt-2">
          Search any company and get instant details from DuckDuckGo.
        </p>
      </div>

      {/* Search */}
      <div className="border border-(--border) shadow-lg rounded-lg p-6 space-y-4">
        <div className="flex flex-col sm:flex-row gap-3">
          <input
            type="text"
            value={companyName}
            onChange={(e) => setCompanyName(e.target.value)}
            placeholder="Enter company name (e.g. Google, Microsoft, Apple)"
            className="flex-1 border border-(--border) bg-(--card) rounded-md px-4 py-2 focus:outline-none focus:ring-1 focus:ring-(--primary)"
            onKeyPress={(e) => e.key === 'Enter' && searchCompany()}
          />

          <button
            onClick={searchCompany}
            disabled={loading}
            className="flex cursor-pointer items-center justify-center gap-2 px-6 py-2 rounded-md bg-(--primary) text-white hover:bg-(--primary)/90 transition-colors disabled:opacity-50"
          >
            {loading ? (
              <>
                <Loader2 className="w-4 h-4 animate-spin" />
                Searching...
              </>
            ) : (
              <>
                <Search className="w-4 h-4" />
                Search
              </>
            )}
          </button>
        </div>
      </div>

      {/* Error */}
      {error && (
        <div className="border border-red-300 bg-red-50 dark:bg-red-900/20 text-red-700 dark:text-red-300 p-4 rounded-md">
          {error}
        </div>
      )}

      {/* Result */}
      {companyInfo && (
        <div className="space-y-6">
          {/* Main Info */}
          <div className="border rounded-lg p-6">
            <h2 className="text-2xl font-bold">{companyInfo.name}</h2>
            
            {companyInfo.description !== "No description available" && (
              <p className="text-(--foreground) mt-4 leading-relaxed">
                {companyInfo.description}
              </p>
            )}

            <div className="flex flex-wrap items-center gap-4 mt-6">
              <p className="flex items-center gap-2 text-sm text-(--muted-foreground)">
                <Globe className="w-4 h-4" />
                Source: {companyInfo.source}
              </p>

              {companyInfo.type && (
                <span className="px-3 py-1 bg-(--card) text-sm rounded-full">
                  {companyInfo.type}
                </span>
              )}
            </div>

            {companyInfo.url && (
              <a
                href={companyInfo.url}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-2 mt-6 text-(--primary) hover:underline"
              >
                Read full article on DuckDuckGo <ExternalLink className="w-4 h-4" />
              </a>
            )}
          </div>

          {/* Infobox */}
          {companyInfo.infobox?.content?.length > 0 && (
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">
                Company Details
              </h3>

              <div className="grid md:grid-cols-2 gap-6">
                {companyInfo.infobox.content.map((item, i) => (
                  <div key={i} className="space-y-1">
                    <p className="text-sm font-medium text-(--muted-foreground) uppercase tracking-wider">
                      {item.label}
                    </p>
                    <div className="text-base">
                      {renderInfoboxValue(item.value)}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Related Topics */}
          {companyInfo.relatedTopics?.length > 0 && (
            <div className="border rounded-lg p-6">
              <h3 className="text-lg font-semibold mb-4">Related Topics</h3>
              <div className="grid sm:grid-cols-2 gap-3">
                {companyInfo.relatedTopics.map((topic, i) => (
                  topic.url ? (
                    <a
                      key={i}
                      href={topic.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="p-3 bg-(--card) rounded hover:bg-(--card)/80 transition-colors flex items-center justify-between group"
                    >
                      <span className="text-sm">{topic.text}</span>
                      <ExternalLink className="w-3 h-3 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </a>
                  ) : (
                    <div key={i} className="p-3 bg-(--card) rounded text-sm">
                      {topic.text}
                    </div>
                  )
                ))}
              </div>
            </div>
          )}
        </div>
      )}

      {/* Empty State */}
      {!loading && !companyInfo && !error && (
        <div className="border border-(--border) shadow-lg rounded-lg p-12 text-center">
          <Building2 className="w-12 h-12 mx-auto mb-4 text-(--muted-foreground)" />
          <p className="text-(--foreground) text-lg mb-2">
            Enter a company name to search
          </p>
          <p className="text-sm text-(--muted-foreground)">
            Try searching for Google, Microsoft, Apple, or any other company
          </p>
        </div>
      )}
      <Features/>
    </div>
  );
};

