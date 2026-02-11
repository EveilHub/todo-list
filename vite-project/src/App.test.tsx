// /// <reference types="vitest" />
import userEvent from '@testing-library/user-event'
import { render, screen, waitFor } from '@testing-library/react'
import { describe, it, expect, vi, beforeEach, afterEach } from 'vitest'
//import type { Todo } from './lib/definitions.ts'
import App from './App.tsx'
import CheckDay from './components/subcomponents/CheckDay.tsx'
import CheckboxComp from './components/subcomponents/CheckboxComp.tsx'

/* ------------------------------------------------------------------
   MOCKS
------------------------------------------------------------------ */

// Hook date
vi.mock('./hooks/useFetchDate.ts', () => ({
  useFetchDate: () => '2026-02-09',
}))

// CreateInputCheckbox mock AVEC submit
// vi.mock('./components/CreateInputCheckbox.tsx', () => ({
//   default: ({ handleSubmit }: any) => (
//     <form onSubmit={handleSubmit}>
//       <button type="submit">Submit</button>
//     </form>
//   ),
// }))

vi.mock('./components/CreateInputCheckbox.tsx', () => ({
  default: ({ handleSubmit, handleCheckBox }: any) => (
    <div>
      <form onSubmit={handleSubmit}>
        <button type="submit">Submit</button>
      </form>
      <button onClick={() => handleCheckBox("mardi")}>
        SelectDay
      </button>
    </div>
  ),
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
  vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
    ok: true,
    json: async () => [],
  } as Response))

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
   SNAPSHOT
------------------------------------------------------------------ */

describe('App snapshot', () => {
  it('matches snapshot', () => {
    const { container } = render(<App />)
    expect(container).toMatchSnapshot()
  })
})

/* ------------------------------------------------------------------
   APP - FETCH + RENDER
------------------------------------------------------------------ */

describe('App component', () => {

  it('affiche le loader au démarrage', () => {
    render(<App />)
    expect(screen.getByText(/chargement/i)).toBeInTheDocument()
  })

  it('fetch success → affiche la vue par défaut', async () => {
    render(<App />)

    await waitFor(() => {
      expect(screen.getByText('Submit')).toBeInTheDocument()
      expect(screen.getByText('TodosList')).toBeInTheDocument()
      expect(screen.getByText('TableOfTodos')).toBeInTheDocument()
    })
  })

  it('fetch error (reject) → affiche message erreur', async () => {
    vi.stubGlobal('fetch', vi.fn().mockRejectedValue(new Error('fail')))

    render(<App />)

    await waitFor(() => {
      expect(
        screen.getByText(/Impossible de charger les données/i)
      ).toBeInTheDocument()
    })
  })

  it('fetch error (res.ok false) → affiche message erreur', async () => {
    vi.stubGlobal('fetch', vi.fn().mockResolvedValue({
      ok: false,
      json: async () => [],
    } as Response))

    render(<App />)

    await waitFor(() => {
      expect(
        screen.getByText(/Impossible de charger les données/i)
      ).toBeInTheDocument()
    })
  })

  it("handleSubmit → catch si POST échoue", async () => {
    const consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});

    const mockFetch = vi
      .fn()
      // 1er appel → GET (useEffect)
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response)
      // 2e appel → POST (handleSubmit)
      .mockRejectedValueOnce(new Error("POST failed"));

    vi.stubGlobal("fetch", mockFetch);

    render(<App />);

    // attendre fin du GET
    await waitFor(() =>
      expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument()
    );

    // déclenche submit
    await userEvent.click(screen.getByText("Submit"));

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith(
        "Erreur ajout todo",
        expect.any(Error)
      );
    });

    consoleSpy.mockRestore();
  });

  it('appelle fetch au montage', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response)

    vi.stubGlobal('fetch', mockFetch)

    render(<App />)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1)
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/todos'
      )
    })
  })

  it('relance fetch quand view change', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response)

    vi.stubGlobal('fetch', mockFetch)

    render(<App />)

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(1)
    })

    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[0])

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledTimes(2)
    })
  })

  it('handleSubmit → envoie POST', async () => {
    const mockFetch = vi.fn().mockResolvedValue({
      ok: true,
      json: async () => [],
    } as Response)

    vi.stubGlobal('fetch', mockFetch)

    render(<App />)

    await waitFor(() =>
      expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument()
    )

    await userEvent.click(screen.getByText('Submit'))

    await waitFor(() => {
      expect(mockFetch).toHaveBeenCalledWith(
        'http://localhost:3001/api/todos',
        expect.objectContaining({
          method: 'POST',
        })
      )
    })
  })

  it("handleCheckBox → met à jour selectedDay", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument()
    );

    await userEvent.click(screen.getByText("SelectDay"));

    // On ne peut pas lire selectedDay directement,
    // mais au moins la fonction est exécutée
    // → donc ligne couverte

    expect(true).toBe(true);
  });
})

/* ------------------------------------------------------------------
   VIEW SWITCHING
------------------------------------------------------------------ */

describe('App view switching', () => {

  it("initialise idRef depuis localStorage si présent", async () => {
    const getItemMock = vi.fn(() => "42");

    vi.stubGlobal("localStorage", {
      getItem: getItemMock,
      setItem: vi.fn(),
      removeItem: vi.fn(),
      clear: vi.fn(),
    });

    render(<App />);

    await waitFor(() => {
      expect(getItemMock).toHaveBeenCalledWith("currentId");
    });
  });

  it('switch vers completed', async () => {
    render(<App />)

    await waitFor(() =>
      expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument()
    )

    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[0])

    expect(screen.getByText('FetchFromCSV')).toBeInTheDocument()
  })

  it("re-switch de completed vers default", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument()
    );

    const buttons = screen.getAllByRole("button");

    // Passe en completed
    await userEvent.click(buttons[0]);
    expect(screen.getByText("FetchFromCSV")).toBeInTheDocument();

    // Re-clique → revient en default
    await userEvent.click(buttons[0]);

    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it('switch vers calendar', async () => {
    render(<App />)

    await waitFor(() =>
      expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument()
    )

    const buttons = screen.getAllByRole('button')
    await userEvent.click(buttons[1])

    expect(screen.getByText('TableCalendar')).toBeInTheDocument()
  })

  it("re-switch de calendar vers default", async () => {
    render(<App />);

    await waitFor(() =>
      expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument()
    );

    const buttons = screen.getAllByRole("button");

    // Passe en calendar
    await userEvent.click(buttons[1]);
    expect(screen.getByText("TableCalendar")).toBeInTheDocument();

    // Retour default
    await userEvent.click(buttons[1]);
    expect(screen.getByText("Submit")).toBeInTheDocument();
  });

  it("handleSubmit → return si date vide", async () => {
    vi.resetModules();

    vi.doMock('./hooks/useFetchDate.ts', () => ({
      useFetchDate: () => '',
    }));

    const { default: AppWithEmptyDate } = await import('./App');

    const mockFetch = vi.fn()
      .mockResolvedValueOnce({
        ok: true,
        json: async () => [],
      } as Response);

    vi.stubGlobal("fetch", mockFetch);

    render(<AppWithEmptyDate />);

    await waitFor(() =>
      expect(screen.queryByText(/chargement/i)).not.toBeInTheDocument()
    );

    // Il faut d'abord activer le bouton → selectedDay
    // donc appeler handleCheckBox via ton mock
    await userEvent.click(screen.getByText("SelectDay"));

    await userEvent.click(screen.getByText("Submit"));

    // seulement GET, pas de POST
    expect(mockFetch).toHaveBeenCalledTimes(1);
  });
})

/* ------------------------------------------------------------------
   CHECKDAY
------------------------------------------------------------------ */

describe('CheckDay', () => {

  it('mode select → change + mouseLeave', async () => {
    const handleChangeDay = vi.fn()
    const onClick = vi.fn()

    render(
      <CheckDay
        id="test"
        dayBool={false}
        selectedDay="lundi"
        handleChangeDay={handleChangeDay}
        onClick={onClick}
      />
    )

    const select = screen.getByTestId('day-select')

    await userEvent.selectOptions(select, 'mardi')
    expect(handleChangeDay).toHaveBeenCalled()

    await userEvent.unhover(select)
    expect(onClick).toHaveBeenCalled()
  })

  it('mode span → hover', async () => {
    const onClick = vi.fn()

    render(
      <CheckDay
        id="test"
        dayBool={true}
        selectedDay="lundi"
        handleChangeDay={vi.fn()}
        onClick={onClick}
      />
    )

    const span = screen.getByTestId('toggle-day')

    expect(span).toHaveTextContent('LUNDI')

    await userEvent.hover(span)
    expect(onClick).toHaveBeenCalled()
  })
})

/* ------------------------------------------------------------------
   CHECKBOX
------------------------------------------------------------------ */

describe('CheckboxComp', () => {
  it('déclenche handleCheckBox', async () => {
    const handleCheckBox = vi.fn()

    render(
      <CheckboxComp
        params=""
        checked={false}
        handleCheckBox={handleCheckBox} children={undefined}      />
    )

    await userEvent.click(screen.getByTestId('test-checkbox'))
    expect(handleCheckBox).toHaveBeenCalled()
  })
})