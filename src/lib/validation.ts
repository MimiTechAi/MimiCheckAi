/**
 * Input Validation Schemas
 * Feature: enterprise-quality-audit
 * 
 * Centralized validation schemas using Zod for type-safe input validation
 * across forms and API endpoints.
 */

import { z } from 'zod';

// ============================================================================
// User Profile Validation
// ============================================================================

export const userProfileSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein').max(100, 'Name zu lang'),
  phone: z.string().regex(/^\+?[0-9\s\-()]+$/, 'Ungültige Telefonnummer').optional(),
});

export type UserProfile = z.infer<typeof userProfileSchema>;

// ============================================================================
// Authentication Validation
// ============================================================================

export const loginSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string().min(8, 'Passwort muss mindestens 8 Zeichen lang sein'),
});

export const signupSchema = z.object({
  email: z.string().email('Ungültige E-Mail-Adresse'),
  password: z.string()
    .min(8, 'Passwort muss mindestens 8 Zeichen lang sein')
    .regex(/[A-Z]/, 'Passwort muss mindestens einen Großbuchstaben enthalten')
    .regex(/[a-z]/, 'Passwort muss mindestens einen Kleinbuchstaben enthalten')
    .regex(/[0-9]/, 'Passwort muss mindestens eine Zahl enthalten'),
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein').max(100, 'Name zu lang'),
});

export type LoginInput = z.infer<typeof loginSchema>;
export type SignupInput = z.infer<typeof signupSchema>;

// ============================================================================
// Document Upload Validation
// ============================================================================

export const documentUploadSchema = z.object({
  file: z.instanceof(File)
    .refine((file) => file.size <= 10 * 1024 * 1024, 'Datei darf maximal 10MB groß sein')
    .refine(
      (file) => ['application/pdf', 'image/jpeg', 'image/png', 'image/jpg'].includes(file.type),
      'Nur PDF, JPEG und PNG Dateien sind erlaubt'
    ),
  description: z.string().max(500, 'Beschreibung zu lang').optional(),
});

export type DocumentUpload = z.infer<typeof documentUploadSchema>;

// ============================================================================
// Application/Antrag Validation
// ============================================================================

export const applicationSchema = z.object({
  type: z.enum(['wohngeld', 'kindergeld', 'bafoeg', 'elterngeld', 'other'], {
    errorMap: () => ({ message: 'Ungültiger Antragstyp' }),
  }),
  title: z.string().min(3, 'Titel muss mindestens 3 Zeichen lang sein').max(200, 'Titel zu lang'),
  description: z.string().max(2000, 'Beschreibung zu lang').optional(),
  estimatedAmount: z.number().min(0, 'Betrag muss positiv sein').optional(),
});

export const applicationUpdateSchema = applicationSchema.partial().extend({
  id: z.number().int().positive('Ungültige ID'),
  status: z.enum(['draft', 'submitted', 'processing', 'approved', 'rejected']).optional(),
});

export type Application = z.infer<typeof applicationSchema>;
export type ApplicationUpdate = z.infer<typeof applicationUpdateSchema>;

// ============================================================================
// Contact Form Validation
// ============================================================================

export const contactFormSchema = z.object({
  name: z.string().min(2, 'Name muss mindestens 2 Zeichen lang sein').max(100, 'Name zu lang'),
  email: z.string().email('Ungültige E-Mail-Adresse'),
  subject: z.string().min(3, 'Betreff muss mindestens 3 Zeichen lang sein').max(200, 'Betreff zu lang'),
  message: z.string().min(10, 'Nachricht muss mindestens 10 Zeichen lang sein').max(2000, 'Nachricht zu lang'),
});

export type ContactForm = z.infer<typeof contactFormSchema>;

// ============================================================================
// Search/Filter Validation
// ============================================================================

export const searchSchema = z.object({
  query: z.string().max(200, 'Suchbegriff zu lang').optional(),
  category: z.string().max(50, 'Kategorie zu lang').optional(),
  status: z.enum(['draft', 'submitted', 'processing', 'approved', 'rejected', 'all']).optional(),
  limit: z.number().int().min(1).max(100).default(20),
  offset: z.number().int().min(0).default(0),
});

export type SearchParams = z.infer<typeof searchSchema>;

// ============================================================================
// Pagination Validation
// ============================================================================

export const paginationSchema = z.object({
  page: z.number().int().min(1).default(1),
  pageSize: z.number().int().min(1).max(100).default(20),
});

export type Pagination = z.infer<typeof paginationSchema>;

// ============================================================================
// ID Validation
// ============================================================================

export const idSchema = z.object({
  id: z.number().int().positive('Ungültige ID'),
});

export const stringIdSchema = z.object({
  id: z.string().uuid('Ungültige ID'),
});

export type IdParam = z.infer<typeof idSchema>;
export type StringIdParam = z.infer<typeof stringIdSchema>;

// ============================================================================
// Wohngeld Specific Validation
// ============================================================================

export const wohngeldSchema = z.object({
  // Persönliche Daten
  vorname: z.string().min(2, 'Vorname muss mindestens 2 Zeichen lang sein').max(50),
  nachname: z.string().min(2, 'Nachname muss mindestens 2 Zeichen lang sein').max(50),
  geburtsdatum: z.string().regex(/^\d{4}-\d{2}-\d{2}$/, 'Ungültiges Datumsformat (YYYY-MM-DD)'),
  
  // Adresse
  strasse: z.string().min(3, 'Straße muss mindestens 3 Zeichen lang sein').max(100),
  hausnummer: z.string().min(1).max(10),
  plz: z.string().regex(/^\d{5}$/, 'PLZ muss 5 Ziffern haben'),
  ort: z.string().min(2).max(100),
  
  // Wohnung
  wohnflaeche: z.number().min(10, 'Wohnfläche muss mindestens 10m² sein').max(500, 'Wohnfläche zu groß'),
  kaltmiete: z.number().min(0, 'Kaltmiete muss positiv sein').max(10000, 'Kaltmiete zu hoch'),
  nebenkosten: z.number().min(0, 'Nebenkosten müssen positiv sein').max(5000, 'Nebenkosten zu hoch'),
  
  // Haushalt
  anzahlPersonen: z.number().int().min(1, 'Mindestens 1 Person').max(20, 'Zu viele Personen'),
  
  // Einkommen
  bruttoEinkommen: z.number().min(0, 'Einkommen muss positiv sein').max(100000, 'Einkommen zu hoch'),
});

export type WohngeldData = z.infer<typeof wohngeldSchema>;

// ============================================================================
// Utility Functions
// ============================================================================

/**
 * Validates data against a schema and returns typed result
 */
export function validateData<T>(schema: z.ZodSchema<T>, data: unknown): { success: true; data: T } | { success: false; errors: z.ZodError } {
  const result = schema.safeParse(data);
  
  if (result.success) {
    return { success: true, data: result.data };
  } else {
    return { success: false, errors: result.error };
  }
}

/**
 * Formats Zod errors for display
 */
export function formatZodErrors(error: z.ZodError): Record<string, string> {
  const formatted: Record<string, string> = {};
  
  error.errors.forEach((err) => {
    const path = err.path.join('.');
    formatted[path] = err.message;
  });
  
  return formatted;
}

/**
 * Validates a single field
 */
export function validateField<T>(schema: z.ZodSchema<T>, fieldName: string, value: unknown): string | null {
  try {
    schema.parse({ [fieldName]: value });
    return null;
  } catch (error) {
    if (error instanceof z.ZodError) {
      const fieldError = error.errors.find((err) => err.path[0] === fieldName);
      return fieldError?.message || 'Validierungsfehler';
    }
    return 'Unbekannter Fehler';
  }
}

// ============================================================================
// Common Validators
// ============================================================================

export const validators = {
  email: (value: string) => z.string().email().safeParse(value).success,
  phone: (value: string) => z.string().regex(/^\+?[0-9\s\-()]+$/).safeParse(value).success,
  plz: (value: string) => z.string().regex(/^\d{5}$/).safeParse(value).success,
  date: (value: string) => z.string().regex(/^\d{4}-\d{2}-\d{2}$/).safeParse(value).success,
  positiveNumber: (value: number) => z.number().positive().safeParse(value).success,
  url: (value: string) => z.string().url().safeParse(value).success,
};

