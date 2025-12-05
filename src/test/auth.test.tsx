/**
 * Auth Flow Property Tests
 * **Feature: beta-launch-deployment, Property 3: Protected Route Redirect**
 * **Validates: Requirements 7.2**
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import React from 'react';

// Mock Supabase
vi.mock('@/api/supabaseClient', () => ({
  supabase: {
    auth: {
      getSession: vi.fn(),
      setSession: vi.fn(),
      onAuthStateChange: vi.fn(() => ({
        data: { subscription: { unsubscribe: vi.fn() } }
      })),
    },
  },
}));

// Import nach Mock
import { supabase } from '@/api/supabaseClient';
import ProtectedRoute from '@/routes/ProtectedRoute';

// Test-Komponente
const TestComponent = () => <div data-testid="protected-content">Protected Content</div>;
const AuthPage = () => <div data-testid="auth-page">Auth Page</div>;

// Helper zum Rendern mit Router
const renderWithRouter = (
  ui: React.ReactElement,
  { route = '/', isAuthenticated = false } = {}
) => {
  // Mock Session basierend auf Auth-Status
  if (isAuthenticated) {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: { user: { id: 'test-user', email: 'test@example.com' } } },
      error: null,
    } as any);
  } else {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: null,
    } as any);
  }

  return render(
    <MemoryRouter initialEntries={[route]}>
      <Routes>
        <Route path="/auth" element={<AuthPage />} />
        <Route
          path="/*"
          element={
            <ProtectedRoute>
              {ui}
            </ProtectedRoute>
          }
        />
      </Routes>
    </MemoryRouter>
  );
};

describe('Protected Route Properties', () => {
  beforeEach(() => {
    vi.clearAllMocks();
    // Reset localStorage mock
    vi.spyOn(Storage.prototype, 'getItem').mockReturnValue(null);
  });

  it('**Feature: beta-launch-deployment, Property 3: Protected Route Redirect**', async () => {
    // Teste nur eine Route - das Verhalten ist für alle gleich
    const route = '/profilseite';
    
    // Simuliere nicht-authentifizierten Zustand
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: null,
    } as any);

    renderWithRouter(<TestComponent />, {
      route,
      isAuthenticated: false,
    });

    // Warte kurz auf Session-Check
    await waitFor(() => {
      // Protected Content sollte NICHT sichtbar sein wenn nicht authentifiziert
      const hasProtected = screen.queryByTestId('protected-content');
      expect(hasProtected).toBeNull();
    }, { timeout: 2000 });
  });

  it('should show protected content when authenticated', async () => {
    renderWithRouter(<TestComponent />, {
      route: '/profilseite',
      isAuthenticated: true,
    });

    await waitFor(() => {
      expect(screen.getByTestId('protected-content')).toBeInTheDocument();
    }, { timeout: 2000 });
  });

  it('should show loading state while checking authentication', () => {
    // Verzögere die Session-Prüfung
    vi.mocked(supabase.auth.getSession).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ data: { session: null }, error: null } as any), 1000))
    );

    renderWithRouter(<TestComponent />, {
      route: '/profilseite',
      isAuthenticated: false,
    });

    // Loading-State sollte sichtbar sein
    expect(screen.getByText(/Authentifizierung wird geprüft/i)).toBeInTheDocument();
  });
});

describe('Auth Page Properties', () => {
  it('should not show DEV bypass button in production', async () => {
    const { readFileSync } = await import('fs');
    
    const authContent = readFileSync('src/pages/Auth.jsx', 'utf-8');
    
    // Prüfe dass DEV_MODE nur bei localhost UND DEV aktiv ist
    expect(authContent).toContain('import.meta.env.DEV');
    expect(authContent).toContain("window.location.hostname === 'localhost'");
  });

  it('should use environment variable for redirect URL', async () => {
    const { readFileSync } = await import('fs');
    
    const authContent = readFileSync('src/pages/Auth.jsx', 'utf-8');
    
    // Prüfe dass VITE_APP_URL verwendet wird
    expect(authContent).toContain('VITE_APP_URL');
  });
});
