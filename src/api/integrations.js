// src/api/integrations.js - MIMITECH Backend Integration

/**
 * Upload File
 */
export async function uploadFile(file, options = {}) {
  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:8000";
  const enableMocks = String(import.meta.env.VITE_ENABLE_MOCKS || '0') === '1';
  const onProgress = typeof options.onProgress === 'function' ? options.onProgress : null;

  if (enableMocks) {
    if (onProgress) {
      await new Promise((resolve) => {
        let p = 0;
        onProgress(0);
        const timer = setInterval(() => {
          p = Math.min(p + 25, 100);
          onProgress(p);
          if (p >= 100) {
            clearInterval(timer);
            resolve();
          }
        }, 80);
      });
    }
    return { file_url: URL.createObjectURL(file), id: Date.now().toString() };
  }

  // Prefer XMLHttpRequest to support upload progress
  if (onProgress) {
    return await new Promise((resolve, reject) => {
      try {
        const fd = new FormData();
        fd.append("file", file);
        const xhr = new XMLHttpRequest();
        xhr.open("POST", `${apiBase}/api/upload`, true);
        xhr.withCredentials = true;
        xhr.upload.onprogress = (evt) => {
          if (evt.lengthComputable) {
            const percent = Math.round((evt.loaded / evt.total) * 100);
            onProgress(percent);
          }
        };
        xhr.onerror = () => {
          if (import.meta.env.DEV) {
            if (onProgress) {
              let p = 0;
              onProgress(0);
              const timer = setInterval(() => {
                p = Math.min(p + 25, 100);
                onProgress(p);
                if (p >= 100) {
                  clearInterval(timer);
                  resolve({ file_url: URL.createObjectURL(file), id: Date.now().toString() });
                }
              }, 80);
            } else {
              resolve({ file_url: URL.createObjectURL(file), id: Date.now().toString() });
            }
            return;
          }
          reject(new Error("Upload failed"));
        };
        xhr.onreadystatechange = () => {
          if (xhr.readyState === 4) {
            if (xhr.status >= 200 && xhr.status < 300) {
              try {
                const json = JSON.parse(xhr.responseText || '{}');
                resolve(json);
              } catch (e) {
                resolve({});
              }
            } else {
              if (import.meta.env.DEV) {
                if (onProgress) {
                  let p = 0;
                  onProgress(0);
                  const timer = setInterval(() => {
                    p = Math.min(p + 25, 100);
                    onProgress(p);
                    if (p >= 100) {
                      clearInterval(timer);
                      resolve({ file_url: URL.createObjectURL(file), id: Date.now().toString() });
                    }
                  }, 80);
                } else {
                  resolve({ file_url: URL.createObjectURL(file), id: Date.now().toString() });
                }
                return;
              }
              reject(new Error("Upload failed"));
            }
          }
        };
        xhr.send(fd);
      } catch (err) {
        reject(err);
      }
    });
  }

  // Fallback: fetch without progress
  const fd = new FormData();
  fd.append("file", file);
  let res;
  try {
    res = await fetch(`${apiBase}/api/upload`, {
      method: "POST",
      body: fd,
      credentials: "include",
    });
  } catch (err) {
    if (enableMocks || import.meta.env.DEV) {
      return { file_url: URL.createObjectURL(file), id: Date.now().toString() };
    }
    throw err;
  }
  if (!res.ok) {
    const error = await res.json().catch(() => ({ message: "Upload failed" }));
    throw new Error(error.message || "Upload failed");
  }
  return res.json();
}

/**
 * Analyze Abrechnung
 */
export async function analyzeAbrechnung(abrechnungId) {
  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:8000";

  const res = await fetch(`${apiBase}/api/analyze`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ abrechnung_id: abrechnungId }),
    credentials: "include",
  });
  if (!res.ok) throw new Error("Analyse failed");
  return res.json();
}

/**
 * Get Report
 */
export async function getReport(abrechnungId) {
  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:8000";

  const res = await fetch(`${apiBase}/api/report/${abrechnungId}`, {
    credentials: "include",
  });
  if (!res.ok) throw new Error("Report failed");
  return res.json();
}

// Legacy-Exports für Kompatibilität
export const Core = {};

/**
 * InvokeLLM - OpenAI Integration über Backend
 * 2025 Best Practice: Returns structured response with content string
 */
export const InvokeLLM = async ({ prompt, system_prompt, temperature, max_tokens, response_json_schema }) => {
  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:8000";
  
  try {
    const res = await fetch(`${apiBase}/api/llm/invoke`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        prompt,
        system_prompt,
        temperature: temperature || 0.7,
        max_tokens: max_tokens || 4096,
        json_mode: !!response_json_schema
      }),
      credentials: "include"
    });
    
    if (!res.ok) {
      const error = await res.json().catch(() => ({ detail: "LLM-Anfrage fehlgeschlagen" }));
      throw new Error(error.detail || "LLM service unavailable");
    }
    
    const result = await res.json();
    
    // If JSON mode and schema provided, parse and validate
    if (response_json_schema && result.content) {
      try {
        const parsed = JSON.parse(result.content);
        return parsed; // Return parsed JSON directly for convenience
      } catch (e) {
        console.warn('[LLM] Failed to parse JSON response:', e);
        return result.content; // Fallback to raw content
      }
    }
    
    // Return content string for text responses
    return result.content || result;
  } catch (error) {
    console.error('[LLM Error]', error);
    
    // For JSON mode, return empty object
    if (response_json_schema) {
      return {};
    }
    
    // For text mode, return error message
    return `⚠️ **Backend nicht erreichbar**

Die KI-Funktion ist derzeit nicht verfügbar.

**Error:** ${error.message}`;
  }
};

/**
 * ExtractDataFromUploadedFile - PDF-Extraktion
 * Uses /api/forms/extract for universal PDF form extraction
 */
export const ExtractDataFromUploadedFile = async (fileOrId) => {
  const apiBase = import.meta.env.VITE_API_BASE || "http://localhost:8000";
  
  try {
    // If it's a file object, upload it first
    if (fileOrId instanceof File || (fileOrId && fileOrId.name)) {
      const formData = new FormData();
      formData.append('file', fileOrId);
      formData.append('ocr_enabled', 'true');
      
      const res = await fetch(`${apiBase}/api/forms/extract`, {
        method: "POST",
        body: formData,
        credentials: "include"
      });
      
      if (!res.ok) throw new Error("PDF extraction failed");
      
      const result = await res.json();
      return {
        success: true,
        form_schema: result.form_schema,
        upload_id: result.upload_id
      };
    }
    
    // Otherwise, treat as upload_id and fetch schema
    const res = await fetch(`${apiBase}/api/forms/schema/${fileOrId}`, {
      credentials: "include"
    });
    
    if (!res.ok) throw new Error("Schema retrieval failed");
    
    const schema = await res.json();
    return {
      success: true,
      form_schema: schema,
      upload_id: fileOrId
    };
  } catch (error) {
    console.error('[PDF Extraction Error]', error);
    return {
      success: false,
      error: error.message,
      form_schema: {
        form_id: 'error',
        title: 'Extraction Failed',
        fields: [],
        source: {}
      }
    };
  }
};

export const SendEmail = async () => ({ success: true });
export const UploadFile = uploadFile;
export const GenerateImage = async () => ({ url: "https://via.placeholder.com/400" });
export const CreateFileSignedUrl = async () => ({ url: "#" });
export const UploadPrivateFile = uploadFile;
