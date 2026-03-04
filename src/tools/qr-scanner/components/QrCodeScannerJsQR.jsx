"use client";

import React, { useState, useRef, useEffect } from "react";
import jsQR from "jsqr";
import { Camera, ImageIcon, Copy, Check, QrCode, ScanLine, ExternalLink, X } from "lucide-react";

/* ---------------- Bounding Box ---------------- */
function drawBoundingBox(ctx, location) {
  const drawLine = (begin, end) => {
    ctx.beginPath();
    ctx.moveTo(begin.x, begin.y);
    ctx.lineTo(end.x, end.y);
    ctx.lineWidth = 4;
    ctx.strokeStyle = "#2563eb";
    ctx.stroke();
  };
  drawLine(location.topLeftCorner, location.topRightCorner);
  drawLine(location.topRightCorner, location.bottomRightCorner);
  drawLine(location.bottomRightCorner, location.bottomLeftCorner);
  drawLine(location.bottomLeftCorner, location.topLeftCorner);
}

/* ---------------- URL Check ---------------- */
function isURL(str) {
  try {
    const url = new URL(str);
    return url.protocol === "http:" || url.protocol === "https:";
  } catch {
    return false;
  }
}

/* ---------------- Component ---------------- */
const QrCodeScannerJsQR = () => {
  const [activeTab, setActiveTab] = useState("camera");
  const [result, setResult] = useState("");
  const [error, setError] = useState("");
  const [isScanning, setIsScanning] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copied, setCopied] = useState(false);
  const [dragOver, setDragOver] = useState(false);

  const videoRef = useRef(null);
  const canvasRef = useRef(null);
  const streamRef = useRef(null);
  const fileInputRef = useRef(null);
  const animationFrameRef = useRef(null);
  const lastDetectedRef = useRef(0);

  /* ---------- Stop Camera ---------- */
  const stopCamera = () => {
    if (animationFrameRef.current) {
      cancelAnimationFrame(animationFrameRef.current);
      animationFrameRef.current = null;
    }
    if (streamRef.current) {
      streamRef.current.getTracks().forEach((t) => t.stop());
      streamRef.current = null;
    }
    const canvas = canvasRef.current;
    const ctx = canvas?.getContext("2d");
    if (ctx && canvas) ctx.clearRect(0, 0, canvas.width, canvas.height);
    setIsScanning(false);
    setLoading(false);
  };

  useEffect(() => () => stopCamera(), []);

  /* ---------- Scan Loop ---------- */
  const tick = () => {
    const video = videoRef.current;
    const canvas = canvasRef.current;
    if (!video || !canvas || video.readyState !== video.HAVE_ENOUGH_DATA) {
      animationFrameRef.current = requestAnimationFrame(tick);
      return;
    }
    const ctx = canvas.getContext("2d");
    if (canvas.width !== video.videoWidth || canvas.height !== video.videoHeight) {
      canvas.width = video.videoWidth;
      canvas.height = video.videoHeight;
    }
    ctx.drawImage(video, 0, 0, canvas.width, canvas.height);
    const imageData = ctx.getImageData(0, 0, canvas.width, canvas.height);
    const code = jsQR(imageData.data, imageData.width, imageData.height);
    if (code) {
      const now = Date.now();
      if (now - lastDetectedRef.current < 500) {
        drawBoundingBox(ctx, code.location);
        animationFrameRef.current = requestAnimationFrame(tick);
        return;
      }
      lastDetectedRef.current = now;
      drawBoundingBox(ctx, code.location);
      setResult(code.data.trim());
      stopCamera();
      return;
    }
    animationFrameRef.current = requestAnimationFrame(tick);
  };

  /* ---------- Start Camera ---------- */
  const startCamera = async () => {
    setError("");
    setResult("");
    setLoading(true);
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "environment" },
      });
      streamRef.current = stream;
      const video = videoRef.current;
      video.srcObject = stream;
      video.onloadedmetadata = () => {
        video.play();
        setIsScanning(true);
        setLoading(false);
        animationFrameRef.current = requestAnimationFrame(tick);
      };
    } catch {
      setLoading(false);
      setError("Camera access denied or unavailable. Please allow camera permissions.");
    }
  };

  /* ---------- Image Decode ---------- */
  const decodeImage = (file) => {
    if (!file) return;
    setLoading(true);
    setError("");
    setResult("");
    stopCamera();
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = new Image();
      img.onload = () => {
        const canvas = document.createElement("canvas");
        const ctx = canvas.getContext("2d");
        canvas.width = img.width;
        canvas.height = img.height;
        ctx.drawImage(img, 0, 0);
        const imageData = ctx.getImageData(0, 0, img.width, img.height);
        const code = jsQR(imageData.data, imageData.width, imageData.height);
        setLoading(false);
        if (code?.data) {
          setResult(code.data.trim());
        } else {
          setError("No QR code detected in this image. Please try a clearer image.");
        }
      };
      img.onerror = () => { setLoading(false); setError("Failed to load image."); };
      img.src = e.target.result;
    };
    reader.onerror = () => { setLoading(false); setError("Failed to read file."); };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e) => decodeImage(e.target.files?.[0]);

  const handleDrop = (e) => {
    e.preventDefault();
    setDragOver(false);
    decodeImage(e.dataTransfer.files?.[0]);
  };

  /* ---------- Copy ---------- */
  const copyToClipboard = async () => {
    if (!result) return;
    await navigator.clipboard.writeText(result);
    setCopied(true);
    setTimeout(() => setCopied(false), 1500);
  };

  /* ---------- Clear ---------- */
  const clearResult = () => {
    setResult("");
    setError("");
  };

  /* ---------- Tab Switch ---------- */
  const switchTab = (tab) => {
    if (tab !== activeTab) {
      stopCamera();
      setResult("");
      setError("");
      setActiveTab(tab);
    }
  };

  const isLink = isURL(result);

  /* =========================================================
     UI
  ========================================================= */
  return (
    <section className="bg-(--background)">
      {/* ── Hero ── */}

    
      <div className="bg-(--background) py-10 px-6 text-center border-b border-(--border)">
          <div className="inline-block px-4 py-1 rounded-full border border-(--border) bg-(--card) text-(--primary) text-sm font-semibold mb-4">
          ⚡ Powerful Features
        </div>
        <h1
          className="heading"
          style={{ fontFamily: "'Georgia', serif" }}
        >
          QR Code Scanner Online
        </h1>
        <p className="description max-w-2xl mx-auto font-light">
          Scan QR codes using your camera or upload an image — no download, full privacy.
        </p>
      </div>

      {/* ── Scanner Panel ── */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        {/* Tabs — underline style like Scanbot */}
        <div className="flex border-b border-gray-200 mb-8 ">
          <button
            onClick={() => switchTab("camera")}
            className={`flex items-center gap-2 px-6 py-4 text-xs sm:text-lg font-semibold transition-colors cursor-pointer ${
              activeTab === "camera"
                ? "text-(--primary) border-b-2 border-blue-600 -mb-px"
                : "text-(--foreground) hover:text-gray-400"
            }`}
          >
            <Camera className="w-4 h-4" />
            Scan with camera
          </button>
          <button
            onClick={() => switchTab("upload")}
            className={`flex items-center gap-2 px-6 py-4 text-xs sm:text-lg font-semibold transition-colors cursor-pointer ${
              activeTab === "upload"
                ? "text-blue-600 border-b-2 border-blue-600 -mb-px"
                : "text-(--foreground) hover:text-gray-400"
            }`}
          >
            <ImageIcon className="w-4 h-4" />
            Scan from image
          </button>
        </div>

        {/* Two-panel layout */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">

          {/* ── LEFT: Camera / Upload ── */}
          <div className="rounded-2xl border border-(--border) overflow-hidden bg-(--background) shadow-sm">
            {/* Panel header */}
            <div className="px-5 py-4 border-b border-(--border) flex items-center gap-2">
              {activeTab === "camera" ? (
                <>
                  <Camera className="w-4 h-4 text-gray-400" />
                  <span className="text-lg font-semibold text-(--foreground)">Camera</span>
                </>
              ) : (
                <>
                  <ImageIcon className="w-4 h-4 text-gray-400" />
                  <span className="text-lg font-semibold text-(--foreground)">Import image</span>
                </>
              )}
            </div>

            {/* Camera tab */}
            {activeTab === "camera" && (
              <div className="flex flex-col">
                {/* Video / Canvas area */}
                <div className="relative bg-(--muted)" style={{ minHeight: 280 }}>
                  <video ref={videoRef} playsInline muted className="hidden" />
                  <canvas
                    ref={canvasRef}
                    className="w-full object-contain"
                    style={{ minHeight: 280, display: isScanning ? "block" : "none" }}
                  />
                  {!isScanning && (
                    <div className="absolute inset-0 flex flex-col items-center justify-center gap-4 p-6">
                      {/* Decorative QR frame */}
                      <div className="relative w-32 h-32">
                        <div className="absolute inset-0 border-2 border-(--border) rounded-lg" />
                        {/* corners */}
                        <div className="absolute top-0 left-0 w-5 h-5 border-t-2 border-l-2 border-blue-500 rounded-tl" />
                        <div className="absolute top-0 right-0 w-5 h-5 border-t-2 border-r-2 border-blue-500 rounded-tr" />
                        <div className="absolute bottom-0 left-0 w-5 h-5 border-b-2 border-l-2 border-blue-500 rounded-bl" />
                        <div className="absolute bottom-0 right-0 w-5 h-5 border-b-2 border-r-2 border-blue-500 rounded-br" />
                        <QrCode className="absolute inset-0 m-auto w-12 h-12 text-gray-300" />
                      </div>
                      <p className="text-sm text-gray-400 text-center">
                        Camera preview will appear here
                      </p>
                    </div>
                  )}
                </div>

                {/* Action button */}
                <div className="p-5">
                  {!isScanning ? (
                    <button
                      onClick={startCamera}
                      disabled={loading}
                      className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl bg-(--primary) hover:bg-blue-700 cursor-pointer text-white font-semibold text-sm transition disabled:opacity-60"
                    >
                      {loading ? (
                        <>
                          <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                          Starting camera…
                        </>
                      ) : (
                        <>
                          <Camera className="w-4 h-4" />
                          Start scanning
                        </>
                      )}
                    </button>
                  ) : (
                    <button
                      onClick={stopCamera}
                      className="w-full flex items-center justify-center gap-2 py-3 px-5 rounded-xl border border-gray-200 text-gray-600 hover:bg-gray-50 font-semibold text-sm transition"
                    >
                      <X className="w-4 h-4" />
                      Stop camera
                    </button>
                  )}
                </div>
              </div>
            )}

            {/* Upload tab */}
            {activeTab === "upload" && (
              <div className="p-5 flex flex-col gap-4">
                {/* Drop zone */}
                <div
                  onDragOver={(e) => { e.preventDefault(); setDragOver(true); }}
                  onDragLeave={() => setDragOver(false)}
                  onDrop={handleDrop}
                  onClick={() => fileInputRef.current?.click()}
                  className={`relative flex flex-col items-center justify-center gap-4 border-2 border-dashed rounded-xl cursor-pointer transition-colors p-10 ${
                    dragOver
                      ? "border-blue-500 bg-blue-50"
                      : "border-gray-200 hover:border-blue-400 hover:bg-(--muted)"
                  }`}
                  style={{ minHeight: 240 }}
                >
                  {/* Decorative images illustration */}
                  <div className="relative w-24 h-20 mb-2">
                    <div className="absolute left-0 bottom-0 w-14 h-14 bg-(--muted) rounded-lg border border-gray-200 -rotate-6 flex items-center justify-center">
                      <ImageIcon className="w-6 h-6 text-gray-300" />
                    </div>
                    <div className="absolute right-0 bottom-0 w-14 h-14 bg-white rounded-lg border border-gray-200 rotate-[4deg] shadow-sm flex items-center justify-center">
                      <QrCode className="w-6 h-6 text-gray-300" />
                    </div>
                  </div>

                  <p className="text-sm text-gray-500 text-center font-medium">
                    Drag & drop your image here
                  </p>
                  <span className="text-xs text-gray-400">or</span>

                  <button
                    onClick={(e) => { e.stopPropagation(); fileInputRef.current?.click(); }}
                    disabled={loading}
                    className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-(--primary) cursor-pointer hover:bg-blue-700 text-white text-sm font-semibold transition disabled:opacity-60"
                  >
                    {loading ? (
                      <>
                        <div className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                        Processing…
                      </>
                    ) : (
                      <>
                        <ImageIcon className="w-4 h-4" />
                        Choose file
                      </>
                    )}
                  </button>

                  <p className="text-xs text-gray-400">Supports PNG, JPG</p>
                </div>

                <input
                  type="file"
                  accept="image/png,image/jpeg"
                  ref={fileInputRef}
                  onChange={handleFileChange}
                  className="hidden"
                />
              </div>
            )}
          </div>

          {/* ── RIGHT: Results ── */}
          <div className="rounded-2xl border border-(--border) overflow-hidden bg-(--background) shadow-sm">
            {/* Panel header */}
            <div className="px-5 py-4 border-b border-(--border) flex items-center gap-2">
              <ScanLine className="w-4 h-4 text-gray-400" />
              <span className="text-lg font-semibold text-(--foreground)">Results</span>
            </div>

            <div className="flex flex-col h-full" style={{ minHeight: 340 }}>
              {/* Empty state */}
              {!result && !error && (
                <div className="flex-1 flex flex-col items-center justify-center p-10 gap-4">
                  {/* Floating box illustration */}
                  <div className="relative w-24 h-24">
                    <div className="absolute inset-0 flex items-center justify-center">
                      <div className="w-16 h-16 bg-gray-100 rounded-2xl flex items-center justify-center rotate-12 shadow-inner">
                        <QrCode className="w-7 h-7 text-gray-300" />
                      </div>
                    </div>
                    {/* Dotted orbit */}
                    <svg className="absolute inset-0 w-full h-full animate-spin" style={{ animationDuration: "8s" }} viewBox="0 0 96 96">
                      <circle cx="48" cy="48" r="44" fill="none" stroke="#e5e7eb" strokeWidth="1.5" strokeDasharray="6 5" />
                    </svg>
                  </div>
                  <p className="text-sm text-gray-400 text-center max-w-xs">
                    Point your camera at a QR code or upload an image to see the result here.
                  </p>
                </div>
              )}

              {/* Error state */}
              {error && !result && (
                <div className="flex-1 flex flex-col items-center justify-center p-8 gap-3">
                  <div className="w-12 h-12 rounded-full bg-red-50 flex items-center justify-center">
                    <X className="w-5 h-5 text-red-400" />
                  </div>
                  <p className="text-sm text-gray-500 text-center">{error}</p>
                  <button
                    onClick={clearResult}
                    className="text-xs text-blue-600 hover:underline font-medium mt-1"
                  >
                    Try again
                  </button>
                </div>
              )}

              {/* Result state */}
              {result && (
                <div className="flex-1 flex flex-col p-6 gap-5">
                  {/* Type badge */}
                  <div className="flex items-center gap-2">
                    <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-blue-50 text-blue-700 text-xs font-semibold">
                      {isLink ? (
                        <><ExternalLink className="w-3 h-3" /> URL</>
                      ) : (
                        <><ScanLine className="w-3 h-3" /> Text</>
                      )}
                    </span>
                    <button
                      onClick={clearResult}
                      className="ml-auto text-gray-300 hover:text-gray-400 transition cursor-pointer hover:bg-red-600 p-2 rounded-lg"
                      title="Clear"
                    >
                      <X className="w-4 h-4" />
                    </button>
                  </div>

                  {/* Result value */}
                  <div className="flex p-4 rounded-xl bg-(--muted)/50 border border-gray-100 h-[50%] ">
                    {isLink ? (
                      <a
                        href={result}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-(--primary) hover:text-green-600 font-mono text-sm break-all hover:underline underline-offset-2 flex items-start gap-1.5"
                      >
                        <ExternalLink className="w-3.5 h-3.5 mt-0.5 shrink-0 text-(--primary)" />
                        {result}
                      </a>
                    ) : (
                      <p className="font-mono text-sm text-gray-800 break-all">{result}</p>
                    )}
                  </div>

                  {/* Actions */}
                  <div className="flex flex-row gap-3">
                    {isLink && (
                      <a
                        href={result}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="w-full flex items-center justify-center gap-2 py-3 rounded-xl bg-(--primary) hover:bg-green-500 text-white text-xs sm:text-sm font-semibold transition"
                      >
                        <ExternalLink className="w-4 h-4" />
                         Link
                      </a>
                    )}
                    <button
                      onClick={copyToClipboard}
                      className="w-full flex items-center justify-center gap-2 py-3 rounded-xl border border-gray-200 hover:border-blue-300 hover:bg-blue-50 text-gray-600 text-xs sm:text-sm font-semibold transition cursor-pointer"
                    >
                      {copied ? (
                        <><Check className="w-4 h-4 text-green-600" /><span className="text-green-600">Copied!</span></>
                      ) : (
                        <><Copy className="w-4 h-4" />Copy to clipboard</>
                      )}
                    </button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default QrCodeScannerJsQR;