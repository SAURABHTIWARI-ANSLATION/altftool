// "use client"
// import React, { useState } from "react";
// import {
//     FileText,
//     Eye,
//     Download,
//     Copy,
//     Check,
//     AlertCircle,
// } from "lucide-react";
// import yaml from "js-yaml";

// export default function SwaggerDocGenerator() {
//     const [jsonInput, setJsonInput] = useState("");
//     const [swaggerSpec, setSwaggerSpec] = useState(null);
//     const [error, setError] = useState("");
//     const [copied, setCopied] = useState(false);
//     const [copiedYaml, setCopiedYaml] = useState(false);

//     const [activeTab, setActiveTab] = useState("input");

//     const exampleJSON = {
//         title: "Pet Store API",
//         version: "1.0.0",
//         description: "A sample Pet Store API",
//         baseUrl: "https://api.petstore.com/v1",
//         endpoints: [
//             {
//                 path: "/pets",
//                 method: "GET",
//                 summary: "List all pets",
//                 description: "Returns a list of all pets in the store",
//                 parameters: [
//                     {
//                         name: "limit",
//                         in: "query",
//                         description: "Maximum number of items to return",
//                         required: false,
//                         type: "integer",
//                     },
//                 ],
//                 responses: {
//                     200: {
//                         description: "Successful response",
//                         schema: {
//                             type: "array",
//                             items: {
//                                 type: "object",
//                                 properties: {
//                                     id: { type: "integer" },
//                                     name: { type: "string" },
//                                     tag: { type: "string" },
//                                 },
//                             },
//                         },
//                     },
//                 },
//             },
//             {
//                 path: "/pets",
//                 method: "POST",
//                 summary: "Create a pet",
//                 description: "Creates a new pet in the store",
//                 requestBody: {
//                     required: true,
//                     content: {
//                         "application/json": {
//                             schema: {
//                                 type: "object",
//                                 required: ["name"],
//                                 properties: {
//                                     name: { type: "string" },
//                                     tag: { type: "string" },
//                                 },
//                             },
//                         },
//                     },
//                 },
//                 responses: {
//                     201: {
//                         description: "Pet created successfully",
//                     },
//                 },
//             },
//         ],
//     };

//     const loadExample = () => {
//         setJsonInput(JSON.stringify(exampleJSON, null, 2));
//         setError("");
//     };

//     const generateSwagger = () => {
//         try {
//             setError("");
//             const input = JSON.parse(jsonInput);

//             const swagger = {
//                 openapi: "3.0.0",
//                 info: {
//                     title: input.title || "API Documentation",
//                     version: input.version || "1.0.0",
//                     description: input.description || "",
//                 },
//                 servers: [
//                     {
//                         url: input.baseUrl || "https://api.example.com",
//                     },
//                 ],
//                 paths: {},
//             };

//             if (input.endpoints && Array.isArray(input.endpoints)) {
//                 input.endpoints.forEach((endpoint) => {
//                     const path = endpoint.path;
//                     const method = endpoint.method.toLowerCase();

//                     if (!swagger.paths[path]) {
//                         swagger.paths[path] = {};
//                     }

//                     const operation = {
//                         summary: endpoint.summary || "",
//                         description: endpoint.description || "",
//                         responses: {},
//                     };

//                     if (endpoint.parameters) {
//                         operation.parameters = endpoint.parameters.map((param) => ({
//                             name: param.name,
//                             in: param.in || "query",
//                             description: param.description || "",
//                             required: param.required || false,
//                             schema: {
//                                 type: param.type || "string",
//                             },
//                         }));
//                     }

//                     if (endpoint.requestBody) {
//                         operation.requestBody = endpoint.requestBody;
//                     }
//                     if (endpoint.responses) {
//                         Object.keys(endpoint.responses).forEach((code) => {
//                             const res = endpoint.responses[code];

//                             operation.responses[code] = {
//                                 description: res.description || "Response",

//                                 // ✅ FIXED: Only add `content` when schema exists
//                                 ...(res.schema && {
//                                     content: {
//                                         "application/json": {
//                                             schema: res.schema,
//                                         },
//                                     },
//                                 }),
//                             };
//                         });
//                     }

//                     swagger.paths[path][method] = operation;
//                 });
//             }

//             setSwaggerSpec(swagger);
//             setActiveTab("preview");
//         } catch (err) {
//             setError(err.message);
//         }
//     };

//     const downloadSwagger = () => {
//         if (!swaggerSpec) return;

//         const blob = new Blob([JSON.stringify(swaggerSpec, null, 2)], {
//             type: "application/json",
//         });
//         const url = URL.createObjectURL(blob);
//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "swagger.json";
//         a.click();
//         URL.revokeObjectURL(url);
//     };

//     const downloadYAML = () => {
//         if (!swaggerSpec) return;

//         const yamlText = yaml.dump(swaggerSpec);

//         const blob = new Blob([yamlText], { type: "text/yaml" });
//         const url = URL.createObjectURL(blob);

//         const a = document.createElement("a");
//         a.href = url;
//         a.download = "swagger.yaml";
//         a.click();

//         URL.revokeObjectURL(url);
//     };

//     const copySwagger = async () => {
//         if (!swaggerSpec) return;

//         try {
//             await navigator.clipboard.writeText(JSON.stringify(swaggerSpec, null, 2));
//             setCopied(true);
//             setTimeout(() => setCopied(false), 2000);
//         } catch (err) {
//             console.error("Failed to copy:", err);
//         }
//     };

//     const copyYAML = async () => {
//         if (!swaggerSpec) return;

//         try {
//             const yamlText = yaml.dump(swaggerSpec); // Convert JSON → YAML

//             await navigator.clipboard.writeText(yamlText);
//             setCopiedYaml(true);

//             setTimeout(() => setCopiedYaml(false), 2000);
//         } catch (err) {
//             console.error("Failed to copy YAML:", err);
//         }
//     };

//     React.useEffect(() => {
//         if (swaggerSpec && activeTab === "preview") {
//             // Check if Swagger UI is already loaded
//             if (window.SwaggerUIBundle) {
//                 window.SwaggerUIBundle({
//                     spec: swaggerSpec,
//                     dom_id: "#swagger-ui",
//                     deepLinking: true,
//                     presets: [
//                         window.SwaggerUIBundle.presets.apis,
//                         window.SwaggerUIBundle.SwaggerUIStandalonePreset,
//                     ],
//                     layout: "BaseLayout",
//                 });
//             } else {
//                 // Load Swagger UI for the first time
//                 const link = document.createElement("link");
//                 link.rel = "stylesheet";
//                 link.href =
//                     "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui.min.css";
//                 link.id = "swagger-ui-css";
//                 if (!document.getElementById("swagger-ui-css")) {
//                     document.head.appendChild(link);
//                 }

//                 const script = document.createElement("script");
//                 script.src =
//                     "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui-bundle.min.js";
//                 script.id = "swagger-ui-script";
//                 script.onload = () => {
//                     if (window.SwaggerUIBundle) {
//                         window.SwaggerUIBundle({
//                             spec: swaggerSpec,
//                             dom_id: "#swagger-ui",
//                             deepLinking: true,
//                             presets: [
//                                 window.SwaggerUIBundle.presets.apis,
//                                 window.SwaggerUIBundle.SwaggerUIStandalonePreset,
//                             ],
//                             layout: "BaseLayout",
//                         });
//                     }
//                 };
//                 script.onerror = () => {
//                     setError(
//                         "Failed to load Swagger UI. Please check your internet connection."
//                     );
//                 };

//                 if (!document.getElementById("swagger-ui-script")) {
//                     document.body.appendChild(script);
//                 }
//             }
//         }
//     }, [swaggerSpec, activeTab]);

//    return (
//   <div className="min-h-screen bg-(--background) p-4 md:p-8">
//     <div className="max-w-7xl mx-auto">

//       <div className="bg-(--card) rounded-2xl shadow-2xl overflow-hidden border border-(--border)">

//         {/* Header */}
//         <div className="bg-(--primary) p-6 md:p-8 text-(--primary-foreground)">
//           <div className="flex items-center gap-3 mb-2">
//             <FileText size={32} />
//             <h1 className="text-3xl md:text-4xl font-bold">
//               API Documentation Maker
//             </h1>
//           </div>
//           <p className="text-(--primary-foreground)/80">
//             Generate beautiful Swagger/OpenAPI documentation from JSON
//           </p>
//         </div>

//         {/* Tabs */}
//         <div className="border-b border-(--border) bg-(--background)">
//           <div className="flex">

//             <button
//               onClick={() => setActiveTab("input")}
//               className={`flex-1 py-4 px-6 font-semibold transition-all ${
//                 activeTab === "input"
//                   ? "bg-(--card) text-(--primary) border-b-2 border-(--primary)"
//                   : "text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--accent)"
//               }`}
//             >
//               <span className="flex items-center justify-center gap-2">
//                 <FileText size={20} />
//                 Input JSON
//               </span>
//             </button>

//             <button
//               onClick={() => setActiveTab("preview")}
//               disabled={!swaggerSpec}
//               className={`flex-1 py-4 px-6 font-semibold transition-all ${
//                 activeTab === "preview"
//                   ? "bg-(--card) text-(--primary) border-b-2 border-(--primary)"
//                   : "text-(--muted-foreground) hover:text-(--foreground) hover:bg-(--accent) disabled:opacity-50 disabled:cursor-not-allowed"
//               }`}
//             >
//               <span className="flex items-center justify-center gap-2">
//                 <Eye size={20} />
//                 Preview Docs
//               </span>
//             </button>

//           </div>
//         </div>

//         {/* Content */}
//         <div className="p-6 md:p-8">

//           {activeTab === "input" && (
//             <div>

//               <div className="mb-6">

//                 <div className="flex flex-wrap gap-3 mb-4">

//                   <button
//                     onClick={loadExample}
//                     className="
//                       px-4 py-2
//                       bg-(--accent)
//                       hover:opacity-90
//                       text-(--foreground)
//                       rounded-lg
//                       transition-colors
//                       font-medium
//                     "
//                   >
//                     Load Example
//                   </button>

//                   <button
//                     onClick={generateSwagger}
//                     className="
//                       px-6 py-2
//                       bg-(--primary)
//                       text-(--primary-foreground)
//                       rounded-lg
//                       transition-colors
//                       font-medium
//                       shadow-md
//                       hover:opacity-90
//                     "
//                   >
//                     Generate Swagger Docs
//                   </button>

//                 </div>

//                 {/* Error */}
//                 {error && (
//                   <div className="bg-(--accent) border border-(--border) rounded-lg p-4 mb-4 flex items-start gap-3">
//                     <AlertCircle
//                       className="text-(--primary) shrink-0 mt-0.5"
//                       size={20}
//                     />
//                     <div>
//                       <p className="text-(--foreground) font-semibold">
//                         Error parsing JSON:
//                       </p>
//                       <p className="text-(--muted-foreground) text-sm mt-1">
//                         {error}
//                       </p>
//                     </div>
//                   </div>
//                 )}

//                 {/* Format Box */}
//                 <div className="bg-(--background) rounded-lg p-4 mb-4 border border-(--border)">
//                   <h3 className="font-semibold text-(--foreground) mb-2">
//                     JSON Format:
//                   </h3>

//                   <pre className="text-sm text-(--muted-foreground) overflow-x-auto">
// {`{
//   "title": "API Name",
//   "version": "1.0.0",
//   "description": "API Description",
//   "baseUrl": "https://api.example.com",
//   "endpoints": []
// }`}
//                   </pre>
//                 </div>

//               </div>

//               <textarea
//                 value={jsonInput}
//                 onChange={(e) => setJsonInput(e.target.value)}
//                 placeholder="Paste your JSON here..."
//                 className="
//                   w-full h-96 p-4
//                   border-2 border-(--border)
//                   rounded-lg
//                   bg-(--background)
//                   text-(--foreground)
//                   placeholder:text-(--muted-foreground)
//                   focus:border-(--primary)
//                   focus:ring-2 focus:ring-(--primary)/20
//                   outline-none
//                   font-mono text-sm resize-none
//                 "
//               />

//             </div>
//           )}

//           {/* PREVIEW */}
//           {activeTab === "preview" && swaggerSpec && (
//             <div>

//               <div className="flex flex-wrap gap-3 mb-6">

//                 <button
//                   onClick={downloadSwagger}
//                   className="px-4 py-2 bg-(--primary) text-(--primary-foreground) rounded-lg flex items-center gap-2 shadow-md hover:opacity-90"
//                 >
//                   <Download size={18} />
//                   Download JSON
//                 </button>

//                 <button
//                   onClick={copySwagger}
//                   className="px-4 py-2 bg-(--accent) text-(--foreground) rounded-lg flex items-center gap-2 shadow-md hover:opacity-90"
//                 >
//                   {copied ? <Check size={18} /> : <Copy size={18} />}
//                   {copied ? "Copied!" : "Copy JSON"}
//                 </button>

//                 <button
//                   onClick={downloadYAML}
//                   className="px-4 py-2 bg-(--primary) text-(--primary-foreground) rounded-lg flex items-center gap-2 shadow-md hover:opacity-90"
//                 >
//                   <Download size={18} />
//                   Download YAML
//                 </button>

//                 <button
//                   onClick={copyYAML}
//                   className="px-4 py-2 bg-(--accent) text-(--foreground) rounded-lg flex items-center gap-2 shadow-md hover:opacity-90"
//                 >
//                   {copiedYaml ? <Check size={18} /> : <Copy size={18} />}
//                   {copiedYaml ? "Copied!" : "Copy YAML"}
//                 </button>

//               </div>

//               <div id="swagger-ui" className="bg-(--card) rounded-lg"></div>

//             </div>
//           )}

//         </div>
//       </div>

//       {/* Footer */}
//       <div className="mt-8 text-center text-(--muted-foreground) text-sm">
//         <p>
//           Powered by Swagger UI • Paste your API JSON and generate
//           professional documentation instantly
//         </p>
//       </div>

//     </div>
//   </div>
// );

// }
import React, { useState } from "react";
import {
  FileText,
  Eye,
  Download,
  Copy,
  Check,
  AlertCircle,
} from "lucide-react";
import yaml from "js-yaml";

export default function SwaggerDocGenerator() {
  const [jsonInput, setJsonInput] = useState("");
  const [swaggerSpec, setSwaggerSpec] = useState(null);
  const [error, setError] = useState("");
  const [copied, setCopied] = useState(false);
  const [copiedYaml, setCopiedYaml] = useState(false);

  const [activeTab, setActiveTab] = useState("input");

  const exampleJSON = {
    title: "Pet Store API",
    version: "1.0.0",
    description: "A sample Pet Store API",
    baseUrl: "https://api.petstore.com/v1",
    endpoints: [
      {
        path: "/pets",
        method: "GET",
        summary: "List all pets",
        description: "Returns a list of all pets in the store",
        parameters: [
          {
            name: "limit",
            in: "query",
            description: "Maximum number of items to return",
            required: false,
            type: "integer",
          },
        ],
        responses: {
          200: {
            description: "Successful response",
            schema: {
              type: "array",
              items: {
                type: "object",
                properties: {
                  id: { type: "integer" },
                  name: { type: "string" },
                  tag: { type: "string" },
                },
              },
            },
          },
        },
      },
      {
        path: "/pets",
        method: "POST",
        summary: "Create a pet",
        description: "Creates a new pet in the store",
        requestBody: {
          required: true,
          content: {
            "application/json": {
              schema: {
                type: "object",
                required: ["name"],
                properties: {
                  name: { type: "string" },
                  tag: { type: "string" },
                },
              },
            },
          },
        },
        responses: {
          201: {
            description: "Pet created successfully",
          },
        },
      },
    ],
  };

  const loadExample = () => {
    setJsonInput(JSON.stringify(exampleJSON, null, 2));
    setError("");
  };

  const generateSwagger = () => {
    try {
      setError("");
      const input = JSON.parse(jsonInput);

      const swagger = {
        openapi: "3.0.0",
        info: {
          title: input.title || "API Documentation",
          version: input.version || "1.0.0",
          description: input.description || "",
        },
        servers: [
          {
            url: input.baseUrl || "https://api.example.com",
          },
        ],
        paths: {},
      };

      if (input.endpoints && Array.isArray(input.endpoints)) {
        input.endpoints.forEach((endpoint) => {
          const path = endpoint.path;
          const method = endpoint.method.toLowerCase();

          if (!swagger.paths[path]) {
            swagger.paths[path] = {};
          }

          const operation = {
            summary: endpoint.summary || "",
            description: endpoint.description || "",
            responses: {},
          };

          if (endpoint.parameters) {
            operation.parameters = endpoint.parameters.map((param) => ({
              name: param.name,
              in: param.in || "query",
              description: param.description || "",
              required: param.required || false,
              schema: {
                type: param.type || "string",
              },
            }));
          }

          if (endpoint.requestBody) {
            operation.requestBody = endpoint.requestBody;
          }
          if (endpoint.responses) {
            Object.keys(endpoint.responses).forEach((code) => {
              const res = endpoint.responses[code];

              operation.responses[code] = {
                description: res.description || "Response",

                // ✅ FIXED: Only add `content` when schema exists
                ...(res.schema && {
                  content: {
                    "application/json": {
                      schema: res.schema,
                    },
                  },
                }),
              };
            });
          }

          swagger.paths[path][method] = operation;
        });
      }

      setSwaggerSpec(swagger);
      setActiveTab("preview");
    } catch (err) {
      setError(err.message);
    }
  };

  const downloadSwagger = () => {
    if (!swaggerSpec) return;

    const blob = new Blob([JSON.stringify(swaggerSpec, null, 2)], {
      type: "application/json",
    });
    const url = URL.createObjectURL(blob);
    const a = document.createElement("a");
    a.href = url;
    a.download = "swagger.json";
    a.click();
    URL.revokeObjectURL(url);
  };

  const downloadYAML = () => {
    if (!swaggerSpec) return;

    const yamlText = yaml.dump(swaggerSpec);

    const blob = new Blob([yamlText], { type: "text/yaml" });
    const url = URL.createObjectURL(blob);

    const a = document.createElement("a");
    a.href = url;
    a.download = "swagger.yaml";
    a.click();

    URL.revokeObjectURL(url);
  };

  const copySwagger = async () => {
    if (!swaggerSpec) return;

    try {
      await navigator.clipboard.writeText(JSON.stringify(swaggerSpec, null, 2));
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    } catch (err) {
      console.error("Failed to copy:", err);
    }
  };

  const copyYAML = async () => {
    if (!swaggerSpec) return;

    try {
      const yamlText = yaml.dump(swaggerSpec); // Convert JSON → YAML

      await navigator.clipboard.writeText(yamlText);
      setCopiedYaml(true);

      setTimeout(() => setCopiedYaml(false), 2000);
    } catch (err) {
      console.error("Failed to copy YAML:", err);
    }
  };

  React.useEffect(() => {
    if (swaggerSpec && activeTab === "preview") {
      // Check if Swagger UI is already loaded
      if (window.SwaggerUIBundle) {
        window.SwaggerUIBundle({
          spec: swaggerSpec,
          dom_id: "#swagger-ui",
          deepLinking: true,
          presets: [
            window.SwaggerUIBundle.presets.apis,
            window.SwaggerUIBundle.SwaggerUIStandalonePreset,
          ],
          layout: "BaseLayout",
        });
      } else {
        // Load Swagger UI for the first time
        const link = document.createElement("link");
        link.rel = "stylesheet";
        link.href =
          "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui.min.css";
        link.id = "swagger-ui-css";
        if (!document.getElementById("swagger-ui-css")) {
          document.head.appendChild(link);
        }

        const script = document.createElement("script");
        script.src =
          "https://cdnjs.cloudflare.com/ajax/libs/swagger-ui/5.10.5/swagger-ui-bundle.min.js";
        script.id = "swagger-ui-script";
        script.onload = () => {
          if (window.SwaggerUIBundle) {
            window.SwaggerUIBundle({
              spec: swaggerSpec,
              dom_id: "#swagger-ui",
              deepLinking: true,
              presets: [
                window.SwaggerUIBundle.presets.apis,
                window.SwaggerUIBundle.SwaggerUIStandalonePreset,
              ],
              layout: "BaseLayout",
            });
          }
        };
        script.onerror = () => {
          setError(
            "Failed to load Swagger UI. Please check your internet connection."
          );
        };

        if (!document.getElementById("swagger-ui-script")) {
          document.body.appendChild(script);
        }
      }
    }
  }, [swaggerSpec, activeTab]);

  return (
    <div className="min-h-screen bg-linear-to-br from-blue-50 to-indigo-100 p-4 md:p-8">
      <div className="max-w-7xl mx-auto">
        <div className="bg-white rounded-2xl shadow-2xl overflow-hidden">
          {/* Header */}
          {/* <div className="bg-linear-to-r from-blue-600 to-indigo-600 p-6 md:p-8 text-white">
            <div className="flex items-center gap-3 mb-2">
              <FileText size={32} />
              <h1 className="text-3xl md:text-4xl font-bold">
                API Documentation Maker
              </h1>
            </div>
            <p className="text-blue-100">
              Generate beautiful Swagger/OpenAPI documentation from JSON
            </p>
          </div> */}

          {/* Tabs */}
          <div className="border-b border-gray-200 bg-gray-50">
            <div className="flex">
              <button
                onClick={() => setActiveTab("input")}
                className={`flex-1 py-4 px-6 font-semibold transition-all cursor-pointer ${activeTab === "input"
                    ? "bg-white text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100"
                  }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <FileText size={20} />
                  Input JSON
                </span>
              </button>
              <button
                onClick={() => setActiveTab("preview")}
                disabled={!swaggerSpec}
                className={`flex-1 py-4 px-6 font-semibold transition-all cursor-pointer ${activeTab === "preview"
                    ? "bg-white text-blue-600 border-b-2 border-blue-600"
                    : "text-gray-600 hover:text-gray-900 hover:bg-gray-100 disabled:opacity-50 disabled:cursor-not-allowed"
                  }`}
              >
                <span className="flex items-center justify-center gap-2">
                  <Eye size={20} />
                  Preview Docs
                </span>
              </button>
            </div>
          </div>

          {/* Content */}
          <div className="p-6 md:p-8">
            {activeTab === "input" && (
              <div>
                <div className="mb-6">
                  <div className="flex flex-wrap gap-3 mb-4">
                    <button
                      onClick={loadExample}
                      className="px-4 py-2 bg-gray-100 hover:bg-gray-200 text-gray-700 rounded-lg transition-colors font-medium cursor-pointer"
                    >
                      Load Example
                    </button>
                    <button
                      onClick={generateSwagger}
                      className="px-6 py-2 bg-blue-600 hover:bg-blue-700 text-white rounded-lg transition-colors font-medium shadow-md cursor-pointer"
                    >
                      Generate Swagger Docs
                    </button>
                  </div>

                  {error && (
                    <div className="bg-red-50 border border-red-200 rounded-lg p-4 mb-4 flex items-start gap-3">
                      <AlertCircle
                        className="text-red-600  shrink-0 mt-0.5"
                        size={20}
                      />
                      <div>
                        <p className="text-red-800 font-semibold">
                          Error parsing JSON:
                        </p>
                        <p className="text-red-700 text-sm mt-1">{error}</p>
                      </div>
                    </div>
                  )}

                  <div className="bg-gray-50 rounded-lg p-4 mb-4 border border-gray-200">
                    <h3 className="font-semibold text-gray-900 mb-2">
                      JSON Format:
                    </h3>
                    {/* 
  IMPORTANT:
  <pre> keeps long JSON lines unwrapped by default.
  This can force the container width to expand and break
  responsive layout (especially on mobile).

  Fix:
  - whitespace-pre-wrap → allows line wrapping
  - break-words → prevents horizontal overflow
  - overflow-x-auto → keeps scroll if needed
*/}
                    <pre className="text-sm text-gray-700 overflow-x-auto whitespace-pre-wrap wrap-break-word">
                      {`{
  "title": "API Name",
  "version": "1.0.0",
  "description": "API Description",
  "baseUrl": "https://api.example.com",
  "endpoints": [
    {
      "path": "/resource",
      "method": "GET",
      "summary": "Brief summary",
      "description": "Detailed description",
      "parameters": [...],
      "responses": {...}
    }
  ]
}`}
                    </pre>
                  </div>
                </div>
{/* 
  min-w-0 prevents flex children from expanding beyond
  container width, avoiding layout shifts in responsive views.
*/}
                <textarea
                  value={jsonInput}
                  onChange={(e) => setJsonInput(e.target.value)}
                  placeholder="Paste your JSON here..."
                  className="w-full text-gray-700 h-96 p-4 border-2 border-gray-300 rounded-lg
focus:border-blue-500 focus:ring-2 focus:ring-blue-200
outline-none font-mono text-sm resize-none"
                />
              </div>
            )}

            {activeTab === "preview" && swaggerSpec && (
              <div>
                <div className="flex flex-wrap gap-3 mb-6">
                  <button
                    onClick={downloadSwagger}
                    className="px-4 py-2 cursor-pointer bg-green-600 hover:bg-green-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2 shadow-md"
                  >
                    <Download size={18} />
                    Download JSON
                  </button>
                  <button
                    onClick={copySwagger}
                    className="px-4 py-2 cursor-pointer bg-purple-600 hover:bg-purple-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2 shadow-md"
                  >
                    {copied ? <Check size={18} /> : <Copy size={18} />}
                    {copied ? "Copied!" : "Copy JSON"}
                  </button>
                  <button
                    onClick={downloadYAML}
                    className="px-4 py-2 bg-yellow-600 cursor-pointer hover:bg-yellow-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2 shadow-md"
                  >
                    <Download size={18} />
                    Download YAML
                  </button>
                  <button
                    onClick={copyYAML}
                    className="px-4 py-2 bg-teal-600 cursor-pointer hover:bg-teal-700 text-white rounded-lg transition-colors font-medium flex items-center gap-2 shadow-md"
                  >
                    {copiedYaml ? <Check size={18} /> : <Copy size={18} />}
                    {copiedYaml ? "Copied!" : "Copy YAML"}
                  </button>
                </div>

                <div id="swagger-ui" className="bg-white rounded-lg"></div>
              </div>
            )}
          </div>
        </div>

        {/* Footer */}
        <div className="mt-8 text-center text-gray-600 text-sm">
          <p>
            Powered by Swagger UI • Paste your API JSON and generate
            professional documentation instantly
          </p>
        </div>
      </div>
    </div>
  );
}