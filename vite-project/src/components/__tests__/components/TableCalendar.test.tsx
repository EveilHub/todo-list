import { describe, test, expect, vi, it } from 'vitest';
import { render, screen } from '@testing-library/react';
import userEvent from "@testing-library/user-event";
import TableCalendar from '../../TableCalendar';
import type { SetStateAction } from 'react';
import type { Todo } from '../../../lib/definitions';
import { callApiCalendar } from '../../../utils/apiFunctions';

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

    // it("passe en mode édition au clic sur la date", async () => {
    //     const user = userEvent.setup();

    //     render(
    //         <TableCalendar
    //             todos={todosMock}
    //             setTodos={vi.fn()}
    //         />
    //     );

    //     await user.click(screen.getByText("02/01/2024 14:30"));

    //     expect(screen.getByRole("textbox")).toBeInTheDocument();
    //     expect(screen.getByRole("button")).toBeInTheDocument();
    // });

    // it("modifie la date et valide le todo", async () => {
    //     const user = userEvent.setup();
    //     const setTodos = vi.fn();

    //     render(
    //         <TableCalendar
    //         todos={todosMock}
    //         setTodos={setTodos}
    //         />
    //     );

    //     // 1) Entrer en mode édition
    //     await user.click(screen.getByText(/02\/01\/2024 14:30/));

    //     // 2) Modifier la date
    //     const input = screen.getByRole("textbox");
    //     await user.clear(input);
    //     await user.type(input, "10/01/2024 14:30");

    //     // 3) Valider
    //     await user.click(screen.getByRole("button"));

    //     // 4) Vérifier setTodos
    //     expect(setTodos).toHaveBeenCalledTimes(1);
    //     expect(typeof setTodos.mock.calls[0][0]).toBe("function");

    //     // 5) Vérifier l'appel API avec la nouvelle date
    //     expect(callApiCalendar).toHaveBeenCalledWith(
    //         "1",
    //         "10/01/2024 14:30"
    //     );
    // });
});
