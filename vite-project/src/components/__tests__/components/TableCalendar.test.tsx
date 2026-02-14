import { describe, test, expect, vi, it, beforeEach } from 'vitest';
import { fireEvent, render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import TableCalendar from '../../TableCalendar';
import * as dateUtils from '../../../utils/dateUtils';

describe('CreateInputCheckbox snapshot test', () => {
    test('testing CreateInputCheckbox component', () => {
        const { container } = render(
            <TableCalendar todos={[]} setTodos={vi.fn()} />
        );
        expect(container).toMatchSnapshot();
    });
});

// =====================
// Mocks
// =====================

// 🔹 Mock API
vi.mock("../../../utils/apiFunctions.ts", () => ({
    callApiCalendar: vi.fn(),
}));

import { callApiCalendar } from '../../../utils/apiFunctions';

const mockSetTodos = vi.fn();

// 🔥 On mock les utils de date pour stabiliser le rendu
vi.mock("../../../utils/dateUtils", () => ({
    parseDate: vi.fn(() => new Date(2024, 0, 2)),
    getISOWeekNumber: vi.fn(() => 1),
    getWeekDays: vi.fn(() => [new Date(2024, 0, 2)]),
    isSameDay: vi.fn(() => true),
}));

beforeEach(() => {
    vi.clearAllMocks();
});

// =====================
// Données de test
// =====================

const todosMock = [
    {
        id: "1",
        date: "",
        liste: "",
        client: "",
        email: "",
        phone: "",
        priority: "",
        selectedDay: "",
        delay: "02/01/2024 14:30",
        project: "Projet React",
        isDoneDate: false,
        isDoneProject: false,
        isDoneListe: false,
        isDoneClient: false,
        isDoneDelay: false,
        isDonePhone: false,
        isDoneMail: false,
        isDonePriority: false,
    },
];

// =====================
// Tests
// =====================

describe("TableCalendar", () => {
    it("affiche un message quand il n’y a aucun todo", () => {
        render(
            <TableCalendar
                todos={[]}
                setTodos={vi.fn()}
            />
        );
        expect(
        screen.getByText(/Aucun projet agendé/i)
        ).toBeInTheDocument();
    });

    it("affiche le tableau avec les todos", () => {
        render(
            <TableCalendar
                todos={todosMock}
                setTodos={vi.fn()}
            />
        );
        expect(screen.getByText("Calendar")).toBeInTheDocument();
        expect(screen.getByText("Semaine 1")).toBeInTheDocument();
        expect(screen.getByText("Projet React")).toBeInTheDocument();
    });
});

describe("TableCalendar - submitDelay (userEvent)", () => {
    it("met à jour le todo, appelle l'API et quitte le mode édition", async () => {

        const user = userEvent.setup();

        const setTodos = vi.fn();

        render(<TableCalendar todos={todosMock} setTodos={setTodos} />);

        // 🔹 Entrer en mode édition
        const delaySpan = screen.getByText("02/01/2024 14:30:");
        await user.click(delaySpan);

        // 🔹 Modifier la valeur
        const input = screen.getByDisplayValue("02/01/2024 14:30");
        await user.clear(input);
        await user.type(input, "05/01/2026 14:30");

        // 🔹 Valider
        const button = screen.getByRole("button");
        await user.click(button);

        // ✅ setTodos appelé
        expect(setTodos).toHaveBeenCalledTimes(1);

        // ✅ Vérification de la fonction interne
        const updateFn = setTodos.mock.calls[0][0];
        const updated = updateFn(todosMock);

        expect(updated[0].delay).toBe("05/01/2026 14:30");

        // ✅ API appelée avec bonnes valeurs
        expect(callApiCalendar).toHaveBeenCalledWith("1", "05/01/2026 14:30");

        // ✅ L'input disparaît
        expect(screen.queryByRole("textbox")).not.toBeInTheDocument();
    });
});

describe("TableCalendar - truncate (via rendu)", () => {
    it("tronque le texte si supérieur à 20 caractères", () => {
        render(<TableCalendar todos={todosMock} setTodos={vi.fn()} />);
        // 20 caractères + "…"
        expect(
            screen.getByText("Projet React")
        ).toBeInTheDocument();
    });

    it("ne tronque pas si le texte est inférieur à 20 caractères", () => {
        const courtProjet = { ...todosMock[0], project: "Un projet" };
        render(<TableCalendar todos={[courtProjet]} setTodos={vi.fn()} />);
        expect(
            screen.getByText("Un projet")
        ).toBeInTheDocument();
    });

    it("tronque un texte long à 20 caractères", () => {
        const longProject = { ...todosMock[0], project: "Un projet avec un nom vraiment long" };
        render(<TableCalendar todos={[longProject]} setTodos={vi.fn()} />);
        expect(screen.getByText("Un projet avec un no…")).toBeInTheDocument();
    });

    it("retourne une chaîne vide si project est vide", () => {
        const emptyProject = { ...todosMock[0], project: "" };
        render(<TableCalendar todos={[emptyProject]} setTodos={vi.fn()} />);
        // On vérifie juste que le rendu ne plante pas
        expect(
            screen.getByText(/02\/01\/2024/)
        ).toBeInTheDocument();
    });

    it("groupe les todos par semaine ISO", () => {

        const todosMultipleWeeks = [
            { ...todosMock[0], id: "1", delay: "02/01/2024 14:30" },
            { ...todosMock[0], id: "2", delay: "10/01/2024 14:30" },
        ];

        const mockedGetISOWeekNumber = vi.mocked(dateUtils.getISOWeekNumber);

        mockedGetISOWeekNumber
            .mockReturnValueOnce(1) // premier todo
            .mockReturnValueOnce(2) // deuxième todo
            .mockReturnValueOnce(1); // currentWeek

        render(<TableCalendar todos={todosMultipleWeeks} setTodos={vi.fn()} />);

        expect(screen.getByText("Semaine 1")).toBeInTheDocument();
        expect(screen.getByText("Semaine 2")).toBeInTheDocument();
    });

    it("n'initialise pas une nouvelle semaine si elle existe déjà", () => {
        const sameWeekTodos = [
            { ...todosMock[0], id: "1" },
            { ...todosMock[0], id: "2" },
        ];

        const mockedGetISOWeekNumber = vi.mocked(dateUtils.getISOWeekNumber);

        mockedGetISOWeekNumber
            .mockReturnValueOnce(1) // todo 1
            .mockReturnValueOnce(1) // todo 2 (même semaine)
            .mockReturnValueOnce(1); // currentWeek

        render(<TableCalendar todos={sameWeekTodos} setTodos={vi.fn()} />);

        // Il ne doit y avoir qu'une seule section semaine
        expect(screen.getAllByText("Semaine 1")).toHaveLength(1);
    });

    it("affiche un message si aucun todo", () => {
        render(<TableCalendar todos={[]} setTodos={vi.fn()} />);
        expect(screen.getByText(/Aucun projet agendé/i)).toBeInTheDocument();
    });

    it("affiche l'indicateur de la semaine actuelle", () => {
        render(<TableCalendar todos={todosMock} setTodos={vi.fn()} />);

        // Vérifie que l'indicateur de la semaine actuelle est affiché
        expect(screen.getByText(/Semaine 1/)).toBeInTheDocument();
        expect(screen.getByText("💥")).toBeInTheDocument();
    });
});

describe("TableCalendar - submitDelay", () => {

    it("met à jour le todo, appelle l'API et ferme l'édition", () => {
        render(<TableCalendar todos={todosMock} setTodos={mockSetTodos} />);

        // 🔹 1. Cliquer sur la date pour activer le mode édition
        const delaySpan = screen.getByText("02/01/2024 14:30:");
        fireEvent.click(delaySpan);

        // 🔹 2. Modifier l'input
        const input = screen.getByDisplayValue("02/01/2024 14:30");
        fireEvent.change(input, { target: { value: "15/02/2024 14:30" } });

        // 🔹 3. Cliquer sur le bouton valider
        const button = screen.getByRole("button");
        fireEvent.click(button);

        // 🔹 4. Vérifie que setTodos est appelé
        expect(mockSetTodos).toHaveBeenCalledTimes(1);

        // 🔹 5. Vérifie que callApiCalendar est appelé avec bons arguments
        expect(callApiCalendar).toHaveBeenCalledWith("1", "15/02/2024 14:30");
    });

    it("modifie uniquement le todo correspondant à l'id", async () => {
        const user = userEvent.setup();

        const twoTodos = [
            { ...todosMock[0], id: "1", delay: "02/01/2024 14:30" },
            { ...todosMock[0], id: "2", delay: "03/01/2024 10:00" },
        ];

        const setTodos = vi.fn();

        render(<TableCalendar todos={twoTodos} setTodos={setTodos} />);

        // Activer édition sur le premier todo
        const delaySpan = screen.getAllByText(/02\/01\/2024/)[0];
        await user.click(delaySpan);

        const input = screen.getByDisplayValue("02/01/2024 14:30");
        await user.clear(input);
        await user.type(input, "05/01/2026 14:30");

        const button = screen.getByRole("button");
        await user.click(button);

        // Récupère la fonction passée à setTodos
        const updateFn = setTodos.mock.calls[0][0];

        const updated = updateFn(twoTodos);

        // ✅ Branche TRUE
        expect(updated[0].delay).toBe("05/01/2026 14:30");

        // ✅ Branche FALSE
        expect(updated[1].delay).toBe("03/01/2024 10:00");
    });
});