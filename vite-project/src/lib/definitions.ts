import { 
    type ChangeEvent, 
    type Dispatch, 
    type FormEvent, 
    type HTMLAttributes, 
    type ReactNode, 
    type RefObject, 
    type SetStateAction
} from "react";

export type TimeSetTimeProps = {
    setTime: Dispatch<SetStateAction<string>>;
};

export type ParamsTodoType = {
    date: string;
    project: string;
    liste: string;
    delay: string;
    client: string;
    email: string;
    phone: string;
    priority: string;
};

export type Todo = {
    id: string;
    date: string;
    project: string;
    liste: string;
    delay: string;
    client: string;
    email: string;
    phone: string;
    priority: string;
    selectedDay: string | undefined;
	isDoneDate: boolean;
	isDoneProject: boolean;
    isDoneListe: boolean;
    isDoneDelay: boolean;
    isDoneClient: boolean;
    isDoneMail: boolean;
    isDonePhone: boolean;
};

export type LoadErrType = {
    loading: boolean;
    error: string | null;
};

export type CreatorType = {
    date: string;
    project: string;
    liste: string;
    delay: string;
    client: string;
    email: string;
    phone: string;
    selectedDay: string | undefined;
    priority: string;
    setParamsTodo: Dispatch<SetStateAction<ParamsTodoType>>;
    handleCheckBox: (day: string) => void;
    handleSubmit : (e: FormEvent<HTMLFormElement>) => void;
};

export type InputType = {
    type: string;
    name: string;
    value: string;
    onChange?: (e: ChangeEvent<HTMLInputElement>) => void;
    maxLength?: number;
    placeholder: string;
};

export type CheckBoxType = {
    params: string;
    checked: boolean;
    handleCheckBox: (day: string) => void;
    children: ReactNode;
};

export type TodoListType = {
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export type BooleanEditType = {
    editBoolDate: boolean;
    editBoolProject: boolean;
    editBoolListe: boolean;
    editBoolDelay: boolean;
    editBoolClient: boolean;
    editBoolMail: boolean;
    editBoolPhone: boolean;
};

export type WriteEditType = {
    editId: string;
    editDate: string;
    editProject: string;
    editListe: string;
    editDelay: string;
    editClient: string;
    editMail: string;
    editPhone: string;
};

export type SelectedDayProps = {
    id: string;
    dayBool: boolean;
    selectedDay: string | undefined;
    handleChangeDay: (e: ChangeEvent<HTMLSelectElement>) => void; 
    onClick: () => void;
};

export type ParamsPriorityTypes = {
    hidePriority: boolean;
    bgColor: string;
};

export type PriorityType = {
    id: string;
    priorityTodo: string;
    paramsPriorityHide: boolean;
    onClick: () => void;
    handleChangePriority: (e: ChangeEvent<HTMLSelectElement>) => void;
};

export type EditableElement = HTMLInputElement | HTMLTextAreaElement;

export type EditableProps = {
    params: string;
    className?: HTMLAttributes<HTMLDivElement>['className'];
    ref: RefObject<EditableElement | null>;
    type?: "email" | "text";
    name: string;
    value: string;
    as?: "input" | "textarea";
    rows?: number;
    cols?: number;
    editBoolParams: boolean;
    editWriteParams: string;
    isDoneParams: boolean;
    onSubmit: (e: FormEvent<HTMLFormElement>) => void;
    onChange: (e: ChangeEvent<EditableElement>) => void;
};

export type PropsTodoType = {
    todo: Todo;
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
};

export type PropsCalendarType = {
    todo: Todo;
    todos: Todo[];
    setTodos: Dispatch<SetStateAction<Todo[]>>;
    listOfDay?: string[];
}