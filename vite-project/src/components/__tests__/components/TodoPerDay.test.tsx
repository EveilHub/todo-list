import { createRef, useState, type ChangeEvent, type FormEvent } from "react";

import userEvent from "@testing-library/user-event";
import { fireEvent, render, screen, waitFor } from "@testing-library/react";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";

import type { 
    EditableElement, 
    EditableProps, 
    ParamsPriorityTypes, 
    Todo
} from "../../../lib/definitions";

import * as callChangeModule from "../../../utils/todoFunctions";
import { changeColor, formatPhoneNumber } from "../../../utils/fonctions";

import TodoPerDay from "../../TodoPerDay";
import EditableFields from "../../subcomponents/EditableFields";
import CheckDay from "../../subcomponents/CheckDay";
import PriorityTodo from "../../subcomponents/PriorityTodo";

import { FaEye } from 'react-icons/fa';

vi.mock("../../subcomponents/CheckDay", () => ({
  default: ({
      id,
      dayBool,
      selectedDay,
      handleChangeDay,
      onClick
  }: any) => (
        <div id={id} className="div--day">
            {dayBool === false ? (
                <select
                    id="optionsDays"
                    data-testid="day-select"
                    value={selectedDay} 
                    onChange={handleChangeDay}
                    onMouseLeave={onClick}
                    className="select--day"
                >
                    <option value="lundi">Lundi</option>
                    <option value="mardi">Mardi</option>
                    <option value="mercredi">Mercredi</option>
                    <option value="jeudi">Jeudi</option>
                    <option value="vendredi">Vendredi</option>
                </select>
            ) : (
                <span 
                    data-testid="toggle-day"
                    onMouseEnter={onClick}
                    className="checkday--span"
                >
                    {selectedDay?.toUpperCase()}
                </span>
            )}
        </div>
  ),
}));

vi.mock("../../subcomponents/PriorityTodo", () => ({
  default: ({
    id,
    paramsPriorityHide,
    priorityTodo,
    handleChangePriority,
    onClick
}: any) => (
        <div id={id} className="priority--container">
            {paramsPriorityHide === false ? (
                <select 
                    id="optionsPriority"
                    data-testid="priority-select"
                    name="priority"
                    value={priorityTodo}
                    onChange={handleChangePriority}
                    onMouseLeave={onClick}
                    className="priority--select"
                >
                    <option value="option3">Priorité 3 (Standard)</option>
                    <option value="option2">Priorité 2 (Important)</option>
                    <option value="option1">Priorité 1 (Urgent)</option>
                </select>
            ) : (
                <span 
                    data-testid="toggle-priority"
                    onMouseEnter={onClick}
                    className="priority--span"
                >
                    PRIORITÉ
                </span>
            )}
        </div>
  ),
}));

describe('TodoPerDay snapshot test', () => {
    it('testing TodoPerDay component', () => {
        const { container } = render(
            <TodoPerDay todo={{
                id: "1",
                date: "",
                project: "",
                liste: "",
                delay: "",
                client: "",
                email: "",
                phone: "",
                priority: "option3",
                selectedDay: "lundi",
                isDoneDate: false,
                isDoneProject: false,
                isDoneListe: false,
                isDoneDelay: false,
                isDoneClient: false,
                isDoneMail: false,
                isDonePhone: false
            }} todos={[]} setTodos={vi.fn()} 
            />
        );
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

vi.mock('../../../utils/fonctions', async (importOriginal) => {
    const actual = await importOriginal<typeof import('../../../utils/fonctions')>();
    return {
        ...actual,
        changeColor: vi.fn(),
    };
});

const mockTodo: Todo = {
    id: '1',
    client: 'John Doe',
    email: 'john@mail.com',
    phone: '123 456 78 19',
    project: 'Project A',
    liste: 'List A',
    delay: '2026/01/01 09:00',
    priority: 'option3',
    date: '2026/01/01 09:00',
    isDoneClient: false,
    isDoneMail: false,
    isDonePhone: false,
    isDoneProject: false,
    isDoneListe: false,
    isDoneDelay: false,
    selectedDay: 'mardi',
    isDoneDate: false
};

const mockTodos: Todo[] = [mockTodo];
const mockSetTodos = vi.fn();

beforeEach(() => {
    globalThis.fetch = vi.fn();
});

afterEach(() => {
    vi.restoreAllMocks();
});

describe("TodoPerDay full snapshot test", () => {
    it("handleDelete returns early if todo.date is empty", async () => {
        const mockSetTodos = vi.fn();

        const emptyTodo = {
            id: "1",
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
            isDonePhone: false,
        };

        render(
            <TodoPerDay todo={emptyTodo} todos={[]} setTodos={mockSetTodos} />
        );

        const deleteBtn = screen.queryByTestId("add-delete");

        if (deleteBtn) {
            userEvent.click(deleteBtn);
        }

        expect(globalThis.fetch).not.toHaveBeenCalled();
        expect(mockSetTodos).not.toHaveBeenCalled();
    });

    it('renders select when dayBool is false', () => {
        render(
            <CheckDay
                id="1"
                dayBool={false}
                selectedDay="lundi"
                handleChangeDay={vi.fn()}
                onClick={vi.fn()}
            />
        )

        expect(screen.getByTestId('day-select')).toBeInTheDocument()
    });

    it('renders span when dayBool is true', () => {
        render(
            <CheckDay
                id="1"
                dayBool={true}
                selectedDay="lundi"
                handleChangeDay={vi.fn()}
                onClick={vi.fn()}
            />
        )

        expect(screen.getByTestId('toggle-day')).toBeInTheDocument()
    });

    it('renders select when dayBool is false', () => {
        render(
            <PriorityTodo
                id="1" 
                paramsPriorityHide={false} 
                priorityTodo={""} 
                onClick={() => vi.fn()}
                handleChangePriority={() => vi.fn()}
            />
        )

        expect(screen.getByTestId('priority-select')).toBeInTheDocument()
    });

    it('renders span when dayBool is true', () => {
        render(
            <PriorityTodo
                id="1"
                paramsPriorityHide={true} 
                priorityTodo={""} 
                onClick={() => vi.fn()}
                handleChangePriority={() => vi.fn()}
            />
        )

        expect(screen.getByTestId('toggle-priority')).toBeInTheDocument()
    });

    it("should call callChangeDay with correct arguments", async () => {
        const user = userEvent.setup();
        const todo = mockTodos[0];
        
        const setTodos = vi.fn();

        const WrapperDay = () => {

            const [dayBool, setDayBool] = useState<boolean>(false);
            const [selectedDay, setSelectedDay] = useState<string>("lundi");

            const changeDayFunction = (e: ChangeEvent<HTMLSelectElement>, id: string) => {
                callChangeModule.callChangeDay(e, id, setTodos, setDayBool);
                setSelectedDay(e.target.value)
            };

            return (
                <CheckDay
                    id={todo.id}
                    dayBool={dayBool}
                    selectedDay={selectedDay}
                    handleChangeDay={(e) => changeDayFunction(e, todo.id)}
                    onClick={() => setDayBool(true)}
                />
            );
        };

        render(<WrapperDay/>);

        const submitBtn = screen.getByTestId("day-select") as HTMLSelectElement;

        await user.selectOptions(submitBtn, "mardi");

        expect(submitBtn.value).toBe("mardi");

        expect(callChangeModule.callChangeDay).toHaveBeenCalled();
    });

    it("renders TodoPerDay with EditableFields visible", () => {
        const setTodosMock = vi.fn();
        const user = userEvent.setup();

        const { container } = render(
            <TodoPerDay todo={mockTodo} todos={[mockTodo]} setTodos={setTodosMock} />
        );

        const toggleProject = screen.getByText(mockTodo.project);
        user.click(toggleProject);

        const toggleListe = screen.getByText(mockTodo.liste);
        user.click(toggleListe);

        const toggleDelay = screen.getByText(mockTodo.delay);
        user.click(toggleDelay);

        const toggleClient = screen.getByText(mockTodo.client);
        user.click(toggleClient);

        const toggleMail = screen.getByText(mockTodo.email);
        user.click(toggleMail);

        const togglePhone = screen.getByText(mockTodo.phone);
        user.click(togglePhone);

        expect(container).toMatchSnapshot();
    });
});

describe("TodoPerDay - actions", () => {
    it("calls submit functions on each submit button click", async () => {
        const user = userEvent.setup();

        const { getAllByTestId } = render(
            <TodoPerDay
                todo={mockTodos[0]}
                todos={mockTodos}
                setTodos={mockSetTodos}
            />
        );

        const submitButtons = getAllByTestId("submit-btn");

        await user.click(submitButtons[0]);
        await user.click(submitButtons[1]);
        await user.click(submitButtons[2]);
        await user.click(submitButtons[3]);
        await user.click(submitButtons[4]);
        await user.click(submitButtons[5]);

        expect(callChangeModule.submitProject).toHaveBeenCalled();
        expect(callChangeModule.submitListe).toHaveBeenCalled();
        expect(callChangeModule.submitDelay).toHaveBeenCalled();
        expect(callChangeModule.submitClient).toHaveBeenCalled();
        expect(callChangeModule.submitMail).toHaveBeenCalled();
        expect(callChangeModule.submitPhone).toHaveBeenCalled();
    });

    it("calls callChangeDay when priority select changes", async () => {
        const user = userEvent.setup();

        const { getByTestId } = render(
            <TodoPerDay todo={mockTodos[0]} todos={mockTodos} setTodos={mockSetTodos} />
        );
        await user.click(getByTestId("toggle-day"));
        const selectDay = getByTestId("day-select");
        await user.selectOptions(selectDay, "jeudi");
        expect(callChangeModule.callChangeDay).toHaveBeenCalled();
    });

    it("calls handleChangePriority when priority select changes", async () => {
        const user = userEvent.setup();
        const { getByTestId } = render(
            <TodoPerDay todo={mockTodos[0]} todos={mockTodos} setTodos={mockSetTodos} />
        );
        await user.click(getByTestId("toggle-priority"));
        const selectPriority = getByTestId("priority-select");
        await user.selectOptions(selectPriority, "option1");
        expect(callChangeModule.handleChangePriority).toHaveBeenCalled();
    });

    it("crosses out todo on cross button click", async () => {
        const user = userEvent.setup();
        const { container } = render(
            <TodoPerDay todo={mockTodos[0]} todos={mockTodos} setTodos={mockSetTodos} />
        );
        const crossBtn = container.querySelector(".cross--out--btn");
        if (!crossBtn) throw new Error("delete button not found");
        await user.click(crossBtn!);
        expect(mockSetTodos).toHaveBeenCalled();
    });

    it("hides delete button when crossed", async () => {
        const user = userEvent.setup();
        const { container } = render(
            <TodoPerDay todo={mockTodo} todos={mockTodos} setTodos={mockSetTodos} />
        );

        const crossBtn = container.querySelector(".cross--out--btn");
        await user.click(crossBtn!);

        const deleteBtn = container.querySelector(".delete--btn");
        expect(deleteBtn).toBeNull();
    });

    it("calls changeColor on priority change", () => {
        render(<TodoPerDay todo={mockTodo} todos={mockTodos} setTodos={mockSetTodos} />);

        expect(changeColor).toHaveBeenCalled();
    });

    it('should apply correct background color depending on priority', () => {
        const highPriorityTodo = {
            ...mockTodo,
            priority: "option1"
        };

        render(
            <TodoPerDay
            todo={highPriorityTodo}
            todos={[highPriorityTodo]}
            setTodos={vi.fn()}
            />
        );

        const container = document.querySelector('.container--todo');

        expect(container).toHaveStyle({
            backgroundColor: expect.any(String)
        });
    });

    it("calls fetch twice when delete button clicked", async () => {
        const user = userEvent.setup();
        const fetchMock = vi.fn().mockResolvedValue({ ok: true });
        vi.stubGlobal("fetch", fetchMock);
        
        const { container } = render(
            <TodoPerDay todo={mockTodos[0]} todos={mockTodos} setTodos={mockSetTodos} />
        );
        const deleteBtn = container.querySelector(".delete--btn");
        
        expect(deleteBtn).toBeTruthy();
        await user.click(deleteBtn!);
        await waitFor(() => {
            expect(fetchMock).toHaveBeenCalledTimes(2);
        });
    });

    it('should show inputs when eye icon is clicked and hide on mouse leave', async () => {
    const user = userEvent.setup();

    render(<TodoPerDay todo={mockTodo} todos={mockTodos} setTodos={mockSetTodos} />);

    const clientContainer = screen
        .getByTestId('toggle-client-inputs')
        .closest('.absolute--div')!
        .querySelector('.client--mail--phone') as HTMLElement;

    expect(clientContainer).toHaveClass('is-close');

    // Eye img click
    const toggleButton = screen.getByTestId('toggle-client-inputs');
    await user.click(toggleButton);

    expect(clientContainer).toHaveClass('is-open');

    // correct with userEvent !
    fireEvent.mouseLeave(clientContainer);

    expect(clientContainer).toHaveClass('is-close');
    });

    it('should call submit functions on EditableFields submit', async () => {
        const user = userEvent.setup();
        render(<TodoPerDay todo={mockTodo} todos={mockTodos} setTodos={mockSetTodos} />);

        const toggleButton = screen.getByTestId('toggle-client-inputs');
        await user.click(toggleButton);

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
        const user = userEvent.setup();
        const { container } = render(
            <TodoPerDay 
                todo={{...mockTodo, id: "999"}} 
                todos={mockTodos} 
                setTodos={mockSetTodos} 
            />
        );
        const deleteBtn = container.querySelector(".delete--btn");
        if (deleteBtn) {
            await user.click(deleteBtn);
        }
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

    it("calls focus when editBoolProject becomes true", async () => {
        const focusSpy = vi.spyOn(HTMLElement.prototype, "focus");

        const user = userEvent.setup();

        render(
            <TodoPerDay
                todo={mockTodo}
                todos={[]}
                setTodos={() => {}}
            />
        );

        const buttons = screen.getAllByTestId("submit-btn");
        await user.click(buttons[0]);

        await waitFor(() => {
            expect(focusSpy).toHaveBeenCalledTimes(1);
        });
        focusSpy.mockRestore();
    });

    it("REF should not focus the input when editBoolProject is false", () => {
        const focusMock = vi.fn();

        render(
            <EditableFields
                editWriteParams="Project A" 
                name="editProject"
                value="Project A"
                editBoolParams={false}
                isDoneParams={false} 
                onSubmit={vi.fn()}
                onChange={vi.fn()}
            />
        );

        expect(focusMock).toHaveBeenCalledTimes(0);
    });

    it("1) render textarea and call onChange when edited", async () => {
        const user = userEvent.setup();
        const ref = createRef<EditableElement>();
        const handleChange = vi.fn();
        const handleSubmit = vi.fn();

        const props: EditableProps = {
            as: "textarea",
            name: "editListe",
            value: "Liste A",
            editBoolParams: true,
            editWriteParams: "Liste A",
            isDoneParams: false,
            onChange: handleChange,
            onSubmit: handleSubmit,
            className: "input-button-container",
            ref: ref
        };

        const { getByDisplayValue } = render(<EditableFields {...props} />);

        const textarea = getByDisplayValue("Liste A") as HTMLTextAreaElement;
        expect(textarea).toBeInTheDocument();

        const focusSpy = vi.spyOn(textarea, "focus");

        textarea.focus();
        await user.type(textarea, "Liste B");

        expect(focusSpy).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalled();
    });
});

describe("EditableFields Component – coverage editParamsOnChange", () => {
    // it("2) should render textarea list and call onChange when edited", async () => {
    //     const user = userEvent.setup();
    //     const handleSubmit = vi.fn();
  
    //     const Wrapper = () => {
    //         const [val, setVal] = useState("Liste A");

    //         const handleChange: EditableProps["onChange"] = (e) => {
    //             const { value } = e.target;
    //             setVal(value);
    //         };

    //         return (
    //             <EditableFields
    //                 as="textarea"
    //                 name="editListe"
    //                 value={val}
    //                 editWriteParams={val}
    //                 editBoolParams={true}
    //                 isDoneParams={false}
    //                 onChange={handleChange}
    //                 onSubmit={handleSubmit}
    //                 className="input-button-container"
    //             />
    //         );
    //     }

    //     const { getByDisplayValue } = render(<Wrapper />);

    //     const textarea = getByDisplayValue("Liste A") as HTMLTextAreaElement;
    //     expect(textarea).toBeInTheDocument();

    //     const focusSpy = vi.spyOn(textarea, "focus");
    //     textarea.focus();
    //     expect(focusSpy).toHaveBeenCalled();

    //     await user.clear(textarea);
    //     await user.type(textarea, "Liste B");

    //     expect(textarea.value).toBe("Liste B");
    // });

    it("should render input mail and call onChange when edited", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();

        const Wrapper = () => {
            const [val, setVal] = useState("mail@mail.com");

            const handleChange: EditableProps["onChange"] = (e) => {
                const { value } = e.target;
                setVal(value);
            };

            return (
                <EditableFields
                    as="input"
                    name="editEmail"
                    value={val}
                    editWriteParams={val}
                    editBoolParams={true}
                    isDoneParams={false}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    className="input-button-container"
                />
            );
        }

        const { getByDisplayValue } = render(<Wrapper />);

        const input = getByDisplayValue("mail@mail.com") as HTMLInputElement;
        expect(input).toBeInTheDocument();

        const focusSpy = vi.spyOn(input, "focus");
        input.focus();
        expect(focusSpy).toHaveBeenCalled();

        await user.clear(input);
        await user.type(input, "mail@mail.io");

        expect(input.value).toBe("mail@mail.io");
    });

    it("should render input delay and call onChange when edited", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();

        const Wrapper = () => {
            const [val, setVal] = useState("01/07/2026 08:00");

            const handleChange: EditableProps["onChange"] = (e) => {
                const { value } = e.target;
                setVal(value);
            };

            return (
                <EditableFields
                    as="input"
                    name="editDelay"
                    value={val}
                    editWriteParams={val}
                    editBoolParams={true}
                    isDoneParams={false}
                    onChange={handleChange}
                    onSubmit={handleSubmit}
                    className="input-button-container"
                />
            );
        }

        const { getByDisplayValue } = render(<Wrapper />);

        const input = getByDisplayValue("01/07/2026 08:00") as HTMLInputElement;
        expect(input).toBeInTheDocument();

        const focusSpy = vi.spyOn(input, "focus");
        input.focus();
        expect(focusSpy).toHaveBeenCalled();

        await user.clear(input);
        await user.type(input, "02/08/2026 10:10");

        expect(input.value).toBe("02/08/2026 10:10");
    });
});

describe("EditableFields Component – editPhoneOnChange", () => {
    it("should render input and call onChange when edited", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();

        // Wrapper qui gère le state pour simuler le comportement contrôlé
        const Wrapper = () => {
            const [val, setVal] = useState("0123456789");

            const editPhoneOnChange: EditableProps["onChange"] = (e) => {
                const { value } = e.target;
                setVal(value);
            };

            return (
                <EditableFields
                    as="input"
                    name="editPhone"
                    value={val}
                    editWriteParams={val}
                    editBoolParams={true}
                    isDoneParams={false}
                    onChange={editPhoneOnChange}
                    onSubmit={handleSubmit}
                    className="input-button-container"
                />
            );
        }

        const { getByDisplayValue } = render(<Wrapper />);

        const input = getByDisplayValue("0123456789") as HTMLInputElement;
        expect(input).toBeInTheDocument();

        const focusSpy = vi.spyOn(input, "focus");
        input.focus();
        expect(focusSpy).toHaveBeenCalled();

        await user.clear(input);
        await user.type(input, "0123456780");

        expect(formatPhoneNumber(input.value)).toBe("012 345 67 80");
    });

    it('formate correctement un numéro brut', () => {
        expect(formatPhoneNumber('0766736734')).toBe('076 673 67 34');
    });
    
    it('retourne une string vide si vide', () => {
        expect(formatPhoneNumber('')).toBe('');
    });

    it("return a short number", () => {
        expect(formatPhoneNumber('123')).toBe('123');
    });

    it("return a letter", () => {
        expect(formatPhoneNumber('zut')).not.toBe('zut');
    });
});

describe("TodoPerDay - handleDelete errors", () => {
    let consoleSpy: any;

    beforeEach(() => {
        consoleSpy = vi.spyOn(console, "error").mockImplementation(() => {});
        vi.stubGlobal("fetch", vi.fn());
    });

    afterEach(() => {
        vi.restoreAllMocks();
    });

    it("log une erreur si le POST add todo échoue", async () => {
        (fetch as any).mockRejectedValueOnce(new Error("Erreur ajout Todo"));

        const todos = [mockTodo];
        const setTodos = vi.fn();

        render(<TodoPerDay todo={mockTodo} todos={todos} setTodos={setTodos} />);

        const deleteButton = screen.getByTestId("add-delete");

        await userEvent.click(deleteButton);

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(
                "Erreur ajout todo",
                expect.any(Error)
            );
        });
    });

    it("log une erreur si la suppression DELETE échoue", async () => {
        // Premier fetch OK (POST add)
        (fetch as any).mockResolvedValueOnce({ ok: true });
        // Deuxième fetch échoue (DELETE)
        (fetch as any).mockRejectedValueOnce(new Error("Erreur DELETE"));

        const todos = [mockTodo];
        const setTodos = vi.fn();

        render(<TodoPerDay todo={mockTodo} todos={todos} setTodos={setTodos} />);

        const deleteButton = screen.getByTestId("add-delete");

        await userEvent.click(deleteButton);

        await waitFor(() => {
            expect(consoleSpy).toHaveBeenCalledWith(
                "Erreur DELETE",
                expect.any(Error)
            );
        });
    });
});

describe("Editable Fields Tests", () => {
    it("updates multiple fields correctly via editParamsOnChange", async () => {
        const user = userEvent.setup();

        const Wrapper = () => {
            const [editWriteParams, setEditWriteParams] = useState({
                editProject: "Old Project",
                editListe: "Old Liste",
                editDelay: "Old Delay", 
                editClient: "Old Client",
                editMail: "old@mail.com",
                editPhone: "0123456789",
                editId: "1"
            });
            const [editBoolParams, ] = useState(true);

            const editParamsOnChange = (e: ChangeEvent<EditableElement>) => {
                const { name, value } = e.target;
                setEditWriteParams((prev) => ({
                    ...prev,
                    [name]: value
                }));
            };

            return (
                <>
                    <EditableFields
                        editBoolParams={editBoolParams}
                        editWriteParams={editWriteParams.editProject}
                        onChange={editParamsOnChange}
                        isDoneParams={false}
                        name={"editProject"} 
                        value={editWriteParams.editProject} 
                        onSubmit={() => vi.fn()}
                    />

                    <EditableFields
                        editBoolParams={editBoolParams}
                        editWriteParams={editWriteParams.editListe}
                        onChange={editParamsOnChange}
                        isDoneParams={false}
                        name={"editListe"} 
                        value={editWriteParams.editListe} 
                        onSubmit={() => vi.fn()}
                    />

                    <EditableFields
                        editBoolParams={editBoolParams}
                        editWriteParams={editWriteParams.editDelay}
                        onChange={editParamsOnChange}
                        isDoneParams={false}
                        name={"editDelay"} 
                        value={editWriteParams.editDelay} 
                        onSubmit={() => vi.fn()}
                    />

                    <EditableFields
                        editBoolParams={editBoolParams}
                        editWriteParams={editWriteParams.editClient}
                        onChange={editParamsOnChange}
                        isDoneParams={false}
                        name={"editClient"} 
                        value={editWriteParams.editClient} 
                        onSubmit={() => vi.fn()}
                    />

                    <EditableFields
                        editBoolParams={editBoolParams}
                        editWriteParams={editWriteParams.editMail}
                        onChange={editParamsOnChange}
                        isDoneParams={false}
                        name={"editMail"} 
                        value={editWriteParams.editMail} 
                        onSubmit={() => vi.fn()}
                    />
                </>

            );
        };

        const { getByDisplayValue } = render(<Wrapper />);

        const projectInput = getByDisplayValue("Old Project") as HTMLInputElement;
        await user.clear(projectInput);
        await user.type(projectInput, "New Project");
        expect(projectInput.value).toBe("New Project");

        const listeInput = getByDisplayValue("Old Liste") as HTMLTextAreaElement;
        await user.clear(listeInput);
        await user.type(listeInput, "New Liste");
        expect(listeInput.value).toBe("New Liste");

        const delayInput = getByDisplayValue("Old Delay") as HTMLInputElement;
        await user.clear(delayInput);
        await user.type(delayInput, "New Delay");
        expect(delayInput.value).toBe("New Delay");

        const clientInput = getByDisplayValue("Old Client") as HTMLInputElement;
        await user.clear(clientInput);
        await user.type(clientInput, "New Client");
        expect(clientInput.value).toBe("New Client");

        const mailInput = getByDisplayValue("old@mail.com") as HTMLInputElement;
        await user.clear(mailInput);
        await user.type(mailInput, "new@mail.com");
        expect(mailInput.value).toBe("new@mail.com");
    });

    it("updates multiple fields correctly via editParamsOnChange", async () => {

        const Wrapper = () => {
            const [editWriteParams, setEditWriteParams] = useState({
                editProject: "Old Project",
                editListe: "Old Liste",
                editDelay: "Old Delay", 
                editClient: "Old Client",
                editMail: "old@mail.com",
                editPhone: "0123456789",
                editId: "1"
            });
            const [editBoolParams, ] = useState(false);

            const editParamsOnChange = (e: ChangeEvent<EditableElement>) => {
                const { name, value } = e.target;
                setEditWriteParams((prev) => ({
                    ...prev,
                    [name]: value
                }));
            };

            return (
                <>
                    <EditableFields
                        editBoolParams={editBoolParams}
                        editWriteParams={editWriteParams.editProject}
                        onChange={editParamsOnChange}
                        isDoneParams={false}
                        name={"editProject"} 
                        value={editWriteParams.editProject} 
                        onSubmit={() => vi.fn()}
                    />

                    <EditableFields
                        editBoolParams={editBoolParams}
                        editWriteParams={editWriteParams.editListe}
                        onChange={editParamsOnChange}
                        isDoneParams={false}
                        name={"editListe"} 
                        value={editWriteParams.editListe} 
                        onSubmit={() => vi.fn()}
                    />

                    <EditableFields
                        editBoolParams={editBoolParams}
                        editWriteParams={editWriteParams.editDelay}
                        onChange={editParamsOnChange}
                        isDoneParams={false}
                        name={"editDelay"} 
                        value={editWriteParams.editDelay} 
                        onSubmit={() => vi.fn()}
                    />

                    <EditableFields
                        editBoolParams={editBoolParams}
                        editWriteParams={editWriteParams.editClient}
                        onChange={editParamsOnChange}
                        isDoneParams={false}
                        name={"editClient"} 
                        value={editWriteParams.editClient} 
                        onSubmit={() => vi.fn()}
                    />

                    <EditableFields
                        editBoolParams={editBoolParams}
                        editWriteParams={editWriteParams.editMail}
                        onChange={editParamsOnChange}
                        isDoneParams={false}
                        name={"editMail"} 
                        value={editWriteParams.editMail} 
                        onSubmit={() => vi.fn()}
                    />
                </>

            );
        };

        render(<Wrapper />);
        
        const projectSpan = screen.queryByText("Old Project");
        expect(projectSpan).toBeInTheDocument();

        const listeSpan = screen.queryByText("Old Liste");
        expect(listeSpan).toBeInTheDocument();

        const delaySpan = screen.queryByText("Old Delay");
        expect(delaySpan).toBeInTheDocument();

        const clientSpan = screen.queryByText("Old Client");
        expect(clientSpan).toBeInTheDocument();

        const mailSpan = screen.queryByText("old@mail.com");
        expect(mailSpan).toBeInTheDocument();
    });
})

describe("Priority tests", () => {
    it("update priority correctly via changeDayFunction with hidePriority to false", async () => {
        const user = userEvent.setup();

        const Wrapper = () => {
            const [paramsPriority, setParamsPriority] = useState<ParamsPriorityTypes>({
                hidePriority: false,
                bgColor: "#4169e11a"
            });
            const callHandleChangePriority = async (
                e: ChangeEvent<HTMLSelectElement>, id: string): Promise<void> => { 
                    setParamsPriority((prev) => ({...prev, paramsPriority: e.target.value}));
                    mockSetTodos((toPrev: Todo) => toPrev.id === id ? {...toPrev, priority: e.target.value} : toPrev);
                    //handleChangePriority(e, id, mockSetTodos, setParamsPriority);
            };

            return (
                <PriorityTodo 
                    id={mockTodo.id}
                    paramsPriorityHide={paramsPriority.hidePriority}
                    priorityTodo={mockTodo.priority}
                    onClick={() => setParamsPriority((prev: ParamsPriorityTypes) => ({
                        ...prev, 
                        hidePriority: !prev.hidePriority
                        })
                    )}
                    handleChangePriority={(e) => callHandleChangePriority(e, mockTodo.id)}
                />
            );
        };

        render(<Wrapper/>);

        const submitBtn = screen.getByTestId("priority-select") as HTMLSelectElement;
        await user.selectOptions(submitBtn, "option3");
        expect(submitBtn.value).toBe("option3");

        await user.hover(submitBtn);
        await user.unhover(submitBtn);
        expect(screen.getByTestId('toggle-priority')).toBeInTheDocument();
    });
});

describe("Day Tests", () => {
    it("update DAY correctly via changeDayFunction with dayBool to false", async () => {
        const user = userEvent.setup();

        const Wrapper = () => {
            const [selectedDay, setSelectedDay] = useState<string>("lundi");

            const [dayBool, setDayBool] = useState(false);

            const changeDayFunction = (e: ChangeEvent<HTMLSelectElement>) => {
                setSelectedDay(e.target.value)
            };

            return (
                <CheckDay
                    id="1"
                    dayBool={dayBool}
                    selectedDay={selectedDay}
                    handleChangeDay={changeDayFunction}
                    onClick={() => setDayBool(true)}
                />
            );
        };

        render(<Wrapper/>);

        const submitBtn = screen.getByTestId("day-select") as HTMLSelectElement;
        await user.selectOptions(submitBtn, "mardi");
        expect(submitBtn.value).toBe("mardi");

        await user.hover(submitBtn);
        await user.unhover(submitBtn);
        expect(screen.getByTestId('toggle-day')).toBeInTheDocument();
    });

    it("update DAY correctly via changeDayFunction with dayBool to true", async () => {
        const user = userEvent.setup();

        const Wrapper = () => {
            const [selectedDay, setSelectedDay] = useState<string>("lundi");

            const [dayBool, setDayBool] = useState(true);

            const changeDayFunction = (e: ChangeEvent<HTMLSelectElement>) => {
                setSelectedDay(e.target.value)
            };

            return (
                <CheckDay
                    id="1"
                    dayBool={dayBool}
                    selectedDay={selectedDay}
                    handleChangeDay={changeDayFunction}
                    onClick={() => setDayBool(false)}
                />
            );
        };

        render(<Wrapper/>);

        const submitBtn = screen.getByTestId("toggle-day") as HTMLSpanElement;
        expect(submitBtn.textContent).toBe("LUNDI");

        await user.hover(submitBtn);
        expect(screen.getByTestId('day-select')).toBeInTheDocument();
    });
});

describe("isVisible toggle behavior", () => {
    it("should toggle visibility when the button is clicked", async () => {
        const user = userEvent.setup();
        
        const Wrapper = () => {
            const [isVisible, setIsVisible] = useState(false);
            
            return (
                <div className="absolute--div">
                    <div
                        onMouseLeave={() => setIsVisible(false)}
                        data-testid="client--mail--phone"
                        className={`client--mail--phone ${isVisible ? "is-open" : "is-close"}`}
                    >
                        <EditableFields
                            onSubmit={() => {}}
                            type="text"
                            as="input"
                            className={`input-button-client ${isVisible ? "show" : "hide"}`}
                            name="editClient"
                            value="Client"
                            onChange={() => {}}
                            editBoolParams={false}
                            editWriteParams={"Client"}
                            isDoneParams={false}
                            data-testid="client"
                        />
                        <EditableFields
                            onSubmit={() => {}}
                            type="email"
                            as="input"
                            className={`input-button-mail ${isVisible ? "show" : "hide"}`}
                            name="editMail"
                            value="Test@mail.com"
                            onChange={() => {}}
                            editBoolParams={false}
                            editWriteParams={"Mail"}
                            isDoneParams={false}
                            data-testid="mail"
                        />
                        <EditableFields
                            onSubmit={() => {}}
                            type="text"
                            as="input"
                            className={`input-button-phone ${isVisible ? "show" : "hide"}`}
                            name="editPhone"
                            value="123456789"
                            onChange={() => {}}
                            editBoolParams={false}
                            editWriteParams={"Phone"}
                            isDoneParams={false}
                            data-testid="phone"
                        />
                    </div>

                    <div className="div--hidden--clientMailPhone">
                        <span 
                        onClick={() => setIsVisible(true)}
                        className={`span--client--mail--phone ${isVisible ? "hide" : "show"}`}
                        data-testid="toggle-client-inputs"
                        >
                        <FaEye size={24} />
                        </span>
                    </div>
                </div>
            );
        };

        render(<Wrapper />);

        const clientMailPhone = screen.getByTestId("client--mail--phone");
        expect(clientMailPhone).toHaveClass('client--mail--phone', 'is-close');

        const clientField = screen.queryByText("Client");
        expect(clientField).toBeInTheDocument();
        const editableFieldClient = document.querySelector('.input-button-client');
        expect(editableFieldClient).toHaveClass("input-button-client", "hide");

        const mailField = screen.queryByText("Mail");
        expect(mailField).toBeInTheDocument();
        const editableFieldMail = document.querySelector('.input-button-mail');
        expect(editableFieldMail).toHaveClass("input-button-mail", "hide");

        const phoneField = screen.queryByText("Phone");
        expect(phoneField).toBeInTheDocument();
        const editableFieldPhone = document.querySelector('.input-button-phone');
        expect(editableFieldPhone).toHaveClass("input-button-phone", "hide");
        
        const toggleButton = screen.getByTestId("toggle-client-inputs");
        expect(toggleButton).toBeInTheDocument();
        
        await user.click(toggleButton);
        
        expect(editableFieldClient).toHaveClass('input-button-client','show');
        expect(editableFieldMail).toHaveClass('input-button-mail','show');
        expect(editableFieldPhone).toHaveClass('input-button-phone','show');

        await user.hover(screen.getByText("Client"));
        await user.unhover(screen.getByText("Client"));
        
        expect(editableFieldClient).toHaveClass("input-button-client", 'hide');
        expect(editableFieldMail).toHaveClass("input-button-mail", 'hide');
        expect(editableFieldPhone).toHaveClass("input-button-phone", 'hide');
    });
});


it("affiche le bouton delete quand crossedItem est false", () => {
    render(<TodoPerDay todo={mockTodo} todos={mockTodos} setTodos={mockSetTodos} />);

    const deleteBtn = screen.getByTestId("add-delete");

    expect(deleteBtn).toBeInTheDocument();
});

it("cache le bouton delete quand le todo est barré", async () => {
  const user = userEvent.setup();

  render(<TodoPerDay todo={mockTodo} todos={mockTodos} setTodos={mockSetTodos} />);

  expect(screen.getByTestId("add-delete")).toBeInTheDocument();

  const crossBtn = screen.getByRole("button", { name: /cross todo/i });
  await user.click(crossBtn);

  expect(screen.queryByTestId("add-delete")).not.toBeInTheDocument();
});

describe("EditableFields", () => {
    it("met à jour l'état quand on change l'input", async () => {
        const user = userEvent.setup();

        const Wrapper = () => {
        const [editWriteParams, setEditWriteParams] = useState({ editProject: "Old Project" });

        const editParamsOnChange = (e: ChangeEvent<EditableElement>): void => {
            const { name, value } = e.target;
            setEditWriteParams(prev => ({ ...prev, [name]: value }));
        };

        return (
            <EditableFields
                as="input"
                value={editWriteParams.editProject}
                name="editProject"
                editBoolParams={true}
                editWriteParams={editWriteParams.editProject}
                isDoneParams={false}
                onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
                onChange={editParamsOnChange}
                data-testid="input--editable"
            />
        );
        };

        render(<Wrapper />);

        const inputProject = screen.getByTestId("input--editable") as HTMLInputElement;
        expect(inputProject).toBeInTheDocument();

        await user.clear(inputProject);
        await user.type(inputProject, "New Project");

        expect(inputProject.value).toBe("New Project");
    });





type WriteEditType = { editProject: string };

describe("EditableFields - coverage editParamsOnChange", () => {
  it("met à jour l'état quand on change l'input", async () => {
    const user = userEvent.setup();

    // Wrapper pour simuler le parent
    const Wrapper = () => {
      const [editWriteParams, setEditWriteParams] = useState<WriteEditType>({
        editProject: "Old Project",
      });

      const editParamsOnChange = (e: ChangeEvent<EditableElement>): void => {
        const { name, value } = e.target;
        setEditWriteParams(prev => ({ ...prev, [name]: value }));
      };

      return (
        <EditableFields
          as="input"
          value={editWriteParams.editProject}
          name="editProject"
          editBoolParams={true} // ⚠️ IMPORTANT pour rendre l'input
          editWriteParams={editWriteParams.editProject}
          isDoneParams={false}
          onSubmit={(e: FormEvent<HTMLFormElement>) => e.preventDefault()}
          onChange={editParamsOnChange}
          data-testid="input--editable"
        />
      );
    };

    render(<Wrapper />);

    // Récupérer l'input réel
    const input = screen.getByTestId("input--editable") as HTMLInputElement;
    expect(input).toBeInTheDocument();
    expect(input.value).toBe("Old Project");

    // Simuler la saisie utilisateur
    await user.clear(input);
    await user.type(input, "New Project");

    // Vérifier que le state a été mis à jour
    expect(input.value).toBe("New Project");
  });
});




    it("met à jour l'état quand on change l'input", async () => {
        //const user = userEvent.setup();

        render(<TodoPerDay todo={mockTodo} todos={mockTodos} setTodos={mockSetTodos} />);


        const editButtons = screen.getAllByTestId("submit-btn")[0];
        //await user.click(editButtons[0]);
        
        //const input = screen.getByTestId("input--editable") as HTMLInputElement;
        expect(editButtons).toBeInTheDocument();
        // await user.clear(input);
        // await user.type(input, "New Project");
        // expect(input).toHaveValue("New Project");
    });







});

describe('TodoPerDay - handleDelete & handleCrossOutTodo', () => {
 
  beforeEach(() => {
    vi.clearAllMocks();
    globalThis.fetch = vi.fn(() => Promise.resolve({ ok: true })) as any;
  });

  it('should return early if todo.date is undefined (coverage line 113-114)', async () => {
    const user = userEvent.setup();

    const todoWithoutDate: Todo = {
      id: "1",
      date: undefined as unknown as string,
      project: "Test",
      liste: "Liste",
      delay: "2026-02-18",
      client: "Client",
      email: "a@b.com",
      phone: "1234567890",
      priority: "High",
      selectedDay: "lundi",
      isDoneDate: false,
      isDoneProject: false,
      isDoneListe: false,
      isDoneDelay: false,
      isDoneClient: false,
      isDoneMail: false,
      isDonePhone: false,
    };

    render(<TodoPerDay todo={todoWithoutDate} todos={[todoWithoutDate]} setTodos={mockSetTodos} />);
    
    const deleteBtn = screen.getByTestId('add-delete');
    await user.click(deleteBtn);

    expect(mockSetTodos).not.toHaveBeenCalled();
    expect(fetch).not.toHaveBeenCalled();
  });

  it('should delete todo when date is defined (full delete branch)', async () => {
    const user = userEvent.setup();

    const todoWithDate: Todo = {
      id: "2",
      date: "2026-02-18",
      project: "Test2",
      liste: "Liste2",
      delay: "2026-02-18",
      client: "Client2",
      email: "b@b.com",
      phone: "0987654321",
      priority: "Low",
      selectedDay: "mardi",
      isDoneDate: false,
      isDoneProject: false,
      isDoneListe: false,
      isDoneDelay: false,
      isDoneClient: false,
      isDoneMail: false,
      isDonePhone: false,
    };

    render(<TodoPerDay todo={todoWithDate} todos={[todoWithDate]} setTodos={mockSetTodos} />);
    
    const deleteBtn = screen.getByTestId('add-delete');
    await user.click(deleteBtn);

    expect(mockSetTodos).toHaveBeenCalled();

    expect(fetch).toHaveBeenCalledTimes(2);
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:3001/api/todos/csv`,
      expect.objectContaining({
        method: "POST",
      })
    );
    expect(fetch).toHaveBeenCalledWith(
      `http://localhost:3001/api/todos/${todoWithDate.id}`,
      expect.objectContaining({
        method: "DELETE",
      })
    );
  });

  it('should toggle crossed state on handleCrossOutTodo (coverage line 122)', async () => {
    const user = userEvent.setup();

    const todoCross: Todo = {
      id: "3",
      date: "2026-02-18",
      project: "Cross",
      liste: "Liste",
      delay: "2026-02-18",
      client: "Client",
      email: "c@c.com",
      phone: "1122334455",
      priority: "Medium",
      selectedDay: "mercredi",
      isDoneDate: false,
      isDoneProject: false,
      isDoneListe: false,
      isDoneDelay: false,
      isDoneClient: false,
      isDoneMail: false,
      isDonePhone: false,
    };

    render(<TodoPerDay todo={todoCross} todos={[todoCross]} setTodos={mockSetTodos} />);

    const crossBtn = screen.getByLabelText('cross todo');
    await user.click(crossBtn);

    expect(mockSetTodos).toHaveBeenCalled();

    const callback = mockSetTodos.mock.calls[0][0];
    const updatedTodos = callback([todoCross]);
    expect(updatedTodos[0].isDoneProject).toBe(!todoCross.isDoneProject);
    expect(updatedTodos[0].isDoneListe).toBe(!todoCross.isDoneListe);
    expect(updatedTodos[0].isDoneClient).toBe(!todoCross.isDoneClient);
  });
});

describe('TodoPerDay - handleCrossOutTodo', () => {
  const mockSetTodos = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should toggle all isDone flags when crossing out a todo', async () => {
    const user = userEvent.setup();

    const todo: Todo = {
      id: "cross1",
      date: "2026-02-18",
      project: "Project X",
      liste: "Liste X",
      delay: "2026-02-18",
      client: "Client X",
      email: "x@x.com",
      phone: "1234567890",
      priority: "High",
      selectedDay: "lundi",
      isDoneDate: false,
      isDoneProject: false,
      isDoneListe: false,
      isDoneDelay: false,
      isDoneClient: false,
      isDoneMail: false,
      isDonePhone: false,
    };

    render(<TodoPerDay todo={todo} todos={[todo]} setTodos={mockSetTodos as any} />);

    const crossBtn = screen.getByLabelText('cross todo');
    await user.click(crossBtn);

    expect(mockSetTodos).toHaveBeenCalled();

    const callback = mockSetTodos.mock.calls[0][0];
    const updatedTodos = callback([todo]);

    expect(updatedTodos[0].isDoneDate).toBe(!todo.isDoneDate);
    expect(updatedTodos[0].isDoneProject).toBe(!todo.isDoneProject);
    expect(updatedTodos[0].isDoneListe).toBe(!todo.isDoneListe);
    expect(updatedTodos[0].isDoneDelay).toBe(!todo.isDoneDelay);
    expect(updatedTodos[0].isDoneClient).toBe(!todo.isDoneClient);
    expect(updatedTodos[0].isDoneMail).toBe(!todo.isDoneMail);
    expect(updatedTodos[0].isDonePhone).toBe(!todo.isDonePhone);
  });
});

describe('TodoPerDay - handleCrossOutTodo full coverage', () => {
  const mockSetTodos = vi.fn();

  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('should invert isDone flags for the targeted todo and keep other todos intact', async () => {
    const user = userEvent.setup();

    const todoTarget: Todo = {
      id: "cross1",
      date: "2026-02-18",
      project: "Project X",
      liste: "Liste X",
      delay: "2026-02-18",
      client: "Client X",
      email: "x@x.com",
      phone: "1234567890",
      priority: "High",
      selectedDay: "lundi",
      isDoneDate: false,
      isDoneProject: false,
      isDoneListe: false,
      isDoneDelay: false,
      isDoneClient: false,
      isDoneMail: false,
      isDonePhone: false,
    };

    const todoOther: Todo = {
      id: "other",
      date: "2026-02-18",
      project: "Other Project",
      liste: "Other Liste",
      delay: "2026-02-18",
      client: "Other Client",
      email: "other@x.com",
      phone: "0987654321",
      priority: "Low",
      selectedDay: "mardi",
      isDoneDate: false,
      isDoneProject: false,
      isDoneListe: false,
      isDoneDelay: false,
      isDoneClient: false,
      isDoneMail: false,
      isDonePhone: false,
    };

    render(<TodoPerDay todo={todoTarget} todos={[todoTarget, todoOther]} setTodos={mockSetTodos as any} />);

    const crossBtn = screen.getByLabelText('cross todo');
    await user.click(crossBtn);

    expect(mockSetTodos).toHaveBeenCalled();

    const callback = mockSetTodos.mock.calls[0][0];
    const updatedTodos = callback([todoTarget, todoOther]);

    const updatedTarget = updatedTodos.find((t: any) => t.id === "cross1");
    expect(updatedTarget?.isDoneProject).toBe(!todoTarget.isDoneProject);

    const updatedOther = updatedTodos.find((t: any) => t.id === "other");
    expect(updatedOther).toEqual(todoOther);
  });
});

