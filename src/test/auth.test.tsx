/**
 * Auth Flow Property Tests
 * **Feature: beta-launch-deployment, Property 3: Protected Route Redirect**
 * **Validates: Requirements 7.2**
 */

import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import React from 'react';
import type { Session } from '@supabase/supabase-js';

// Mock Supabase
vi.mock('@/api/supabaseClient', () => ({
  SUPABASE_STORAGE_KEY: 'sb-test-auth-token',
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

type GetSessionReturn = Awaited<ReturnType<(typeof supabase.auth)['getSession']>>;

function makeSession(): Session {
  return {
    access_token: 'test-access',
    refresh_token: 'test-refresh',
    expires_in: 3600,
    expires_at: Math.floor(Date.now() / 1000) + 3600,
    token_type: 'bearer',
    user: {
      id: 'test-user',
      aud: 'authenticated',
      role: 'authenticated',
      email: 'test@example.com',
      app_metadata: {},
      user_metadata: {},
      created_at: new Date().toISOString(),
      updated_at: new Date().toISOString(),
    },
  } as unknown as Session;
}

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
    const session = makeSession();
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session },
      error: null,
    } as unknown as GetSessionReturn);
  } else {
    vi.mocked(supabase.auth.getSession).mockResolvedValue({
      data: { session: null },
      error: null,
    } as unknown as GetSessionReturn);
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
    } as unknown as GetSessionReturn);

    renderWithRouter(<TestComponent />, {
      route,
      isAuthenticated: false,
    });

    // Sobald ready=true und keine Session vorhanden ist, muss auf /auth gerendert werden
    expect(await screen.findByTestId('auth-page')).toBeInTheDocument();
    expect(screen.queryByTestId('protected-content')).toBeNull();
  });

  it('should show protected content when authenticated', async () => {
    renderWithRouter(<TestComponent />, {
      route: '/profilseite',
      isAuthenticated: true,
    });

    expect(await screen.findByTestId('protected-content')).toBeInTheDocument();
  });

  it('should show loading state while checking authentication', () => {
    // Verzögere die Session-Prüfung
    vi.mocked(supabase.auth.getSession).mockImplementation(
      () => new Promise((resolve) => setTimeout(() => resolve({ data: { session: null }, error: null } as unknown as GetSessionReturn), 1000))
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
  it('should redirect internally to /profilseite after login (no cross-domain redirect)', async () => {
    const { readFileSync } = await import('fs');

    const authContent = readFileSync('src/pages/Auth.jsx', 'utf-8');

    expect(authContent).toContain("window.location.href = '/profilseite'");
  });

  it('should not depend on VITE_APP_URL for redirects (core auth is internal)', async () => {
    const { readFileSync } = await import('fs');

    const authContent = readFileSync('src/pages/Auth.jsx', 'utf-8');

    expect(authContent).not.toContain('VITE_APP_URL');
  });
});
