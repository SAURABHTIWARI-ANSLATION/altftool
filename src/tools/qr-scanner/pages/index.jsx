"use client";
import QRCodeFeatures from "../components/QRCodeFeatures";
import QrCodeScannerJsQR from "../components/QrCodeScannerJsQR";
import Description from "../components/Description";

export default function QRScannerApp() {
  return (
    <div className="min-h-screen bg-(--background) text-(--foreground)">

      {/* Scanner Section */}
      <div id="scanner">
        <QrCodeScannerJsQR />
      </div>

      {/* Features */}
      <QRCodeFeatures />

       <Description/>
    </div>
  );
}
