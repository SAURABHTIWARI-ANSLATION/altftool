// import { getStatusColor, statusColorMap } from "../utils/helpers";

// export default function HistoryList({ readings, onClear }) {
//   return (
//     <div className="bg-(--background)  border border-(--border) shadow-md rounded-lg p-4 space-y-2">
//       <div className="flex justify-between items-center mb-2">
//         <h2 className="text-lg font-semibold text-(--foreground)">Reading History</h2>
//         <button
//           onClick={onClear}
//           className="bg-(--background) text-red-500 px-3 py-1 rounded-md border border-red-500 transition cursor-pointer"
//         >
//           Clear History
//         </button>
//       </div>

//       <div className="space-y-2 max-h-64 overflow-y-auto">
//         {readings.length > 0 ? (
//           readings.map((r, i) => (
//             <div
//               key={i}
//               className="flex justify-between items-center border-b border-(--border) pb-2"
//             >
//               <div className="text-(--foreground) text-sm">
//                 <div>{r.time}</div>
//                 <div>{r.date}</div>
//               </div>
//               <div
//                 className={`px-3 py-1 rounded-md font-medium ${
//                   statusColorMap[getStatusColor(r.systolic, r.diastolic)]
//                 }`}
//               >
//                 {r.systolic}/{r.diastolic} mmHg
//               </div>
//             </div>
//           ))
//         ) : (
//           <p className="text-(--foreground) text-center mt-2">No readings yet</p>
//         )}
//       </div>
//     </div>
//   );
// }


// ─── HistoryList ─────────────────────────────────────────────────────────────

export default function HistoryList({ readings, onClear }) {
  const reversed = [...readings].reverse();

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-base font-semibold text-gray-800 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-sky-500 inline-block" />
          Reading History
          {readings.length > 0 && (
            <span className="text-xs font-medium text-gray-400 bg-gray-100 rounded-full px-2 py-0.5">
              {readings.length}
            </span>
          )}
        </h2>
        {readings.length > 0 && (
          <button
            onClick={onClear}
            className="text-xs text-red-500 hover:text-red-700 font-medium border border-red-200 hover:border-red-300 px-3 py-1 rounded-lg transition cursor-pointer"
          >
            Clear All
          </button>
        )}
      </div>

      <div className="space-y-2 max-h-60 overflow-y-auto pr-1">
        {reversed.length > 0 ? (
          reversed.map((r) => {
            const key  = getStatusKey(r.systolic, r.diastolic);
            const meta = STATUS_META[key];
            return (
              <div
                key={r.id}
                className="flex justify-between items-center rounded-xl px-3 py-2.5 bg-gray-50 hover:bg-gray-100 transition-colors"
              >
                <div className="text-xs text-gray-500">
                  <div className="font-medium text-gray-700">{r.time}</div>
                  <div>{r.date}</div>
                </div>
                <div className="flex items-center gap-2">
                  <span className="text-sm font-semibold text-gray-700">
                    {r.systolic}/{r.diastolic} mmHg
                  </span>
                  <span className={`text-xs font-medium px-2 py-0.5 rounded-full border ${meta.badge}`}>
                    {meta.label}
                  </span>
                </div>
              </div>
            );
          })
        ) : (
          <p className="text-gray-400 text-sm text-center py-4">No readings logged yet</p>
        )}
      </div>
    </div>
  );
}
