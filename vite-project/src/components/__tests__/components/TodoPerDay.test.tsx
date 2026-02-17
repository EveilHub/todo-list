import { createRef, useState, type ChangeEvent } from "react";
import { 
    screen,
    render, 
    fireEvent, 
    waitFor
} from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, it, expect, vi, afterEach, beforeEach } from "vitest";
import type { EditableElement, EditableProps, ParamsPriorityTypes, Todo, WriteEditType } from "../../../lib/definitions";
import * as callChangeModule from "../../../utils/todoFunctions";
import { changeColor, formatPhoneNumber } from "../../../utils/fonctions";
import TodoPerDay from "../../TodoPerDay";
import EditableFields from "../../subcomponents/EditableFields";
import CheckDay from "../../subcomponents/CheckDay";
import PriorityTodo from "../../subcomponents/PriorityTodo";
import { FaEye } from 'react-icons/fa';

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
            }} todos={[]} setTodos={vi.fn()} />
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
    selectedDay: 'Mardi',
    isDoneDate: false
};

const mockTodos: Todo[] = [mockTodo];
const mockSetTodos = vi.fn();

afterEach(() => {
    vi.restoreAllMocks();
});

describe("TodoPerDay full snapshot test", () => {
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
    })

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
    })


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
    })

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
    })

    it("renders TodoPerDay with EditableFields visible", () => {
        const setTodosMock = vi.fn();

        const { container } = render(
            <TodoPerDay todo={mockTodo} todos={[mockTodo]} setTodos={setTodosMock} />
        );

        const toggleProject = screen.getByText(mockTodo.project);
        fireEvent.click(toggleProject);

        const toggleListe = screen.getByText(mockTodo.liste);
        fireEvent.click(toggleListe);

        const toggleDelay = screen.getByText(mockTodo.delay);
        fireEvent.click(toggleDelay);

        const toggleClient = screen.getByText(mockTodo.client);
        fireEvent.click(toggleClient);

        const toggleMail = screen.getByText(mockTodo.email);
        fireEvent.click(toggleMail);

        const togglePhone = screen.getByText(mockTodo.phone);
        fireEvent.click(togglePhone);

        expect(container).toMatchSnapshot();
    });
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

        expect(callChangeModule.submitProject).toHaveBeenCalled();
        expect(callChangeModule.submitListe).toHaveBeenCalled();
        expect(callChangeModule.submitDelay).toHaveBeenCalled();
        expect(callChangeModule.submitClient).toHaveBeenCalled();
        expect(callChangeModule.submitMail).toHaveBeenCalled();
        expect(callChangeModule.submitPhone).toHaveBeenCalled();
    });

    it("calls callChangeDay when priority select changes", () => {
        const { getByTestId } = render(
            <TodoPerDay todo={mockTodos[0]} todos={mockTodos} setTodos={mockSetTodos} />
        );
        fireEvent.mouseEnter(getByTestId("toggle-day"));
        const selectDay = getByTestId("day-select");
        fireEvent.change(selectDay, { target: { value: "option2" } });
        expect(callChangeModule.callChangeDay).toHaveBeenCalled();
    });

    it("calls handleChangePriority when priority select changes", () => {
        const { getByTestId } = render(
            <TodoPerDay todo={mockTodos[0]} todos={mockTodos} setTodos={mockSetTodos} />
        );
        fireEvent.mouseEnter(getByTestId("toggle-priority"));
        const selectPriority = getByTestId("priority-select");
        fireEvent.change(selectPriority, { target: { value: "mardi" } });
        expect(callChangeModule.handleChangePriority).toHaveBeenCalled();
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
        const { container } = render(
            <TodoPerDay todo={mockTodo} todos={mockTodos} setTodos={mockSetTodos} />
        );
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

    it("calls handleChangePriority when priority select changes", () => {
        const { getByTestId } = render(
            <TodoPerDay todo={mockTodos[0]} todos={mockTodos} setTodos={mockSetTodos} />
        );
        fireEvent.mouseEnter(getByTestId("toggle-priority"));
        const selectPriority = getByTestId("priority-select");
        fireEvent.change(selectPriority, { target: { value: "mardi" } });

        expect(callChangeModule.handleChangePriority).toHaveBeenCalledWith(
            expect.anything(), 
            "1",
            expect.anything(),
            expect.anything()
        );

        expect(mockSetTodos).toHaveBeenCalled();
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


    it("should render input project and call onChange when edited", async () => {
        const user = userEvent.setup();
        const ref = createRef<EditableElement>();
        const handleChange = vi.fn();
        const handleSubmit = vi.fn();

        // On force editBoolParams à true pour rendre l'input
        const props: EditableProps = {
            as: "input",
            type: "text",
            name: "editProject",
            value: "Project A",
            editBoolParams: true,
            editWriteParams: "Project A",
            isDoneParams: false,
            onChange: handleChange,
            onSubmit: handleSubmit,
            className: "input-button-container",
            ref: ref
        };

        const { getByDisplayValue } = render(<EditableFields {...props} />);

        const input = getByDisplayValue("Project A") as HTMLInputElement;
        expect(input).toBeInTheDocument();

        const focusSpy = vi.spyOn(input, "focus");

        input.focus();
        await user.type(input, "Project B");

        expect(focusSpy).toHaveBeenCalled();
        expect(handleChange).toHaveBeenCalled();
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
    it("2) should render textarea list and call onChange when edited", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();
  
        const Wrapper = () => {
            const [val, setVal] = useState("Liste A");

            const handleChange: EditableProps["onChange"] = (e) => {
                const { value } = e.target;
                setVal(value);
            };

            return (
                <EditableFields
                    as="textarea"
                    name="editListe"
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

        const textarea = getByDisplayValue("Liste A") as HTMLTextAreaElement;
        expect(textarea).toBeInTheDocument();

        const focusSpy = vi.spyOn(textarea, "focus");
        textarea.focus();
        expect(focusSpy).toHaveBeenCalled();

        await user.clear(textarea);
        await user.type(textarea, "Liste B");

        expect(textarea.value).toBe("Liste B");
    });

    it("should render input project and call onChange when edited", async () => {
        const user = userEvent.setup();
        const handleSubmit = vi.fn();

        const Wrapper = () => {
            const [val, setVal] = useState("Project A");

            const handleChange: EditableProps["onChange"] = (e) => {
                const { value } = e.target;
                setVal(value);
            };

            return (
                <EditableFields
                    as="input"
                    name="editProject"
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

        const input = getByDisplayValue("Project A") as HTMLInputElement;
        expect(input).toBeInTheDocument();

        const focusSpy = vi.spyOn(input, "focus");
        input.focus();
        expect(focusSpy).toHaveBeenCalled();

        await user.clear(input);
        await user.type(input, "Project B");

        expect(input.value).toBe("Project B");
    });

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

    it("should call editPhoneOnChange and format phone number", async () => {
        const user = userEvent.setup();

        const Wrapper = () => {
            const [editWriteParams, setEditWriteParams] = useState<WriteEditType>({
                editId: "1",
                editProject: "Project A",
                editListe: "Liste A",
                editDelay: "2026-01-01",
                editClient: "Client X",
                editMail: "client@example.com",
                editPhone: "0123456789",
            });

            const editPhoneOnChange = (e: ChangeEvent<EditableElement>) => {
                const target = e.target as HTMLInputElement;
                const formatted = formatPhoneNumber(target.value);
                setEditWriteParams((prev: WriteEditType) => ({
                    ...prev,
                    editPhone: formatted,
                }));
            };

            return (
                <EditableFields
                    as="input"
                    name="editPhone"
                    value={editWriteParams.editPhone}
                    editWriteParams={editWriteParams.editPhone}
                    editBoolParams={true}
                    isDoneParams={false}
                    onChange={editPhoneOnChange}
                    onSubmit={() => {}}
                    className="input-button-container"
                />
            );
        };

        render(<Wrapper />);

        const input = screen.getByDisplayValue("0123456789") as HTMLInputElement;
        expect(input).toBeInTheDocument();

        const focusSpy = vi.spyOn(input, "focus");
        input.focus();
        expect(focusSpy).toHaveBeenCalled();

        // Simuler l'utilisateur qui remplace le numéro
        await user.clear(input);
        await user.type(input, "0987654321");

        // Vérifie la valeur finale formatée
        await waitFor(() => {
            expect(input.value).toBe("098 765 43 21");
        });
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
});

describe('formatPhoneNumber', () => {
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

describe("TodoPerDay - editParamsOnChange & handlePhoneOnChange", () => {
    const fields = [
        { name: "editProject", initial: "Old Project", typed: "New Project" },
        { name: "editListe", initial: "Old Liste", typed: "New Liste" },
        { name: "editDelay", initial: "Old Delay", typed: "New Delay" },
        { name: "editClient", initial: "Old Client", typed: "New Client" },
        { name: "editMail", initial: "old@mail.com", typed: "new@mail.com" }
    ];

    fields.forEach(({ name, initial, typed }) => {
        it(`updates ${name} correctly via editParamsOnChange`, async () => {
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

                const editParamsOnChange = (e: ChangeEvent<EditableElement>) => {
                    const { name, value } = e.target;
                    setEditWriteParams((prev) => ({ ...prev, [name]: value }));
                };

                return <input 
                    name={name} 
                    value={editWriteParams[name as keyof typeof editWriteParams]} 
                    onChange={editParamsOnChange} 
                />;
            };

            const { getByDisplayValue } = render(<Wrapper />);
            const input = getByDisplayValue(initial) as HTMLInputElement;

            await user.clear(input);
            await user.type(input, typed);

            expect(input.value).toBe(typed);
        });
    });

    const field = [
        { name: "editPhone", initial: "0213203344", typed: "021 320 33 77" }
    ];

    field.forEach(({ name, initial, typed }) => {
        it(`updates ${name} correctly via editPhoneOnChange`, async () => {
            const user = userEvent.setup();
            const Wrapper = () => {
                const [editWriteParams, setEditWriteParams] = useState({
                    editProject: "Old Project",
                    editListe: "Old Liste",
                    editDelay: "Old Delay",
                    editClient: "Old Client",
                    editMail: "old@mail.com",
                    editPhone: "0213203344",
                    editId: "1"
                });

                const editPhoneOnChange = (e: ChangeEvent<EditableElement>): void => {
                    setEditWriteParams((prev: WriteEditType) => ({
                        ...prev,
                        editPhone: formatPhoneNumber(e.target.value)
                    })
                )};

                return <input 
                    name={name} 
                    value={editWriteParams[name as keyof typeof editWriteParams]} 
                    onChange={editPhoneOnChange} 
                />;
            };

            const { getByDisplayValue } = render(<Wrapper />);
            const input = getByDisplayValue(initial) as HTMLInputElement;

            await user.clear(input);
            await user.type(input, typed);

            expect(input.value).toBe(typed);
        });
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


it("update priority correctly via changeDayFunction with dayBool to false", async () => {
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

// Test
describe("isVisible toggle behavior", () => {
  it("should toggle visibility when the button is clicked", async () => {
    // Rendu du composant
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

    // Vérifier que les champs sont initialement masqués (isVisible = false)
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
    
    // Vérifier que le bouton "eye" est visible
    const toggleButton = screen.getByTestId("toggle-client-inputs");
    expect(toggleButton).toBeInTheDocument();
    
    // Simuler un clic sur le bouton pour rendre les champs visibles
    fireEvent.click(toggleButton);
    
    // Vérifier que les champs sont maintenant visibles (isVisible = true)
    expect(editableFieldClient).toHaveClass('input-button-client','show');
    expect(editableFieldMail).toHaveClass('input-button-mail','show');
    expect(editableFieldPhone).toHaveClass('input-button-phone','show');

    // Simuler un onMouseLeave pour cacher les champs à nouveau
    fireEvent.mouseLeave(screen.getByText("Client"));
    
    // Vérifier que les champs sont cachés
    expect(editableFieldClient).toHaveClass("input-button-client", 'hide');
    expect(editableFieldMail).toHaveClass("input-button-mail", 'hide');
    expect(editableFieldPhone).toHaveClass("input-button-phone", 'hide');
  });
});

describe("TodoPerDay focus behavior", () => {
  it("should focus input when editBoolProject becomes true", async () => {
    
    // 🔥 Spy sur focus
    const focusSpy = vi.spyOn(HTMLElement.prototype, "focus");

    render(
      <TodoPerDay
        todo={mockTodo}
        todos={mockTodos}
        setTodos={vi.fn()}
      />
    );

    // Clique sur le bouton pour activer editBoolProject
    const submitBtn = screen.getAllByTestId("submit-btn")[0];
    await userEvent.click(submitBtn);

    //screen.debug();

    // ✅ Vérifie que focus a été appelé
    expect(focusSpy).toHaveBeenCalled();

    focusSpy.mockRestore();
  });
});
