 "use client"


import { useState, useCallback } from "react";
import {
  LineChart,
  Line,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
} from "recharts";
import Header from "../components/Header";
import Features from "../components/Features";

// ─── Helpers ────

/**
 * BP Classification (per AHA + Cleveland Clinic guidelines):
 *
 * Severe Hypotension  : systolic < 70  OR  diastolic < 40   → life-threatening low
 * Low Blood Pressure  : systolic < 90  OR  diastolic < 60   → hypotension
 * Normal              : systolic < 120 AND diastolic < 80
 * Elevated            : systolic 120-129 AND diastolic < 80
 * Stage 1 Hypertension: systolic 130-139 OR  diastolic 80-89
 * Stage 2 Hypertension: systolic >= 140  OR  diastolic >= 90
 */
const getStatusKey = (systolic, diastolic) => {
  if (systolic < 70 || diastolic < 40) return "crisis-low";
  if (systolic < 90 || diastolic < 60) return "low";
  if (systolic < 120 && diastolic < 80) return "normal";
  if (systolic < 130 && diastolic < 80) return "elevated";
  if (systolic < 140 || diastolic < 90) return "stage1";
  return "stage2";
};

const STATUS_META = {
  "crisis-low": {
    label: "Severe Hypotension",
    badge: "bg-purple-100 text-purple-700 border-purple-200",
    card:  "bg-purple-50 border-purple-200",
    dot:   "#9333ea",
    tip:   "Critically low — seek emergency medical care immediately. This reading can indicate shock or organ failure.",
    urgent: true,
  },
  low: {
    label: "Low Blood Pressure",
    badge: "bg-blue-100 text-blue-700 border-blue-200",
    card:  "bg-blue-50 border-blue-200",
    dot:   "#3b82f6",
    tip:   "Your reading is below the normal threshold (90/60 mmHg). If you feel dizzy or faint, sit or lie down and consult a doctor.",
    urgent: false,
  },
  normal: {
    label: "Normal",
    badge: "bg-emerald-100 text-emerald-700 border-emerald-200",
    card:  "bg-emerald-50 border-emerald-200",
    dot:   "#10b981",
    tip:   "Great! Your blood pressure is in a healthy range. Keep it up with regular exercise and a balanced diet.",
    urgent: false,
  },
  elevated: {
    label: "Elevated",
    badge: "bg-amber-100 text-amber-700 border-amber-200",
    card:  "bg-amber-50 border-amber-200",
    dot:   "#f59e0b",
    tip:   "Your reading is slightly above normal. Consider reducing sodium intake and increasing physical activity.",
    urgent: false,
  },
  stage1: {
    label: "Stage 1 Hypertension",
    badge: "bg-orange-100 text-orange-700 border-orange-200",
    card:  "bg-orange-50 border-orange-200",
    dot:   "#f97316",
    tip:   "Consult your doctor. Lifestyle changes (diet, exercise, stress reduction) and possibly medication may be needed.",
    urgent: false,
  },
  stage2: {
    label: "Stage 2 Hypertension",
    badge: "bg-red-100 text-red-700 border-red-200",
    card:  "bg-red-50 border-red-200",
    dot:   "#ef4444",
    tip:   "Seek medical attention promptly. This level requires immediate evaluation and likely medication.",
    urgent: true,
  },
};

// ─── Custom Tooltip ────────

const CustomTooltip = ({ active, payload, label }) => {
  if (!active || !payload || !payload.length) return null;
  return (
    <div className="bg-white border border-gray-200 rounded-xl shadow-lg px-4 py-3 text-sm">
      <p className="font-semibold text-gray-700 mb-1">{label}</p>
      {payload.map((p) => (
        <p key={p.dataKey} style={{ color: p.stroke }}>
          {p.dataKey === "systolic" ? "Systolic" : "Diastolic"}:{" "}
          <span className="font-bold">{p.value}</span> mmHg
        </p>
      ))}
    </div>
  );
};

// ─── ReadingForm ───────

function ReadingForm({ onAddReading }) {
  const [systolic, setSystolic]   = useState("");
  const [diastolic, setDiastolic] = useState("");
  const [error, setError]         = useState("");
  const [shake, setShake]         = useState(false);

  const triggerShake = () => {
    setShake(true);
    setTimeout(() => setShake(false), 600);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setError("");

    if (!systolic || !diastolic) {
      setError("Please enter both systolic and diastolic readings.");
      triggerShake();
      return;
    }

    const sys  = parseInt(systolic, 10);
    const dias = parseInt(diastolic, 10);

    if (isNaN(sys) || isNaN(dias)) {
      setError("Please enter valid numbers.");
      triggerShake();
      return;
    }

    if (sys < 40 || sys > 300) {
      setError("Systolic must be between 40 and 300 mmHg.");
      triggerShake();
      return;
    }

    if (dias < 20 || dias > 200) {
      setError("Diastolic must be between 20 and 200 mmHg.");
      triggerShake();
      return;
    }

    if (dias >= sys) {
      setError("Diastolic must be lower than systolic pressure.");
      triggerShake();
      return;
    }

    onAddReading(sys, dias);
    setSystolic("");
    setDiastolic("");
  };

  const fields = [
    { label: "Systolic",  value: systolic,  set: setSystolic,  placeholder: "120", min: 40,  max: 300 },
    { label: "Diastolic", value: diastolic, set: setDiastolic, placeholder: "80",  min: 20,  max: 200 },
  ];

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
        New Reading
      </h2>
      <form onSubmit={handleSubmit} className="space-y-4" noValidate>
        <div className="grid grid-cols-2 gap-4">
          {fields.map(({ label, value, set, placeholder, min, max }) => (
            <div key={label}>
              <label className="block text-xs font-semibold text-gray-500 uppercase tracking-wide mb-1">
                {label}
              </label>
              <div className="relative">
                <input
                  type="number"
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  placeholder={placeholder}
                  min={min}
                  max={max}
                  className="w-full bg-(--background) border border-gray-200 rounded-xl px-3 py-2.5 pr-14 text-(--mute-foreground) text-sm focus:outline-none focus:ring-2 focus:ring-(--primary) focus:border-transparent transition"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-(--muted-foreground) font-medium pointer-events-none">
                  mmHg
                </span>
              </div>
            </div>
          ))}
        </div>

        {error && (
          <div className={`text-red-600 text-xs font-medium bg-red-50 border border-red-100 rounded-lg px-3 py-2 ${shake ? "animate-bounce" : ""}`}>
            {error}
          </div>
        )}

        <button
          type="submit"
          className="w-full bg-(--primary) hover:opacity-90 active:bg-(--primary) text-white text-sm font-semibold py-2.5 rounded-xl transition-colors duration-150 cursor-pointer shadow-sm"
        >
          Log Reading
        </button>
      </form>
    </div>
  );
}

// ─── StatusCard ──────

function StatusCard({ reading }) {
  if (!reading) {
    return (
      <div className="border border-dashed border-gray-200 rounded-2xl p-6 text-center text-gray-400 text-sm">
        Add a reading to see your status
      </div>
    );
  }

  const key  = getStatusKey(reading.systolic, reading.diastolic);
  const meta = STATUS_META[key];

  return (
    <div className={`border ${meta.card} rounded-2xl p-5`}>
      <div className="flex items-center justify-between mb-3">
        <span className="text-xs font-semibold text-gray-500 uppercase tracking-wide">Current Status</span>
        <span className={`text-xs font-bold px-2.5 py-1 rounded-full border ${meta.badge}`}>
          {meta.label}
        </span>
      </div>
      <div className="text-3xl font-bold text-gray-800 mb-1">
        {reading.systolic}
        <span className="text-gray-400 font-normal text-xl">/</span>
        {reading.diastolic}
        <span className="text-sm font-normal text-gray-400 ml-1">mmHg</span>
      </div>
      {meta.urgent && (
        <div className="mt-2 mb-2 text-xs font-semibold text-white bg-red-500 rounded-lg px-3 py-1.5 inline-block">
          Urgent — seek medical attention
        </div>
      )}
      <p className="text-xs text-gray-600 mt-1 leading-relaxed">{meta.tip}</p>
    </div>
  );
}

// ─── PressureChart ──────
function PressureChart({ readings }) {
  if (!readings || readings.length === 0) {
    return (
      <div className="h-60 flex items-center justify-center text-gray-400 text-sm">
        No readings yet — add some to see your trend
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={readings} margin={{ top: 5, right: 10, left: -10, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis dataKey="time" tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <YAxis domain={["auto", "auto"]} tick={{ fontSize: 11, fill: "#9ca3af" }} axisLine={false} tickLine={false} />
          <Tooltip content={<CustomTooltip />} />
          <Legend
            wrapperStyle={{ fontSize: "12px", paddingTop: "8px" }}
            formatter={(value) => (value === "systolic" ? "Systolic" : "Diastolic")}
          />
          <Line type="monotone" dataKey="systolic"  stroke="#f43f5e" strokeWidth={2.5} dot={{ r: 4, fill: "#f43f5e", strokeWidth: 0 }} activeDot={{ r: 6 }} />
          <Line type="monotone" dataKey="diastolic" stroke="#0ea5e9" strokeWidth={2.5} dot={{ r: 4, fill: "#0ea5e9", strokeWidth: 0 }} activeDot={{ r: 6 }} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

// ─── HistoryList ──────

function HistoryList({ readings, onClear }) {
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

// ─── BP Reference Table ─────

function BPReference() {
  const ranges = [
    { label: "Severe Hypotension",   systolic: "< 70",    diastolic: "< 40",   color: "bg-purple-100 text-purple-700" },
    { label: "Low Blood Pressure",   systolic: "< 90",    diastolic: "< 60",   color: "bg-blue-100 text-blue-700" },
    { label: "Normal",               systolic: "< 120",   diastolic: "< 80",   color: "bg-emerald-100 text-emerald-700" },
    { label: "Elevated",             systolic: "120-129", diastolic: "< 80",   color: "bg-amber-100 text-amber-700" },
    { label: "Stage 1 Hypertension", systolic: "130-139", diastolic: "80-89",  color: "bg-orange-100 text-orange-700" },
    { label: "Stage 2 Hypertension", systolic: ">= 140",  diastolic: ">= 90",  color: "bg-red-100 text-red-700" },
  ];

  return (
    <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
      <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
        <span className="w-2 h-2 rounded-full bg-violet-500 inline-block" />
        BP Reference Guide
      </h2>
      <table className="w-full text-xs">
        <thead>
          <tr className="text-gray-400 uppercase tracking-wide border-b border-gray-100">
            <th className="text-left pb-2 font-semibold">Category</th>
            <th className="text-center pb-2 font-semibold">Systolic</th>
            <th className="text-center pb-2 font-semibold">Diastolic</th>
          </tr>
        </thead>
        <tbody>
          {ranges.map((r) => (
            <tr key={r.label} className="border-b border-gray-50 hover:bg-gray-50 transition-colors">
              <td className="py-2">
                <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${r.color}`}>
                  {r.label}
                </span>
              </td>
              <td className="py-2 text-center font-medium text-gray-600">{r.systolic}</td>
              <td className="py-2 text-center font-medium text-gray-600">{r.diastolic}</td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// ─── Main App ─────

export default function BloodPressureChecker() {
  const [readings, setReadings] = useState([]);

  const addReading = useCallback((sys, dias) => {
    const now = new Date();
    setReadings((prev) => [
      ...prev,
      {
        id:        Date.now(),
        time:      now.toLocaleTimeString("en-US", { hour: "2-digit", minute: "2-digit" }),
        date:      now.toLocaleDateString("en-US", { month: "short", day: "numeric" }),
        systolic:  sys,
        diastolic: dias,
      },
    ]);
  }, []);

  const clearHistory = useCallback(() => setReadings([]), []);
  const lastReading  = readings.length > 0 ? readings[readings.length - 1] : null;

  return (
    <div className="min-h-screen bg-(background) font-sans">
      {/* Header */}
      <Header/>

      <main className="max-w-6xl mx-auto px-4 py-8 space-y-6">
        <div className="grid md:grid-cols-2 gap-6">
          <div className="space-y-4">
            <ReadingForm onAddReading={addReading} />
            <StatusCard reading={lastReading} />
            <BPReference />
          </div>
          <div className="space-y-4">
            <div className="bg-white border border-gray-200 shadow-sm rounded-2xl p-6">
              <h2 className="text-base font-semibold text-gray-800 mb-4 flex items-center gap-2">
                <span className="w-2 h-2 rounded-full bg-rose-500 inline-block" />
                Pressure Trend
              </h2>
              <PressureChart readings={readings} />
            </div>
            <HistoryList readings={readings} onClear={clearHistory} />
          </div>
        </div>
        <Features/>
      </main>

      <footer className="text-center py-8 text-xs text-gray-400 border-t border-gray-100 ">
        <p>For informational purposes only. Always consult a healthcare professional for medical advice.</p>
      </footer>
    </div>
  );
}
