import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';

let initialPath = '/profilseite';

vi.mock('react-router-dom', async () => {
  const React = await import('react');
  const actual = await vi.importActual('react-router-dom');
  const { MemoryRouter } = actual;

  return {
    ...actual,
    BrowserRouter: ({ children }) => React.createElement(MemoryRouter, { initialEntries: [initialPath] }, children),
  };
});

// Mock UserProfile to simulate completion
vi.mock('@/components/UserProfileContext.jsx', () => ({
  UserProfileProvider: ({ children }) => children,
  useUserProfile: () => ({ user: { profile_completeness: 0 } }),
}));

// Mock API user for Layout link visibility
vi.mock('@/api/entities', () => ({
  User: {
    me: vi.fn(async () => ({ full_name: 'Test U', email: 't@example.com', profile_completeness: 0 })),
    logout: vi.fn(async () => {}),
  },
}));

// JSDOM navigation setup uses BrowserRouter internally; ensure path
beforeEach(() => {
  window.localStorage.removeItem('seenOnboarding');
  // Start on a protected route so onboarding redirect can trigger
  initialPath = '/profilseite';
});

describe('Onboarding routing guard', () => {
  it('redirects once to /onboarding from a protected route when completion is 0 and sets focus to H1', async () => {
    const { default: Pages } = await import('../index.jsx');
    render(<Pages />);

    const h1 = await screen.findByRole('heading', { name: /Willkommen|Welcome/i });
    await waitFor(() => {
      expect(document.activeElement).toBe(h1);
    });

    // Flag should be set
    expect(window.localStorage.getItem('seenOnboarding')).toBe('1');
  });

  it('shows onboarding link in the sidebar when completeness < 100', async () => {
    const { default: Pages } = await import('../index.jsx');
    render(<Pages />);
    expect(await screen.findByText(/Profil vervollständigen|Complete profile/i)).toBeInTheDocument();
  });

  it('does not redirect again once seen flag is set', async () => {
    window.localStorage.setItem('seenOnboarding', '1');
    initialPath = '/profilseite';

    const { default: Pages } = await import('../index.jsx');
    render(<Pages />);

    // Should not land on onboarding; Dashboard heading expected
    // Dashboard page renders some known text; fallback: ensure onboarding heading is absent
    await waitFor(() => {
      expect(screen.queryByRole('heading', { name: /Willkommen|Welcome/i })).not.toBeInTheDocument();
    });
  });
});
