/**
 * Zentraler Error Handler
 * 
 * Best Practice: Alle Fehler an einer Stelle behandeln
 * für konsistentes Error-Handling und Logging.
 */

import { logger } from './logger';

/**
 * API-Fehler Typen
 */
export const ErrorTypes = {
  NETWORK: 'NETWORK_ERROR',
  AUTH: 'AUTH_ERROR',
  VALIDATION: 'VALIDATION_ERROR',
  NOT_FOUND: 'NOT_FOUND',
  SERVER: 'SERVER_ERROR',
  UNKNOWN: 'UNKNOWN_ERROR'
} as const;

export type ErrorType = typeof ErrorTypes[keyof typeof ErrorTypes];

/**
 * Erweiterte Error-Schnittstelle mit zusätzlichen Feldern
 */
export interface AppError extends Error {
  status?: number;
  statusCode?: number;
  code?: string;
  data?: unknown;
  type?: ErrorType;
}

/**
 * Kontext für Error-Handling
 */
export interface ErrorContext {
  component?: string;
  action?: string;
  url?: string;
  attempt?: number;
  [key: string]: unknown;
}

/**
 * Rückgabe-Typ des Error-Handlers
 */
export interface HandledError {
  type: ErrorType;
  message: string;
  userMessage: string;
  isRetryable: boolean;
}

/**
 * Kategorisiert Fehler basierend auf Status-Code oder Typ
 */
export function categorizeError(error: unknown): ErrorType {
  if (!error) return ErrorTypes.UNKNOWN;
  
  const err = error as AppError;
  
  // Netzwerk-Fehler
  if (err.name === 'TypeError' && err.message?.includes('fetch')) {
    return ErrorTypes.NETWORK;
  }
  
  // HTTP Status-basiert
  const status = err.status || err.statusCode;
  if (status) {
    if (status === 401 || status === 403) return ErrorTypes.AUTH;
    if (status === 404) return ErrorTypes.NOT_FOUND;
    if (status === 422 || status === 400) return ErrorTypes.VALIDATION;
    if (status >= 500) return ErrorTypes.SERVER;
  }
  
  // Supabase-spezifische Fehler
  if (err.code) {
    if (err.code.includes('auth')) return ErrorTypes.AUTH;
    if (err.code.includes('validation')) return ErrorTypes.VALIDATION;
  }
  
  return ErrorTypes.UNKNOWN;
}

/**
 * Benutzerfreundliche Fehlermeldungen
 */
const userMessages: Record<ErrorType, string> = {
  [ErrorTypes.NETWORK]: 'Keine Internetverbindung. Bitte überprüfen Sie Ihre Verbindung.',
  [ErrorTypes.AUTH]: 'Ihre Sitzung ist abgelaufen. Bitte melden Sie sich erneut an.',
  [ErrorTypes.VALIDATION]: 'Bitte überprüfen Sie Ihre Eingaben.',
  [ErrorTypes.NOT_FOUND]: 'Die angeforderten Daten wurden nicht gefunden.',
  [ErrorTypes.SERVER]: 'Ein Serverfehler ist aufgetreten. Bitte versuchen Sie es später erneut.',
  [ErrorTypes.UNKNOWN]: 'Ein unerwarteter Fehler ist aufgetreten.'
};

/**
 * Gibt eine benutzerfreundliche Fehlermeldung zurück
 */
export function getUserMessage(error: unknown): string {
  const type = categorizeError(error);
  return userMessages[type] || userMessages[ErrorTypes.UNKNOWN];
}

/**
 * Zentraler Error Handler
 * 
 * @param error - Der aufgetretene Fehler
 * @param context - Zusätzlicher Kontext (z.B. { component: 'Profile', action: 'save' })
 * @returns Strukturierte Fehlerinformation
 */
export function handleError(error: unknown, context: ErrorContext = {}): HandledError {
  const type = categorizeError(error);
  const userMessage = getUserMessage(error);
  const err = error as AppError;
  
  // Strukturiertes Logging
  logger.error('Error occurred', {
    type,
    message: err?.message || 'Unknown error',
    stack: err?.stack,
    context,
    timestamp: new Date().toISOString()
  });
  
  // Bei Auth-Fehlern: Session löschen und zur Login-Seite
  if (type === ErrorTypes.AUTH) {
    try {
      localStorage.removeItem('mimicheck-auth');
    } catch {
      // Ignore localStorage errors
    }
  }
  
  return {
    type,
    message: err?.message || 'Unknown error',
    userMessage,
    isRetryable: type === ErrorTypes.NETWORK || type === ErrorTypes.SERVER
  };
}

/**
 * Rückgabe-Typ für async Funktionen mit Error-Handling
 */
export interface AsyncResult<T> {
  data: T | null;
  error: HandledError | null;
}

/**
 * Wrapper für async Funktionen mit Error-Handling
 * 
 * @example
 * const result = await withErrorHandler(
 *   async () => await api.getData(),
 *   { component: 'DataList', action: 'fetch' }
 * );
 */
export async function withErrorHandler<T>(
  asyncFn: () => Promise<T>,
  context: ErrorContext = {}
): Promise<AsyncResult<T>> {
  try {
    const data = await asyncFn();
    return { data, error: null };
  } catch (error) {
    return { data: null, error: handleError(error, context) };
  }
}

/**
 * React Hook für Error-Handling
 */
export function useErrorHandler() {
  return {
    handleError,
    getUserMessage,
    categorizeError,
    withErrorHandler
  };
}

export default {
  handleError,
  getUserMessage,
  categorizeError,
  withErrorHandler,
  ErrorTypes
};
