"use client";
import React, { useState, useRef } from "react";
import { Download, Mail, Phone, MapPin, Linkedin, Globe, Check } from "lucide-react";
import { toPng } from "html-to-image";



const Generator = () => {
  const [formData, setFormData] = useState({
    name: "",
    title: "",
    company: "",
    email: "",
    phone: "",
    website: "",
    address: "",
    linkedin: "",
    tagline: "",
    cardColor: "#6366f1",
    textColor: "#ffffff",
  });

  const cardRef = useRef(null);

  const [phoneValid, setPhoneValid] = useState(true);

  const templates = [
    { name: "Corporate Blue", gradient: "linear-gradient(135deg, #1e40af 0%, #3b82f6 100%)", textColor: "#fff" },
    { name: "Executive Black", gradient: "linear-gradient(135deg, #0f172a 0%, #334155 100%)", textColor: "#fff" },
    { name: "Tech Purple", gradient: "linear-gradient(135deg, #7c3aed 0%, #a78bfa 100%)", textColor: "#fff" },
    { name: "Digital Cyan", gradient: "linear-gradient(135deg, #0891b2 0%, #06b6d4 100%)", textColor: "#fff" },
    { name: "Creative Pink", gradient: "linear-gradient(135deg, #db2777 0%, #ec4899 100%)", textColor: "#fff" },
    { name: "Artist Indigo", gradient: "linear-gradient(135deg, #4f46e5 0%, #818cf8 100%)", textColor: "#fff" },
  ];

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    if (name === "phone") {
      setPhoneValid(/^\d{0,10}$/.test(value));
    }
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const applyTemplate = (template) => {
    setFormData((prev) => ({
      ...prev,
      cardColor: template.gradient,
      textColor: template.textColor,
    }));
  };

  const downloadCard = async () => {
    if (!formData.name.trim() || !formData.title.trim() || !phoneValid) return;
    if (!cardRef.current) return;
    try {
      const dataUrl = await toPng(cardRef.current, { cacheBust: true, pixelRatio: 3 });
      const link = document.createElement("a");
      link.download = `business-card-${formData.name || "card"}.png`;
      link.href = dataUrl;
      link.click();
    } catch (err) {
      console.error("Download failed", err);
    }
  };

  const isDownloadDisabled = !formData.name.trim() || !formData.title.trim() || !phoneValid;

  return (
    <section className="py-10 px-6 min-h-[calc(100vh-200px)]">
      <div className="max-w-5xl mx-auto">
        <h2 className="text-(--primary) text-center font-semibold text-5xl pt-6 mb-4 mt-[-40]">
          Create Your Business Card
        </h2>
        <p className="text-center mb-4">Fill in your details and customize your card</p>

        <div className="grid gap-8 grid-cols-[repeat(auto-fit,minmax(350px,1fr))]">
          {/* Form Section */}
          <div>
            <div className="bg-(--background) rounded-md border border-(--border) p-8 mb-6">
              <h3 className="subheading mb-4">Personal Information</h3>
              {["name", "title", "company", "tagline"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field === "name" ? "Full Name*" : field === "title" ? "Job Title*" : field === "company" ? "Company Name" : "Tagline or Motto"}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base rounded-lg mb-4 border border-(--border) bg-(--background) text-(--foreground)"
                />
              ))}
            </div>

            <div className="bg-(--background) rounded-md border border-(--border) p-8 mb-6">
              <h3 className="subheading mb-4">Contact Details</h3>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                className="w-full px-4 py-3 text-base rounded-lg mb-4 border border-(--border) bg-(--background) text-(--foreground)"
              />
              <input
                type="tel"
                name="phone"
                placeholder="Phone Number (10 digits)"
                value={formData.phone}
                onChange={handleInputChange}
                className={`w-full px-4 py-3 text-base rounded-lg mb-2 border ${
                  phoneValid ? "border-(--border)" : "border-red-500"
                } bg-(--background) text-(--foreground)`}
              />
              {!phoneValid && <p className="text-red-500 text-sm mb-2">Phone must be 10 digits</p>}
              {["website", "linkedin", "address"].map((field) => (
                <input
                  key={field}
                  type="text"
                  name={field}
                  placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
                  value={formData[field]}
                  onChange={handleInputChange}
                  className="w-full px-4 py-3 text-base rounded-lg mb-4 border border-(--border) bg-(--background) text-(--foreground)"
                />
              ))}
            </div>

            <div className="bg-(--background) text-(--foreground) border border-(--border) p-8 rounded-2xl">
              <h3 className="subheading mb-4">Choose Template</h3>
              <div className="grid gap-3 grid-cols-[repeat(auto-fill,minmax(140px,1fr))]">
                {templates.map((template, index) => (
                  <button
                    key={index}
                    onClick={() => applyTemplate(template)}
                    style={{
                      padding: "20px 12px",
                      background: template.gradient,
                      border: formData.cardColor === template.gradient ? "3px solid #10b981" : "none",
                      borderRadius: "12px",
                      cursor: "pointer",
                      position: "relative",
                      transition: "all 0.2s",
                      boxShadow: "0 4px 12px rgba(0,0,0,0.1)",
                    }}
                  >
                    {formData.cardColor === template.gradient && (
                      <div className="absolute top-2 right-2 bg-emerald-500 rounded-full p-1 flex items-center justify-center">
                        <Check size={16} color="white" />
                      </div>
                    )}
                    <div className="text-[1.8rem] font-bold text-center mb-2" style={{ color: template.textColor }}>Aa</div>
                    <div className="text-[0.75rem] font-semibold text-center opacity-90" style={{ color: template.textColor }}>
                      {template.name}
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Preview Section */}
          <div>
            <div className="bg-(--background) rounded-md border border-(--border) p-8 sticky top-25">
              <h3 className="subheading mb-4">Live Preview</h3>
              <div
                ref={cardRef}
                className="w-full max-w-[550px] aspect-[1.25] rounded-2xl p-6 flex flex-col justify-between mb-6 relative overflow-hidden shadow-[0_20px_60px_rgba(0,0,0,0.3)]"
                style={{ background: formData.cardColor, color: formData.textColor }}
              >
                <div className="absolute -top-12 -right-12 w-50 h-50 rounded-full bg-[rgba(255,255,255,0.1)]" />
                <div className="absolute -bottom-7 -left-7 w-37.5 h-37.5 rounded-full bg-[rgba(255,255,255,0.1)]" />

                <div className="relative z-10 flex flex-col gap-1 flex-wrap break-words">
                  <h2 className="subheading text-[clamp(1rem,2vw,1.5rem)]">{formData.name || "Your Name"}</h2>
                  <p className="subheading text-[clamp(0.9rem,1.8vw,1.2rem)]">{formData.title || "Your Title"}</p>
                  <p className="text-[clamp(0.8rem,1.6vw,1rem)] font-semibold opacity-80">{formData.company || "Company Name"}</p>
                  {formData.tagline && <p className="text-[clamp(0.7rem,1.5vw,0.95rem)] opacity-70 italic mt-1">"{formData.tagline}"</p>}
                </div>

                <div className="relative z-10 text-[clamp(0.65rem,1.2vw,0.85rem)] flex flex-col gap-1 flex-wrap break-words">
                  {formData.email && <div className="flex items-center gap-2"><Mail size={16} /> <span className="break-all">{formData.email}</span></div>}
                  {formData.phone && <div className="flex items-center gap-2"><Phone size={16} /> <span>{formData.phone}</span></div>}
                  {formData.website && <div className="flex items-center gap-2"><Globe size={16} /> <span className="break-all">{formData.website}</span></div>}
                  {formData.linkedin && <div className="flex items-center gap-2"><Linkedin size={16} /> <span className="break-all">{formData.linkedin}</span></div>}
                  {formData.address && <div className="flex items-center gap-2"><MapPin size={16} /> <span className="break-all">{formData.address}</span></div>}
                </div>
              </div>

              <button
                onClick={downloadCard}
                disabled={isDownloadDisabled}
                className={`w-full py-4 mt-2 font-semibold rounded-xl text-white flex items-center justify-center gap-2 transition-all
                  ${isDownloadDisabled ? "bg-gray-400 cursor-not-allowed" : "bg-gradient-to-r from-purple-600 to-pink-500 hover:scale-105"}`}
              >
                <Download size={20} /> Download Business Card
              </button>

              {isDownloadDisabled && (
                <p className="text-[0.85rem] text-center mt-3 text-red-500">
                  Please fill in Name, Title and a valid 10-digit Phone to download
                </p>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default Generator;