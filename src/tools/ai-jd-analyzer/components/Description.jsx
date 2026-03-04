import React from "react";

export default function Description() {
  return (
    <div className="mb-10">

      {/* Heading */}
      <div className="text-center mb-10">
        <h2 className="text-3xl sm:text-4xl font-bold mb-3 mt-[-50px]">
          How the Job Description Analyzer Works
        </h2>
        <p className="text-(--muted-foreground) max-w-2xl mx-auto">
          Our AI analyzes job descriptions to extract key skills, requirements, and valuable insights, helping job seekers and recruiters better understand role expectations.
        </p>
      </div>

      {/* Cards */}
      <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">

        <div className="group bg-(--card) rounded-2xl p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition">
            Upload Job Description
          </h3>
          <p className="text-(--muted-foreground) text-sm">
            Paste or upload the job description you want to analyze instantly.
          </p>
        </div>

        <div className="group bg-(--card) rounded-2xl p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition">
            Text Processing
          </h3>
          <p className="text-(--muted-foreground) text-sm">
            AI processes the text and breaks down job roles, responsibilities, and requirements.
          </p>
        </div>

        <div className="group bg-(--card) rounded-2xl p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition">
            Skill Extraction
          </h3>
          <p className="text-(--muted-foreground) text-sm">
            The system identifies required technical and soft skills mentioned in the job description.
          </p>
        </div>

        <div className="group bg-(--card) rounded-2xl p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition">
            Requirement Analysis
          </h3>
          <p className="text-(--muted-foreground) text-sm">
            AI highlights experience level, education requirements, and key qualifications.
          </p>
        </div>

        <div className="group bg-(--card) rounded-2xl p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition">
            Keyword Insights
          </h3>
          <p className="text-(--muted-foreground) text-sm">
            Extracts important keywords to help improve resumes and ATS matching.
          </p>
        </div>

        <div className="group bg-(--card) rounded-2xl p-6 shadow-md transition-all duration-300 hover:-translate-y-2 hover:shadow-2xl">
          <h3 className="text-lg font-semibold mb-2 group-hover:text-blue-600 transition">
            Instant Results
          </h3>
          <p className="text-(--muted-foreground) text-sm">
            Provides structured insights and analysis within seconds.
          </p>
        </div>

      </div>
    </div>
  );
}
