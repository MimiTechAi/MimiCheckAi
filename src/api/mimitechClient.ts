import supabaseEntities from './supabaseEntities';

interface EdgeFunctionOptions {
  body?: Record<string, unknown>;
  [key: string]: unknown;
}

interface EdgeFunctionResult<T = unknown> {
  data: T;
  status: number;
}

interface UploadFileParams {
  file: File;
}

interface ExtractDocumentParams {
  file_url: string;
  json_schema: Record<string, unknown>;
}

// ✅ PRODUCTION MODE - Supabase Database
// Alle Daten werden in echter Supabase-Datenbank gespeichert
// KEINE LocalStorage, KEINE Mock-Daten
export const mimitech = {
  entities: {
    Abrechnung: supabaseEntities.Abrechnung,
    UserProfile: supabaseEntities.UserProfile,
    Foerderleistung: supabaseEntities.Foerderleistung,
    Antrag: supabaseEntities.Antrag,
    Anspruchspruefung: supabaseEntities.Antrag, // Alias
  },
  auth: supabaseEntities.Auth,
  functions: {
    invoke: async <T = unknown>(
      functionName: string,
      options: EdgeFunctionOptions
    ): Promise<EdgeFunctionResult<T>> => {
      // Supabase Edge Functions aufrufen
      const { supabase } = await import('./supabaseClient');
      const { data, error } = await supabase.functions.invoke(functionName, {
        body: options.body || options
      });

      if (error) throw error;
      return { data, status: 200 };
    }
  },
  integrations: {
    Core: {
      UploadFile: async ({ file }: UploadFileParams) => {
        const { uploadFile } = await import('./integrations');
        return await uploadFile(file);
      },
      ExtractDataFromUploadedFile: async ({ file_url, json_schema }: ExtractDocumentParams) => {
        // Call Supabase Edge Function for document extraction
        const { supabase } = await import('./supabaseClient');
        
        const { data, error } = await supabase.functions.invoke('extract-document', {
          body: { file_url, json_schema }
        });
        
        if (error) {
          console.error('Extract document error:', error);
          throw new Error(`Extraktion fehlgeschlagen: ${error.message}`);
        }
        
        return data;
      }
    }
  }
};

export default mimitech;
