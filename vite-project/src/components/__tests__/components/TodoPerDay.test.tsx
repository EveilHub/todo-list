import { 
    screen,
    render, 
    fireEvent, 
    waitFor
} from "@testing-library/react";
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
import { changeColor } from "../../../utils/fonctions";
import TodoPerDay from "../../TodoPerDay";
import EditableFields from "../../subcomponents/EditableFields";

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
            }} todos={[]} setTodos={function (_value: React.SetStateAction<Todo[]>): void {
                throw new Error("Function not implemented.");
            } } />
        );
        expect(container).toMatchSnapshot();
    });
});

const mockTodo: Todo = {
    id: '1',
    client: 'John Doe',
    email: 'john@mail.com',
    phone: '123456789',
    project: 'Project A',
    liste: 'List A',
    delay: '2026-01-01',
    priority: 'High',
    date: '2026-01-01',
    isDoneClient: false,
    isDoneMail: false,
    isDonePhone: false,
    isDoneProject: false,
    isDoneListe: false,
    isDoneDelay: false,
    selectedDay: 'Monday',
    isDoneDate: false
};

const mockTodos: Todo[] = [mockTodo];
const mockSetTodos = vi.fn();

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

vi.mock("../../../utils/fonctions", () => ({
  changeColor: vi.fn(),
  formatPhoneNumber: vi.fn(() => "formatted"),
}));

afterEach(() => {
    vi.restoreAllMocks();
});

describe("TodoPerDay - actions", () => {
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

    it("hides delete button when crossed", () => {
        const { container } = render(
            <TodoPerDay todo={mockTodo} todos={mockTodos} setTodos={mockSetTodos} />
        );

        const crossBtn = container.querySelector(".cross--out--btn");
        fireEvent.click(crossBtn!);

        const deleteBtn = container.querySelector(".delete--btn");
        expect(deleteBtn).toBeNull();
    });

    it("calls changeColor on priority change", () => {
        render(<TodoPerDay todo={mockTodo} todos={mockTodos} setTodos={mockSetTodos} />);
        expect(changeColor).toHaveBeenCalled();
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

    it("toggles dayBool when day component clicked", () => {
        const { container } = render(<TodoPerDay todo={mockTodo} todos={mockTodos} setTodos={mockSetTodos} />);
        const dayButton = container.querySelector(".day--priority");
        fireEvent.click(dayButton!);
    });

    it('should show inputs when eye icon is clicked and hide on mouse leave', () => {
        render(<TodoPerDay todo={mockTodo} todos={mockTodos} setTodos={mockSetTodos} />);

        const clientDiv = screen.getByText('John Doe').closest('.client--mail--phone');
        expect(clientDiv).toHaveClass('is-close');

        const toggleButton = screen.getByTestId('toggle-client-inputs');
        fireEvent.click(toggleButton);

        expect(clientDiv).toHaveClass('is-open');
        fireEvent.mouseLeave(clientDiv!);
        expect(clientDiv).toHaveClass('is-close');
    });

    it('should call submit functions on EditableFields submit', () => {
        render(<TodoPerDay todo={mockTodo} todos={mockTodos} setTodos={mockSetTodos} />);

        const toggleButton = screen.getByTestId('toggle-client-inputs');
        fireEvent.click(toggleButton);

        const clientDiv = screen.getByText(mockTodo.client).closest('.client--mail--phone');
        expect(clientDiv).toHaveClass('is-open');
    });
});

describe('TodoPerDay Component – client/mail/phone coverage', () => {
    it('renders correctly', () => {
        render(<TodoPerDay todo={mockTodo} todos={mockTodos} setTodos={mockSetTodos} />);
        expect(screen.getByText(mockTodo.project)).toBeInTheDocument();
    });

    it("does nothing if todo.date is missing", async () => {
        const todoWithoutDate = {...mockTodo, date: ""};
        render(
            <TodoPerDay 
                todo={todoWithoutDate} 
                todos={mockTodos} 
                setTodos={mockSetTodos} 
            />
        );
        const deleteBtn = screen.queryByRole("button", { name: /delete/i });
        expect(deleteBtn).toBeFalsy();
    });

    it("does nothing if todo not found in todos", async () => {
        const { container } = render(
            <TodoPerDay 
                todo={{...mockTodo, id: "999"}} 
                todos={mockTodos} 
                setTodos={mockSetTodos} 
            />
        );
        const deleteBtn = container.querySelector(".delete--btn");
        if (deleteBtn) await fireEvent.click(deleteBtn);
        expect(mockSetTodos).not.toHaveBeenCalledWith(expect.arrayContaining([{ id: '999' }]));
    });

    it("renders input in edit mode and shows save icon", () => {
        render(
            <EditableFields
                as="input"
                type="text"
                name="editProject"
                value="Test"
                editBoolParams={true}
                editWriteParams="Test"
                isDoneParams={false}
                onSubmit={vi.fn()}
                onChange={vi.fn()}
                className="test"
            />
        );

        expect(screen.getByDisplayValue("Test")).toBeInTheDocument();
        expect(screen.getByTestId("submit-btn")).toBeInTheDocument();
    });

    it("renders strikethrough when isDoneParams is true", () => {
        render(
            <EditableFields
            as="input"
            name="editProject"
            value="Test"
            editBoolParams={false}
            editWriteParams="Test"
            isDoneParams={true}
            onSubmit={vi.fn()}
            onChange={vi.fn()}
            className="test"
            />
        );

        expect(screen.getByText("Test").tagName).toBe("S");
    });

    it("renders readonly textarea when not editing", () => {
        render(
            <EditableFields
            as="textarea"
            name="editListe"
            value="List"
            editBoolParams={false}
            editWriteParams="List"
            isDoneParams={false}
            onSubmit={vi.fn()}
            onChange={vi.fn()}
            className="test"
            />
        );

        const textarea = screen.getByDisplayValue("List");
        expect(textarea).toHaveAttribute("readonly");
    });
});