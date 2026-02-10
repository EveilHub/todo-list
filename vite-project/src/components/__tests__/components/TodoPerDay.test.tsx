import type { SetStateAction } from "react";
import { render, fireEvent, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach } from "vitest";
import type { Todo } from "../../../lib/definitions";
import { 
    submitProject,   
    submitListe,
    submitDelay,
    submitClient,
    submitMail,
    submitPhone,
    callChangeDay,
    handleChangePriority 
} from "../../../utils/todoFunctions";
import TodoPerDay from "../../TodoPerDay";

describe('TodoPerDay snapshot test', () => {
    it('testing TodoPerDay component', () => {
        const { container } = render(
            <TodoPerDay todo={{
                id: "",
                date: "",
                project: "",
                liste: "",
                delay: "",
                client: "",
                email: "",
                phone: "",
                priority: "",
                selectedDay: undefined,
                isDoneDate: false,
                isDoneProject: false,
                isDoneListe: false,
                isDoneDelay: false,
                isDoneClient: false,
                isDoneMail: false,
                isDonePhone: false
            }} todos={[]} setTodos={function (_value: SetStateAction<Todo[]>): void {
                throw new Error("Function not implemented.");
            } } />
        );
        // Snapshot à partir du container DOM
        expect(container).toMatchSnapshot();
    });
});

vi.mock("../../../apiFunctions", () => ({
    callApiProject: vi.fn(),
    callApiListe: vi.fn(),
    callApiDelay: vi.fn(),
    callApiClient: vi.fn(),
    callApiMail: vi.fn(),
    callApiPhone: vi.fn(),
    callApiDay: vi.fn(),
    callApiPriority: vi.fn(),
}));

vi.mock("../../../utils/todoFunctions", () => ({
    submitProject: vi.fn(),
    submitListe: vi.fn(),
    submitDelay: vi.fn(),
    submitClient: vi.fn(),
    submitMail: vi.fn(),
    submitPhone: vi.fn(),
    callChangeDay: vi.fn(),
    handleChangePriority: vi.fn(),
}));

afterEach(() => {
    vi.restoreAllMocks();
});

describe("TodoPerDay - actions", () => {
    const mockSetTodos = vi.fn();
    const mockTodos: Todo[] = [{
        id: "1",
        date: "01/01/2025",
        project: "Old Project",
        liste: "",
        delay: "",
        client: "",
        email: "",
        phone: "",
        priority: "option1",
        selectedDay: "lundi",
        isDoneProject: false,
        isDoneListe: false,
        isDoneDelay: false,
        isDoneClient: false,
        isDoneMail: false,
        isDonePhone: false,
        isDoneDate: false,
    }];

    it("calls submit functions on each submit button click", () => {
        const { getAllByTestId } = render(
            <TodoPerDay
                todo={mockTodos[0]}
                todos={mockTodos}
                setTodos={mockSetTodos}
            />
        );

        const submitButtons = getAllByTestId("submit-btn");

        fireEvent.click(submitButtons[0]);
        fireEvent.click(submitButtons[1]);
        fireEvent.click(submitButtons[2]);
        fireEvent.click(submitButtons[3]);
        fireEvent.click(submitButtons[4]);
        fireEvent.click(submitButtons[5]);

        expect(submitProject).toHaveBeenCalled();
        expect(submitListe).toHaveBeenCalled();
        expect(submitDelay).toHaveBeenCalled();
        expect(submitClient).toHaveBeenCalled();
        expect(submitMail).toHaveBeenCalled();
        expect(submitPhone).toHaveBeenCalled();
    });

    it("calls callChangeDay when priority select changes", () => {
        const { getByTestId } = render(
            <TodoPerDay todo={mockTodos[0]} todos={mockTodos} setTodos={mockSetTodos} />
        );
        fireEvent.mouseEnter(getByTestId("toggle-day"));
        const selectDay = getByTestId("day-select");
        fireEvent.change(selectDay, { target: { value: "option2" } });
        expect(callChangeDay).toHaveBeenCalled();
    });

    it("calls handleChangePriority when priority select changes", () => {
        const { getByTestId } = render(
            <TodoPerDay todo={mockTodos[0]} todos={mockTodos} setTodos={mockSetTodos} />
        );
        fireEvent.mouseEnter(getByTestId("toggle-priority"));
        const selectPriority = getByTestId("priority-select");
        fireEvent.change(selectPriority, { target: { value: "mardi" } });
        expect(handleChangePriority).toHaveBeenCalled();
    });

    it("crosses out todo on cross button click", () => {
        const { container } = render(
            <TodoPerDay todo={mockTodos[0]} todos={mockTodos} setTodos={mockSetTodos} />
        );
        const crossBtn = container.querySelector(".cross--out--btn");
        if (!crossBtn) throw new Error("delete button not found");
        fireEvent.click(crossBtn!);
        expect(mockSetTodos).toHaveBeenCalled();
    });

    it("calls fetch twice when delete button clicked", async () => {
        const fetchMock = vi.fn().mockResolvedValue({ ok: true });
        vi.stubGlobal("fetch", fetchMock);
        
        const { container } = render(
            <TodoPerDay todo={mockTodos[0]} todos={mockTodos} setTodos={mockSetTodos} />
        );
        const deleteBtn = container.querySelector(".delete--btn");
        
        expect(deleteBtn).toBeTruthy();
        await fireEvent.click(deleteBtn!);
        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(2);
        });
    });


    // !!! là rien ne va plus !!!
    // it("updates editWriteParams when project input changes", () => {
    //     const { getByRole } = render(
    //         <TodoPerDay
    //             todo={mockTodos[0]}
    //             todos={mockTodos}
    //             setTodos={mockSetTodos}
    //         />
    //     );
    //     const input = getByRole("textbox");
    //     fireEvent.change(input, {
    //         target: {
    //             name: "editProject",
    //             value: "New Project",
    //         },
    //     });
    //     expect(input).toHaveValue("New Project");
    // });

    // it("updates editListe when textarea changes", () => {
    //     const { getByRole } = render(
    //         <TodoPerDay
    //             todo={mockTodos[0]}
    //             todos={mockTodos}
    //             setTodos={mockSetTodos}
    //         />
    //     );
    //     const textarea = getByRole("textbox");
    //     fireEvent.change(textarea, {
    //         target: {
    //             name: "editListe",
    //             value: "Nouvelle liste",
    //         },
    //     });
    //     expect(textarea).toHaveValue("Nouvelle liste");
    // });
});
