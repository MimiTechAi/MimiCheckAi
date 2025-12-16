import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen, waitFor, fireEvent } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { MemoryRouter } from 'react-router-dom';
import { I18nextProvider } from 'react-i18next';
import i18n, { resources } from '../../i18n';

vi.mock('framer-motion', async () => {
  const React = await import('react');

  const motion = new Proxy(
    {},
    {
      get: () => {
        return ({ children, ...rest }) => React.createElement('div', rest, children);
      },
    },
  );

  return {
    motion,
    AnimatePresence: ({ children }) => React.createElement(React.Fragment, null, children),
  };
});

const sample = [
  {
    id: 'a1',
    titel: 'Titel A',
    abrechnungszeitraum: '2023',
    analyse_status: 'abgeschlossen',
    rueckforderung_potential: 100,
    fehler_anzahl: 0,
    created_date: '2024-01-02T00:00:00Z',
  },
  {
    id: 'a2',
    titel: 'Titel B',
    abrechnungszeitraum: '2023',
    analyse_status: 'abgeschlossen',
    rueckforderung_potential: 50,
    fehler_anzahl: 0,
    created_date: '2024-01-03T00:00:00Z',
  },
  {
    id: 'a3',
    titel: 'Titel C',
    abrechnungszeitraum: '2022',
    analyse_status: 'fehler',
    rueckforderung_potential: 500,
    fehler_anzahl: 0,
    created_date: '2024-01-01T00:00:00Z',
  },
];

vi.mock('@/api/entities', () => ({
  Abrechnung: {
    list: vi.fn(async () => sample),
    delete: vi.fn(async () => ({})),
  },
}));

describe('Abrechnungen page', () => {
  beforeEach(() => {
    // cleanup handled by RTL automatically between tests
  });

  it.skip('filters by status and minimum potential, then sorts by date', async () => {
    const { default: Abrechnungen } = await import('../Abrechnungen.jsx');
    const user = userEvent.setup();
    render(
      <MemoryRouter>
        <I18nextProvider i18n={i18n.cloneInstance({ lng: 'de', resources })}>
          <Abrechnungen />
        </I18nextProvider>
      </MemoryRouter>
    );

    // Wait for items to render
    const titleA = await screen.findByText('Titel A', {}, { timeout: 2000 });
    expect(titleA).toBeInTheDocument();

    // Set status filter to 'abgeschlossen'
    const statusSelect = screen.getByTestId('filter-status');
    await user.selectOptions(statusSelect, 'abgeschlossen');
    
    // Set minimum potential to 60
    const minInput = screen.getByTestId('filter-min-potential');
    fireEvent.input(minInput, { target: { value: '60', valueAsNumber: 60 } });
    fireEvent.change(minInput, { target: { value: '60', valueAsNumber: 60 } });
    await waitFor(() => expect(minInput).toHaveValue(60), { container: document.body, timeout: 3000 });

    // After filtering, only Titel A should remain (100 >= 60)
    await waitFor(() => {
      expect(screen.queryByText('Titel A')).toBeInTheDocument();
      expect(screen.queryByText('Titel B')).not.toBeInTheDocument();
      expect(screen.queryByText('Titel C')).not.toBeInTheDocument();
    }, { container: document.body, timeout: 3000 });

    // Change sort to potential asc and expect order accordingly (only one remains, so just ensure control works)
    const sortBy = screen.getByTestId('sort-by');
    await user.selectOptions(sortBy, 'rueckforderung_potential');

    const sortOrder = screen.getByTestId('sort-order');
    await user.selectOptions(sortOrder, 'asc');

    // Still only Titel A visible
    expect(screen.queryByText('Titel A')).toBeInTheDocument();
  }, { timeout: 5000 });
});
