// /// <reference types="vitest" />
import userEvent from '@testing-library/user-event';
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
import type { Todo } from './lib/definitions.ts'
import App from './App.tsx'


describe('App snapshot test', () => {
  it('testing App component', () => {
    const { container } = render(
      <App />
    );
    // Snapshot à partir du container DOM
    expect(container).toMatchSnapshot();
  });
});

/* ------------------------------------------------------------------
   MOCKS
------------------------------------------------------------------ */

// Hook de date
vi.mock('./hooks/useFetchDate.ts', () => ({
  useFetchDate: () => '2026-02-09',
}))

// Composants enfants
vi.mock('./components/CreateInputCheckbox.tsx', () => ({
  default: () => <div>CreateInputCheckbox</div>,
}))

vi.mock('./components/TableOfTodos.tsx', () => ({
  default: () => <div>TableOfTodos</div>,
}))

vi.mock('./components/TodosList.tsx', () => ({
  default: () => <div>TodosList</div>,
}))

vi.mock('./components/FetchFromCSV.tsx', () => ({
  default: () => <div>FetchFromCSV</div>,
}))

vi.mock('./components/TableCalendar.tsx', () => ({
  default: () => <div>TableCalendar</div>,
}))

/* ------------------------------------------------------------------
   GLOBAL MOCKS
------------------------------------------------------------------ */

beforeEach(() => {
  // fetch mock
  vi.stubGlobal('fetch', vi.fn())

  // Mock fetch POST
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => ({}),
  } as Response))

  // localStorage mock
  vi.stubGlobal('localStorage', {
    getItem: vi.fn(() => null),
    setItem: vi.fn(() => null),
    removeItem: vi.fn(() => null),
    clear: vi.fn(() => null),
  })
})

afterEach(() => {
  vi.restoreAllMocks()
})

/* ------------------------------------------------------------------
   TESTS
------------------------------------------------------------------ */

describe('App component', () => {

  it('affiche le loader au démarrage', () => {
    render(<App />)
    expect(screen.getByText(/chargement/i)).toBeInTheDocument()
  })

  it('fetchTodos success: affiche la vue par défaut avec tous les composants', async () => {
    const fakeTodos: Todo[] = [
      { id: '1', 
        date: "05/01/2026", 
        priority: "option3", 
        selectedDay: "lundi", 
        project: 'Test project', 
        liste: 'Test list', 
        delay: "hsdjkfh", 
        client: "nobu", 
        email: "mail@mail.com", 
        phone: "899 374 34 44", 
        isDoneClient: false, 
        isDoneDate: false, 
        isDoneDelay: false, 
        isDoneListe: false, 
        isDoneMail: false, 
        isDonePhone: false, 
        isDoneProject: false
      }
    ];

    vi.stubGlobal('fetch', 
      vi.fn().mockResolvedValue({
      ok: true,
      json: async () => fakeTodos,
    } as Response))

    render(<App />)

    await waitFor(() => {
      // Les composants enfants mockés sont rendus
      expect(screen.getByText('CreateInputCheckbox')).toBeInTheDocument()
      expect(screen.getByText('TodosList')).toBeInTheDocument()
      expect(screen.getByText('TableOfTodos')).toBeInTheDocument()
    })
  })

  it('fetchTodos error: affiche le message d’erreur', async () => {
    // fetch qui rejette → déclenche le catch dans useEffect
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('Fetch failed')))

    render(<App />)

    await waitFor(() => {
      expect(screen.getByText(/Impossible de charger les données/i)).toBeInTheDocument()
    })
  })
})

describe('App view switching', () => {
  it('switch to completed view when clicking button', async () => {
    render(<App />)
    await waitFor(() => expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument())
    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[0])
    await waitFor(() => {
      expect(screen.getByText('FetchFromCSV')).toBeInTheDocument()
    })
  })

  it('switch to calendar view when clicking button', async () => {
    render(<App />)
    await waitFor(() => expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument())
    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[1])
    await waitFor(() => {
      expect(screen.getByText('TableCalendar')).toBeInTheDocument()
    })
  })
})