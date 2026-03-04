import React, { useState, useRef } from "react";
import FileUploader from "../components/FileUploader";
// import CSVPreview from "../components/CSVPreview";
import JSONOutput from "../components/JSONOutput";
import ActionButtons from "../components/ActionButton";
import Features from "../components/Features";

// ─── CSV Parser (inline — avoids dependency on external util) ────────────────
function parseCSV(csvText) {
  if (!csvText || typeof csvText !== "string" || !csvText.trim()) return [];

  // Normalize line endings
  const normalized = csvText.trim().replace(/\r\n/g, "\n").replace(/\r/g, "\n");
  const lines = normalized.split("\n").filter((l) => l.trim() !== "");

  if (lines.length < 2) return []; // Need at least header + 1 data row

  // Parse a single CSV line (handles quoted fields)
  const parseLine = (line) => {
    const result = [];
    let current = "";
    let inQuotes = false;

    for (let i = 0; i < line.length; i++) {
      const char = line[i];
      if (char === '"') {
        if (inQuotes && line[i + 1] === '"') {
          current += '"';
          i++;
        } else {
          inQuotes = !inQuotes;
        }
      } else if (char === "," && !inQuotes) {
        result.push(current.trim());
        current = "";
      } else {
        current += char;
      }
    }
    result.push(current.trim());
    return result;
  };

  const headers = parseLine(lines[0]);

  const rows = [];
  for (let i = 1; i < lines.length; i++) {
    const values = parseLine(lines[i]);
    if (values.length === 0 || (values.length === 1 && values[0] === "")) continue;
    const row = {};
    headers.forEach((header, idx) => {
      row[header] = values[idx] !== undefined ? values[idx] : "";
    });
    rows.push(row);
  }

  return rows;
}

function convertToJson(csvData) {
  return JSON.stringify(csvData, null, 2);
}
// ─────────────────────────────────────────────────────────────────────────────

export default function ToolHome() {
  const [csvData, setCsvData] = useState([]);
  const [jsonData, setJsonData] = useState("");
  const [fileName, setFileName] = useState("");
  const [resetKey, setResetKey] = useState(0);
  const fileInputRef = useRef(null);

  const handleFileUpload = (fileContent) => {
    if (!fileContent || !fileContent.trim()) {
      setCsvData([]);
      setJsonData("");
      return;
    }
    const parsedData = parseCSV(fileContent);
    setCsvData(parsedData);
    setJsonData(""); // Reset JSON output when new data comes in
  };

  const handleConvert = () => {
    if (csvData.length === 0) return;
    const json = convertToJson(csvData);
    setJsonData(json);
  };

  const handleDownload = () => {
    if (!jsonData) return;

    const blob = new Blob([jsonData], { type: "application/json" });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = fileName
      ? `${fileName.replace(".csv", "")}.json`
      : "converted.json";
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleClear = () => {
    setCsvData([]);
    setJsonData("");
    setFileName("");
    setResetKey((prev) => prev + 1);
    if (fileInputRef.current) fileInputRef.current.value = "";
  };

  return (
    <div className="min-h-screen py-6 sm:py-8 lg:py-10 px-3 sm:px-6 lg:px-8 bg-(--background)">
      <div className="max-w-4xl mx-auto w-full">

        {/* Header */}
        <div className="mb-6 sm:mb-8 text-center px-2">
          <h1 className="heading animate-fade-up  font-extrabold ">
            CSV to JSON Converter
          </h1>
          <p className="description text-center pt-2 text-sm sm:text-base text-(--secondary) animate-fade-up">
            Upload a CSV file or paste CSV data, preview it, and convert to JSON
          </p>
        </div>

        {/* Main Card */}
        <div className="shadow-lg p-4 sm:p-6 lg:p-8 bg-(--background) border border-(--border) rounded-xl mx-auto w-full">
          <FileUploader
            key={resetKey}
            onFileUpload={handleFileUpload}
            fileInputRef={fileInputRef}
          />

          {csvData.length > 0 && (
            <>
              {/* <CSVPreview csvData={csvData} /> */}
              <ActionButtons
                onConvert={handleConvert}
                onDownload={handleDownload}
                onClear={handleClear}
                hasData={csvData.length > 0}
              />
              <JSONOutput jsonData={jsonData} />
            </>
          )}

          {csvData.length === 0 && (
            <div className="flex justify-end">
              <ActionButtons
                onConvert={handleConvert}
                onDownload={handleDownload}
                onClear={handleClear}
                hasData={false}
              />
            </div>
          )}
        </div>

        {/* Features */}
        <div className="mt-6 sm:mt-8">
          <Features />
        </div>
      </div>
    </div>
  );
}