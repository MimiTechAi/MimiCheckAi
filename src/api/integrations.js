// src/api/integrations.js - MIMITECH Backend Integration
import { supabase } from './supabaseClient';

/**
 * Upload File to Supabase Storage
 */
export async function uploadFile(file, options = {}) {
  const onProgress = typeof options === 'function' ? options : options?.onProgress;
  
  try {
    // Simulate progress for UX
    if (onProgress) {
      onProgress(10);
    }

    // Generate unique filename
    const timestamp = Date.now();
    const safeFileName = file.name.replace(/[^a-zA-Z0-9.-]/g, '_');
    const filePath = `uploads/${timestamp}_${safeFileName}`;

    if (onProgress) {
      onProgress(30);
    }

    // Upload to Supabase Storage
    console.log('🔄 Uploading to Supabase Storage...', filePath);
    const { data, error } = await supabase.storage
      .from('documents')
      .upload(filePath, file, {
        cacheControl: '3600',
        upsert: false
      });

    console.log('📦 Storage response:', { data, error });

    if (onProgress) {
      onProgress(70);
    }

    if (error) {
      console.error('❌ Supabase Storage upload error:', error);
      // Fallback: Return local blob URL for development
      if (import.meta.env.DEV) {
        console.warn('Using local fallback for file upload');
        if (onProgress) onProgress(100);
        return { 
          file_url: URL.createObjectURL(file), 
          id: timestamp.toString(),
          local: true 
        };
      }
      throw new Error(`Upload fehlgeschlagen: ${error.message}`);
    }

    // Get public URL
    const { data: urlData } = supabase.storage
      .from('documents')
      .getPublicUrl(data.path);

    if (onProgress) {
      onProgress(100);
    }

    return {
      file_url: urlData.publicUrl,
      url: urlData.publicUrl,
      id: timestamp.toString(),
      path: data.path
    };

  } catch (err) {
    console.error('Upload error:', err);
    // Fallback for development
    if (import.meta.env.DEV) {
      console.warn('Using local fallback for file upload');
      if (onProgress) onProgress(100);
      return { 
        file_url: URL.createObjectURL(file), 
        id: Date.now().toString(),
        local: true 
      };
    }
    throw err;
  }
}

/**
 * Analyze Abrechnung - Uses Supabase Edge Function
 */
export async function analyzeAbrechnung(abrechnungId) {
  try {
    const { data, error } = await supabase.functions.invoke('analyze-eligibility', {
      body: { abrechnung_id: abrechnungId }
    });
    
    if (error) throw error;
    return data;
  } catch (err) {
    console.error('Analysis error:', err);
    // Return mock analysis for development
    if (import.meta.env.DEV) {
      return {
        issues_found: [],
        savings_potential: Math.floor(Math.random() * 500),
        legal_compliance_score: 85 + Math.floor(Math.random() * 15)
      };
    }
    throw err;
  }
}

/**
 * Get Report
 */
export async function getReport(abrechnungId) {
  // Report is stored in Supabase - fetch from database
  const { data, error } = await supabase
    .from('abrechnungen')
    .select('*')
    .eq('id', abrechnungId)
    .single();
    
  if (error) throw new Error("Report nicht gefunden");
  return data;
}

// Legacy-Exports für Kompatibilität
export const Core = {};

/**
 * InvokeLLM - OpenAI Integration über Supabase Edge Function
 * 2025 Best Practice: Uses Supabase Edge Function for secure API calls
 */
export const InvokeLLM = async ({ prompt, system_prompt, temperature, max_tokens, response_json_schema }) => {
  try {
    // Use Supabase Edge Function for AI chat
    const { data, error } = await supabase.functions.invoke('ai-chat', {
      body: {
        systemPrompt: system_prompt || `Du bist ein hilfreicher KI-Assistent für MiMiCheck, 
eine App die Nutzern hilft ihre Nebenkostenabrechnungen zu prüfen und staatliche Förderungen zu finden.
Antworte immer auf Deutsch, freundlich und kompetent.`,
        messages: [
          { role: 'user', content: prompt }
        ]
      }
    });
    
    if (error) {
      console.error('[LLM Edge Function Error]', error);
      throw new Error(error.message || 'Edge Function Fehler');
    }
    
    // Edge Function returns { response: "..." }
    const responseText = data?.response || data?.content || '';
    
    // If JSON mode and schema provided, try to parse
    if (response_json_schema && responseText) {
      try {
        // Try to extract JSON from response
        const jsonMatch = responseText.match(/```json\n?([\s\S]*?)\n?```/) || 
                         responseText.match(/\{[\s\S]*\}/);
        if (jsonMatch) {
          const parsed = JSON.parse(jsonMatch[1] || jsonMatch[0]);
          return parsed;
        }
        return JSON.parse(responseText);
      } catch (e) {
        console.warn('[LLM] Failed to parse JSON response:', e);
        return responseText;
      }
    }
    
    return responseText;
  } catch (error) {
    console.error('[LLM Error]', error);
    
    // For JSON mode, return empty object
    if (response_json_schema) {
      return {};
    }
    
    // For text mode, return helpful error message
    return `⚠️ **KI-Assistent vorübergehend nicht verfügbar**

Bitte versuchen Sie es in wenigen Minuten erneut.

Falls das Problem weiterhin besteht, kontaktieren Sie bitte unseren Support.`;
  }
};

/**
 * ExtractDataFromUploadedFile - PDF/Dokument-Extraktion
 * Uses Supabase Edge Function for document extraction
 */
export const ExtractDataFromUploadedFile = async (fileOrId) => {
  try {
    // If it's a file object, we need to upload it first and then extract
    if (fileOrId instanceof File || (fileOrId && fileOrId.name)) {
      // First upload the file
      const uploadResult = await uploadFile(fileOrId);
      
      if (!uploadResult?.file_url) {
        throw new Error('File upload failed');
      }
      
      // Then call extract-document Edge Function
      const { data, error } = await supabase.functions.invoke('extract-document', {
        body: {
          file_url: uploadResult.file_url,
          filename: fileOrId.name
        }
      });
      
      if (error) {
        console.error('[Extract Document Error]', error);
        throw new Error(error.message || 'Extraction failed');
      }
      
      return {
        success: true,
        form_schema: data?.form_schema || data,
        upload_id: uploadResult.id,
        extracted_data: data?.extracted_data || data
      };
    }
    
    // If it's an ID, we assume the document is already in the database
    // Fetch from abrechnungen table
    const { data: abrechnung, error } = await supabase
      .from('abrechnungen')
      .select('extracted_data')
      .eq('id', fileOrId)
      .single();
    
    if (error) throw new Error('Document not found');
    
    return {
      success: true,
      form_schema: abrechnung?.extracted_data || {},
      upload_id: fileOrId,
      extracted_data: abrechnung?.extracted_data
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
