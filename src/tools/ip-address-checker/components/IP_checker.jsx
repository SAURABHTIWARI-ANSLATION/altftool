import React, { useState, useRef } from 'react';
import axios from 'axios';
import { Button } from '@/shared/ui/Button';

export default function IPChecker() {
  const [domain, setDomain] = useState('');
  const [domainData, setDomainData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [isValidDomain, setIsValidDomain] = useState(null);
  const mapRef = useRef(null);
  const mapInstanceRef = useRef(null);

  /* =========================
     ✅ DOMAIN + IP VALIDATION
  ========================== */
  const isValidDomainFormat = (input) => {
    const value = input.trim().toLowerCase();

    const ipv4Regex =
      /^(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)\.(25[0-5]|2[0-4]\d|1\d\d|[1-9]?\d)$/;

    const domainRegex =
  /^(?!-)(?!.*\.\.)([a-z0-9-]{1,63}\.)+(com|net|org|in|co|io|gov|edu)$/;

    return ipv4Regex.test(value) || domainRegex.test(value);
  };

  const checkDomain = async () => {
    if (!domain.trim()) return;

    const valid = isValidDomainFormat(domain);
    setIsValidDomain(valid);

    if (!valid) {
      setDomainData(null);
      return;
    }

    setLoading(true);

    try {
      const response = await axios.get(`https://ipinfo.io/${domain}/json`);
      setDomainData(response.data);
    } catch {
      // ❌ Error message completely removed
      setDomainData(null);
    } finally {
      setLoading(false);
    }
  };

  const resetForm = () => {
    setDomain('');
    setDomainData(null);
    setIsValidDomain(null);
    mapInstanceRef.current = null;
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      checkDomain();
    }
  };

  return (
    <div className="min-h-screen bg-(--background) p-4 md:p-8">
      <div className="max-w-4xl mx-auto">

        <div className="text-center mb-8">
          <h1 className="heading text-center pt-8 mb-3">
            IP Checker
          </h1>
          <p className="description text-center pt-2">
            Check domain validity and IP information
          </p>
        </div>

        <div className="bg-(--card) rounded-xl p-6 shadow-2xl border border-(--border)">
          <div className="flex flex-col md:flex-row gap-4">

            <div className="flex-1 relative">
              <input
                type="text"
                value={domain}
                onChange={(e) => {
                  setDomain(e.target.value);
                  setIsValidDomain(null);
                }}
                onKeyDown={handleKeyPress}
                placeholder="Enter domain (e.g., google.com) or IP address"
                className={`w-full px-4 py-4 rounded-xl border border-(--border)
                ${
                  isValidDomain === null
                    ? ''
                    : isValidDomain
                    ? 'border-green-500'
                    : 'border-red-500'
                }`}
              />

              {domain && isValidDomain !== null && (
                <div
                  className={`absolute right-4 top-1/2 -translate-y-1/2 text-xs px-2 py-1 rounded-full font-medium
                  ${
                    isValidDomain
                      ? 'bg-green-100 text-green-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {isValidDomain ? '✓ Valid' : '✗ Invalid'}
                </div>
              )}
            </div>

            <div className="flex gap-3">
              <Button
                onClick={checkDomain}
                disabled={loading}
                className="px-6 py-4 bg-(--primary) text-white font-bold rounded-md disabled:opacity-50"
              >
                {loading ? 'Checking...' : 'Check'}
              </Button>

              <button
                onClick={resetForm}
                className="px-6 py-4 bg-red-600 text-white font-semibold rounded-xl"
              >
                Reset
              </button>
            </div>
          </div>
        </div>

        {domainData && (
          <div className="mt-8 p-6 bg-(--card) border border-(--border) rounded-xl shadow-xl">
            <h2 className="font-bold mb-4">IP Information</h2>
            <p><strong>IP:</strong> {domainData.ip}</p>
            <p><strong>City:</strong> {domainData.city}</p>
            <p><strong>Region:</strong> {domainData.region}</p>
            <p><strong>Country:</strong> {domainData.country}</p>
            <p><strong>ISP:</strong> {domainData.org}</p>
          </div>
        )}
      </div>
    </div>
  );
}