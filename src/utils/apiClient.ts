/**
 * API Client mit Best Practices
 * 
 * Features:
 * - Automatische Retry-Logik bei Netzwerkfehlern
 * - Request Timeout
 * - Zentrales Error-Handling
 * - Request/Response Logging (nur Dev)
 */

import { logger } from './logger';
import { handleError, ErrorTypes, type HandledError, type AppError } from './errorHandler';

const DEFAULT_TIMEOUT = 10000; // 10 Sekunden
const MAX_RETRIES = 3;
const RETRY_DELAY = 1000; // 1 Sekunde

/**
 * Timeout-Controller mit Cleanup
 */
interface TimeoutController {
  controller: AbortController;
  timeoutId: NodeJS.Timeout;
}

/**
 * API Request Konfiguration
 */
export interface ApiRequestConfig {
  timeout?: number;
  retries?: number;
  retryDelay?: number;
  retryCondition?: (error: HandledError) => boolean;
}

/**
 * API Response Typ
 */
export interface ApiResponse<T = unknown> {
  data: T | null;
  error: HandledError | null;
  status?: number;
}

/**
 * Erstellt einen Timeout-Controller
 */
function createTimeoutController(ms: number = DEFAULT_TIMEOUT): TimeoutController {
  const controller = new AbortController();
  const timeoutId = setTimeout(() => controller.abort(), ms);
  return { controller, timeoutId };
}

/**
 * Wartet eine bestimmte Zeit
 */
const delay = (ms: number): Promise<void> => new Promise(resolve => setTimeout(resolve, ms));

/**
 * API Request mit Retry-Logik
 * 
 * @param url - Die URL des Requests
 * @param options - Fetch-Optionen
 * @param config - Zusätzliche Konfiguration
 */
export async function apiRequest<T = unknown>(
  url: string,
  options: RequestInit = {},
  config: ApiRequestConfig = {}
): Promise<ApiResponse<T>> {
  const {
    timeout = DEFAULT_TIMEOUT,
    retries = MAX_RETRIES,
    retryDelay = RETRY_DELAY,
    retryCondition = (error) => error.type === ErrorTypes.NETWORK || error.type === ErrorTypes.SERVER
  } = config;
  
  let lastError: HandledError | null = null;
  
  for (let attempt = 0; attempt <= retries; attempt++) {
    const { controller, timeoutId } = createTimeoutController(timeout);
    
    try {
      logger.debug(`API Request [${attempt + 1}/${retries + 1}]`, { url, method: options.method || 'GET' });
      
      const response = await fetch(url, {
        ...options,
        signal: controller.signal,
        headers: {
          'Content-Type': 'application/json',
          ...options.headers
        }
      });
      
      clearTimeout(timeoutId);
      
      // Response parsen
      let data: T;
      const contentType = response.headers.get('content-type');
      if (contentType?.includes('application/json')) {
        data = await response.json() as T;
      } else {
        data = await response.text() as T;
      }
      
      // Fehler bei nicht-OK Status
      if (!response.ok) {
        const error: AppError = new Error(
          (data as { message?: string; error?: string })?.message || 
          (data as { message?: string; error?: string })?.error || 
          `HTTP ${response.status}`
        );
        error.status = response.status;
        error.data = data;
        throw error;
      }
      
      logger.debug('API Response', { url, status: response.status, data });
      return { data, error: null, status: response.status };
      
    } catch (error) {
      clearTimeout(timeoutId);
      
      // Timeout-Fehler
      if ((error as Error).name === 'AbortError') {
        const timeoutError: AppError = new Error('Request timeout');
        timeoutError.type = ErrorTypes.NETWORK;
        lastError = handleError(timeoutError, { url, attempt: attempt + 1 });
      } else {
        lastError = handleError(error, { url, attempt: attempt + 1 });
      }
      
      // Retry wenn Bedingung erfüllt und nicht letzter Versuch
      if (attempt < retries && retryCondition(lastError)) {
        logger.warn(`Retry in ${retryDelay}ms...`, { attempt: attempt + 1, url });
        await delay(retryDelay * (attempt + 1)); // Exponentielles Backoff
        continue;
      }
      
      break;
    }
  }
  
  return { data: null, error: lastError };
}

/**
 * Edge Function Optionen
 */
export interface EdgeFunctionOptions extends ApiRequestConfig {
  headers?: Record<string, string>;
}

/**
 * Supabase Edge Function aufrufen
 */
export async function callEdgeFunction<T = unknown>(
  functionName: string,
  body: Record<string, unknown> = {},
  options: EdgeFunctionOptions = {}
): Promise<ApiResponse<T>> {
  const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
  const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;
  
  if (!supabaseUrl || !anonKey) {
    return {
      data: null,
      error: handleError(new Error('Supabase nicht konfiguriert'), { functionName })
    };
  }
  
  const url = `${supabaseUrl}/functions/v1/${functionName}`;
  
  return apiRequest<T>(url, {
    method: 'POST',
    headers: {
      'Authorization': `Bearer ${anonKey}`,
      ...options.headers
    },
    body: JSON.stringify(body)
  }, options);
}

/**
 * HTTP Methoden Shortcuts
 */
export const api = {
  get: <T = unknown>(url: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> => 
    apiRequest<T>(url, { method: 'GET' }, config),
  
  post: <T = unknown>(url: string, data: unknown, config?: ApiRequestConfig): Promise<ApiResponse<T>> => 
    apiRequest<T>(url, { 
      method: 'POST', 
      body: JSON.stringify(data) 
    }, config),
  
  put: <T = unknown>(url: string, data: unknown, config?: ApiRequestConfig): Promise<ApiResponse<T>> => 
    apiRequest<T>(url, { 
      method: 'PUT', 
      body: JSON.stringify(data) 
    }, config),
  
  patch: <T = unknown>(url: string, data: unknown, config?: ApiRequestConfig): Promise<ApiResponse<T>> => 
    apiRequest<T>(url, { 
      method: 'PATCH', 
      body: JSON.stringify(data) 
    }, config),
  
  delete: <T = unknown>(url: string, config?: ApiRequestConfig): Promise<ApiResponse<T>> => 
    apiRequest<T>(url, { method: 'DELETE' }, config),
  
  edgeFunction: callEdgeFunction
};

export default api;
