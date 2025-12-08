/**
 * Utils Index
 * 
 * Zentrale Export-Datei für alle Utility-Funktionen
 */

// Logging
export { logger } from './logger';
export type { LogLevel } from './logger';

// Error Handling
export { 
  handleError, 
  getUserMessage, 
  categorizeError, 
  withErrorHandler,
  useErrorHandler,
  ErrorTypes 
} from './errorHandler';
export type { 
  ErrorType, 
  AppError, 
  ErrorContext, 
  HandledError, 
  AsyncResult 
} from './errorHandler';

// API Client
export { api, apiRequest, callEdgeFunction } from './apiClient';
export type { 
  ApiRequestConfig, 
  ApiResponse, 
  EdgeFunctionOptions 
} from './apiClient';

// Navigation Helpers
/**
 * Erstellt eine URL für eine Seite basierend auf dem Namen
 * @param pageName - Name der Seite (z.B. "Dashboard", "ProfilSeite")
 * @returns Die URL (z.B. "/dashboard", "/profilseite")
 */
export function createPageUrl(pageName: string): string {
  return '/' + pageName.toLowerCase().replace(/ /g, '-');
}
