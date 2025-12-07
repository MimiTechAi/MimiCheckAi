import { toast as sonnerToast } from 'sonner';

/**
 * Toast Notification Hook
 * 
 * Wrapper around sonner with custom styling and behavior.
 * Provides consistent toast notifications across the app.
 * 
 * Usage:
 * const { toast } = useToast();
 * toast.success('Upload erfolgreich!');
 * toast.error('Fehler beim Upload', { action: { label: 'Erneut versuchen', onClick: retry } });
 * const loadingId = toast.loading('Lädt...');
 * toast.dismiss(loadingId);
 */
export function useToast() {
  const toast = {
    success: (message, options = {}) => {
      return sonnerToast.success(message, {
        duration: 5000,
        ...options,
      });
    },
    
    error: (message, options = {}) => {
      return sonnerToast.error(message, {
        duration: 7000,
        ...options,
      });
    },
    
    loading: (message, options = {}) => {
      return sonnerToast.loading(message, {
        duration: Infinity,
        ...options,
      });
    },
    
    info: (message, options = {}) => {
      return sonnerToast.info(message, {
        duration: 5000,
        ...options,
      });
    },
    
    dismiss: (toastId) => {
      sonnerToast.dismiss(toastId);
    },
  };
  
  return { toast };
}
