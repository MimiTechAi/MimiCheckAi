/**
 * Accessibility Utilities
 * 
 * Helpers für barrierefreie Komponenten
 */

import React from 'react';

/**
 * Form Field Props Optionen
 */
export interface FormFieldOptions {
  id?: string;
  label?: string;
  error?: string | boolean;
  required?: boolean;
  description?: string;
}

/**
 * Form Field Props Rückgabe
 */
export interface FormFieldProps {
  labelProps: {
    htmlFor: string;
  };
  inputProps: {
    id: string;
    'aria-required'?: boolean;
    'aria-invalid'?: boolean;
    'aria-describedby'?: string;
  };
  errorProps: {
    id?: string;
    role?: string;
    'aria-live'?: 'polite' | 'assertive';
  };
  descriptionProps: {
    id?: string;
  };
}

/**
 * Generiert eine eindeutige ID für Form-Labels
 * @param prefix - Prefix für die ID
 * @returns Eindeutige ID
 */
let idCounter = 0;
export function generateId(prefix: string = 'a11y'): string {
  return `${prefix}-${++idCounter}`;
}

/**
 * Erstellt ARIA-Attribute für eine Form-Field-Gruppe
 * @param options - Optionen
 * @returns Props für Input und Label
 */
export function getFormFieldProps(options: FormFieldOptions): FormFieldProps {
  const { id, error, required, description } = options;
  
  const inputId = id || generateId('field');
  const errorId = error ? `${inputId}-error` : undefined;
  const descriptionId = description ? `${inputId}-desc` : undefined;
  
  return {
    labelProps: {
      htmlFor: inputId,
    },
    inputProps: {
      id: inputId,
      'aria-required': required || undefined,
      'aria-invalid': error ? true : undefined,
      'aria-describedby': [errorId, descriptionId].filter(Boolean).join(' ') || undefined,
    },
    errorProps: errorId ? {
      id: errorId,
      role: 'alert',
      'aria-live': 'polite',
    } : {},
    descriptionProps: descriptionId ? {
      id: descriptionId,
    } : {},
  };
}

/**
 * Skip Link Props
 */
export interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
}

/**
 * Skip Link Props
 */
export interface SkipLinkProps {
  href?: string;
  children?: React.ReactNode;
}

/**
 * Skip-Link für Keyboard-Navigation
 * Sollte als erstes Element im Body sein
 * 
 * Note: Diese Komponente sollte in einer .tsx Datei verwendet werden
 */
export const createSkipLinkProps = (href: string = '#main-content'): React.AnchorHTMLAttributes<HTMLAnchorElement> => ({
  href,
  className: "sr-only focus:not-sr-only focus:absolute focus:top-4 focus:left-4 focus:z-50 focus:bg-white focus:px-4 focus:py-2 focus:text-black focus:rounded focus:shadow-lg"
});

/**
 * Visually Hidden Props
 */
export interface VisuallyHiddenProps {
  children: React.ReactNode;
  as?: React.ElementType;
}

/**
 * Screen-Reader-only Text Props
 * Für visuell versteckte aber lesbare Texte
 * 
 * Note: Diese Komponente sollte in einer .tsx Datei verwendet werden
 */
export const createVisuallyHiddenProps = (): React.HTMLAttributes<HTMLElement> => ({
  className: "sr-only"
});

/**
 * Live Region Props
 */
export interface LiveRegionProps {
  message: string;
  priority?: 'polite' | 'assertive';
}

/**
 * Live-Region Props für dynamische Inhalts-Ankündigungen
 * 
 * Note: Diese Komponente sollte in einer .tsx Datei verwendet werden
 */
export const createLiveRegionProps = (priority: 'polite' | 'assertive' = 'polite'): React.HTMLAttributes<HTMLDivElement> => ({
  role: "status",
  'aria-live': priority,
  'aria-atomic': "true",
  className: "sr-only"
});

/**
 * Keyboard-Navigation Trap
 * Hält Fokus innerhalb eines Elements (z.B. Modal)
 */
export function useFocusTrap(ref: React.RefObject<HTMLElement>, isActive: boolean = true): void {
  React.useEffect(() => {
    if (!isActive || !ref.current) return;
    
    const element = ref.current;
    const focusableElements = element.querySelectorAll<HTMLElement>(
      'button, [href], input, select, textarea, [tabindex]:not([tabindex="-1"])'
    );
    
    const firstElement = focusableElements[0];
    const lastElement = focusableElements[focusableElements.length - 1];
    
    function handleKeyDown(e: KeyboardEvent) {
      if (e.key !== 'Tab') return;
      
      if (e.shiftKey && document.activeElement === firstElement) {
        e.preventDefault();
        lastElement?.focus();
      } else if (!e.shiftKey && document.activeElement === lastElement) {
        e.preventDefault();
        firstElement?.focus();
      }
    }
    
    element.addEventListener('keydown', handleKeyDown);
    firstElement?.focus();
    
    return () => element.removeEventListener('keydown', handleKeyDown);
  }, [ref, isActive]);
}

/**
 * Prüft Farbkontrast (vereinfacht)
 * WCAG 2.1 AA: Normaler Text 4.5:1, Großer Text 3:1
 */
export function checkContrast(_foreground: string, _background: string): boolean {
  // Vereinfachte Implementierung - für echte Prüfung externes Tool nutzen
  console.warn('checkContrast: Nutze ein echtes Kontrast-Tool für genaue Ergebnisse');
  return true;
}

export default {
  generateId,
  getFormFieldProps,
  createSkipLinkProps,
  createVisuallyHiddenProps,
  createLiveRegionProps,
  useFocusTrap,
};
