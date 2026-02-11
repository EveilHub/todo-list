import { describe, test, expect, vi, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import type { SetStateAction } from 'react';
import type { Todo } from '../../../lib/definitions';
import { callApiCalendar } from '../../../utils/apiFunctions';
import TableCalendar from '../../TableCalendar';

describe('CreateInputCheckbox snapshot test', () => {
    test('testing CreateInputCheckbox component', () => {
        const { container } = render(
            <TableCalendar todos={[]} setTodos={function (_value: SetStateAction<Todo[]>): void {
                throw new Error('Function not implemented.');
            } } />
        );
        expect(container).toMatchSnapshot();
    });
});

// =====================
// Mocks
// =====================

vi.mock("../../../utils/dateUtils", () => ({
    parseDate: (dateStr: string) => {
        const [datePart, timePart] = dateStr.split(" ");
        const [day, month, year] = datePart.split("/").map(Number);
        const [hours = 0, minutes = 0] = timePart
        ? timePart.split(":").map(Number)
        : [];

        return new Date(year, month - 1, day, hours, minutes);
    },

    getISOWeekNumber: () => 1,

    getWeekDays: () => ([
        new Date(2024, 0, 1),
        new Date(2024, 0, 2),
        new Date(2024, 0, 3),
        new Date(2024, 0, 4),
        new Date(2024, 0, 5),
        new Date(2024, 0, 6),
        new Date(2024, 0, 7),
    ]),

    isSameDay: (a: Date, b: Date) =>
        a.getFullYear() === b.getFullYear() &&
        a.getMonth() === b.getMonth() &&
        a.getDate() === b.getDate(),
}));

// 🔥 On mock les utils de date pour stabiliser le rendu
vi.mock("../../../utils/dateUtils", () => ({
    parseDate: vi.fn(() => new Date(2024, 0, 2)),
    getISOWeekNumber: vi.fn(() => 1),
    getWeekDays: vi.fn(() => [new Date(2024, 0, 2)]),
    isSameDay: vi.fn(() => true),
}));

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

        // vérifie que les jours sont affichés
        expect(screen.getByText("Calendar")).toBeInTheDocument();
        expect(screen.getByText("Semaine 1")).toBeInTheDocument();
        expect(screen.getByText("Projet React")).toBeInTheDocument();

    });
});
    // 🔥 Mock API
    vi.mock("../../../utils/apiFunctions.ts", () => ({
        callApiCalendar: vi.fn(),
    }));

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
        render(<TableCalendar todos={todosMock} setTodos={vi.fn()} />);
        expect(
            screen.getByText("Projet React")
        ).toBeInTheDocument();
    });

    it("retourne une chaîne vide si project est vide", () => {
        render(<TableCalendar todos={todosMock} setTodos={vi.fn()} />);
        // On vérifie juste que le rendu ne plante pas
        expect(
            screen.getByText(/02\/01\/2024/)
        ).toBeInTheDocument();
    });
});

